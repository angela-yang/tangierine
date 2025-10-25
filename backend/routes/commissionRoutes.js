import express from 'express';
import { getCommissions, addCommission } from '../controllers/commissionController.js';
const router = express.Router();

router.get('/', getCommissions);
router.post('/', addCommission);

export default router;
