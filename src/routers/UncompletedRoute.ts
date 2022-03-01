import 'express-async-errors';
import { Router } from 'express';

import UncompletedController from '../controllers/UncompletedController';

const router = Router();

router.post('/', UncompletedController.create);
router.get('/:id', UncompletedController.getOne);

export default router;