import { AdminTopBar } from "@/components/admin/admin-topbar"
import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content"

export default function AdminDashboardPage() {
  return (
    <>
      <AdminTopBar title="Tổng quan hệ thống" />
      <main className="flex-1 bg-background p-6">
        <AdminDashboardContent />
      </main>
    </>
  )
}
