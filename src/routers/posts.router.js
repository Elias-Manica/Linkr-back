import express from "express";
import { beLiked } from "../controllers/postController.js";
import {checkAuthorization} from "../middlewares/auth.middlewares.js";
import {
  listTimeline,
  listHashtagsFunction,
  listPostsBasedOnHashtag,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/timeline", listTimeline);
router.get("/hashtag", listHashtagsFunction);
router.get("/hashtag/:hashtag", listPostsBasedOnHashtag);
router.post("/like", checkAuthorization ,beLiked )

export default router;
