"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { useAdminAuth } from "@/lib/admin-auth-context"

export default function AdminAuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { adminUser, loading } = useAdminAuth()
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!adminUser) {
        router.replace("/admin/login")
      } else {
        setReady(true)
      }
    }
  }, [adminUser, loading, router])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-destructive border-t-transparent" />
          <p className="text-sm text-muted-foreground">Đang xác thực...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="ml-60 flex flex-1 flex-col">{children}</div>
    </div>
  )
}
