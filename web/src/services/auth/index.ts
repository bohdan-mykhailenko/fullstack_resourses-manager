import { restClient } from "@/api";

import {
  AuthResponse,
  AuthenticatedUser,
  SignUpCredentials,
  UserCredentials,
} from "./types";

const STORAGE_KEY = "currentUser";

const AUTH_ENDPOINTS = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  logout: "/auth/logout",
} as const;

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public async signIn(
    credentials: UserCredentials
  ): Promise<AuthenticatedUser> {
    const { data } = await restClient.post<AuthResponse>(
      AUTH_ENDPOINTS.signIn,
      credentials
    );

    this.setCurrentUser(data.user);

    return data.user;
  }

  public async signUp(
    credentials: SignUpCredentials
  ): Promise<AuthenticatedUser> {
    const { data } = await restClient.post<AuthResponse>(
      AUTH_ENDPOINTS.signUp,
      credentials
    );

    this.setCurrentUser(data.user);

    return data.user;
  }

  public async logout(): Promise<void> {
    await restClient.get(AUTH_ENDPOINTS.logout);

    this.removeCurrentUser();
  }

  public getCurrentUser(): AuthenticatedUser | null {
    const userJson = localStorage.getItem(STORAGE_KEY);

    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as AuthenticatedUser;
    } catch {
      this.removeCurrentUser();

      return null;
    }
  }

  private setCurrentUser(user: AuthenticatedUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  private removeCurrentUser(): void {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = "";
  }

  public isAuthenticated(): boolean {
    return Boolean(this.getCurrentUser());
  }
}

export const authService = AuthService.getInstance();
export * from "./types";
