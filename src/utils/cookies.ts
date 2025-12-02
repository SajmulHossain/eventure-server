import { Response } from "express";

export const setCookies = (
  res: Response,
  token: { accessToken?: string; refreshToken?: string }
) => {
  if (token?.accessToken) {
    res.cookie("accessToken", token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 3600 * 24 * 10,
    });
  }

  if (token?.refreshToken) {
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 3600 * 24 * 60,
    });
  }
};

export const clearCookies = (res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
};
