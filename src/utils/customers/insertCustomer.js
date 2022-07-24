import connection from '../../databases/postgresql.js';

async function insertCustomer(name, phone, cpf, birthday) {
  await connection.query(
    `
    INSERT INTO customers (name, phone, cpf, birthday) 
    VALUES ($1, $2, $3, $4)
  `,
    [name, phone, cpf, birthday]
  );
}

export default insertCustomer;
