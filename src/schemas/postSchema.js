import Joi from "joi";

const publishSchema = Joi.object({
  link: Joi.string()
    .max(140)
    .pattern(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    )
    .required()
    .messages({
      "string.max": "The url must have a maximum of 140 characters",
      "object.regex": "URL format not supported",
      "string.pattern.base": "URL format not supported",
    }),
  text: Joi.string().required(),
});

export default publishSchema;
