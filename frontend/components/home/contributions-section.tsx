"use client";

import { useEffect } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth";
import { useContributionsStore } from "@/stores/contributions";

import ContributionSectionSkeleton from "../skeletons/contribution-section-skeleton";
import GithubChart from "./github-chart";

export default function ContributionSection() {
  const { checkingAuth } = useAuthStore();
  const {
    fetchTodayStatus,
    todayStatus,
    fetchContributions,
    contributions,
    loading,
  } = useContributionsStore();

  useEffect(() => {
    fetchTodayStatus();
    fetchContributions();
  }, [fetchTodayStatus, fetchContributions]);

  if (checkingAuth || loading) {
    return <ContributionSectionSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-center text-lg font-semibold">
          Contribution Calendar
        </h3>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-scroll">
          <div className="max-w-90 min-w-85 md:max-w-full md:min-w-0">
            <GithubChart contributions={contributions} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 pl-5 text-xs font-semibold">
          <span>
            Today:{" "}
            <span
              className={
                todayStatus?.hasContributed ? "text-green-500" : "text-red-500"
              }
            >
              {todayStatus?.hasContributed ? "Contributed" : "No Contribution"}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
