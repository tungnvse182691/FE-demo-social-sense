"use client"

import { Bell, HelpCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-card px-8">
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
      <div className="flex items-center gap-2">
        <div className="mr-2 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
          <Clock className="h-3.5 w-3.5" />
          {"Còn 18 ngày trải nghiệm"}
        </div>
        <button
          className="relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>
        <button
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Help"
        >
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>
        <Button size="sm" className="ml-2 h-8 rounded-lg text-xs font-semibold">
          {"Khám phá các gói"}
        </Button>
      </div>
    </header>
  )
}
