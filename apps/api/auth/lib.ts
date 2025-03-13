import { secret } from "encore.dev/config";
import jwt from "jsonwebtoken";

const jwtSecret = secret("JWT_SECRET")();

export const generateTokens = (userId: number) => {
  const accessToken = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "1h",
  });

  return { accessToken, refreshToken };
};
