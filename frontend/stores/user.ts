import { toast } from "sonner";
import { create } from "zustand";

import type { UserStore } from "@/types";
import axios from "@/utils/axios";

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

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  hasGithubToken: false,
  loading: false,
  updatingSettings: false,
  updatingGithubToken: false,
  error: null,
  githubStatus: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("/api/user/me");
      set({
        user: data.user,
        hasGithubToken: data.hasGithubToken,
        loading: false,
      });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to fetch user",
        loading: false,
      });
      toast.error(getErrorMessage(err) || "Failed to fetch user");
    }
  },

  updateSettings: async (settings) => {
    set({ updatingSettings: true, error: null });
    try {
      const { data } = await axios.patch("/api/user/settings", settings);
      set({ user: data.user, updatingSettings: false });
      toast.success("Settings updated successfully.");
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to update settings",
        updatingSettings: false,
      });
      toast.error(getErrorMessage(err) || "Failed to update settings");
    }
  },

  linkTelegram: async (telegram_chat_id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post("/api/user/telegram", {
        telegram_chat_id,
      });
      set({ user: data.user, loading: false });
      toast.success("Telegram linked successfully.");
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to link Telegram",
        loading: false,
      });
      toast.error(getErrorMessage(err) || "Failed to link Telegram");
    }
  },

  fetchGithubStatus: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("/api/user/github-status");
      set({ githubStatus: data, loading: false });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to fetch GitHub status",
        loading: false,
      });
      toast.error(getErrorMessage(err) || "Failed to fetch GitHub status");
    }
  },

  updateGithubToken: async (github_access_token) => {
    set({ updatingGithubToken: true, error: null });
    try {
      const { data } = await axios.post("/api/user/github-token", {
        github_access_token,
      });
      await get().fetchGithubStatus();
      set({ updatingGithubToken: false });
      toast.success("GitHub token updated successfully.");
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to update GitHub token",
        updatingGithubToken: false,
      });
      toast.error(getErrorMessage(err) || "Failed to update GitHub token");
    }
  },
}));
