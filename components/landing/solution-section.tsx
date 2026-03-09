import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SolutionSection() {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Left — text */}
          <div className="max-w-lg">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {"SocialSense xuất hiện để đồng hành."}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              {"Chúng tôi không chỉ đưa ra số liệu — chúng tôi giải thích chúng, và gợi ý bước tiếp theo cụ thể cho bạn."}
            </p>
            <Badge className="mt-6 bg-primary/10 text-primary hover:bg-primary/10 text-sm font-semibold">
              {"Dành riêng cho thị trường Việt Nam"}
            </Badge>
            <p className="mt-3 text-sm text-muted-foreground">
              {"Dùng thử toàn bộ tính năng — miễn phí 30 ngày, không điều kiện."}
            </p>
          </div>

          {/* Right — insight loop graphic */}
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              {[
                {
                  step: "1",
                  title: "Insight",
                  desc: "Phân tích dữ liệu của bạn và tìm pattern ẩn",
                  icon: Sparkles,
                },
                {
                  step: "2",
                  title: "Suggestion",
                  desc: "Gợi ý nội dung, thời điểm, và chiến lược cụ thể",
                  icon: ArrowRight,
                },
                {
                  step: "3",
                  title: "Action",
                  desc: "Bạn hành động và theo dõi kết quả ngay",
                  icon: CheckCircle2,
                },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 rounded-xl border border-border bg-background p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {s.step}
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">{s.title}</p>
                    <p className="mt-1 text-base text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
