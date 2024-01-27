import express from "express";
import { getAnnouncements } from "@controllers/announcements.controller";

const announcementRouter = express.Router();

announcementRouter.get("/", getAnnouncements); // to be removed after frontend has migrated

export default announcementRouter;
