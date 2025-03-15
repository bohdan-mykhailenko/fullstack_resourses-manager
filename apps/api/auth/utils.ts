import { secret } from "encore.dev/config";

import jwt from "jsonwebtoken";

import { UserIdParams } from "@/shared/interfaces";

const JWT_SECRET = secret("JWT_SECRET")();

export const generateTokens = (userId: number) => {
  const accessToken = jwt.sign({ userId } satisfies UserIdParams, JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId } satisfies UserIdParams, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { accessToken, refreshToken };
};
