import { Router } from 'express';
import { createBill } from '../controllers/billing-counter';

const router = Router();

router.post('/bills', createBill);

export const adminRoutes = router;
