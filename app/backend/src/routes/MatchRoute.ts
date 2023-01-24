import { Router } from 'express';
import { MatchController } from '../controllers';
import { MatchService } from '../services';

const router = Router();

const service = new MatchService();
const controller = new MatchController(service);

router.get('/', controller.getAll);
router.post('/', controller.create);

export default router;
