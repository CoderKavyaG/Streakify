import { IconBrandGithub } from "@tabler/icons-react";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserStore } from "@/stores/user";

import { Button } from "../ui/button";

export default function GithubTokenCard() {
  const {
    githubStatus,
    fetchGithubStatus,
    updateGithubToken,
    updatingGithubToken,
  } = useUserStore();

  const [showTokenInput, setShowTokenInput] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    fetchGithubStatus();
  }, [fetchGithubStatus]);

  const isConnected = githubStatus?.hasToken && githubStatus?.isValid;

  return (
    <Card className="border-r">
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
            ) : githubStatus?.hasToken ? (
              <span className="text-red-500">Token invalid or expired</span>
            ) : (
              <span className="text-red-500">Not connected</span>
            )}
          </span>
        </div>
        <div className="text-muted-foreground mb-2 text-xs">
          {githubStatus?.message}
        </div>

        {isConnected && !showTokenInput && (
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => setShowTokenInput(true)}
            disabled={updatingGithubToken}
          >
            Update GitHub Token
          </Button>
        )}
        {(!githubStatus?.hasToken ||
          !githubStatus?.isValid ||
          showTokenInput) && (
          <div className="mt-2 flex flex-col gap-2">
            <form
              className="flex flex-col gap-2"
              onSubmit={async (e) => {
                e.preventDefault();
                await updateGithubToken(token);
                setShowTokenInput(false);
                setToken("");
                fetchGithubStatus();
              }}
            >
              <input
                type="text"
                className="rounded border px-2 py-1"
                placeholder="Paste your GitHub access token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={updatingGithubToken || !token}
                >
                  Save Token
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowTokenInput(false)}
                  disabled={updatingGithubToken}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
