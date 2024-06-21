import Joi, { any } from "joi"

export const validatePropertyData = Joi.object({
    title: Joi.string().required().messages({
        'any.required': 'Title is required'
    }),
    hostId: Joi.string().required().messages({
        'any.required': 'HostId is required'
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description is required'
    }),
    category: Joi.string().required().messages({
        'any.required': 'category is required'
    }),
    location: Joi.string().required().messages({
        'any.required': 'location is required'
    }),
    address: Joi.string().required().messages({
        'any.required': 'Address is required'
    }),
    amenities: Joi.array().items(Joi.string()).min(1).required().messages({
        'any.required': 'At least one amenity is required',
        'array.min': 'At least one amenity is required'
    }),
    houseRules: Joi.string().required().messages({
        'any.required': 'House rule is required'
    }),
    price: Joi.number().required().positive().messages({
        'any.required': 'Price is required',
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number'
    }),
    bedrooms: Joi.number().required().integer().positive().messages({
        'any.required': 'Number of bedrooms is required',
        'number.base': 'Number of bedrooms must be a number',
        'number.integer': 'Number of bedrooms must be an integer',
        'number.positive': 'Number of bedrooms must be a positive number'
    }),
    bathrooms: Joi.number().required().integer().positive().messages({
        'any.required': 'Number of bathrooms is required',
        'number.base': 'Number of bathrooms must be a number',
        'number.integer': 'Number of bathrooms must be an integer',
        'number.positive': 'Number of bathrooms must be a positive number'
    }),
    checkIn: Joi.string().required().messages({
        'any.required': 'CheckIn time required'
    }),
    checkOut: Joi.string().required().messages({
        'any.required': 'CheckOut time required'
    }),
    maxGuests: Joi.number().required().integer().positive().messages({
        'any.required': 'Maximum number of guests is required',
        'number.base': 'Maximum number of guests must be a number',
        'number.integer': 'Maximum number of guests must be an integer',
        'number.positive': 'Maximum number of guests must be a positive number'
    }),
    images: Joi.array().items(Joi.string()).min(1).required().messages({
        'any.required': 'At least one image is required',
        'array.min': 'At least one image is required'
    })
})

