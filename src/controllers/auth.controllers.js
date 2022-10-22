import { deleteSession, insertSession, insertUser } from "../repositories/auth.repositories.js";
import { createdResponse, okResponse, serverErrorResponse } from "./helper.controllers.js";
import uuid from "uuid";
import bcrypt from "bcrypt";

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

async function createLogin(req, res) {
    const userid = res.locals;
    const token = uuid();

    try {
        await deleteSession(userid);
        await insertSession(token, userid);

        return okResponse(res, { token });
        
    } catch(error) {
        return serverErrorResponse(res, error);
    }
}

export { createUser, createLogin };