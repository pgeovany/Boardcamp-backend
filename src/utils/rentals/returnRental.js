import dayjs from 'dayjs';
import connection from '../../databases/postgresql.js';
import updateGameStock from '../games/updateGameStock.js';
import calculateDelayFee from './calculateDelayFee.js';

async function returnRental(rental) {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const delayFee = await calculateDelayFee(rental);

  await connection.query(
    `
      UPDATE rentals SET ("returnDate", "delayFee") = ($1, $2)
      WHERE id = $3
    `,
    [currentDate, delayFee, rental.id]
  );

  await updateGameStock(rental.gameId, false);
}

export default returnRental;
