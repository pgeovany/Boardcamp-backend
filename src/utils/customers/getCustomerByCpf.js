import connection from '../../databases/postgresql.js';

async function getCustomerByCpf(cpf) {
  const { rows } = await connection.query(
    `
      SELECT * FROM customers WHERE cpf = $1
    `,
    [cpf]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

export default getCustomerByCpf;
