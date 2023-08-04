import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

import { ListBucketsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { readFile } from "fs/promises";

import short from "short-uuid";

dotenv.config();
const client = new S3Client({
	endpoint: process.env.S3_ENDPOINT,
});

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.get("/list_buckets", async (req: Request, res: Response) => {
	const command = new ListBucketsCommand({});

	try {
		const { Owner, Buckets } = await client.send(command);

		if (!Buckets) throw new Error("No buckets!");
		if (!Owner) throw new Error("No owner!");

		console.log(`${Owner.DisplayName} owns ${Buckets.length} bucket${Buckets.length === 1 ? "" : "s"}:`);
		console.log(`${Buckets.map((b) => ` • ${b.Name}`).join("\n")}`);
	} catch (err) {
		console.error(err);
	} finally {
		res.send("Listed buckets in console");
	}
});

app.get("/upload", async (req: Request, res: Response) => {
	const myFile = await readFile("./assets/csicon.png");

	const putObjCommand = new PutObjectCommand({
		Bucket: "test-khing1",
		Key: `${short.generate()}.png`, // `Key` is the name of the object. If one already exists, it will be overwritten.
		Body: myFile,
	});

	const result = await client.send(putObjCommand);
	console.log(result);

	res.json(result);
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
