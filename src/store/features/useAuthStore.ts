import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { loginUserAPIFn, registerUserAPIFn } from "./AuthFns";
import type { LoginUserTypes, RegisterUserTypes } from "../../utils/types";
import { showToast } from "../../utils/utilityFns";

type AuthState = {
  currentUser: null | unknown;
  loading?: boolean;
  status?: string | null;
  error?: string | null;
  profile: null | unknown;
  logout: () => void;
  registerUser: (values: RegisterUserTypes) => void;
  loginUser: (values: LoginUserTypes) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      profile: null,
      logout: () => {
        set({ currentUser: null });
      },
      loginUser: async (payload: LoginUserTypes) => {
        set({ loading: true, status: null, error: null });
        const data = await loginUserAPIFn(payload);
        if (data?.status === "success") {
          set({ loading: false, status: "success", currentUser: data?.data, error: null });
          showToast("Logged in successfully", "success");
        } else {
          set({ loading: false, error: data?.error, status: "fail" });
          showToast(data?.error ?? "Something went wrong", "error");
        }
        return data;
      },
      registerUser: async (payload: RegisterUserTypes) => {
        set({ loading: true, status: null, currentUser: null, error: null });
        const data = await registerUserAPIFn(payload);
        if (data?.status === "success") {
          set({ loading: false, status: "success", currentUser: data?.data, error: null });
          showToast("User registered successfully", "success");
        } else {
          set({ loading: false, error: data?.error, status: "fail" });
          showToast(data?.error ?? "Something went wrong", "error");
        }
        return data;
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
