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
