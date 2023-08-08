import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";
import { GetObjectCommand, NoSuchKey } from "@aws-sdk/client-s3";
import { getConnection } from "../utils/mongoconnection";
import { Readable } from "stream";
import { s3Client } from "../utils/s3connection";
import { convertResultToStudyPlan } from "../utils/converter";

const studyplanRouter: Router = express.Router();

studyplanRouter.get("/", async (req: Request, res: Response) => {
    const client = await getConnection();
    if (!client) {
        return res.status(500).send("Failed to connect to db!");
    }

    const data = client.db("stamfordcenter").collection("study_plans").find({});
    const results = await data.toArray();
    if (!results) {
        return res.status(404).send("file not found");
    }

    const studyplans = results.map((r) => convertResultToStudyPlan(r));
    res.json(studyplans);
});

studyplanRouter.get("/:fileKey", async (req: Request, res: Response) => {
    if (!req.params.fileKey) {
        res.status(400).send("file key is required");
        return;
    }

    const cmd = new GetObjectCommand({
        Bucket: "study-plans",
        Key: req.params.fileKey,
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

export default studyplanRouter;
