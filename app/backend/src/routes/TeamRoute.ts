import { Router } from 'express';
import { TeamController } from '../controllers';
import { TeamService } from '../services';

const router = Router();

const service = new TeamService();
const controller = new TeamController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

export default router;
