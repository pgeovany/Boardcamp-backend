import { Router } from 'express';
import { getGames, addGame } from '../controllers/gamesController.js';
import addGameValidationMiddleware from '../middlewares/addGameValidationMiddleware.js';

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', addGameValidationMiddleware, addGame);

export default gamesRouter;
