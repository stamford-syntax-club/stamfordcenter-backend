import { MongoClient, ServerApiVersion } from "mongodb";

let cachedClient: MongoClient | null = null;

export async function getConnection() {
	if (cachedClient) return cachedClient;
	if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined");

	try {
		cachedClient = await MongoClient.connect(process.env.MONGODB_URI, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});

		await cachedClient.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} catch (error) {
		console.error("Failed to connect to MongoDB", error);
	}

	return cachedClient;
}
