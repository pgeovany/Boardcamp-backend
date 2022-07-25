import STATUS from '../utils/statusCodes.js';
import connection from '../databases/postgresql.js';

async function returnRentalValidationMiddleware(req, res, next) {
  const { id } = req.params;

  try {
    const { rows: rental } = await connection.query(
      `
        SELECT * FROM rentals WHERE id = $1
      `,
      [id]
    );

    if (rental.length === 0) {
      res.sendStatus(STATUS.NOT_FOUND);
      return;
    }

    // verifies whether the game has already been returned by checking if the returnDate property
    // is not null
    if (rental[0].returnDate) {
      res.sendStatus(STATUS.BAD_REQUEST);
      return;
    }

    req.locals = {
      id,
    };

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export default returnRentalValidationMiddleware;
