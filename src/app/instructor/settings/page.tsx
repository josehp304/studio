
import { SettingsForm } from "@/components/settings-form";

export default function InstructorSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your instructor account settings.</p>
      </div>
      <SettingsForm />
    </div>
  );
}
