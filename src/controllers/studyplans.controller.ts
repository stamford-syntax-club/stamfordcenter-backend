import { convertResultToStudyPlan } from "@utils/converter";
import { getConnection } from "@utils/mongoconnection";
import { Request, Response } from "express";

const getAllStudyPlans = async (req: Request, res: Response) => {
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
};

export { getAllStudyPlans };
