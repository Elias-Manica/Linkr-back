import express from "express";
import { createPost } from "../controllers/postController.js";
import validatePostSchema from "../middlewares/postMiddleware.js";
import { checkAuthorization } from "../middlewares/auth.middlewares.js";
import { follow, isFollowing, unfollow } from "../controllers/follow.controller.js";
import verifyIdValid from "../middlewares/users.middleware.js";
const router = express.Router();

router.post("/publish", checkAuthorization, validatePostSchema, createPost);
router.post("/follow/:id", checkAuthorization,follow);
router.post("/unfollow/:id", checkAuthorization, unfollow );
router.get("/follow/:id", checkAuthorization,verifyIdValid, isFollowing);
export default router;
