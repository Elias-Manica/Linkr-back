import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/status", (req, res) => {
	res.sendStatus(201);
});

app.get("/users/:id", (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.sendStatus(400);
		}

		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server listen on port ${process.env.PORT}`);
});
