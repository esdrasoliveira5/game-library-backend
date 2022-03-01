import 'express-async-errors';
import { Router } from 'express';

import CompletedControllers from '../controllers/CompletedControllers';

const router = Router();

router.post('/', CompletedControllers.create);
router.get('/:id', CompletedControllers.getOne);

export default router;