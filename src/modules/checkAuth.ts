import envConfig from "@config/env.config";
import { ApiError } from "@utils/ApiError";
import { verifyToken } from "@utils/jwt";
import { NextFunction, Request, Response } from "express";
import { User } from "./user/user.model";

export const checkAuth =(...roles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new ApiError(403, "No token recieved");
    }

    const verifiedToken = verifyToken(
      accessToken,
      envConfig.jwt_access_secret
    );

    const isUserExist = await User.findOne({ email: verifiedToken.email });

    if (!isUserExist) {
      throw new ApiError(404, "User not exist");
    }

    if (!roles.includes(verifiedToken.role)) {
      throw new ApiError(403, "You are not permitted to access this route");
    }

    req.user = verifiedToken;
    next();
  };
