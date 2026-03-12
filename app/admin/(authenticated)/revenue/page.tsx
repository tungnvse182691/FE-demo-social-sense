import { AdminTopBar } from "@/components/admin/admin-topbar"
import { AdminRevenueContent } from "@/components/admin/admin-revenue-content"

export default function AdminRevenuePage() {
  return (
    <>
      <AdminTopBar title="Doanh thu & Tài chính" />
      <main className="flex-1 bg-background p-6">
        <AdminRevenueContent />
      </main>
    </>
  )
}
