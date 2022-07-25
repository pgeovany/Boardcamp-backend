import connection from '../../databases/postgresql.js';

async function getCategoryById(id) {
  const { rows } = await connection.query(
    `
      SELECT * FROM categories WHERE id = $1
    `,
    [id]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

export default getCategoryById;
