import { JwtPayload } from "jsonwebtoken";

import { UserIdParams } from "@/shared/interfaces";

export interface UserOutput {
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserJWTPayload extends UserIdParams, JwtPayload {}
