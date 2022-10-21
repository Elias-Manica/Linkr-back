import { conflictResponse, notFoundResponse, serverErrorResponse, unauthorizedResponse, validationSchema } from "../controllers/helper.controllers.js";
import { getSessionByToken, getUserByEmail, getUserById } from "../repositories/auth.repositories.js";
import { loginSchema, signUpSchema } from "../schemas/auth.schemas.js";
import bcrypt from "bcrypt";

async function checkAuthorization(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return unauthorizedResponse(res);

    try {
        const session = (await getSessionByToken(token)).rows[0];
        if(!session) return unauthorizedResponse(res);

        const user = (await getUserById(session.userid)).rows[0];
        if(!user) return notFoundResponse(res);

        delete user.password;
        res.locals.user = user;
        next();

    } catch(error) {
        return serverErrorResponse(res, error);
    }
}

async function signUpValidation(req, res, next) {
    const { email, password, username, pictureurl } = req.body;

    validationSchema(res, signUpSchema, { email, password, username, pictureurl });

    try {
        const checkUserEmail = (await getUserByEmail(email)).rows[0];

        if(checkUserEmail) return conflictResponse(res, "E-mail already registered!");

        res.locals.body = { email, password, username, pictureurl }
        next();

    } catch(error) {
        return serverErrorResponse(res, error);
    }
}

async function loginValidation(req, res, next) {
    const { email, password } = req.body;

    validationSchema(res, loginSchema, { email, password });

    try {
        const user = (await getUserByEmail(email)).rows[0];
        if(!user) return unauthorizedResponse(res, "E-mail or password are invalid!");

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if(!passwordIsValid) return unauthorizedResponse(res, "E-mail or password are invalid!");

        //const userid = user.id;
        const { id, username, pictureurl } = user;
        res.locals.user = { id, username, pictureurl };
        next();

    } catch(error) {
        return serverErrorResponse(res, error);
    }
}

export { checkAuthorization, signUpValidation, loginValidation };