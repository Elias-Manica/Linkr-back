import express from "express";
import { createUser } from "../controllers/auth.controllers.js";
import { signUpValidation } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signup", signUpValidation, createUser);

export default router;