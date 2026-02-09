import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

import { useEffect } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserStore } from "@/stores/user";

import { Button } from "../ui/button";

export default function GithubFeatureCard() {
  const { githubStatus, fetchGithubStatus } = useUserStore();

  useEffect(() => {
    fetchGithubStatus();
  }, [fetchGithubStatus]);

  const isConnected = githubStatus?.hasToken && githubStatus?.isValid;

  return (
    <Card>
      <CardHeader>
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <IconBrandGithub className="h-5 w-5" /> GitHub Status
        </h3>
      </CardHeader>
      <CardContent className="px-6">
        <div>
          <span className="text-sm font-medium">
            {isConnected ? (
              <span className="text-green-600">Connected (Token valid)</span>
            ) : (
              <span className="text-red-500">Not connected</span>
            )}
          </span>
        </div>
        <div className="text-muted-foreground mb-2 text-xs">
          {githubStatus?.message}
        </div>
        {!isConnected && (
          <Link href="/settings">
            <Button variant="outline" className="mt-2">
              Go to Settings to Connect
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
