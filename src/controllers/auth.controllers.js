import bcrypt from "bcrypt";
import { insertUser } from "../repositories/auth.repositories.js";
import { createdResponse } from "./helper.controllers.js";

async function createUser(req, res) {
    const { email, password, username, pictureurl } = res.locals.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await insertUser(email, passwordHash, username, pictureurl);

        return createdResponse(res);

    } catch(error) {
        return serverErrorResponse(res, error);
    }
}

export { createUser };