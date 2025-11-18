import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMyTasks, markTaskFiled, getRiskForCompany } from '../controllers/taskController.js';

const router = express.Router();

router.use(protect);

router.get('/', getMyTasks);
router.patch('/:id/mark-filed', markTaskFiled);
router.get('/risk/summary', getRiskForCompany);

export default router;
