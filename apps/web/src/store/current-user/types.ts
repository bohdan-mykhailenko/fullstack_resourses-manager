import { AuthenticatedUser } from "@/services/auth/types";

export interface CurrentUserState {
  currentUser: AuthenticatedUser | null;
  isAuthenticated: boolean;
  setCurrentUser: (user: AuthenticatedUser | null) => void;
  clearCurrentUser: () => void;
}
