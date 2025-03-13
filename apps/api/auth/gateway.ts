import { APIError, Gateway, Header } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { secret } from "encore.dev/config";
import jwt from "jsonwebtoken";

import { AuthData, AuthParams } from "./types";

const jwtSecret = secret("JWT_SECRET")();

export const handler = authHandler<AuthParams, AuthData>(
  async ({ authorization }) => {
    if (!authorization) {
      throw APIError.unauthenticated("Authorization header is missing");
    }

    const token = authorization.split("Bearer ")[1];

    if (!token) {
      throw APIError.unauthenticated("Token is missing");
    }
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, jwtSecret);
    } catch (err) {
      throw APIError.unauthenticated("Invalid token");
    }

    const { userId } = decodedToken as { userId: string };

    return { userID: String(userId) };
  }
);

export const gateway = new Gateway({
  authHandler: handler,
});
