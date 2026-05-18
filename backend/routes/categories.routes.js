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
import { validateAccessMiddleware } from '../middlewares/guard.middleware.js';
import { PERMISSIONS_LIST } from '../constants/permissions.js';

const router = Router();

router.get('/', authMiddleware, getCategoriesCtrl);
router.get('/:id', authMiddleware, getCategoryCtrl);
router.post(
  '/',
  authMiddleware,
  createCategoryDTO,
  createCategoryCtrl,
);
router.patch(
  '/:id',
  authMiddleware,
  updateCategoryDTO,
  updateCategoryCtrl,
);
router.delete(
  '/:id',
  authMiddleware,
  validateAccessMiddleware([PERMISSIONS_LIST.CATEGORY.DELETE]),
  deleteCategoryCtrl,
);

export default router;
