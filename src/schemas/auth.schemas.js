import joi from "joi";

const regexUrlPattern = new RegExp('((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)');

const signUpSchema = joi.object({
    email: joi.string().email().trim().empty(" ").required(), 
    password: joi.string().trim().empty(" ").required(), 
    username: joi.string().trim().empty(" ").required(), 
    pictureurl: joi.string().pattern(regexUrlPattern).required()
});

export { signUpSchema };