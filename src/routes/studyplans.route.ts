import express from "express";
import { getAllStudyPlans } from "@controllers/studyplans.controller";

// to be removed after frontend has migrated
const studyplanRouter = express.Router();

studyplanRouter.get("/", getAllStudyPlans);

export default studyplanRouter;
