export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends UserCredentials {
  firstName: string;
  lastName: string;
  passwordConfirmation: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  user: AuthenticatedUser;
}
