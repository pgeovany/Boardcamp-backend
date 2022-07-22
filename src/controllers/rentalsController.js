import STATUS from '../utils/statusCodes.js';

async function getRentals(req, res) {
  res.sendStatus(STATUS.OK);
}

async function addRental(req, res) {
  res.sendStatus(STATUS.OK);
}

async function endRental(req, res) {
  res.sendStatus(STATUS.OK);
}

async function removeRental(req, res) {
  res.sendStatus(STATUS.OK);
}

export { getRentals, addRental, endRental, removeRental };
