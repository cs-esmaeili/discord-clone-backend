import { Request, Response, NextFunction } from 'express';
import { verify, signAccessToken } from '@/auth/token';

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {

    const { accessToken, refreshToken } = req.user as { accessToken: string, refreshToken: string };

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
    });

    res.redirect(`http://localhost:3001/home`);
};
export const refreshtoken = async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    

    if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

    try {
        const payloadRefreshToken = await verify(refreshToken);

        if (payloadRefreshToken == null) {
            throw new Error('Invalid token Refresh Token');
        }

        const newAccessToken = await signAccessToken(payloadRefreshToken);
        console.log(newAccessToken);
        
        res.json({ accessToken: newAccessToken });

    } catch (err) {
        return res.status(403).json({ error: 'Invalid refresh token' });
    }

}