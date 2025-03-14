import { Header } from "encore.dev/api";

export interface AuthHandlerParams {
  authorization: Header<"Authorization">;
  isAdmin: Header<"X-Admin">;
}

export interface AuthHandlerOutput {
  userID: string;
}

export interface JWTDecodedToken {
  userId: string;
}
