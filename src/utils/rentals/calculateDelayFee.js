import dayjs from 'dayjs';
import getGamePrice from '../games/getGamePrice.js';

async function calculateDelayFee(rental) {
  const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
  const aux = dayjs().format('YYYY-MM-DD');

  const currentDate = dayjs(aux);
  const rentDate = dayjs(rental.rentDate);

  const delay = currentDate.diff(rentDate);

  if (delay > 0) {
    const gamePrice = await getGamePrice(rental.gameId);
    return (delay / ONE_DAY_IN_MILLISECONDS) * gamePrice;
  }

  return 0;
}

export default calculateDelayFee;
