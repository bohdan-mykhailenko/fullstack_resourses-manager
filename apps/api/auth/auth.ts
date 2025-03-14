import bcrypt from "bcrypt";
import { APIError, api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import jwt from "jsonwebtoken";

import { generateTokens } from "./lib";
import { UserOutput } from "./types";
import { SignInInput, SignUpInput } from "./validation";

const db = new SQLDatabase("resource_center", { migrations: "./migrations" });

const jwtSecret = secret("JWT_SECRET")();

export const signUp = api(
  { expose: true, auth: false, method: "POST", path: "/sign-up" },
  async (input: SignUpInput): Promise<UserOutput> => {
    const { email, password, firstName, lastName } = input;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.queryRow`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("User with this email already exists");
    }

    const user = await db.queryRow`
      INSERT INTO users (email, password, first_name, last_name)
      VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName})
      RETURNING id
    `;

    if (!user || !user.id) {
      throw new Error("Failed to retrieve user ID after sign-up");
    }

    const { accessToken, refreshToken } = generateTokens(user?.id);

    return { accessToken, refreshToken, email, firstName, lastName };
  }
);

export const signIn = api(
  { expose: true, auth: false, method: "POST", path: "/sign-in" },
  async (input: SignInInput) => {
    const { email, password } = input;
    const user = await db.queryRow`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (!user) {
      throw APIError.notFound("User with this email not found");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw APIError.unauthenticated("Wrong password");
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    return {
      accessToken,
      refreshToken,
      email,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  }
);

export const refreshToken = api(
  { expose: true, auth: false, method: "POST", path: "/refresh-token" },
  async (input: { refreshToken: string }) => {
    const { refreshToken } = input;

    let payload;

    try {
      payload = jwt.verify(refreshToken, jwtSecret);
    } catch (err) {
      throw APIError.unauthenticated("Invalid refresh token");
    }

    const { userId } = payload as { userId: string };

    const { accessToken } = generateTokens(Number(userId));

    return { accessToken };
  }
);
