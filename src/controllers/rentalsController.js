import STATUS from '../utils/statusCodes.js';
import insertRental from '../utils/rentals/insertRental.js';
import getRentalList from '../utils/rentals/getRentalList.js';
import returnRental from '../utils/rentals/returnRental.js';
import getRentalById from '../utils/rentals/getRentalById.js';

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
  const { id } = req.locals;

  try {
    const rental = await getRentalById(id);
    await returnRental(rental);

    res.sendStatus(STATUS.OK);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function removeRental(req, res) {
  res.sendStatus(STATUS.OK);
}

export { getRentals, addRental, endRental, removeRental };
