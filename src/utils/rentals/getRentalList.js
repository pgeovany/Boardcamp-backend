import connection from '../../databases/postgresql.js';
import formatRentalList from './formatRentalList.js';

async function getRentalList(customerId, gameId) {
  let query = `
    SELECT rentals.*, customers.name AS "customerName",
    games.name AS "gameName",
    games."categoryId",
    categories.name AS "categoryName" FROM rentals
    JOIN customers
    ON customers.id = rentals."customerId"
    JOIN games
    ON games.id = rentals."gameId"
    JOIN categories
    ON games."categoryId" = categories.id
  `;

  if (customerId && gameId) {
    query += ` WHERE rentals."customerId" = ${customerId} AND rentals."gameId" = ${gameId}`;
  } else if (customerId) {
    query += ` WHERE rentals."customerId" = ${customerId}`;
  } else if (gameId) {
    query += ` WHERE rentals."gameId" = ${gameId}`;
  }

  const { rows: rentals } = await connection.query(query);

  return formatRentalList(rentals);
}

export default getRentalList;
