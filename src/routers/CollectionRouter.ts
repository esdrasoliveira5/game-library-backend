import 'express-async-errors';
import { Router } from 'express';

import CollectionController from '../controllers/CollectionController';

const router = Router();

router.post('/', CollectionController.create);
router.get('/:id', CollectionController.find);

export default router;