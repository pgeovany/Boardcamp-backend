import STATUS from '../utils/statusCodes.js';

async function getCategories(req, res) {
  res.sendStatus(STATUS.OK);
}

async function addCategory(req, res) {
  res.sendStatus(STATUS.OK);
}

export { getCategories, addCategory };
