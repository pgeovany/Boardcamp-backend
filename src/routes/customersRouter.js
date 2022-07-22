import { Router } from 'express';
import {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
} from '../controllers/customersController.js';

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerById);
customersRouter.post('/customers', addCustomer);
customersRouter.put('/customers/:id', updateCustomer);

export default customersRouter;
