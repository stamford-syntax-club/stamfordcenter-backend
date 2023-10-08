import express from "express";
import { getFile } from "@controllers/files.controller";

const fileRouter = express.Router();

fileRouter.get("/:fileKey", getFile); // to be removed after frontend has migrated
fileRouter.get("/:page/:fileKey", getFile);

export default fileRouter;
