import { conflictResponse, serverErrorResponse, validationSchema } from "../controllers/helper.controllers.js";
import { getUserByEmail } from "../repositories/auth.repositories.js";
import { signUpSchema } from "../schemas/auth.schemas.js";

async function signUpValidation(req, res, next) {
    const { email, password, username, pictureurl } = req.body;

    validationSchema(res, signUpSchema, { email, password, username, pictureurl });

    try {
        const checkUserEmail = (await getUserByEmail(email)).rows[0];

        if(checkUserEmail) return conflictResponse(res, "Email already registered");

        res.locals.body = { email, password, username, pictureurl }
        next();

    } catch(error) {
        return serverErrorResponse(res, error);
    }
}

export { signUpValidation };