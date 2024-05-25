import Joi from "joi";

export const addressValidation = Joi.object({

    street: Joi.string().trim().required().messages({
        'string.base': `"street" should be a type of 'text'`,
        'string.empty': `"street" cannot be an empty field`,
        'any.required': `"street" is a required field`
    }),
    city: Joi.string().trim().required().messages({
        'string.base': `"city" should be a type of 'text'`,
        'string.empty': `"city" cannot be an empty field`,
        'any.required': `"city" is a required field`
    }),
    state: Joi.string().trim().required().messages({
        'string.base': `"state" should be a type of 'text'`,
        'string.empty': `"state" cannot be an empty field`,
        'any.required': `"state" is a required field`
    }),
    zip: Joi.string().trim().pattern(/^[1-9]\d{5}$/).required().messages({
        'string.base': `"zip" should be a type of 'text'`,
        'string.empty': `"zip" cannot be an empty field`,
        'string.pattern.base': `"zip" must be exactly 6 positive digits`,
        'any.required': `"zip" is a required field`
    }),
    phone: Joi.string().trim().pattern(/^[1-9]\d{9}$/).required().messages({
        'string.base': `"phone" should be a type of 'text'`,
        'string.empty': `"phone" cannot be an empty field`,
        'string.pattern.base': `"phone" must be exactly 10 positive digits`,
        'any.required': `"phone" is a required field`
    })
})