import connection from '../../databases/postgresql.js';

async function getCategoriesList() {
  const { rows } = await connection.query(`
  SELECT * FROM categories
`);

  return rows;
}

export default getCategoriesList;
