import express from "express";

import {
  listTimeline,
  listHashtagsFunction,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/timeline", listTimeline);
router.get("/hashtags", listHashtagsFunction);

export default router;
