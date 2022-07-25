import connection from '../../databases/postgresql.js';

async function deleteRental(id) {
  await connection.query(
    `
      DELETE FROM rentals 
      WHERE id = $1
    `,
    [id]
  );
}

export default deleteRental;
