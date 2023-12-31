import { Request, Response } from "express";
import { GetObjectCommand, NoSuchKey } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { s3Client } from "@utils/s3connection";

const getFile = async (req: Request, res: Response) => {
	if (!req.params.fileKey) {
		res.status(400).send("file key is required");
		return;
	}

	// support for '/:page/:fileKey' and legacy '/:fileKey' (will be removed in the future)
	const key = `${req.params.page === undefined ? "" : req.params.page}/${req.params.fileKey}`;
	const cmd = new GetObjectCommand({
		Bucket: "stamford-center",
		Key: key,
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
};

export { getFile };
