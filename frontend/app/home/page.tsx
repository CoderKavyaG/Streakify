"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import ModifiedCard from "@/components/global/card";
import ContributionSection from "@/components/home/contributions-section";
import FeatureSection from "@/components/home/features-section";
import HeaderSection from "@/components/home/header-section";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/stores/auth";

export default function HomePage() {
  const { checkingAuth } = useAuthStore();

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <ModifiedCard>
          <HeaderSection />
        </ModifiedCard>
        <ModifiedCard>
          <FeatureSection />
        </ModifiedCard>
        <ModifiedCard>
          <ContributionSection />
        </ModifiedCard>
      </div>
    </ProtectedRoute>
  );
}
