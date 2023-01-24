import { Router } from 'express';
import { UserMiddleware, TokenMiddleware } from '../middlewares';
import { UserController } from '../controllers';
import { UserService } from '../services';

const router = Router();

const service = new UserService();
const controller = new UserController(service);

router.post('/', UserMiddleware.validateFields, controller.login);
router.get('/validate', TokenMiddleware.validate, controller.validate);

export default router;
