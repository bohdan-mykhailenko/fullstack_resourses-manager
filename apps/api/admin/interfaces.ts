import { JwtPayload } from "jsonwebtoken";

export interface AdminInput {
  password: string;
}

export interface AdminOutput {
  message: string;
  token: string;
}

export interface AdminJWTPayload extends JwtPayload {
  type: "admin";
}
