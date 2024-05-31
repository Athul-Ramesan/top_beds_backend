import Joi from "joi";

export const emailValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email should be a type of text.",
        "string.empty": "Email is required.",
        "string.email": "Please provide a valid email address.",
        "any.required": "Email is required."
      }),
})