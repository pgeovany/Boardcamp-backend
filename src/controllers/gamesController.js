import STATUS from '../utils/statusCodes.js';
import getGamesList from '../utils/games/getGamesList.js';
import insertGame from '../utils/games/insertGame.js';

async function getGames(req, res) {
  const { name } = req.query;

  try {
    const games = await getGamesList(name);
    res.send(games);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function addGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.locals;

  try {
    await insertGame(name, image, stockTotal, categoryId, pricePerDay);
    res.sendStatus(STATUS.CREATED);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export { getGames, addGame };
