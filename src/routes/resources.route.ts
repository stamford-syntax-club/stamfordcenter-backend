import express from "express";
import { getAllResources } from "@controllers/resources.controller";
const resourceRouter = express.Router();

resourceRouter.get("/:page", getAllResources);

export default resourceRouter;
