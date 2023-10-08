import express, { Request, Response } from "express";
import cors from "cors";
import fileRouter from "@routes/files.route";
import studyplanRouter from "@routes/studyplans.route";
import resourceRouter from "@routes/resources.route";

const app = express();
app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.use(cors());

app.use("/api/study_plans", studyplanRouter); // to be removed after frontend has migrated
app.use("/api/files", fileRouter);
app.use("/api/resources", resourceRouter);

export default app;
