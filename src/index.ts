import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import studyplanRouter from "./routes/studyplans";
import cors from "cors";


dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.use(cors())

app.use("/api/study_plans", studyplanRouter);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
