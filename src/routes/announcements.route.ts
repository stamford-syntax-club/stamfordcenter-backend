import express from "express";
import { getAnnouncements } from "@controllers/announcements.controller";

const announcementRouter = express.Router();

announcementRouter.get("/", getAnnouncements);

export default announcementRouter;
