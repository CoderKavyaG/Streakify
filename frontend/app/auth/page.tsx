"use client";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";

import PublicRoute from "@/components/auth/public-route";
import ModifiedBtn from "@/components/global/btn";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { authConfig } from "@/constants/auth";
import { useAuthStore } from "@/stores/auth";

export default function AuthPage() {
  const { checkingAuth, login, loading } = useAuthStore();

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <PublicRoute>
      <div className="bg-background relative flex h-screen w-full items-center justify-center">
        <Link
          href="/"
          className="text-muted-foreground absolute top-8 left-12 flex items-center bg-transparent text-xs hover:bg-transparent"
        >
          <IconChevronLeft size={14} />
          <p>Home</p>
        </Link>

        <div className="border-border flex h-full max-w-md min-w-[320px] flex-col items-center justify-center border-x px-8 py-10 shadow-lg">
          <Separator className="absolute top-50" />
          <h1 className="text-foreground mt-4 mb-2 text-center text-3xl font-bold md:text-2xl">
            {authConfig.heading}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl px-4 text-center text-xs leading-6 md:text-sm">
            {authConfig.para}
          </p>
          <div className="mt-8 mb-8">
            <ModifiedBtn
              label={authConfig.button.label}
              className="w-full cursor-pointer"
              onClick={login}
            >
              <span className="flex items-center justify-center gap-4">
                {loading ? <Spinner /> : authConfig.button.icon}
                {authConfig.button.label}
              </span>
            </ModifiedBtn>
          </div>
          <Separator className="absolute bottom-50" />
        </div>
      </div>
    </PublicRoute>
  );
}
