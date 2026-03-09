import { Clock, HelpCircle, TrendingDown } from "lucide-react"

export function ProblemSection() {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center text-xl font-light italic leading-relaxed text-foreground lg:text-2xl">
          {"“Bạn đã đăng đều đặn... nhưng lượt tiếp cận vẫn giảm. Bạn không biết tại sao.”"}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              icon: Clock,
              text: "Không biết giờ nào đăng hiệu quả",
            },
            {
              icon: HelpCircle,
              text: "Không hiểu tại sao bài này viral, bài kia không ai xem",
            },
            {
              icon: TrendingDown,
              text: "Mất hàng giờ báo cáo mà không rõ insight",
            },
          ].map((pain) => (
            <div
              key={pain.text}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <pain.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium leading-relaxed text-foreground">{pain.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
