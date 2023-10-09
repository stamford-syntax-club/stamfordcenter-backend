import { WithId, Document } from "mongodb";
import { StudyPlan } from "@models/studyplans.model";
import { Resource, ResourceFile } from "@models/resources.model";
import { BASE_URL } from "./constants";

const ENDPOINT = `${BASE_URL}/api/files`;

export function convertResultToStudyPlan(result: WithId<Document>): StudyPlan {
	return {
		fileKey: result.fileKey ?? "",
		major: result.major ?? "",
		major_abbrv: result.major_abbrv ?? "",
		faculty: result.faculty ?? "",
		language: result.language ?? "",
		year: result.year ?? "",
		url: `${ENDPOINT}/${result.fileKey}`,
	};
}

export function convertResultToResource(result: WithId<Document>): Resource {
	return {
		name: result.name ?? "",
		iconURL: result.iconURI ? `${ENDPOINT}/${result.iconURI}` : null,
		files: result.files.map((file: ResourceFile) => {
			return {
				name: file.name ?? "",
				key: file.key ?? "",
				url: `${ENDPOINT}/${file.key}`,
			};
		}),
	};
}
