import { Redis } from "ioredis";
import { promisify } from "util";

const redisClient = new Redis();

const getAsync = promisify(redisClient.get).bind(redisClient);

const CACHE_EXPIRATION_SECONDS = 36000;

const getFromCache = async (key: string): Promise<any | null> => {
	try {
		const cachedData = await getAsync(key);
		return cachedData ? JSON.parse(cachedData) : null;
	} catch (error) {
		console.error("Error getting data from Redis :", error);
		return null;
	}
};

const setInCache = (client: any, key: string, data: any, ttl: number = CACHE_EXPIRATION_SECONDS): Promise<void> => {
	const jsonStr = JSON.stringify(data);

	return new Promise((resolve, reject) => {
		client.set(key, jsonStr, "EX", ttl, (err: Error | null, reply: string) => {
			if (err) {
				console.error("Redis cache Setting Error:", err);
				reject(err);
			} else {
				console.log("Set operation reply:", reply);
				resolve();
			}
		});
	});
};

export { getFromCache, setInCache };
