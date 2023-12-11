import { createClient } from "redis";
import { readFileSync } from "fs";
import dotenv from "dotenv";
import { convertResultToStudyPlan } from "@utils/converter";
import { getConnection } from "@utils/mongoconnection";

dotenv.config();

const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
    tls: process.env.REDIS_TLS === "true",
    key: readFileSync(process.env.REDIS_KEY_PATH!, "utf-8"),
    cert: readFileSync(process.env.REDIS_CERT_PATH!, "utf-8"),
    ca: [readFileSync(process.env.REDIS_CA_PATH!, "utf-8")],
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  const studyPlanKey = "StudyPlans";
  try {
    const client = await getConnection();
    const data = client?.db("stamfordcenter").collection("StudyPlans").find({});
    const results = await data?.toArray();

    if (!results) {
      console.log("There is no studyplan in Database.");
      return;
    }

    const studyPlans = results.map((result) => convertResultToStudyPlan(result));

    console.log('Cache Study Plans', studyPlans);

    await redisClient.set(studyPlanKey, JSON.stringify(studyPlans));

    const cachedStudyPlan = await redisClient.get(studyPlanKey);

    if (cachedStudyPlan) {
      console.log('Redis Study Plans:', JSON.parse(cachedStudyPlan));
    } else {
      console.log('No study plans in Redis');
    }

  } catch (error) {
    console.error("Error", error);
  } finally {
    await redisClient.quit();
  }
})