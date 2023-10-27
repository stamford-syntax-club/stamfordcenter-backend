import { Document, WithId } from "mongodb";
import { convertResultToQuickLink, convertResultToResource, convertResultToStudyPlan } from "@utils/converter";
import { getConnection } from "@utils/mongoconnection";
import { Request, Response } from "express";

const converters = new Map<string, (result: WithId<Document>) => any>([
	["study_plans", convertResultToStudyPlan],
	["resources", convertResultToResource],
	["quicklinks", convertResultToQuickLink],
]);

const getAllResources = async (req: Request, res: Response) => {
	const pageName = req.params.page;
	if (!pageName) {
		res.status(400).send("page name is required");
		return;
	}

  const	converterFunc = converters.get(pageName);
  if (!converterFunc) {
    res.status(400).send(`The page ${pageName} is not supported.`);
    return;
  }

	try {
		const client = await getConnection();
		const data = client?.db("stamfordcenter").collection(pageName).find({});
		const results = await data?.toArray();
		if (!results) {
			return res.status(404).send(`content for page ${pageName} not found`);
		}
		const resources = results.map((result) => converterFunc(result));
		res.status(200).json(resources);
	} catch (err) {
		console.error(`getAllResources: ${err}`);
		return res.status(500).send("Something is wrong on our end, try again later");
	}
};

export { getAllResources };
