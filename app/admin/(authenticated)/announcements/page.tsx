import { AdminTopBar } from "@/components/admin/admin-topbar"
import { AdminAnnouncementsContent } from "@/components/admin/admin-announcements-content"

export default function AdminAnnouncementsPage() {
  return (
    <>
      <AdminTopBar title="Quản lý Thông báo" />
      <main className="flex-1 bg-background p-6">
        <AdminAnnouncementsContent />
      </main>
    </>
  )
}
