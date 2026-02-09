"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import { useUserStore } from "@/stores/user";

const ActivityCalendar = dynamic(
  () => import("react-activity-calendar").then((mod) => mod.ActivityCalendar),
  { ssr: false },
);

function getLevel(count: number) {
  if (count === 0) return 0;
  if (count < 2) return 1;
  if (count < 4) return 2;
  return 3;
}

export default function GithubChart({
  contributions,
}: {
  contributions?: { date: string; contributionCount: number }[];
}) {
  const { theme } = useTheme();
  const { user } = useUserStore();

  if (!user?.github_username) {
    return (
      <div className="bg-background text-muted-foreground flex w-full items-center justify-center rounded p-4">
        Connect your GitHub account to see your contribution chart.
      </div>
    );
  }

  const calendarData = (contributions || []).map((c) => ({
    date: c.date,
    count: c.contributionCount,
    level: getLevel(c.contributionCount),
  }));

  if (calendarData.length === 0) {
    return (
      <div className="bg-background text-muted-foreground flex w-full items-center justify-center rounded p-4">
        No contribution data available.
      </div>
    );
  }

  return (
    <div className="bg-background flex w-full items-center justify-center overflow-x-auto rounded p-4">
      <ActivityCalendar
        data={calendarData}
        colorScheme={theme === "dark" ? "dark" : "light"}
        blockSize={14}
        blockMargin={4}
        fontSize={12}
        showWeekdayLabels
      />
    </div>
  );
}
