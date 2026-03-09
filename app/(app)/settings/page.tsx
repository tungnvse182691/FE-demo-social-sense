import { TopBar } from "@/components/top-bar"
import { SettingsContent } from "@/components/settings-content"

export default function SettingsPage() {
  return (
    <>
      <TopBar title="Settings" />
      <main className="flex-1 bg-background p-8">
        <SettingsContent />
      </main>
    </>
  )
}
