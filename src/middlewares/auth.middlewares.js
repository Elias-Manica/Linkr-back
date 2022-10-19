import { conflictResponse, serverErrorResponse, validationSchema } from "../controllers/helper.controllers.js";
import { getUserByEmail } from "../repositories/auth.repositories.js";
import { signUpSchema } from "../schemas/auth.schemas.js";

async function signUpValidation(req, res, next) {
    const { email, password, username, pictureurl } = req.body;
    /*const validation = signUpSchema.validate({ email, password, username, pictureurl }, { abortEarly: false });

    if(validation.error) {
        const errorList = validation.error.details.map(error => error.message);
        return res.status(422).send(errorList);
    }*/

    validationSchema(res, signUpSchema, { email, password, username, pictureurl });

    try {
        const checkUserEmail = (await getUserByEmail(email)).rows[0];

        //if(checkUserEmail) return res.status(409).send({ message: "Email already registered" });
        if(checkUserEmail) return conflictResponse(res, "Email already registered");

        res.locals.body = { email, password, username, pictureurl }
        next();

    } catch(error) {
        return serverErrorResponse(res, error);
    }
}

export { signUpValidation };