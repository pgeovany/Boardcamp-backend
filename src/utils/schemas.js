import joi from 'joi';

const addCategorySchema = joi.object({
  name: joi.string().required(),
});

export default addCategorySchema;
