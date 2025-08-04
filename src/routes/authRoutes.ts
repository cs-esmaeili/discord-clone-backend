import { Router } from 'express';
import { googleCallback, refreshtoken } from '@/controllers/auth';
import passport from "passport";
const router = Router();

const GOOGLE_FRONTEND_CALLBACK_FAIL_URL = process.env.GOOGLE_FRONTEND_CALLBACK_FAIL_URL!;


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: GOOGLE_FRONTEND_CALLBACK_FAIL_URL, session: false }), googleCallback);


router.post("/refreshtoken", refreshtoken);

export default router; 