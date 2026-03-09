import Link from "next/link"
import { Link2, BarChart3, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HowItWorksSection() {
  return (
    <section className="bg-secondary/30 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-4xl font-bold tracking-tight text-foreground">
          {"Chỉ 3 bước để bắt đầu"}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              step: 1,
              icon: Link2,
              title: "Kết nối tài khoản",
              desc: "Kết nối Facebook, TikTok, Instagram của bạn — chỉ mất 2 phút.",
            },
            {
              step: 2,
              icon: BarChart3,
              title: "SocialSense phân tích",
              desc: "AI đọc dữ liệu, tìm pattern, chuẩn bị dashboard cho bạn.",
            },
            {
              step: 3,
              icon: Sparkles,
              title: "Nhận gợi ý & hành động",
              desc: "Nhận content plan cá nhân hóa — tất cả tính năng đã mở.",
            },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {s.step}
              </div>
              <div className="mt-2 h-8 w-px bg-border md:hidden" />
              <h3 className="mt-4 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Step 3 result preview */}
        <div className="mx-auto mt-14 max-w-md rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">
              {"Toàn bộ tính năng — có ngay từ ngày đầu tiên"}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              "Lịch nội dung cá nhân",
              "Gợi ý AI chủ động",
              "Báo cáo tự động",
              "So sánh người dùng",
            ].map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 shrink-0 text-primary" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button size="lg" variant="outline" className="rounded-lg px-6 text-base font-semibold" asChild>
            <Link href="/dashboard">
              {"Dùng thử đầy đủ tính năng — miễn phí 30 ngày"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
