import express from "express";

import { listTimeline } from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/timeline", listTimeline);

export default router;
