import connection from '../../databases/postgresql.js';

async function updateGameStock(id) {
  await connection.query(
    `
      UPDATE games SET "stockTotal" = "stockTotal"-1 WHERE id = $1
    `,
    [id]
  );
}

export default updateGameStock;
