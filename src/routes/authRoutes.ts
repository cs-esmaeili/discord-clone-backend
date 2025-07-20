import { Router } from 'express';
import { googleCallback } from '@/controllers/auth';
import passport from "passport";

const router = Router();

// مرحله 1: رفتن به گوگل
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// مرحله 2: دریافت از گوگل
router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);

export default router; 