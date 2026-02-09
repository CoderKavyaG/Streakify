"use client";
import { useAuthStore } from "@/stores/auth";
import { useNotificationsStore } from "@/stores/notifications";
import { useTelegramStore } from "@/stores/telegram";

import FeatureSectionSkeleton from "../skeletons/feature-section-skeleton";
import GithubFeatureCard from "./github-feature-card";
import TelegramFeatureCard from "./telegram-feature-card";

export default function FeatureSection() {
  const { checkingAuth } = useAuthStore();
  const { loading: notificationLoading } = useNotificationsStore();
  const { loading: telegramLoading } = useTelegramStore();

  if (checkingAuth || notificationLoading || telegramLoading) {
    return <FeatureSectionSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 divide-x md:grid-cols-2">
      {/* <EmailFeatureCard /> */}
      <GithubFeatureCard />
      <TelegramFeatureCard />
    </div>
  );
}
