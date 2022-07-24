import connection from '../../databases/postgresql.js';

async function getGamesList(name) {
  let query = `
    SELECT games.*, categories.name as "categoryName" FROM games
    JOIN categories
    ON games."categoryId" = categories.id
  `;

  if (name) {
    query += ` WHERE games.name ILIKE '${name}%'`;
  }

  const { rows } = await connection.query(query);

  return rows;
}

export default getGamesList;
