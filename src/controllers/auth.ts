import { Request, Response, NextFunction } from 'express';
import { verify, signAccessToken } from '@/auth/token';
import { error } from 'console';

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {

    const { accessToken, refreshToken } = req.user as { accessToken: string, refreshToken: string };

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/auth/refreshtoken',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect(`http://localhost:3001`);
};

export const refreshtoken = async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

    try {
        const payloadRefreshToken = await verify(refreshToken);

        if (payloadRefreshToken == null) {
            throw new Error('Invalid token Refresh Token');
        }

        const newAccessToken = await signAccessToken(payloadRefreshToken);

        res.json({ accessToken: newAccessToken });

    } catch (err) {
        return res.status(403).json({ error: 'Invalid refresh token' });
    }

}