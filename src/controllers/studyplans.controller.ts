import { convertResultToStudyPlan } from "@utils/converter";
import { getConnection } from "@utils/mongoconnection";
import { Request, Response } from "express";
import { getFromCache, setInCache } from "@utils/redisCache";

const CACHE_KEY = "studyPlans";

const getAllStudyPlans = async (req: Request, res: Response) => {
	try {
		const cachedStudyPlans = await getFromCache(CACHE_KEY);

		if (cachedStudyPlans) {
			console.log("Get data from cache");
			return res.status(200).json(cachedStudyPlans);
		}

		const mongoClient = await getConnection();
		const data = mongoClient?.db("stamfordcenter").collection("study_plans").find({});
		const results = await data?.toArray();

		if (!results) {
			return res.status(404).send("File not found");
		}

		const studyplans = results.map((result) => convertResultToStudyPlan(result));

		await setInCache(CACHE_KEY, studyplans);

		return res.status(200).json(studyplans);
	} catch (err) {
		console.error(`getAllStudyPlans: ${err}`);
		return res.status(500).send("Something went wrong; please try again later.");
	}
};

export { getAllStudyPlans };
