import Joi from "joi";

export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text.",
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required."
  }),
  password: Joi.string().min(6).max(32).required().messages({
    "string.base": "Password should be a type of text.",
    "string.empty": "Password is required.",
    "string.min": "Password should have a minimum length of {#limit}.",
    "string.max": "Password should have a maximum length of {#limit}.",
    "any.required": "Password is required."
  })
});
