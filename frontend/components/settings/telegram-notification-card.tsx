import { IconBrandTelegram } from "@tabler/icons-react";

import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNotificationsStore } from "@/stores/notifications";
import { useTelegramStore } from "@/stores/telegram";
import { useUserStore } from "@/stores/user";

import { Button } from "../ui/button";

export default function TelegramNotificationsCard() {
  const { user, fetchUser } = useUserStore();
  const { sendTelegramTest, sendingTestTelegramMessage } =
    useNotificationsStore();
  const { linkCodeInfo, loading, error, generateLinkCode } = useTelegramStore();

  const [showInstructions, setShowInstructions] = useState(false);
  const [checking, setChecking] = useState(false);

  const isLinked = !!user?.telegram_chat_id;

  const handleCopy = () => {
    if (linkCodeInfo?.code) {
      navigator.clipboard.writeText(`/start ${linkCodeInfo.code}`);
    }
  };

  const handleCheckStatus = async () => {
    setChecking(true);
    await fetchUser();
    setChecking(false);
  };

  const handleSendTest = async () => {
    await sendTelegramTest("This is a test message from Streakify!");
  };

  return (
    <Card className="flex h-full flex-col p-4">
      <CardHeader className="px-0 pb-2">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <IconBrandTelegram className="h-5 w-5" /> Telegram Notifications
        </h3>
      </CardHeader>
      <CardContent className="px-0">
        <p className="text-muted-foreground mb-2 text-xs">
          Status:{" "}
          {isLinked ? (
            <span className="text-green-600">Telegram linked</span>
          ) : (
            <span className="text-red-500">Not linked</span>
          )}
        </p>

        {isLinked ? (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" disabled>
                Linked
              </Button>
              <Button
                variant="outline"
                onClick={handleSendTest}
                disabled={sendingTestTelegramMessage || !user?.telegram_chat_id}
              >
                {sendingTestTelegramMessage
                  ? "Sending..."
                  : "Send Test Telegram"}
              </Button>
            </div>
            <p className="text-muted-foreground text-xs">
              To unlink, send <span className="font-mono">/unlink</span> to{" "}
              <b>@streakify_bot</b> on Telegram.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {!linkCodeInfo ? (
              <Button
                variant="outline"
                onClick={async () => {
                  await generateLinkCode();
                }}
                disabled={loading}
              >
                {loading ? "Generating..." : "Connect Telegram"}
              </Button>
            ) : (
              <div className="border-border bg-background mt-2 space-y-2 rounded border p-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Your Link Code:</span>
                  <span className="bg-muted rounded px-2 py-1 font-mono">
                    {linkCodeInfo.code}
                  </span>
                  <Button size="sm" variant="outline" onClick={handleCopy}>
                    Copy
                  </Button>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Step 1:</strong> Open Telegram and search for{" "}
                    <b>@{linkCodeInfo.botUsername || "streakify_bot"}</b>
                  </p>
                  <p>
                    2. Send this message:{" "}
                    <span className="bg-muted rounded px-2 py-1 font-mono">
                      /start {linkCodeInfo.code}
                    </span>
                  </p>
                  <p>3. Wait for confirmation from the bot.</p>
                  <p className="text-muted-foreground text-xs">
                    Expires in: {linkCodeInfo.expiresIn}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCheckStatus}
                  disabled={checking}
                >
                  {checking ? "Checking..." : "Check Status"}
                </Button>
              </div>
            )}

            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
