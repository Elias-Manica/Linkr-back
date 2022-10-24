import express from "express";

import {
  listTimeline,
  listHashtagsFunction,
  listPostsBasedOnHashtag,
  deletePost,
  editPostFunction,
  likeAPost,
  dislikeAPost,
} from "../controllers/posts.controller.js";

import { checkAuthorization } from "../middlewares/auth.middlewares.js";

import {
  isAvaiableToDelete,
  isAvaiableToEdit,
} from "../middlewares/post.middleware.js";
import validatePostSchema from "../middlewares/postMiddleware.js";

const router = express.Router();

router.get("/timeline", listTimeline);
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
export default router;
