import connection from '../../databases/postgresql.js';

async function getCustomerInfo(id) {
  const { rows } = await connection.query(
    `SELECT * FROM customers WHERE id = $1`,
    [id]
  );

  // eslint-disable-next-line
  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

export default getCustomerInfo;
