import STATUS from '../utils/statusCodes.js';
import connection from '../databases/postgresql.js';

async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    let query = `SELECT * FROM customers`;

    if (cpf) {
      query += ` WHERE cpf ILIKE '${cpf}%'`;
    }

    const { rows: customers } = await connection.query(query);

    res.send(customers);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function getCustomerById(req, res) {
  const { id } = req.params;

  try {
    const { rows: customer } = await connection.query(
      `SELECT * FROM customers WHERE id = $1`,
      [id]
    );

    // eslint-disable-next-line
    if (customer.length === 0) {
      res.sendStatus(STATUS.NOT_FOUND);
      return;
    }

    res.send(customer);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function addCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.locals;

  try {
    await connection.query(
      `
        INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4)
      `,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(STATUS.CREATED);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function updateCustomer(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.locals;

  try {
    await connection.query(
      `
        UPDATE customers SET (name, phone, cpf, birthday) = ($1, $2, $3, $4)
        WHERE id = $5
      `,
      [name, phone, cpf, birthday, id]
    );

    res.sendStatus(STATUS.OK);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export { getCustomers, getCustomerById, addCustomer, updateCustomer };
