import { APIError } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { secret } from "encore.dev/config";
import jwt from "jsonwebtoken";

import {
  AuthHandlerOutput,
  AuthHandlerParams,
  JWTDecodedToken,
} from "./interfaces";

const JWT_SECRET = secret("JWT_SECRET")();
const ADMIN_JWT_SECRET = secret("ADMIN_JWT_SECRET")();

export const handler = authHandler<AuthHandlerParams, AuthHandlerOutput>(
  async ({ authorization, isAdmin }) => {
    if (!authorization) {
      throw APIError.unauthenticated("Authorization header is missing");
    }

    const token = authorization.split("Bearer ")[1];

    if (!token) {
      throw APIError.unauthenticated("Token is missing");
    }

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, isAdmin ? ADMIN_JWT_SECRET : JWT_SECRET);
    } catch (err) {
      throw APIError.unauthenticated("Invalid token");
    }

    return { userID: (decodedToken as JWTDecodedToken).userId };
  }
);
