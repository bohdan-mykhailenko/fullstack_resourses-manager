import { APIError, api } from "encore.dev/api";
import { secret } from "encore.dev/config";

import { AdminInput, AdminOutput } from "./interfaces";

const adminPassword = secret("ADMIN_PASSWORD")();

export const verify = api(
  { expose: true, auth: false, method: "POST", path: "/verify" },
  async (input: AdminInput): Promise<AdminOutput> => {
    const { password } = input;

    if (password !== adminPassword) {
      throw APIError.unauthenticated("Invalid admin password");
    }

    return { message: "You are verified as an admin" };
  }
);
