import Joi from "joi";

export const passwordValidation = Joi.object({
    password: Joi.string().min(6).max(32).required().messages({
        "string.base": "Password should be a type of text.",
        "string.empty": "Password is required.",
        "string.min": "Password should have a minimum length of {#limit}.",
        "string.max": "Password should have a maximum length of {#limit}.",
        "any.required": "Password is required."
      })
})