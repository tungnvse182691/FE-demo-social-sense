import { AdminTopBar } from "@/components/admin/admin-topbar"
import { AdminSettingsContent } from "@/components/admin/admin-settings-content"

export default function AdminSettingsPage() {
  return (
    <>
      <AdminTopBar title="Cài đặt hệ thống" />
      <main className="flex-1 bg-background p-6">
        <AdminSettingsContent />
      </main>
    </>
  )
}
