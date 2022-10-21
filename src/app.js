import express from "express";
import cors from "cors";
import PostRouter from './rotes/postRouter.js';
import dotenv from "dotenv";
dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());



app.get("/status", (req, res) => {
  res.sendStatus(201);
});
app.use(PostRouter);


const PORT = process.env.PORT || 4000;
app.listen(process.env.PORT, () => {
  console.log(`Server listen on port ${process.env.PORT}`);
});
