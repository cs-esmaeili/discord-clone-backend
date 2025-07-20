import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { sign } from "@/auth/token";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL!;

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    // 👇 اطلاعات کاربر را اینجا می‌گیریم و JWT می‌سازیم
    const userPayload = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0].value,
      picture: profile.photos?.[0].value,
    };

    const token = await sign(userPayload);
    done(null, token); // توکن را پاس می‌دهیم
  }
));
