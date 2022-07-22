import STATUS from '../utils/statusCodes.js';

async function getCustomers(req, res) {
  res.sendStatus(STATUS.OK);
}

async function getCustomerById(req, res) {
  res.sendStatus(STATUS.OK);
}

async function addCustomer(req, res) {
  res.sendStatus(STATUS.OK);
}

async function updateCustomer(req, res) {
  res.sendStatus(STATUS.OK);
}

export { getCustomers, getCustomerById, addCustomer, updateCustomer };
