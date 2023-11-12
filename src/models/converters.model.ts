import { WithId, Document } from "mongodb";
interface Converters {
	[key: string]: (result: WithId<Document>) => any;
}

export { Converters };
