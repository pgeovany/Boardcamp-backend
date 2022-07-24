import STATUS from '../utils/statusCodes.js';
import insertRental from '../utils/rentals/insertRental.js';

async function getRentals(req, res) {
  res.sendStatus(STATUS.OK);
}

async function addRental(req, res) {
  const { customerId, gameId, daysRented } = req.locals;

  try {
    await insertRental(customerId, gameId, daysRented);
    res.sendStatus(STATUS.CREATED);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function endRental(req, res) {
  res.sendStatus(STATUS.OK);
}

async function removeRental(req, res) {
  res.sendStatus(STATUS.OK);
}

export { getRentals, addRental, endRental, removeRental };
