import { IconMail } from "@tabler/icons-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNotificationsStore } from "@/stores/notifications";
import { useUserStore } from "@/stores/user";

import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function EmailFeatureCard() {
  const { sendTestEmail, sendingEmail, sendReminder } = useNotificationsStore();
  const { user } = useUserStore();

  return (
    <Card>
      <CardHeader>
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <IconMail className="h-5 w-5" /> Email Notifications
        </h3>
      </CardHeader>
      <CardContent className="px-6">
        <Button
          variant="outline"
          onClick={() => sendTestEmail(user?.email || "")}
        >
          {sendingEmail ? <Spinner /> : ""}
          Send Test Email
        </Button>
        <div>
          <p className="text-muted-foreground mt-2 text-xs">
            Last email sent: {"Never"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
