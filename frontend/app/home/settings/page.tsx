import ProtectedRoute from "@/components/auth/protected-route";
import HeaderSection from "@/components/settings/header-section";
import SettingsSection from "@/components/settings/settings-section";

export default function Settings() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <HeaderSection />
        <SettingsSection />
      </div>
    </ProtectedRoute>
  );
}
