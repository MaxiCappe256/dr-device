import { Router } from 'express';
import {
  createCategoryCtrl,
  deleteCategoryCtrl,
  getCategoriesCtrl,
  getCategoryCtrl,
  updateCategoryCtrl,
} from '../controllers/categories.controller.js';
import {
  createCategoryDTO,
  updateCategoryDTO,
} from '../dtos/category.dtos.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateAccessMiddleware } from "../middlewares/guard.middleware.js";
import { PERMISSIONS_LIST } from "../constants/permissions.js";

const { CATEGORY } = PERMISSIONS_LIST;

const router = Router();

router.get('/', authMiddleware, validateAccessMiddleware([CATEGORY.LIST_READ]), getCategoriesCtrl);
router.get('/:id', authMiddleware, validateAccessMiddleware([CATEGORY.READ]), getCategoryCtrl);
router.post(
  '/',
  authMiddleware,
  validateAccessMiddleware([CATEGORY.CREATE]),
  createCategoryDTO,
  createCategoryCtrl,
);
router.patch(
  '/:id',
  authMiddleware,
  validateAccessMiddleware([CATEGORY.UPDATE]),
  updateCategoryDTO,
  updateCategoryCtrl,
);
router.delete(
  '/:id',
  authMiddleware,
  validateAccessMiddleware([CATEGORY.DELETE]),
  deleteCategoryCtrl,
);

export default router;
