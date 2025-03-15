import { Header } from "encore.dev/api";

import { AdminJWTPayload } from "@/admin/interfaces";
import { UserJWTPayload } from "@/users/interfaces";

export interface AuthHandlerParams {
  authorization: Header<"Authorization">;
  accessType?: Header<"X-Access-Type">;
}

export interface AuthHandlerOutput {
  userID: string;
}
