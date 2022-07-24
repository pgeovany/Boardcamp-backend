import STATUS from '../utils/statusCodes.js';
import getCategoriesList from '../utils/categories/getCategoriesList.js';
import insertCategory from '../utils/categories/insertCategory.js';

async function getCategories(req, res) {
  try {
    const categories = await getCategoriesList();
    res.send(categories);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function addCategory(req, res) {
  const { name } = req.locals;

  try {
    await insertCategory(name);
    res.sendStatus(STATUS.CREATED);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export { getCategories, addCategory };
