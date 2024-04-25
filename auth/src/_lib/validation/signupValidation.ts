import Joi from "joi";

export const signupValidation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).max(32),
    isGoogle:Joi.boolean()
})