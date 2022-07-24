import { Router } from 'express';
import {
  getRentals,
  addRental,
  endRental,
  removeRental,
} from '../controllers/rentalsController.js';
import addRentalValidationMiddleware from '../middlewares/addRentalValidationMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', addRentalValidationMiddleware, addRental);
rentalsRouter.post('/rentals/:id/return', endRental);
rentalsRouter.delete('/rentals/:id', removeRental);

export default rentalsRouter;
