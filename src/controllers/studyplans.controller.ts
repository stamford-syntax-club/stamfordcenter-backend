import { Request, Response } from "express";
import { convertResultToStudyPlan } from "@utils/converter";
import { getConnection } from "@utils/mongoconnection";
import { getRedisClient } from "@utils/redisclient";

const cacheTTL = 60 * 24 * 30; // cache for 30 days

const getAllStudyPlans = async (req: Request, res: Response) => {
  try {
    const client = await getConnection();
    const data = client?.db("stamfordcenter").collection("study_plans").find({});
    const results = await data?.toArray();

    if (!results) {
      return res.status(404).send("file not found");
    }

    const studyPlans = results.map((result) => convertResultToStudyPlan(result));
    res.locals.studyPlans = studyPlans;
    
    // Cache the study plans after fetching from the database
    const redisClient = await getRedisClient();
    await redisClient?.setEx(req.originalUrl, cacheTTL, JSON.stringify(studyPlans));

    res.status(200).json(studyPlans);
  } catch (err) {
    console.error(`getAllStudyPlans: ${err}`);
    return res.status(500).send("Something is wrong on our end, try again later");
  }
};

export { getAllStudyPlans };