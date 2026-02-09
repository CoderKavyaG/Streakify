import { IconBrandTelegram } from "@tabler/icons-react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserStore } from "@/stores/user";

import { Button } from "../ui/button";

export default function TelegramFeatureCard() {
  const { user } = useUserStore();
  const isLinked = !!user?.telegram_chat_id;

  return (
    <Card>
      <CardHeader>
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <IconBrandTelegram className="h-5 w-5" /> Telegram Status
        </h3>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs">
            Status:{" "}
            {isLinked ? (
              <span className="text-green-600">Telegram linked</span>
            ) : (
              <span className="text-red-500">Not linked</span>
            )}
          </p>
          {!isLinked && (
            <Link href="/settings">
              <Button variant="outline" className="mt-2">
                Go to Settings to Connect
              </Button>
            </Link>
          )}
        </div>
        {isLinked && (
          <p className="text-muted-foreground mt-2 text-xs">
            To unlink, send <span className="font-mono">/unlink</span> to{" "}
            <b>@streakify_bot</b> on Telegram.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
