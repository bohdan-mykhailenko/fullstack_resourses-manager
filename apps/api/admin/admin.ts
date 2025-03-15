import { APIError, api } from "encore.dev/api";
import { secret } from "encore.dev/config";

import jwt from "jsonwebtoken";

import { AdminInput, AdminJWTPayload, AdminOutput } from "./interfaces";

const ADMIN_PASSWORD = secret("ADMIN_PASSWORD")();
const ADMIN_JWT_SECRET = secret("ADMIN_JWT_SECRET")();

const ADMIN_TOKEN_EXPIRY = "8h";

export const authenticate = api<AdminInput, AdminOutput>(
  { expose: true, auth: false, method: "POST", path: "/admin/auth" },
  async (input) => {
    if (input.password !== ADMIN_PASSWORD) {
      throw APIError.unauthenticated("Invalid admin password");
    }

    const token = jwt.sign(
      { type: "admin" } satisfies AdminJWTPayload,
      ADMIN_JWT_SECRET,
      {
        expiresIn: ADMIN_TOKEN_EXPIRY,
      }
    );

    return {
      message: "Authenticated successfully as admin",
      token,
    };
  }
);
