import { Router } from 'express';
import { googleCallback, refreshtoken } from '@/controllers/auth';
import passport from "passport";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);

router.get("/refreshtoken", refreshtoken);

export default router; 