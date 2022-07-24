import STATUS from '../utils/statusCodes.js';
import listCustomers from '../utils/customers/listCustomers.js';
import getCustomerInfo from '../utils/customers/getCustomerInfo.js';
import insertCustomer from '../utils/customers/insertCustomer.js';
import updateCustomerInfo from '../utils/customers/updateCustomerInfo.js';

async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    const customers = await listCustomers(cpf);
    res.send(customers);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function getCustomerById(req, res) {
  const { id } = req.params;

  try {
    const customer = await getCustomerInfo(id);

    if (!customer) {
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
    await insertCustomer(name, phone, cpf, birthday);
    res.sendStatus(STATUS.CREATED);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function updateCustomer(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.locals;

  try {
    await updateCustomerInfo(id, name, phone, cpf, birthday);
    res.sendStatus(STATUS.OK);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export { getCustomers, getCustomerById, addCustomer, updateCustomer };
