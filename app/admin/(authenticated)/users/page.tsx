import { AdminTopBar } from "@/components/admin/admin-topbar"
import { AdminUsersContent } from "@/components/admin/admin-users-content"

export default function AdminUsersPage() {
  return (
    <>
      <AdminTopBar title="Quản lý người dùng" />
      <main className="flex-1 bg-background p-6">
        <AdminUsersContent />
      </main>
    </>
  )
}
