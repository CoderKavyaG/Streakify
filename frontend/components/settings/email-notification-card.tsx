import { IconMail } from "@tabler/icons-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserStore } from "@/stores/user";

import { Button } from "../ui/button";

export default function EmailNotificationsCard() {
  const { user } = useUserStore();

  return (
    <Card className="flex h-full flex-col p-4">
      <CardHeader className="px-0">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <IconMail className="h-5 w-5" /> Email Notifications
        </h3>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        <Button variant="outline">Send Test Email</Button>
        <div>
          <p className="text-muted-foreground text-xs">Email: {user?.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
