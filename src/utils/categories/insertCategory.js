import connection from '../../databases/postgresql.js';

async function insertCategory(name) {
  await connection.query(
    `
    INSERT INTO categories (name) VALUES ($1)
  `,
    [name]
  );
}

export default insertCategory;
