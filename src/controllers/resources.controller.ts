import { convertResultToQuickLink, convertResultToResource, convertResultToStudyPlan } from "@utils/converter";
import { getConnection } from "@utils/mongoconnection";
import { Request, Response } from "express";
import { Converters } from "@models/converters.model";
import { getRedisClient } from "@utils/redisclient";
import { get } from "http";


const converters: Converters = {
	study_plans: convertResultToStudyPlan,
	resources: convertResultToResource,
	quicklinks: convertResultToQuickLink,
};

const cacheTTL = 60 * 24 * 30; // 30 days

const getAllResources = async (req: Request, res: Response) => {
	const pageName = req.params.page;
	if (!pageName) {
		res.status(400).send("page name is required");
		return;
	}

	const converterFunc = converters[pageName];
	if (!converterFunc) {
		res.status(400).send(
			`The page ${pageName} is not supported. Supported pages are: ${Object.keys(converters).join(", ")}`,
		);
		return;
	}

	try {
		const client = await getConnection();
		const data = client?.db("stamfordcenter").collection(pageName).find({});
		const results = await data?.toArray();
		if (!results) {
			return res.status(404).send(`content for page ${pageName} not found`);
		}
		const resources = results.map((result) => converterFunc(result)).filter((resource) => resource !== undefined);

		// cache the response
		const redisClient = await getRedisClient();
		await redisClient?.setEx(req.originalUrl, cacheTTL, JSON.stringify(resources));

		res.status(200).json(resources);
	} catch (err) {
		console.error(`getAllResources: ${err}`);
		return res.status(500).send("Something is wrong on our end, try again later");
	}
};

export { getAllResources };
