import express from "express";

import {
	listTimeline,
	listHashtagsFunction,
	listPostsBasedOnHashtag,
	deletePost,
	editPostFunction,
	likeAPost,
	dislikeAPost,
	commentAPost,
	listCommentPost,
} from "../controllers/posts.controller.js";

import { checkAuthorization } from "../middlewares/auth.middlewares.js";

import {
	hasDescription,
	isAvaiableToDelete,
	isAvaiableToEdit,
	idIsValid,
	queryIsValid,
} from "../middlewares/post.middleware.js";
import validatePostSchema from "../middlewares/postMiddleware.js";

const router = express.Router();

router.get("/timeline", queryIsValid, checkAuthorization, listTimeline);
router.get("/hashtag", listHashtagsFunction);
router.get("/hashtag/:hashtag", listPostsBasedOnHashtag);
router.delete("/post/:id", checkAuthorization, isAvaiableToDelete, deletePost);
router.post("/post/like/:postId", likeAPost);
router.delete("/post/dislike/:postId", dislikeAPost);
router.put(
	"/post/:id",
	checkAuthorization,
	isAvaiableToEdit,
	validatePostSchema,
	editPostFunction
);
router.post(
	"/post/comment/:postId",
	checkAuthorization,
	hasDescription,
	commentAPost
);
router.get("/post/comment/:postId", idIsValid, listCommentPost);
export default router;
