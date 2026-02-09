import { create } from "zustand";

import { TelegramStore } from "@/types";
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

export const useTelegramStore = create<TelegramStore>((set) => ({
  linkCodeInfo: null,
  webhookInfo: null,
  loading: false,
  error: null,

  generateLinkCode: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("/api/telegram/link-code");
      set({ linkCodeInfo: data, loading: false });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to generate link code",
        loading: false,
      });
    }
  },

  setWebhook: async (url) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post("/api/telegram/set-webhook", { url });
      set({ webhookInfo: data, loading: false });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to set webhook",
        loading: false,
      });
    }
  },

  fetchWebhookInfo: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("/api/telegram/webhook-info");
      set({ webhookInfo: data, loading: false });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to fetch webhook info",
        loading: false,
      });
    }
  },
}));
