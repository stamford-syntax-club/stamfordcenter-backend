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

const setInCache = (key: string, data: any, ttl: number = CACHE_EXPIRATION_SECONDS): Promise<void> => {
	const jsonStr = JSON.stringify(data);

	return new Promise((resolve, reject) => {
		redisClient.set(key, jsonStr, "GET", () => {
			redisClient.expire(key, ttl, (err) => {
				if (err) {
					console.error("Error setting data in Redis :", err);
					reject(err);
				}
				resolve();
			});
		});
	});
};

export { getFromCache, setInCache };
