import { getConnection } from "@utils/mongoconnection";
import { Request, Response } from "express";

const getAnnouncements = async (req: Request, res: Response) => {
	try {
		const client = await getConnection();
		const data = client?.db("stamfordcenter").collection("announcements").find();
		const results = await data?.toArray();
		if (!results) {
			return res.status(404).send("There are no announcements");
		}

		res.status(200).json({ message: "success", results });
	} catch (err) {
		console.error(`getAnnouncements: ${err}`);
		return res.status(500).send("Something is wrong on our end, try again later");
	}
};

export { getAnnouncements };
