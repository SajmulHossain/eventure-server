import envConfig from "@config/env.config";
import { IUser } from "@modules/user/user.interface";
import { SignOptions } from "jsonwebtoken";
import { createToken } from "./jwt";

export const createUserToken = (user: Partial<IUser>) => {
  const payload = {
    id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(payload, envConfig.jwt_access_secret, {
    expiresIn: envConfig.jwt_access_expiry,
  } as SignOptions);

  const refreshToken = createToken(payload, envConfig.jwt_refresh_secret, {
    expiresIn: envConfig.jwt_refresh_expiry,
  } as SignOptions);

  return { accessToken, refreshToken };
};
