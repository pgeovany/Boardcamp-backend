import STATUS from '../utils/statusCodes.js';
import insertRental from '../utils/rentals/insertRental.js';
import getRentalsList from '../utils/rentals/getRentalsList.js';
import returnRental from '../utils/rentals/returnRental.js';
import getRentalById from '../utils/rentals/getRentalById.js';
import deleteRental from '../utils/rentals/deleteRental.js';

async function getRentals(req, res) {
  const { customerId, gameId } = req.query;

  try {
    const rentals = await getRentalsList(customerId, gameId);
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
  const { id } = req.locals;

  try {
    await deleteRental(id);
    res.sendStatus(STATUS.OK);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export { getRentals, addRental, endRental, removeRental };
