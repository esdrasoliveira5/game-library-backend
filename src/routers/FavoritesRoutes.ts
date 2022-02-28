import 'express-async-errors';
import { Router } from 'express';

import FavoritesController from '../controllers/FavoritesController';

const router = Router();

router.post('/', FavoritesController.create);

export default router;