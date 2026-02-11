import { create } from "zustand";

import { ContributionsStore } from "@/types";
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

export const useContributionsStore = create<ContributionsStore>((set, get) => ({
  contributions: [],
  total: 0,
  todayStatus: null,
  streakStats: null,
  loading: false,
  syncing: false,
  error: null,

  fetchContributions: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("/contributions");
      set({
        contributions: data.contributions,
        total: data.total,
        loading: false,
      });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to fetch contributions",
        loading: false,
      });
    }
  },

  fetchTodayStatus: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("/contributions/today");
      set({ todayStatus: data, loading: false });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to fetch today status",
        loading: false,
      });
    }
  },

  fetchStreakStats: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("/contributions/stats");
      set({ streakStats: data, loading: false });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to fetch streak stats",
        loading: false,
      });
    }
  },

  syncContributions: async () => {
    set({ syncing: true, error: null });
    try {
      await axios.post("/contributions/sync");
      await get().fetchContributions();
      set({ syncing: false });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to sync contributions",
        syncing: false,
      });
    }
  },
}));
