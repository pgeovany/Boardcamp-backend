import STATUS from '../utils/statusCodes.js';
import connection from '../databases/postgresql.js';
import { addCustomerSchema } from '../utils/schemas.js';

async function addCustomerValidationMiddleware(req, res, next) {
  const customer = req.body;

  try {
    await addCustomerSchema.validateAsync(customer);
  } catch (error) {
    res.sendStatus(STATUS.BAD_REQUEST);
    return;
  }

  try {
    const { rows: cpfExists } = await connection.query(
      `
        SELECT * FROM customers WHERE cpf = $1
      `,
      [customer.cpf]
    );

    // eslint-disable-next-line
    if (cpfExists.length > 0) {
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
