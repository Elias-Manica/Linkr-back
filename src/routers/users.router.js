import express from "express";
import { getUserInfo } from "../controllers/users.controller.js";

const usersRouter = express.Router();
usersRouter.get("/users/:id", getUserInfo);

export default usersRouter;
