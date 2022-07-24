import STATUS from '../utils/statusCodes.js';
import insertRental from '../utils/rentals/insertRental.js';
import getRentalList from '../utils/rentals/getRentalList.js';

async function getRentals(req, res) {
  const { customerId, gameId } = req.query;

  try {
    const rentals = await getRentalList(customerId, gameId);
    res.send(rentals);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function addRental(req, res) {
  const { customerId, gameId, daysRented } = req.locals;

  try {
    await insertRental(customerId, gameId, daysRented);
    res.sendStatus(STATUS.CREATED);
  } catch (error) {
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
