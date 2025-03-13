import { Header } from "encore.dev/api";
import { MaxLen, MinLen } from "encore.dev/validate";

export interface UserOutput {
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface FindUserInput {
  id: number;
}

export interface AuthParams {
  authorization: Header<"Authorization">;
}

export interface AuthData {
  userID: string;
}
