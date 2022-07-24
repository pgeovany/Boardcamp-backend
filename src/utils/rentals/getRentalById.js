import connection from '../../databases/postgresql.js';

async function getRentalById(id) {
  const { rows } = await connection.query(
    `
      SELECT * FROM rentals WHERE id = $1
    `,
    [id]
  );

  return rows[0];
}

export default getRentalById;
