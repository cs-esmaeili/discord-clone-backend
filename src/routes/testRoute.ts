import { Router } from 'express';
import { test } from '@/controllers/test';

const router = Router();

router.post("/route1", test);

export default router; 