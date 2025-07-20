import { Request, Response, NextFunction } from 'express';

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {
    // JWT را از done می‌گیریم
    const token = req.user as string;

    console.log("log is done token is = " + token);

    // اینجا می‌تونی به فرانت ریدایرکت کنی و توکن رو بهش بدی
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
};