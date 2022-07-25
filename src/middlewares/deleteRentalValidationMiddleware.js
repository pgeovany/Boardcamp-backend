import STATUS from '../utils/statusCodes.js';
import getRentalById from '../utils/rentals/getRentalById.js';

async function deleteRentalValidationMiddleware(req, res, next) {
  const { id } = req.params;

  try {
    const rental = await getRentalById(id);

    if (!rental) {
      res.sendStatus(STATUS.NOT_FOUND);
      return;
    }

    // verifies if the game has been returned by checking if the returnDate property
    // has a value
    if (!rental.returnDate) {
      res.sendStatus(STATUS.BAD_REQUEST);
      return;
    }

    req.locals = {
      id,
    };

    next();
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export default deleteRentalValidationMiddleware;
