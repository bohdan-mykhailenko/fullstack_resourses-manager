import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AuthenticatedUser } from "@/services/auth/types";

import { cookiesStorage } from "../cookies";
import { CurrentUserState } from "./types";

const COOKIE_NAME = "app_user";

export const useCurrentUser = create<CurrentUserState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,

      setCurrentUser: (user) =>
        set({
          currentUser: user,
          isAuthenticated: Boolean(user),
        }),

      clearCurrentUser: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: COOKIE_NAME,
      storage: createJSONStorage(() => cookiesStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = Boolean(state.currentUser);
        }
      },
    }
  )
);

export const useIsAuthenticated = () =>
  useCurrentUser((state) => state.isAuthenticated);

export const useCurrentUserData = () =>
  useCurrentUser((state) => state.currentUser);

export const useCurrentUserRole = () =>
  useCurrentUser((state) => state.currentUser?.role);

export const useAuthActions = () => {
  const { setCurrentUser, clearCurrentUser } = useCurrentUser();

  return {
    loginUser: (user: AuthenticatedUser) => setCurrentUser(user),
    logoutUser: () => {
      clearCurrentUser();
      document.cookie = "";
    },
  };
};
