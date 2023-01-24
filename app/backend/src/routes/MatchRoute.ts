import { Router } from 'express';
import { TokenMiddleware } from '../middlewares';
import { MatchController } from '../controllers';
import { MatchService } from '../services';

const router = Router();

const service = new MatchService();
const controller = new MatchController(service);

router.get('/', controller.getAll);
router.post('/', TokenMiddleware.validate, controller.create);
router.patch('/:id/finish', controller.finish);

export default router;
