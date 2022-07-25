import dayjs from 'dayjs';
import connection from '../../databases/postgresql.js';
import getGamePrice from '../games/getGamePrice.js';
import updateGameStock from '../games/updateGameStock.js';

async function insertRental(customerId, gameId, daysRented) {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const gamePrice = await getGamePrice(gameId);
  const originalPrice = gamePrice * daysRented;

  await connection.query(
    `
      INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
      VALUES ($1, $2, $3, $4, NULL, $5, NULL)
    `,
    [customerId, gameId, currentDate, daysRented, originalPrice]
  );

  await updateGameStock(gameId, true);
}

export default insertRental;
