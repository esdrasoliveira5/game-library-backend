import 'express-async-errors';
import { Router } from 'express';

import UserController from '../controllers/UserController';
import GamesController from '../controllers/GamesController';

const router = Router();

router.post('/', UserController.create);
router.post('/login', UserController.login);
router.get('/', UserController.getUser);
router.post('/games', GamesController.getUserGame);

export default router;