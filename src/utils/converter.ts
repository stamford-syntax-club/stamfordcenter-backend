import { WithId, Document } from "mongodb";
import { StudyPlan } from "@models/studyplans.model";
import { Resource, ResourceFile } from "@models/resources.model";
import { BASE_URL } from "./constants";

export function convertResultToStudyPlan(pageName: string, result: WithId<Document>): StudyPlan {
	return {
		fileKey: `${pageName}/${result.fileKey}`,
		major: result.major ?? "",
		major_abbrv: result.major_abbrv ?? "",
		faculty: result.faculty ?? "",
		language: result.language ?? "",
		year: result.year ?? "",
	};
}

export function convertResultsToResource(pageName: string, results: WithId<Document>): Resource {
	console.log(`BASE_URL: ${BASE_URL}`);
	return {
		name: results.name ?? "",
		iconURL: results.iconURL ?? "",
		files: results.files.map((f: ResourceFile) => {
			return {
				name: f.name ?? "",
				key: `${pageName}/${f.key}`, // TODO: change to fileURL -> use BASE_URL to construct
			};
		}),
	};
}
