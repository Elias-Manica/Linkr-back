import express from "express";

import { listTimeline } from "../controllers/posts.controller.js";

import { hasMore20posts } from "../middlewares/posts.middlewares.js";

const router = express.Router();

router.get("/timeline", hasMore20posts, listTimeline);

export default router;
