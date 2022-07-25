import { Router } from 'express';
import {
  getRentals,
  addRental,
  endRental,
  removeRental,
} from '../controllers/rentalsController.js';
import addRentalValidationMiddleware from '../middlewares/addRentalValidationMiddleware.js';
import deleteRentalValidationMiddleware from '../middlewares/deleteRentalValidationMiddleware.js';
import returnRentalValidationMiddleware from '../middlewares/returnRentalValidationMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', addRentalValidationMiddleware, addRental);

rentalsRouter.post(
  '/rentals/:id/return',
  returnRentalValidationMiddleware,
  endRental
);

rentalsRouter.delete(
  '/rentals/:id',
  deleteRentalValidationMiddleware,
  removeRental
);

export default rentalsRouter;
