import { NextFunction, Request, Response } from "express";
import { getRedisClient } from "@utils/redisclient";

// const ttl = 60 * 24 * 30;
export default async function cacheEndpoint(req: Request, res: Response, next: NextFunction) {
    const endpoint = `${req.method} - ${req.originalUrl}`;

    if (req.method !== "GET") {
        console.log(`Cache middleware bypassed for non-GET request: ${endpoint}`);
        return next();
    }

    
    try {
        const redisClient = await getRedisClient();
        const cachedResponse = await redisClient?.get(req.originalUrl);

        if (!cachedResponse) {
            console.log(`No cache found for endpoint: ${endpoint}. Fetching data from database.`);
            next(); // Get data from the database
        } else {
            console.log(`Cache found for endpoint: ${endpoint}. Returning cached data.`);
            res.status(200).json(JSON.parse(cachedResponse));
        }
    } catch (error) {
        console.error(`Error in Redis middleware: ${error}`);
        next();
    }
}