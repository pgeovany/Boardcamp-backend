import { Router } from 'express';
import {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
} from '../controllers/customersController.js';
import addCustomerValidationMiddleware from '../middlewares/addCustomerValidationMiddleware.js';

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerById);
customersRouter.post(
  '/customers',
  addCustomerValidationMiddleware,
  addCustomer
);
customersRouter.put(
  '/customers/:id',
  addCustomerValidationMiddleware,
  updateCustomer
);

export default customersRouter;
