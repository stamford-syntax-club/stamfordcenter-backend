import { NextFunction, Request, Response } from "express";
import { getRedisClient } from "@utils/redisclient";

const ttl = 60 * 24 * 30;
export default async function cacheEndpoint(req: Request, res: Response, next: NextFunction) {
    const endpoint = `${req.method} - ${req.originalUrl}`;

    if (req.method !== "GET") {
        console.log(`Cache middleware bypassed for non-GET request: ${endpoint}`);
        return next();
    }

    const redisClient = await getRedisClient();
    const cachedResponse = await redisClient?.get(req.originalUrl);

    if (!cachedResponse) {
        console.log(`No cache found for endpoint: ${endpoint}. Fetching data from database.`);
        next(); // Get data from the database

        if (res.locals.studyPlans) {
            const value = JSON.stringify(res.locals.studyPlans);
            if (typeof req.originalUrl === 'string' && typeof value === 'string') {
                await redisClient?.setEx(req.originalUrl, ttl, value);
                console.log(`Data for endpoint: ${endpoint} cached for 30 days.`);
            } else {
                console.error('Invalid argument type for Redis setex command');
            }
        }else{
            console.error(`No data found for endpoint: ${endpoint}`);
        }
    }
}