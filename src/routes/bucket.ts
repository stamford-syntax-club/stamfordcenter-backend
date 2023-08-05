import { GetObjectCommand, ListBucketsCommand, ListObjectsCommand, NoSuchBucket, NoSuchKey } from "@aws-sdk/client-s3";
import express, { Request, Response, Router } from "express";
import { Readable } from "stream";
import s3Client from "../s3/client";

const bucketRouter: Router = express.Router();

bucketRouter.get("/", async (req: Request, res: Response) => {
    const cmd = new ListBucketsCommand({});

    try {
        const { Buckets } = await s3Client.send(cmd);
        const bucketList = Buckets?.map((b) => b.Name);
        res.json({ buckets: bucketList });
    } catch (err) {
        res.status(500).send({ message: "internal server error" });
        console.error("list buckets: ", err);
    }
});

bucketRouter.get("/:bucketName", async (req: Request, res: Response) => {
    const cmd = new ListObjectsCommand({ Bucket: req.params.bucketName });

    try {
        const { Contents } = await s3Client.send(cmd);
        const files = Contents?.map((f) => f.Key);
        res.json({ files: files });
    } catch (err) {
        if (err instanceof NoSuchBucket) {
            res.status(404).send("bucket not found");
            return;
        }
        res.status(500).send({ message: "internal server error" });
        console.error("list files: ", err);
    }
});

bucketRouter.get("/:bucketName/:fileName", async (req: Request, res: Response) => {
    if (!req.params.bucketName) {
        res.status(400).send("bucket name is required");
        return;
    }
    if (!req.params.fileName) {
        res.status(400).send("file name is required");
        return;
    }

    const cmd = new GetObjectCommand({
        Bucket: req.params.bucketName,
        Key: req.params.fileName,
    });

    try {
        const response = await s3Client.send(cmd);

        if (!response) {
            return res.status(404).send("file not found");
        }

        if (req.query.download) {
            res.attachment(req.params.fileName);
        }
        res.setHeader("Content-Type", response.ContentType ?? "application/octet-stream");

        if (response.Body instanceof Readable) {
            response.Body.once("error", (err) => {
                console.error("Error downloading s3 file");
                console.error(err);
            });

            return response.Body.pipe(res);
        }
    } catch (err) {
        if (err instanceof NoSuchKey) {
            res.status(404).send("file not found");
            return;
        }
        res.status(500).send("internal server error");
        console.error("send file: ", err);
    }
});

export default bucketRouter;
