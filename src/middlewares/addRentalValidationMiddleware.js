import STATUS from '../utils/statusCodes.js';
import { addRentalSchema } from '../utils/schemas.js';
import getCustomerInfo from '../utils/customers/getCustomerInfo.js';
import getGameById from '../utils/games/getGameById.js';

async function addRentalValidationMiddleware(req, res, next) {
  const rental = req.body;

  try {
    await addRentalSchema.validateAsync(rental);

    const customerExists = await getCustomerInfo(rental.customerId);

    if (!customerExists) {
      throw new Error('Esse cliente não está cadastrado!');
    }

    const gameExists = await getGameById(rental.gameId);

    if (!gameExists) {
      throw new Error('Esse jogo não está cadastrado!');
    }

    if (gameExists.stockTotal === 0) {
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
