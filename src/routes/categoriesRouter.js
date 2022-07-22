import { Router } from 'express';
import {
  getCategories,
  addCategory,
} from '../controllers/categoriesController.js';
import addCategoryValidationMiddleware from '../middlewares/addCategoryValidationMiddleware.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post(
  '/categories',
  addCategoryValidationMiddleware,
  addCategory
);

export default categoriesRouter;
