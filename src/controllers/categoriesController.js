import connection from '../databases/postgresql.js';
import STATUS from '../utils/statusCodes.js';

async function getCategories(req, res) {
  try {
    const { rows: categories } = await connection.query(`
      SELECT * FROM categories
    `);

    res.send(categories);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function addCategory(req, res) {
  res.sendStatus(STATUS.OK);
}

export { getCategories, addCategory };
