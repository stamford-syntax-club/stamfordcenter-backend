import { Document, WithId } from "mongodb";
import { StudyPlan } from "@models/studyplans.model";
import { Resource, ResourceFile } from "@models/resources.model";
import { QuickLink } from "@models/quicklinks.model";
import { FILE_ENDPOINT_URL } from "./constants";

function verifyFieldsFor(resourceName: string, fields: string[], result: WithId<Document>) {
	const missingFields = fields.filter((field) => !result[field]);
	if (missingFields.length > 0) {
		throw new Error(`Missing field '${missingFields}' in resource id ${result._id} to create ${resourceName}`);
	}
}

export function convertResultToStudyPlan(result: WithId<Document>): StudyPlan {
	verifyFieldsFor("StudyPlan", ["fileKey", "major", "major_abbrv", "faculty", "language", "year"], result);
	return {
		fileKey: result.fileKey,
		major: result.major,
		major_abbrv: result.major_abbrv,
		faculty: result.faculty,
		language: result.language,
		year: result.year,
		url: `${FILE_ENDPOINT_URL}/${result.fileKey}`,
	};
}

export function convertResultToResource(result: WithId<Document>): Resource {
	verifyFieldsFor("Resource", ["name", "iconURI", "files"], result);
	return {
		name: result.name,
		iconURL: `${FILE_ENDPOINT_URL}/${result.iconURI}`,
		files: result.files.map((file: ResourceFile) => {
			return {
				name: file.name,
				url: `${FILE_ENDPOINT_URL}/${file.key}`,
			};
		}),
	};
}

export function convertResultToQuickLink(result: WithId<Document>): QuickLink {
	verifyFieldsFor("QuickLink", ["title", "description", "imgURI", "link", "originalLink"], result);
	return {
		title: result.title,
		description: result.description,
		imgURL: `${FILE_ENDPOINT_URL}/${result.imgURI}`,
		link: result.link,
		originalLink: result.originalLink,
	};
}
