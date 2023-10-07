import express from "express";
import { getFile } from "@controllers/files.controller";

const fileRouter = express.Router();

fileRouter.get("/:page/:fileKey", getFile);

export default fileRouter;
