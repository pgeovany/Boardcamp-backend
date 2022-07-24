import STATUS from '../utils/statusCodes.js';
import { addRentalSchema } from '../utils/schemas.js';
import connection from '../databases/postgresql.js';

/* eslint no-magic-numbers: off */
async function addRentalValidationMiddleware(req, res, next) {
  const rental = req.body;

  try {
    await addRentalSchema.validateAsync(rental);

    const { rows: customerExists } = await connection.query(
      `
        SELECT * FROM customers where id = $1
      `,
      [rental.customerId]
    );

    if (customerExists.length === 0) {
      throw new Error('Esse cliente não está cadastrado!');
    }

    const { rows: gameExists } = await connection.query(
      `
        SELECT * FROM games where id = $1
      `,
      [rental.gameId]
    );

    if (gameExists.length === 0) {
      throw new Error('Esse jogo não está cadastrado!');
    }

    if (gameExists[0].stockTotal === 0) {
      throw new Error('Esse jogo não está disponível para aluguel!');
    }

    req.locals = {
      customerId: rental.customerId,
      gameId: rental.gameId,
      daysRented: rental.daysRented,
    };

    next();
  } catch (error) {
    res.sendStatus(STATUS.BAD_REQUEST);
  }
}

export default addRentalValidationMiddleware;
