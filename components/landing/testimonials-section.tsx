import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Từ khi dùng SocialSense, tôi biết chính xác bài nào nên boost — tiết kiệm được gần 40% ngân sách quảng cáo.",
    name: "Minh Tú",
    role: "Owner @ The Local Brand",
    initials: "MT",
  },
  {
    quote: "Báo cáo tự động giúp tôi trình bày với khách hàng chuyên nghiệp hơn hẳn. Tiết kiệm 3–4 tiếng mỗi tuần.",
    name: "Hương Giang",
    role: "Freelance Social Media Manager",
    initials: "HG",
  },
  {
    quote: "Giao diện đơn giản, dữ liệu rõ ràng. Không cần học nhiều — dùng được ngay từ ngày đầu.",
    name: "Quang Khải",
    role: "Marketing Lead @ Startup HCM",
    initials: "QK",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
          {"Người dùng nói gì về SocialSense?"}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm italic leading-relaxed text-foreground">
                {"“"}{t.quote}{"”"}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="font-medium">{"1,200+ người dùng"}</span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1 font-medium">
            4.8
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {"đánh giá"}
          </span>
          <span className="text-border">|</span>
          <span className="font-medium">{"15+ nền tảng hỗ trợ"}</span>
        </div>
      </div>
    </section>
  )
}
