import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserStore } from "@/stores/user";

import { Button } from "../ui/button";

export default function ContributionReminderCard() {
  const { user, updateSettings, updatingSettings } = useUserStore();
  const [checkTime, setCheckTime] = useState(user?.check_time ?? "18:00");

  const handleSave = async () => {
    await updateSettings({ check_time: checkTime });
  };

  return (
    <Card className="flex h-full flex-col p-4">
      <CardHeader className="px-0 pb-2">
        <h3 className="text-lg font-semibold">
          Contribution Reminder Settings
        </h3>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Reminder Time</label>
            <input
              type="time"
              value={checkTime}
              onChange={(e) => setCheckTime(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-1"
            />
          </div>

          <Button
            variant="outline"
            onClick={handleSave}
            disabled={updatingSettings}
          >
            {updatingSettings ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
