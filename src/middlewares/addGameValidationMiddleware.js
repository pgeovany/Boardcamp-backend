import STATUS from '../utils/statusCodes.js';
import { addGameSchema } from '../utils/schemas.js';
import getCategoryById from '../utils/categories/getCategoryById.js';
import getGameByName from '../utils/games/getGameByName.js';

async function addGameValidationMiddleware(req, res, next) {
  const game = req.body;

  try {
    await addGameSchema.validateAsync(game);
  } catch (error) {
    res.sendStatus(STATUS.BAD_REQUEST);
    return;
  }

  try {
    const categoryExists = await getCategoryById(game.categoryId);

    if (!categoryExists) {
      res.sendStatus(STATUS.BAD_REQUEST);
      return;
    }

    const gameExists = await getGameByName(game.name);

    if (gameExists) {
      res.sendStatus(STATUS.CONFLICT);
      return;
    }

    req.locals = {
      name: game.name,
      image: game.image,
      stockTotal: game.stockTotal,
      categoryId: game.categoryId,
      pricePerDay: game.pricePerDay,
    };

    next();
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export default addGameValidationMiddleware;
