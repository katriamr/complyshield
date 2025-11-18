import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  upsertCompany,
  getMyCompany,
  getApplicableRules,
  generateTasks
} from '../controllers/companyController.js';

const router = express.Router();

router.use(protect);

router.post('/', upsertCompany);
router.get('/me', getMyCompany);
router.get('/applicable-rules', getApplicableRules);
router.post('/generate-tasks', generateTasks);

export default router;
