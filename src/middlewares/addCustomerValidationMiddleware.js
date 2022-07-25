import STATUS from '../utils/statusCodes.js';
import { addCustomerSchema } from '../utils/schemas.js';
import getCustomerByCpf from '../utils/customers/getCustomerByCpf.js';

async function addCustomerValidationMiddleware(req, res, next) {
  const customer = req.body;

  try {
    await addCustomerSchema.validateAsync(customer);
  } catch (error) {
    res.sendStatus(STATUS.BAD_REQUEST);
    return;
  }

  try {
    const customerExists = await getCustomerByCpf(customer.cpf);

    if (customerExists) {
      res.sendStatus(STATUS.CONFLICT);
      return;
    }

    req.locals = {
      name: customer.name,
      phone: customer.phone,
      cpf: customer.cpf,
      birthday: customer.birthday,
    };

    next();
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export default addCustomerValidationMiddleware;
