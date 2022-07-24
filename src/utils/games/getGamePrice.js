import connection from '../../databases/postgresql.js';

async function getGamePrice(id) {
  const { rows } = await connection.query(
    `
      SELECT games."pricePerDay" FROM games WHERE games.id = $1
    `,
    [id]
  );
  return rows[0].pricePerDay;
}

export default getGamePrice;
