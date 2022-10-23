import express from "express";
import { getUserPosts, searchUsers } from "../controllers/users.controller.js";

const usersRouter = express.Router();
usersRouter.get("/users/:id", getUserPosts);
usersRouter.post("/users", searchUsers);

export default usersRouter;
