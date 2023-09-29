import express, { Request, Response } from "express";
import cors from "cors";
import fileRouter from "@routes/files.route";
import studyplanRouter from "@routes/studyplans.route";

const app = express();
app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.use(cors());

app.use("/api/study_plans", studyplanRouter);
app.use("/api/files", fileRouter);

export default app;
