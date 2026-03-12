"use client"

import { ShieldAlert } from "lucide-react"

interface AdminTopBarProps {
  title: string
}

export function AdminTopBar({ title }: AdminTopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-card px-8">
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive">
          <ShieldAlert className="h-3.5 w-3.5" />
          Chế độ quản trị
        </div>
      </div>
    </header>
  )
}
