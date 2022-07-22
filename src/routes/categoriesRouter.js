import { Router } from 'express';
import {
  getCategories,
  addCategory,
} from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', addCategory);

export default categoriesRouter;
