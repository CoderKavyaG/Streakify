"use client";
import { IconSettings } from "@tabler/icons-react";
import Image from "next/image";

import { useEffect } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";

import ModifiedBtn from "../global/btn";
import ModifiedCard from "../global/card";
import SettingsHeaderSectionSkeleton from "../skeletons/settings-header-section-skeleton";

export default function HeaderSection() {
  const { logout, checkingAuth } = useAuthStore();
  const { user, fetchUser, loading } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = () => {
    logout();
  };

  if (checkingAuth || loading) {
    return <SettingsHeaderSectionSkeleton />;
  }
  return (
    <ModifiedCard>
      <Card className="bg-background border-none">
        <CardHeader className="flex items-center gap-4">
          <IconSettings className="text-primary h-6 w-6" />
          <h2 className="text-xl font-bold">Account & Notification Settings</h2>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-3">
            <Image
              src={
                user?.avatar_url ||
                "https://avatars.githubusercontent.com/u/124599?v=4"
              }
              alt="Avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="text-lg font-semibold">{user?.github_username}</p>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ModifiedBtn
              color="bg-red-500"
              className="cursor-pointer bg-red-500/20 hover:bg-red-500/10"
              onClick={handleLogout}
            >
              Logout
            </ModifiedBtn>
          </div>
        </CardContent>
      </Card>
    </ModifiedCard>
  );
}
