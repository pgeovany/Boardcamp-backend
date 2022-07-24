import connection from '../../databases/postgresql.js';

async function insertGame(name, image, stockTotal, categoryId, pricePerDay) {
  await connection.query(
    `
    INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
    VALUES ($1, $2, $3, $4, $5)
    `,
    [name, image, stockTotal, categoryId, pricePerDay]
  );
}

export default insertGame;
