import connection from '../../databases/postgresql.js';

async function listCustomers(cpf) {
  let query = `SELECT * FROM customers`;

  if (cpf) {
    query += ` WHERE cpf ILIKE '${cpf}%'`;
  }

  const { rows } = await connection.query(query);

  return rows;
}

export default listCustomers;
