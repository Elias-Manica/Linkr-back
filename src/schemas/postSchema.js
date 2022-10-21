import Joi from "joi";

const publishSchema = Joi.object({
  link: Joi.string().max(140)
  .pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
  .required(),
  text: Joi.string()
});

export default publishSchema;