import express from "express";
import { getAnnouncement } from "@controllers/announcement.controller";

const announcementRouter = express.Router();

announcementRouter.get("/announement", getAnnouncement); // to be removed after frontend has migrated

export default announcementRouter;
