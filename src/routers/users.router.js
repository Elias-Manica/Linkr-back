import express from "express";
import { getUserInfo, searchUsers } from "../controllers/users.controller.js";

const usersRouter = express.Router();
usersRouter.get("/users/:id", getUserInfo);
usersRouter.post("/users", searchUsers);

export default usersRouter;
