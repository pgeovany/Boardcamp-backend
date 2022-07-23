import STATUS from '../utils/statusCodes.js';
import connection from '../databases/postgresql.js';

async function getGames(req, res) {
  try {
    const { rows: games } = await connection.query(
      `
        SELECT games.*, categories.name as "categoryName" FROM games
        JOIN categories
        ON games."categoryId" = categories.id
      `
    );

    res.send(games);
  } catch (error) {
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

async function addGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.locals;

  try {
    await connection.query(
      `
      INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
      VALUES ($1, $2, $3, $4, $5)
      `,
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(STATUS.CREATED);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  }
}

export { getGames, addGame };
