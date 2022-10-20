import express from "express";

import {
  listTimeline,
  listHashtagsFunction,
  listPostsBasedOnHashtag,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/timeline", listTimeline);
router.get("/hashtag", listHashtagsFunction);
router.get("/hashtag/:hashtag", listPostsBasedOnHashtag);

export default router;
