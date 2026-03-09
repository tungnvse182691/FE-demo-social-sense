import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCtaSection() {
  return (
    <section className="bg-[#0F172A] py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          {"30 ngày — toàn bộ tính năng — hoàn toàn miễn phí."}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60">
          {"Không cần thẻ tín dụng. Bắt đầu bằng quiz 2 phút để nhận chiến lược phù hợp với bạn ngay hôm nay."}
        </p>

        <Button
          size="lg"
          className="mt-8 rounded-lg bg-white px-8 text-sm font-bold text-[#0F172A] hover:bg-white/90"
          asChild
        >
          <Link href="/dashboard">
            {"Bắt đầu dùng thử miễn phí"}
          </Link>
        </Button>

        {/* Feature pills */}
        <p className="mt-8 text-xs text-white/40">
          {"Tất cả tính năng bên dưới có trong 30 ngày dùng thử:"}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {[
            "Phân tích bài đăng",
            "Gợi ý AI",
            "Báo cáo tự động",
            "So sánh người dùng",
            "Trợ lý nội dung",
            "Không giới hạn kết nối",
          ].map((pill) => (
            <span
              key={pill}
              className="flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-300"
            >
              <CheckCircle2 className="h-3 w-3" />
              {pill}
            </span>
          ))}
        </div>

        {/* Onboarding teaser — faded quiz cards */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {[
            "Bạn là cá nhân hay doanh nghiệp?",
            "Mạng xã hội chính của bạn?",
            "Mục tiêu hàng tháng?",
          ].map((q, i) => (
            <div
              key={q}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-xs text-white/30"
              style={{ opacity: 1 - i * 0.25, filter: `blur(${i * 1.5}px)` }}
            >
              {q}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
