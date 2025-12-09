/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRoles } from "@modules/user/user.interface";
import { User } from "@modules/user/user.model";
import { compare } from "bcryptjs";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from 'passport-local';
import envConfig from "./env.config";

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                if(!email || !password) {
                    return done(null, false, { message: 'Email and password are required.' });
                }

                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: 'User not exists.' });
                }

                const isGoogleAuthenticated = user.auths.some(auth => auth.provider === 'google');
                if (isGoogleAuthenticated) {
                    return done(null, false, { message: 'Please login using Google.' });
                }

                const isPasswordMatched = await compare(password, user?.password as string);

                if (!isPasswordMatched) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
)

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
