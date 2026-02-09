"use client";
import { useAuthStore } from "@/stores/auth";
import { useNotificationsStore } from "@/stores/notifications";
import { useTelegramStore } from "@/stores/telegram";

import ModifiedCard from "../global/card";
import SettingsSectionSkeleton from "../skeletons/settings-feature-section-skeleton";
import ContributionReminderCard from "./contribution-reminder-card";
import GithubTokenCard from "./github-token-card";
import TelegramNotificationsCard from "./telegram-notification-card";

export default function SettingsSection() {
  const { checkingAuth } = useAuthStore();
  const { loading: notificationLoading } = useNotificationsStore();
  const { loading: telegramLoading } = useTelegramStore();

  if (checkingAuth || notificationLoading || telegramLoading) {
    return <SettingsSectionSkeleton />;
  }
  return (
    <ModifiedCard>
      <div className="grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x">
        <ContributionReminderCard />
        {/* <EmailNotificationsCard /> */}
        <TelegramNotificationsCard />
        <GithubTokenCard />
      </div>
    </ModifiedCard>
  );
}
