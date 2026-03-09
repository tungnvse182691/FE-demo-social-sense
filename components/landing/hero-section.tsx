"use client"

import Link from "next/link"
import {
  Sparkles,
  TrendingUp,
  Clock,
  BarChart3,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-card pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-16 lg:gap-20">
          {/* Left — copy */}
          <div className="flex max-w-xl flex-col">
            <h1 className="text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground lg:text-5xl">
              {"Hiểu rõ mạng xã hội của bạn. Đăng đúng lúc. Tăng trưởng thật sự."}
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
              {"SocialSense phân tích dữ liệu, gợi ý nội dung, và giúp bạn ra quyết định đăng bài thông minh hơn."}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Button size="lg" className="rounded-lg px-6 text-sm font-semibold" asChild>
                <Link href="/dashboard">
                  {"Bắt đầu dùng thử miễn phí 30 ngày"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-lg px-6 text-sm font-semibold">
                {"Xem demo"}
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {"Không cần thẻ tín dụng · Toàn bộ tính năng từ ngày đầu · Hủy bất cứ lúc nào"}
            </p>
          </div>

          {/* Right — dashboard mockup */}
          <div className="hidden flex-1 lg:block">
            <div className="relative rounded-2xl border border-border bg-card p-1 shadow-2xl shadow-primary/5">
              {/* Trial banner inside mockup */}
              <div className="flex items-center gap-2 rounded-t-xl bg-primary/5 px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-[11px] font-medium text-primary">
                  {"Đang dùng thử — còn 30 ngày · Tất cả tính năng đã được mở"}
                </span>
              </div>

              <div className="p-4">
                {/* KPI row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Lượt tiếp cận", value: "48,320", change: "+12.4%", icon: TrendingUp },
                    { label: "Tương tác", value: "6,840", change: "+8.2%", icon: BarChart3 },
                    { label: "Follower mới", value: "+1,240", change: "+22.1%", icon: Sparkles },
                  ].map((k) => (
                    <div key={k.label} className="rounded-lg border border-border bg-background p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">{k.label}</span>
                        <k.icon className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <p className="mt-1 text-lg font-bold text-foreground">{k.value}</p>
                      <p className="mt-0.5 text-[10px] font-medium text-emerald-600">{k.change}</p>
                    </div>
                  ))}
                </div>

                {/* Two-column bottom */}
                <div className="mt-3 grid grid-cols-5 gap-3">
                  {/* Best posting time heatmap */}
                  <div className="col-span-3 rounded-lg border border-border bg-background p-3">
                    <p className="text-[10px] font-semibold text-foreground">
                      <Clock className="mr-1 inline h-3 w-3 text-muted-foreground" />
                      {"Thời điểm đăng tối ưu"}
                    </p>
                    <div className="mt-2 grid grid-cols-7 gap-1">
                      {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                        <span key={day} className="text-center text-[8px] text-muted-foreground">{day}</span>
                      ))}
                      {Array.from({ length: 28 }).map((_, i) => {
                        const heat = [3,1,2,4,2,1,0, 2,4,3,2,1,0,1, 1,2,4,3,4,2,1, 0,1,2,2,3,1,0][i]
                        const bg = heat === 4 ? "bg-primary" : heat === 3 ? "bg-primary/60" : heat === 2 ? "bg-primary/30" : heat === 1 ? "bg-primary/10" : "bg-secondary"
                        return <div key={i} className={`h-3 rounded-sm ${bg}`} />
                      })}
                    </div>
                  </div>

                  {/* AI suggestion panel */}
                  <div className="col-span-2 rounded-lg border border-border bg-background p-3">
                    <p className="text-[10px] font-semibold text-foreground">
                      <MessageSquare className="mr-1 inline h-3 w-3 text-muted-foreground" />
                      {"Gợi ý AI"}
                    </p>
                    <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                      {"\"Mùa hè đã đến! Khám phá bộ sưu tập mới nhất của chúng tôi...\""}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {["#muahe2025", "#thoitrang", "#salehot"].map((tag) => (
                        <span key={tag} className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-medium text-primary">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Report badge */}
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-[10px] font-medium text-emerald-700">
                    {"Báo cáo tuần này đã sẵn sàng"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
