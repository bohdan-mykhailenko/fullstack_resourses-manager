import { APIError } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { secret } from "encore.dev/config";

import jwt from "jsonwebtoken";

import { ACCESS_TYPE_ADMIN } from "@/admin/constants";
import { AdminJWTPayload } from "@/admin/interfaces";
import { UserJWTPayload } from "@/users/interfaces";

import { AuthHandlerOutput, AuthHandlerParams } from "./interfaces";
import { parseBearerToken } from "./utils";

const JWT_SECRET = secret("JWT_SECRET")();
const ADMIN_JWT_SECRET = secret("ADMIN_JWT_SECRET")();

export const handler = authHandler<AuthHandlerParams, AuthHandlerOutput>(
  async ({ authorization, accessType }) => {
    if (!authorization) {
      throw APIError.unauthenticated("Authorization header is missing");
    }

    const token = parseBearerToken(authorization);

    if (!token) {
      throw APIError.unauthenticated("Token is missing");
    }

    const isAdmin = accessType === ACCESS_TYPE_ADMIN;

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, isAdmin ? ADMIN_JWT_SECRET : JWT_SECRET);
    } catch {
      throw APIError.unauthenticated("Invalid token");
    }

    return isAdmin
      ? { userID: (decodedToken as AdminJWTPayload).type }
      : { userID: String((decodedToken as UserJWTPayload).userId) };
  }
);
