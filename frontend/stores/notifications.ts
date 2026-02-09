import { toast } from "sonner";
import { create } from "zustand";

import { NotificationsStore } from "@/types";
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

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notificationHistory: [],
  loading: false,
  sendingTestTelegramMessage: false,
  sendingEmail: false,
  error: null,
  testEmailResult: null,
  reminderResult: null,
  telegramResult: null,

  sendTestEmail: async (email: string) => {
    set({ sendingEmail: true, error: null, testEmailResult: null });
    try {
      const { data } = await axios.post("/api/notifications/test-email", {
        email,
      });
      set({ testEmailResult: data.message, sendingEmail: false });
      toast.success("Test email sent successfully.");
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to send test email",
        sendingEmail: false,
      });
      toast.error(getErrorMessage(err) || "Failed to send test email");
    }
  },

  sendReminder: async (type = "friendly") => {
    set({ loading: true, error: null, reminderResult: null });
    try {
      const { data } = await axios.post("/api/notifications/send-reminder", {
        type,
      });
      set({ reminderResult: data.message, loading: false });
      toast.success("Reminder sent successfully.");
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to send reminder",
        loading: false,
      });
      toast.error(getErrorMessage(err) || "Failed to send reminder");
    }
  },

  sendTelegramTest: async (message) => {
    set({
      sendingTestTelegramMessage: true,
      error: null,
      telegramResult: null,
    });
    try {
      const { data } = await axios.post("/api/notifications/send-telegram", {
        message,
      });
      set({ telegramResult: data.message, sendingTestTelegramMessage: false });
      toast.success("Telegram message sent successfully.");
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to send Telegram message",
        sendingTestTelegramMessage: false,
      });
      toast.error(getErrorMessage(err) || "Failed to send Telegram message");
    }
  },

  fetchNotificationHistory: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get("/api/notifications/history");
      set({ notificationHistory: data.notifications, loading: false });
      toast.success("Notification history loaded.");
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err) || "Failed to fetch notification history",
        loading: false,
      });
      toast.error(
        getErrorMessage(err) || "Failed to fetch notification history",
      );
    }
  },
}));
