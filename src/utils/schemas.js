import joi from 'joi';

const addCategorySchema = joi.object({
  name: joi.string().required(),
});

/* eslint no-magic-numbers: off */
const addGameSchema = joi.object({
  name: joi.string().required(),
  stockTotal: joi.number().greater(0).required(),
  pricePerDay: joi.number().greater(0).required(),
});

export { addCategorySchema, addGameSchema };
