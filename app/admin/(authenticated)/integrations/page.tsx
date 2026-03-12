import { AdminTopBar } from "@/components/admin/admin-topbar"
import { AdminIntegrationsContent } from "@/components/admin/admin-integrations-content"

export default function AdminIntegrationsPage() {
  return (
    <>
      <AdminTopBar title="Tích hợp API & Nền tảng" />
      <main className="flex-1 bg-background p-6">
        <AdminIntegrationsContent />
      </main>
    </>
  )
}
