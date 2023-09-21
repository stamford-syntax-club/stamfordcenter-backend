import express from "express";
import { getFile } from "@controllers/files.controller";

const fileRouter = express.Router();

fileRouter.get("/:fileKey", getFile);

export default fileRouter;
