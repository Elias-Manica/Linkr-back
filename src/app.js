import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routers/users.router.js";
import authRouter from "./routers/auth.routers.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/status", (req, res) => {
	res.sendStatus(201);
});

app.use(usersRouter);
app.use(authRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server listen on port ${process.env.PORT}`);
});
