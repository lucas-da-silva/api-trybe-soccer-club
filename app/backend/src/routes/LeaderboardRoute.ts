import { Router } from 'express';
import { LeaderboardController } from '../controllers';
import { LeaderboardService } from '../services';

const router = Router();

const service = new LeaderboardService();
const controller = new LeaderboardController(service);

router.get('/', controller.getLeaderboard);
router.get('/home', controller.getLeaderboardHome);
router.get('/away', controller.getLeaderboardAway);

export default router;
