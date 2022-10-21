import express from "express";
import {createPost} from '../controllers/postController.js'
import validatePostSchema from "../middlewares/postMiddleware.js";

const router = express.Router();

router.post("/publish", validatePostSchema, createPost);

export default router;



