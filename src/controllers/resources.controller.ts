import { WithId, Document } from "mongodb";
import { convertResultToStudyPlan, convertResultsToResource as convertResultToResource } from "@utils/converter";
import { getConnection } from "@utils/mongoconnection";
import { Request, Response } from "express";

const getAllResources = async (req: Request, res: Response) => {
	const pageName = req.params.page;
	if (!pageName) {
		res.status(400).send("page name is required");
		return;
	}

	let converterFunc: (pageName: string, result: WithId<Document>) => any;
	switch (pageName) {
		case "study_plans":
			converterFunc = convertResultToStudyPlan;
			break;
		case "resources":
			converterFunc = convertResultToResource;
			break;
		default:
			res.status(400).send("invalid page name");
			return;
	}

	try {
		const client = await getConnection();
		const data = client?.db("stamfordcenter").collection(pageName).find({});
		const results = await data?.toArray();
		if (!results) {
			return res.status(404).send("file not found");
		}
		const resources = results.map((r) => converterFunc(pageName, r));
		res.json(resources);
	} catch (err) {
		console.error(`getAllResources: ${err}`);
		return res.status(500).send("Something is wrong on our end, try again later");
	}
};

export { getAllResources };
