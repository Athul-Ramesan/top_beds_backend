import Joi from "joi";

export const validateImages = Joi.object({
    images: Joi.array().items(Joi.string()).min(1).required().messages({
        'any.required': 'At least one image is required',
        'array.min': 'At least one image is required'
    })
})