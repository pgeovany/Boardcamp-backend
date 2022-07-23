import STATUS from '../utils/statusCodes.js';
import connection from '../databases/postgresql.js';
import { addGameSchema } from '../utils/schemas.js';

async function addGameValidationMiddleware(req, res, next) {
  const game = req.body;

  try {
    await addGameSchema.validateAsync(game);
  } catch (error) {
    res.sendStatus(STATUS.BAD_REQUEST);
    return;
  }

  try {
    const { rows: categoryExists } = await connection.query(
      `
        SELECT * FROM categories WHERE id = $1
      `,
      [game.categoryId]
    );

    // eslint-disable-next-line
    if (categoryExists.length === 0) {
      res.sendStatus(STATUS.BAD_REQUEST);
      return;
    }

    const { rows: gameExists } = await connection.query(
      `
        SELECT * FROM games WHERE name = $1
      `,
      [game.name]
    );

    // eslint-disable-next-line
    if (gameExists.length > 0) {
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
