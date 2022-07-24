import connection from '../../databases/postgresql.js';

async function updateCustomerInfo(id, name, phone, cpf, birthday) {
  await connection.query(
    `
    UPDATE customers SET (name, phone, cpf, birthday) = ($1, $2, $3, $4)
    WHERE id = $5
  `,
    [name, phone, cpf, birthday, id]
  );
}

export default updateCustomerInfo;
