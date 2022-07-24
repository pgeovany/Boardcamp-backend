import JoiImport from 'joi';
import DateExtension from '@joi/date';
/* eslint no-magic-numbers: off */

const joi = JoiImport.extend(DateExtension);

const addCategorySchema = joi.object({
  name: joi.string().required(),
});

const addGameSchema = joi.object({
  name: joi.string().required(),
  image: joi
    .string()
    .pattern(/(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i)
    .required(),
  categoryId: joi.number().required(),
  stockTotal: joi.number().greater(0).required(),
  pricePerDay: joi.number().greater(0).required(),
});

const addCustomerSchema = joi.object({
  name: joi.string().required(),
  phone: joi
    .string()
    .pattern(/^[0-9]{10,11}$/)
    .required(),
  cpf: joi
    .string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  birthday: joi
    .date()
    .format('YYYY-MM-DD')
    .less('2015-01-01')
    .greater('1923-01-01')
    .required(),
});

const addRentalSchema = joi.object({
  customerId: joi.number().required(),
  gameId: joi.number().required(),
  daysRented: joi.number().greater(0).required(),
});

export { addCategorySchema, addGameSchema, addCustomerSchema, addRentalSchema };
