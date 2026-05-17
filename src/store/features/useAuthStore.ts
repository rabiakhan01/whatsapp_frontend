import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { loginUserFn } from "./AuthFns";
import type { RegisterUserTypes } from "../../utils/types";

type AuthState = {
  currentUser: null | unknown;
  loading?: boolean,
  status?: string | null,
  error?: string | null,
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
      loginUser: async (payload: RegisterUserTypes) => {
        set({ loading: true, status: null, currentUser: null, error: null });
        const data = await loginUserFn(payload);
        if (data?.status === "success") {
          set({
            loading: false,
            status: "success",
            currentUser: data?.data,
            error: null,
          })
        } else {
          set({
            loading: false,
            error: data?.error,
            status: "fail"
          })
        }
      }
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
