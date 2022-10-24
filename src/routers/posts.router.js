import express from "express";

import {
	listTimeline,
	listHashtagsFunction,
	listPostsBasedOnHashtag,
	deletePost,
	likeAPost,
	dislikeAPost,
} from "../controllers/posts.controller.js";

import { checkAuthorization } from "../middlewares/auth.middlewares.js";

import { isAvaiableToDelete } from "../middlewares/post.middleware.js";

const router = express.Router();

router.get("/timeline", listTimeline);
router.get("/hashtag", listHashtagsFunction);
router.get("/hashtag/:hashtag", listPostsBasedOnHashtag);
router.delete("/post/:id", checkAuthorization, isAvaiableToDelete, deletePost);
router.post("/post/like/:postId", likeAPost);
router.delete("/post/dislike/:postId", dislikeAPost);

export default router;
