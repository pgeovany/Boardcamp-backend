import STATUS from '../utils/statusCodes.js';

async function getGames(req, res) {
  res.sendStatus(STATUS.OK);
}

async function addGame(req, res) {
  res.sendStatus(STATUS.OK);
}

export { getGames, addGame };
