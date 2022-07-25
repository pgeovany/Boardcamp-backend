import connection from '../../databases/postgresql.js';

async function getCategoryByName(name) {
  const { rows } = await connection.query(
    `
      SELECT * FROM categories where name = $1
    `,
    [name]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

export default getCategoryByName;
