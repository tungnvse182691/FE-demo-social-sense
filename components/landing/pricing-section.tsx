import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-4xl font-bold tracking-tight text-foreground">
          {"Dùng thử toàn bộ tính năng — miễn phí 30 ngày."}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-base text-muted-foreground">
          {"Không cần thẻ tín dụng. Không giới hạn tính năng. Không điều kiện."}
        </p>

        {/* Trial card */}
        <div className="mx-auto mt-12 max-w-md rounded-2xl border-2 border-primary bg-card p-8 shadow-lg shadow-primary/5">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {"Dùng thử miễn phí · 30 ngày"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {"Truy cập toàn bộ tính năng ngay lập tức."}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {[
              "Kết nối không giới hạn tài khoản mạng xã hội",
              "Phân tích hiệu suất bài đăng chi tiết",
              "Gợi ý thời điểm đăng tối ưu (AI)",
              "Báo cáo tự động hàng tuần",
              "So sánh với người dùng khác",
              "Trợ lý nội dung AI (caption + hashtag)",
              "Hỗ trợ tiếng Việt 24/7",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-base text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className="mt-8 w-full rounded-lg font-semibold" asChild>
            <Link href="/dashboard">
              {"Bắt đầu dùng thử miễn phí 30 ngày"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Paid plans */}
        <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
          {"Sau 30 ngày, chọn gói phù hợp:"}
        </p>
        <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
          {/* Pro */}
          <div className="rounded-xl border border-border bg-background p-6">
            <p className="text-base font-bold text-foreground">PRO</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">299,000</span>
              <span className="text-sm text-muted-foreground">{"đ/tháng"}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {"Cá nhân & freelancer · Tối đa 5 tài khoản"}
            </p>
            <Button variant="outline" className="mt-5 w-full rounded-lg font-semibold" size="sm">
              {"Chọn gói Pro"}
            </Button>
          </div>

          {/* Team */}
          <div className="rounded-xl border border-border bg-background p-6">
            <p className="text-base font-bold text-foreground">TEAM</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">799,000</span>
              <span className="text-sm text-muted-foreground">{"đ/tháng"}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {"Doanh nghiệp · Không giới hạn · Workspace nhóm"}
            </p>
            <Button variant="outline" className="mt-5 w-full rounded-lg font-semibold" size="sm">
              {"Chọn gói Team"}
            </Button>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-muted-foreground">
          {"Không cần thẻ tín dụng để bắt đầu · Sau 30 ngày chọn gói phù hợp · Hủy bất cứ lúc nào · Hỗ trợ tiếng Việt"}
        </p>
      </div>
    </section>
  )
}
