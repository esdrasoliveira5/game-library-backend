import 'express-async-errors';
import { Router } from 'express';

import CollectionController from '../controllers/CollectionController';

const router = Router();

router.post('/', CollectionController.create);
router.put('/update', CollectionController.update);
router.delete('/delete', CollectionController.deleteC);
router.get('/:id', CollectionController.find);

export default router;