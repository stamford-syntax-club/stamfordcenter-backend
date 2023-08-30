import { WithId, Document } from "mongodb";
import { StudyPlan } from "@models/studyplans.model";

export function convertResultToStudyPlan(result: WithId<Document>): StudyPlan {
    return {
        fileKey: result.fileKey ?? "",
        major: result.major ?? "",
        major_abbrv: result.major_abbrv ?? "",
        faculty: result.faculty ?? "",
        language: result.language ?? "",
        year: result.year ?? "",
    };
}