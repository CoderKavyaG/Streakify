"use client";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/stores/auth";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, checkingAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!checkingAuth && user) {
      router.replace("/home");
    }
  }, [user, checkingAuth, router]);

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
