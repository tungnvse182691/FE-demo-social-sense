"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-border bg-card/95 backdrop-blur-md shadow-sm"
          : "bg-card"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo width={35} height={35} />
          <span className="text-sm font-bold text-foreground">SocialSense</span>
          <span className="text-[10px] font-medium text-muted-foreground">.vn</span>
        </Link>

        {/* Center links */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "Tính năng", href: "#features" },
            { label: "Bảng giá", href: "#pricing" },
            { label: "Về chúng tôi", href: "#about" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <Button size="sm" className="rounded-lg text-xs font-semibold" asChild>
          <Link href="/dashboard">
            {"Dùng thử miễn phí 30 ngày"}
          </Link>
        </Button>
      </div>
    </header>
  )
}
