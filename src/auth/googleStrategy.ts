import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { signRefreshToken } from "@/auth/token";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL!;



passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
  },
  async (accessTokenFromGoogle, refreshTokenFromGoogle, profile, done) => {
    const userPayload = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0].value,
      picture: profile.photos?.[0].value,
    };

    const refreshToken = await signRefreshToken(userPayload);

    done(null, { refreshToken });
  }
));
