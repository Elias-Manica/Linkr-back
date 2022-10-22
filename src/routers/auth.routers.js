import express from "express";
import { createUser, createLogin } from "../controllers/auth.controllers.js";
import { loginValidation, signUpValidation } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signup", signUpValidation, createUser);
router.post("/signin", loginValidation, createLogin);

export default router;