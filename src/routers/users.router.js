import express from "express";
import { showFollowing } from "../controllers/follow.controller.js";
import { getUserPosts, searchUsers } from "../controllers/users.controller.js";
import { checkAuthorization } from "../middlewares/auth.middlewares.js";

const usersRouter = express.Router();
usersRouter.get("/users/:id", getUserPosts);
usersRouter.post("/users", searchUsers);
usersRouter.get("/users/get/following", checkAuthorization, showFollowing);

export default usersRouter;
