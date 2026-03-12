"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Plug,
  Megaphone,
  SlidersHorizontal,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { useAdminAuth } from "@/lib/admin-auth-context"

const navItems = [
  { label: "Tổng quan", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Người dùng", href: "/admin/users", icon: Users },
  { label: "Doanh thu", href: "/admin/revenue", icon: TrendingUp },
  { label: "Tích hợp API", href: "/admin/integrations", icon: Plug },
  { label: "Thông báo", href: "/admin/announcements", icon: Megaphone },
  { label: "Cài đặt hệ thống", href: "/admin/settings", icon: SlidersHorizontal },
]

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  support: "Support",
  finance: "Finance",
}

export function AdminSidebar() {
  const pathname = usePathname()
  const { adminUser, adminLogout } = useAdminAuth()

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 px-5">
        <Logo width={32} height={32} />
        <span className="text-lg font-bold text-foreground">SocialSense</span>
        <Badge className="ml-0.5 bg-destructive/10 px-1.5 py-0 text-[10px] font-bold text-destructive hover:bg-destructive/10">
          ADMIN
        </Badge>
      </div>

      {/* Nav */}
      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                isActive
                  ? "border-l-[3px] border-l-destructive bg-destructive/5 text-destructive"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-destructive/10 text-sm font-semibold text-destructive">
              {adminUser?.avatar ?? "AD"}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-base font-semibold text-foreground">
              {adminUser?.name ?? "Admin"}
            </span>
            <span className="text-xs text-muted-foreground">
              {roleLabels[adminUser?.role ?? "super_admin"]}
            </span>
          </div>
          <button
            onClick={adminLogout}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            aria-label="Đăng xuất"
            title="Đăng xuất"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
