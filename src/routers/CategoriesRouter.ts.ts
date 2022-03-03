import 'express-async-errors';
import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController.ts';

const router = Router();

router.post('/', CategoriesController.create);
router.get('/', CategoriesController.getAll);

export default router;