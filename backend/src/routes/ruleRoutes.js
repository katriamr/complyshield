import express from 'express';
import { seedDefaultRules, getRules } from '../controllers/ruleController.js';

const router = express.Router();

router.post('/seed', seedDefaultRules);
router.get('/', getRules);

export default router;
