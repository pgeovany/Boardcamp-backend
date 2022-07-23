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
  res.sendStatus(STATUS.OK);
}

async function updateCustomer(req, res) {
  res.sendStatus(STATUS.OK);
}

export { getCustomers, getCustomerById, addCustomer, updateCustomer };
