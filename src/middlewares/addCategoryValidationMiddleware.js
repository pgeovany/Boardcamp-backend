import STATUS from '../utils/statusCodes.js';
import connection from '../databases/postgresql.js';
import addCategorySchema from '../utils/schemas.js';

async function addCategoryValidationMiddleware(req, res, next) {
  const { name } = req.body;

  try {
    await addCategorySchema.validateAsync({ name });
  } catch (error) {
    res.sendStatus(STATUS.BAD_REQUEST);
    return;
  }

  try {
    const { rows: nameExists } = await connection.query(
      `
      SELECT * FROM categories where name = $1
    `,
      [name]
    );
    if (nameExists.length) {
      res.sendStatus(STATUS.CONFLICT);
      return;
    }

    req.locals = { name };
    next();
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export default addCategoryValidationMiddleware;
