import STATUS from '../utils/statusCodes.js';
import { addGameSchema } from '../utils/schemas.js';
import connection from '../databases/postgresql.js';

async function addGameValidationMiddleware(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await addGameSchema.validateAsync({ name, stockTotal, pricePerDay });
  } catch (error) {
    res.sendStatus(STATUS.BAD_REQUEST);
    return;
  }

  try {
    const { rows: categoryExists } = await connection.query(
      `
        SELECT * FROM categories WHERE id = $1
      `,
      [categoryId]
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
      [name]
    );

    if (gameExists.length) {
      res.sendStatus(STATUS.CONFLICT);
      return;
    }

    req.locals = {
      name,
      image,
      stockTotal,
      categoryId,
      pricePerDay,
    };

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export default addGameValidationMiddleware;
