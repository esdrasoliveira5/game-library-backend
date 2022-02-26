import 'express-async-errors';
import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

router.post('/', UserController.create);
router.post('/login', UserController.login);
router.get('/', UserController.getUser);

export default router;