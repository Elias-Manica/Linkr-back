import express from "express";
import { createPost } from "../controllers/postController.js";
import validatePostSchema from "../middlewares/postMiddleware.js";

import { checkAuthorization } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/publish", checkAuthorization, validatePostSchema, createPost);

export default router;
