import { secret } from "encore.dev/config";

import jwt from "jsonwebtoken";

import { UserIdParams } from "@/shared/interfaces";

import { UserJWTPayload } from "./interfaces";

const JWT_SECRET = secret("JWT_SECRET")();

const ACCESS_TOKEN_EXPIRY = "1d";
const REFRESH_TOKEN_EXPIRY = "1h";

export const generateTokens = (userId: number) => {
  const accessToken = jwt.sign(
    { userId } satisfies UserJWTPayload,
    JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );

  const refreshToken = jwt.sign({ userId } satisfies UserIdParams, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  return { accessToken, refreshToken };
};
