"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type BillingCycle = "monthly" | "annual"

const planDefs = [
  {
    id: "beginner",
    name: "Người mới",
    monthly: "79,000đ",
    annual: "67,000đ",
    features: ["Tính năng 1", "Tính năng 2", "Tính năng 3"],
  },
  {
    id: "advanced",
    name: "Nâng cao",
    monthly: "99,000đ",
    annual: "84,000đ",
    features: ["Tính năng 1", "Tính năng 2", "Tính năng 3", "Tính năng 4"],
  },
]

export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("monthly")

  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Left: title + billing toggles + CTA */}
          <div className="flex flex-col gap-5 md:w-52 shrink-0">
            <h2 className="text-2xl font-bold text-foreground">Gói sử dụng</h2>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setBilling("monthly")}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm font-medium transition-all text-left",
                  billing === "monthly"
                    ? "border-border bg-background text-foreground shadow-sm"
                    : "border-border bg-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Gói 1 tháng
                {billing === "monthly" && <ArrowRight className="h-4 w-4 text-primary" />}
              </button>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setBilling("annual")}
                  className={cn(
                    "flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm font-medium transition-all text-left",
                    billing === "annual"
                      ? "border-border bg-background text-foreground shadow-sm"
                      : "border-border bg-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  Gói 1 năm
                  {billing === "annual" && <ArrowRight className="h-4 w-4 text-primary" />}
                </button>
                {billing === "annual" && (
                  <p className="text-xs font-medium text-primary px-1">Tiết kiệm 2 tháng sử dụng!</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button className="w-full font-semibold" asChild>
                <Link href="/dashboard">
                  Trải nghiệm trước 30 ngày
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-[11px] text-muted-foreground leading-snug">
                Không thẻ tín dụng, không yêu cầu tài khoản ngân hàng trước.
              </p>
            </div>
          </div>

          {/* Right: plan cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {planDefs.map((plan) => (
              <div
                key={plan.id}
                className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden flex flex-col"
              >
                <div className="p-6 pb-3">
                  <p className="text-lg font-bold text-foreground">{plan.name}</p>
                </div>
                <div className="mx-4 mb-4 rounded-xl bg-primary px-4 py-3 text-center">
                  <p className="text-2xl font-bold text-primary-foreground leading-tight">
                    {billing === "monthly" ? plan.monthly : plan.annual}/
                  </p>
                  <p className="text-sm font-medium text-primary-foreground/90">tháng</p>
                </div>
                <ul className="px-6 pb-6 flex flex-col gap-2 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-foreground">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
