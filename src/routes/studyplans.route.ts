import express from "express";
import { getAllStudyPlans } from "../controllers/studyplans.controller";

const studyplanRouter = express.Router();

studyplanRouter.get("/", getAllStudyPlans);

export default studyplanRouter;
