import express from "express";
import { createUser, createLogin, logout } from "../controllers/auth.controllers.js";
import { checkAuthorization, loginValidation, signUpValidation } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signup", signUpValidation, createUser);
router.post("/signin", loginValidation, createLogin);
router.delete("/logout", checkAuthorization, logout);

export default router;