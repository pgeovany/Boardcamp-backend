import connection from '../../databases/postgresql.js';

async function getGameByName(name) {
  const { rows } = await connection.query(
    `
      SELECT * FROM games WHERE name = $1
    `,
    [name]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

export default getGameByName;
