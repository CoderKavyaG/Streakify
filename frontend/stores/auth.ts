import { toast } from "sonner";
import { create } from "zustand";

import { supabase } from "@/configuration/supabase";
import type { AuthState } from "@/types/index";

type AxiosErrorLike = {
  response?: {
    data?: {
      error?: string;
    };
  };
};

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as AxiosErrorLike).response?.data?.error
  ) {
    return (error as AxiosErrorLike).response!.data!.error;
  }
  if (error instanceof Error) return error.message;
  return "An unknown error occurred";
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  setUser: (user) => set({ user }),
  setCheckingAuth(checking) {
    set({ checkingAuth: checking });
  },
  setLoading: (loading) => set({ loading }),

  login: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signInWithOAuth({ provider: "github" });
      toast.success("Logged in successfully.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error) || "Login failed.");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null });
      toast.success("Logged out successfully.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error) || "Logout failed.");
    } finally {
      set({ loading: false });
    }
  },
}));
