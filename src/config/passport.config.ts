/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import envConfig from "./env.config";
import { User } from "@modules/user/user.model";
import { UserRoles } from "@modules/user/user.interface";

passport.use(
  new GoogleStrategy(
    {
      clientID: envConfig.google_client_id,
      clientSecret: envConfig.google_client_secret,
      callbackURL: envConfig.google_callback_url,
    },
    async (
      accessToken,
      refreshToken,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(new Error("No email found in Google profile"));
        }

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            email,
            name: profile.displayName,
            role: UserRoles.USER,
            profile_photo: profile.photos?.[0].value || "",
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
          await user.save();
          return done(null, user);
        }
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  const user = await User.findById(id);
  done(null, user);
});
