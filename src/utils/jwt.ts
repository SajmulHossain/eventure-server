import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: JwtPayload,
  secret: Secret,
  options?: SignOptions
): string => {
  return jwt.sign(payload, secret, {
    ...options,
  });
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
