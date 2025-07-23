import { Router } from 'express';
import { authenticateJWT } from "@/auth/authenticateJWT";

const router = Router();

router.post("/check", authenticateJWT, (req, res) => {
    res.json({ message: "Protected content", user: req.user });
});


export default router; 