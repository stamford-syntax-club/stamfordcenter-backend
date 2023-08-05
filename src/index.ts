import dotenv from "dotenv";
import express, { Express, Request, Response, Router } from "express";
import bucketRouter from "./routes/bucket";
var cors = require('cors')


dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.use(cors())

app.use("/api/buckets", bucketRouter)

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
