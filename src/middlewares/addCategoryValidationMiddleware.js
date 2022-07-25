import STATUS from '../utils/statusCodes.js';
import { addCategorySchema } from '../utils/schemas.js';
import getCategoryByName from '../utils/categories/getCategoryByName.js';

async function addCategoryValidationMiddleware(req, res, next) {
  const { name } = req.body;

  try {
    await addCategorySchema.validateAsync({ name });
  } catch (error) {
    res.sendStatus(STATUS.BAD_REQUEST);
    return;
  }

  try {
    const categoryExists = await getCategoryByName(name);

    if (categoryExists) {
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
