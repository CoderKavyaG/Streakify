"use client";
import { IconRefresh } from "@tabler/icons-react";
import Image from "next/image";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { user as DemoUser } from "@/constants/layout";
import { useAuthStore } from "@/stores/auth";
import { useContributionsStore } from "@/stores/contributions";
import { useUserStore } from "@/stores/user";

import HeaderSectionSkeleton from "../skeletons/home-header-section-skeleton";
import { Spinner } from "../ui/spinner";

export default function HeaderSection() {
  const { checkingAuth } = useAuthStore();
  const { fetchUser, user, hasGithubToken } = useUserStore();
  const { loading, syncContributions, streakStats, fetchStreakStats, syncing } =
    useContributionsStore();

  useEffect(() => {
    fetchUser();
    fetchStreakStats();
  }, [fetchUser, fetchStreakStats]);

  if (checkingAuth || loading) {
    return <HeaderSectionSkeleton />;
  }

  const handleSync = () => {
    syncContributions();
  };

  return (
    <Card className="gap-0 px-0 py-0">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 py-6">
        <div className="flex min-w-0 items-center gap-2">
          <Image
            src={user?.avatar_url || DemoUser.profile}
            alt="Avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h2 className="hidden text-xl font-bold md:flex">
              Welcome,{" "}
              <span className="hidden md:flex">{user?.github_username}</span>!
            </h2>
            <p className="text-muted-foreground hidden text-sm md:flex">
              Track your GitHub streaks. Never miss a day.
            </p>
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            className="flex cursor-pointer items-center gap-2"
            onClick={handleSync}
            disabled={syncing || !hasGithubToken}
          >
            {syncing ? <Spinner /> : <IconRefresh className="h-4 w-4" />}
            Sync Now
          </Button>
        </div>
      </CardHeader>

      <Separator />
      <CardContent>
        <div className="grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-x md:divide-y-0">
          <div className="flex flex-col space-y-2 py-6 text-center md:px-4">
            <p className="text-muted-foreground text-sm font-bold">
              Current Streak
            </p>
            <p className="text-primary text-2xl font-bold">
              {streakStats?.currentStreak}
            </p>
          </div>
          <div className="flex flex-col space-y-2 px-4 py-6 text-center">
            <p className="text-muted-foreground text-sm font-bold">
              Longest Streak
            </p>
            <p className="text-2xl font-bold">{streakStats?.longestStreak}</p>
          </div>
          <div className="flex flex-col space-y-2 px-4 py-6 text-center">
            <p className="text-muted-foreground text-sm font-bold">
              Total Contributions (This Year)
            </p>
            <p className="text-2xl font-bold">{streakStats?.totalThisYear}</p>
          </div>
          <div className="flex flex-col space-y-2 px-4 py-6 text-center">
            <p className="text-muted-foreground text-sm font-bold">
              Saved Days
            </p>
            <p className="text-2xl font-bold">{streakStats?.savedDays}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
