"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  Sparkles,
  CalendarDays,
  BarChart3,
  Link2,
  Settings,
  LogOut,
  Clock,
  Zap,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { useAuth } from "@/lib/auth-context"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "AI Content Studio", href: "/ai-studio", icon: Sparkles },
  { label: "Scheduler", href: "/scheduler", icon: CalendarDays },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Connected Profiles", href: "/profiles", icon: Link2 },
  { label: "Settings", href: "/settings", icon: Settings },
]

const planBadge = {
  trial: { label: "Trải nghiệm", className: "bg-emerald-50 text-emerald-700 hover:bg-emerald-50", Icon: Clock },
  pro: { label: "Pro", className: "bg-primary/10 text-primary hover:bg-primary/10", Icon: Zap },
  team: { label: "Team", className: "bg-violet-100 text-violet-700 hover:bg-violet-100", Icon: Users },
}

export function AppSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const displayName = user?.name ?? "Khách"
  const displayAvatar = user?.avatar ?? "KH"
  const plan = user?.plan ?? "trial"
  const badge = planBadge[plan]

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 px-5">
        <Logo width={32} height={32} />
        <span className="text-lg font-bold text-foreground">SocialSense</span>
        <span className="text-sm font-medium text-muted-foreground">.vn</span>
      </div>

      {/* Nav */}
      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                isActive
                  ? "border-l-[3px] border-l-primary bg-accent text-accent-foreground"
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
            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
              {displayAvatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col min-w-0">
            <span className="truncate text-base font-semibold text-foreground">{displayName}</span>
            <Badge
              variant="secondary"
              className={cn("mt-0.5 w-fit px-1.5 py-0 text-[10px] font-semibold", badge.className)}
            >
              <badge.Icon className="mr-0.5 h-2.5 w-2.5" />
              {plan === "trial" ? `Trải nghiệm — ${user?.trialDaysLeft ?? 18} ngày` : badge.label}
            </Badge>
          </div>
          <button
            onClick={logout}
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
