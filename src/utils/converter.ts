import { Document, WithId } from "mongodb";
import { StudyPlan } from "@models/studyplans.model";
import { Resource, ResourceFile } from "@models/resources.model";
import { QuickLink } from "@models/quicklinks.model";
import { FILE_ENDPOINT_URL } from "./constants";

export function convertResultToStudyPlan(result: WithId<Document>): StudyPlan {
	return {
		fileKey: result.fileKey ?? "",
		major: result.major ?? "",
		major_abbrv: result.major_abbrv ?? "",
		faculty: result.faculty ?? "",
		language: result.language ?? "",
		year: result.year ?? "",
		url: `${FILE_ENDPOINT_URL}/${result.fileKey}`,
	};
}

export function convertResultToResource(result: WithId<Document>): Resource {
	return {
		name: result.name ?? "",
		iconURL: result.iconURI ? `${FILE_ENDPOINT_URL}/${result.iconURI}` : null,
		files: result.files.map((file: ResourceFile) => {
			return {
				name: file.name ?? "",
				url: `${FILE_ENDPOINT_URL}/${file.key}`,
			};
		}),
	};
}

export function convertResultToQuickLink(result: WithId<Document>): QuickLink {
	return {
		title: result.title ?? "",
		description: result.description ?? "",
		imgURL: result.imgURI ? `${FILE_ENDPOINT_URL}/${result.imgURI}` : null,
		link: result.link ?? "",
		originalLink: result.originalLink ?? "",
	};
}
