import connection from '../../databases/postgresql.js';

async function getRentalList(customerId, gameId) {
  let query = `
    SELECT rentals.*,
      json_build_object('id', customers.id, 'name', customers.name) AS customer,

      json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId",
      'categoryName', categories.name) AS game

    FROM rentals
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

  return rentals;
}

export default getRentalList;
