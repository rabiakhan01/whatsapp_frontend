import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  currentUser: null | unknown;
  profile: null | unknown;
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      profile: null,
      logout: () => {
        set({
          currentUser: null,
        });
      },
    }),
    {
      name: "currentUser",
      partialize: (state: AuthState) => ({
        currentUser: state.currentUser,
      }),

      storage: createJSONStorage(() => localStorage),
    },
  ),
);
