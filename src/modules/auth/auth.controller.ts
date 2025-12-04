/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@config/env.config";
import { ApiError } from "@utils/ApiError";
import { catchAsync } from "@utils/catchAsync";
import { setCookies } from "@utils/cookies";
import { sendResponse } from "@utils/sendResponse";
import { createUserToken } from "@utils/token";
import passport from "passport";
import { AuthServices } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";

const googleCallbackController = catchAsync(async (req, res) => {
  let redirectTo = (req.query.state as string) || "";

  if (redirectTo.startsWith("/")) {
    redirectTo = redirectTo.slice(1);
  }

  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const token = createUserToken(user);
  setCookies(res, token);

  res.redirect(`${envConfig.frontend_url}/${redirectTo}}`);
});

const login = catchAsync(async (req, res, next) => {
  passport.authenticate("local", (error: any, user: any, info: any) => {
    if (error) {
      return next(new ApiError(error.status || 500, error));
    }

    if (!user) {
      return next(info);
    }

    const token = createUserToken(user);
    user.password = undefined;

    setCookies(res, token);

    sendResponse(res, {
      statusCode: 200,
      message: "User logged in successfully",
      data: user,
    });
  })(req, res, next);
});

const register = catchAsync(async (req, res) => {
  const data = await AuthServices.register({
    ...req.body,
    profile_photo: req.file?.path,
  });

  sendResponse(res, {
    statusCode: 201,
    data,
    message: "User Registered Successfully",
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload;
  const data = await AuthServices.changePassword(user?.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    data,
    message: "Password changed successfully",
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload;
  const data = await AuthServices.updateProfile(user?.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    data,
    message: "Profile updated successfully",
  });
});

export const AuthController = {
  googleCallbackController,
  login,
  register,
  changePassword,
  updateProfile,
};
