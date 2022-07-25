import connection from '../../databases/postgresql.js';

async function getGameById(id) {
  const { rows } = await connection.query(
    `
      SELECT * FROM games WHERE id = $1
    `,
    [id]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

export default getGameById;
