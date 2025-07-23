import { Request, Response, NextFunction } from 'express';
import { verify, signAccessToken } from '@/auth/token';
import ms, { StringValue } from 'ms';

const REFRESH_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME! as StringValue;
const GOOGLE_FRONTEND_CALLBACK_URL = process.env.GOOGLE_FRONTEND_CALLBACK_URL! as string;

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {

    const { refreshToken } = req.user as { accessToken: string, refreshToken: string };

    const maxAge = ms(REFRESH_TOKEN_EXPIRE_TIME);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge,
        path: '/',
    });

    res.redirect(GOOGLE_FRONTEND_CALLBACK_URL);
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