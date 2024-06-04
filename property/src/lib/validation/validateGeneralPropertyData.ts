import Joi from 'joi';

const titleSchema = Joi.string().required().messages({
  'any.required': 'Title is required',
});

const descriptionSchema = Joi.string().required().messages({
  'any.required': 'Description is required',
});

const bathroomSchema = Joi.number().required().integer().positive().messages({
  'any.required': 'Number of bathrooms is required',
  'number.base': 'Number of bathrooms must be a number',
  'number.integer': 'Number of bathrooms must be an integer',
  'number.positive': 'Number of bathrooms must be a positive number',
});

const bedroomSchema = Joi.number().required().integer().positive().messages({
  'any.required': 'Number of bedrooms is required',
  'number.base': 'Number of bedrooms must be a number',
  'number.integer': 'Number of bedrooms must be an integer',
  'number.positive': 'Number of bedrooms must be a positive number',
});

const schema = Joi.object().pattern(/.+/, Joi.alternatives().try(
  titleSchema,
  descriptionSchema,
  bathroomSchema,
  bedroomSchema,
  // Add more field schemas here
));

export const validateUpdatePropertyData = (data: any) => {
  const { error } = schema.validate(data);
  if (error) {
    throw new Error(error.message);
  }
};