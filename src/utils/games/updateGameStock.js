import connection from '../../databases/postgresql.js';

async function updateGameStock(id, rental) {
  // if the user is renting a game, the stock is reduced by one,
  // if they are returning a game, the stock is increased by one
  const updateBy = rental ? -1 : 1;
  await connection.query(
    `
      UPDATE games SET "stockTotal" = "stockTotal" + ${updateBy} WHERE id = $1
    `,
    [id]
  );
}

export default updateGameStock;
