import { Router } from 'express';
import UserController from '../controllers';
import UserService from '../services';

const router = Router();

const service = new UserService();
const controller = new UserController(service);

router.post('/', controller.login);

export default router;
