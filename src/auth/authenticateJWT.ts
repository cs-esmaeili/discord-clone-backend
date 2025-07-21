import { Request, Response, NextFunction } from 'express';
import { verify } from '@/auth/token';

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const payload = await verify(token);

    if (!payload) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = payload;
    next();
};



// import passport from "passport";
// import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
// import fs from "fs";
// import path from "path";

// const publicKey = fs.readFileSync(path.join(process.cwd(), "dist", "keys", "public.key"), 'utf-8');

// const options: StrategyOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: publicKey,
//   algorithms: ["RS256"], 
// };

// passport.use(
//   new JwtStrategy(options, async (jwtPayload, done) => {
//     try {
//       // مثلا اگر userId داخل jwtPayload هست:
//       // const user = await User.findById(jwtPayload.sub);
//       // return done(null, user);
//       return done(null, jwtPayload); // در حالت ساده
//     } catch (err) {
//       return done(err, false);
//     }
//   })
// );

// // تابع برای استفاده در میدل‌ویر
// export const authenticateJWT = passport.authenticate("jwt", { session: false });
