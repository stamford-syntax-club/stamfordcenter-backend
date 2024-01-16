import { createClient } from "redis";

const redisClient = createClient({
	url: process.env.REDIS_URL,
});

process.on("exit", async () => {
    if (redisClient) {
        console.log("Disconnecting from Redis...");
        try {
            await redisClient.disconnect();
            console.log("Successfully disconnected from Redis.");
        } catch (error) {
            console.error("Error disconnecting from Redis:", error);
        }
    }
});

export async function getRedisClient() {
    if (redisClient && redisClient.isReady && redisClient.isOpen) {
        return redisClient;
    }

    try {
        console.log("Connecting to Redis...");
        await redisClient.connect();
        console.log("Successfully connected to Redis.");
        return redisClient;
    } catch (error) {
        console.error("Error connecting to Redis:", error);
        if (redisClient) {
            try {
                await redisClient.disconnect();
            } catch (disconnectError) {
                console.error("Error disconnecting from Redis:", disconnectError);
            }
        }
        return null;
    }
}