import { Fragment } from "react"
import {
  BarChart3,
  Clock,
  FileText,
  Users,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Download,
  CheckCircle2,
  MessageSquare,
} from "lucide-react"

const features = [
  {
    title: "Phân tích hiệu suất bài đăng",
    desc: "Biết chính xác bài nào hoạt động tốt và tại sao — không chỉ là con số, mà là insight thật sự.",
    mockup: "performance",
  },
  {
    title: "Gợi ý thời điểm đăng tối ưu",
    desc: "AI phân tích hành vi người theo dõi của bạn và chỉ ra khung giờ vàng để tối đa hoá tiếp cận.",
    mockup: "heatmap",
  },
  {
    title: "Báo cáo tự động hàng tuần",
    desc: "Báo cáo chuyên nghiệp tự động gửi mỗi tuần — dùng ngay để trình bày với khách hàng hoặc team.",
    mockup: "report",
  },
  {
    title: "So sánh với người dùng khác",
    desc: "Biết người khác đang làm gì, đang thắng ở đâu — và tìm ra khoảng trống để bạn vượt lên.",
    mockup: "competitor",
  },
  {
    title: "Trợ lý nội dung AI",
    desc: "Hết ý tưởng? AI gợi ý caption và hashtag phù hợp với thương hiệu và xu hướng hiện tại.",
    mockup: "ai",
  },
]

function PerformanceMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
        <BarChart3 className="h-3.5 w-3.5" />
        {"Hiệu suất bài đăng"}
      </div>
      <div className="flex flex-col gap-2">
        {[
          { title: "Summer Collection Launch", reach: "12,480", eng: "2,140", trend: "+34%" },
          { title: "Behind the Scenes", reach: "8,920", eng: "1,680", trend: "+18%" },
          { title: "Customer Story", reach: "6,340", eng: "980", trend: "+12%" },
        ].map((post) => (
          <div key={post.title} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5">
            <div>
              <p className="text-xs font-medium text-white/90">{post.title}</p>
              <p className="mt-0.5 text-[10px] text-white/40">
                {"Reach: "}{post.reach}{" · Eng: "}{post.eng}
              </p>
            </div>
            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-400">
              <ArrowUpRight className="h-3 w-3" />{post.trend}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeatmapMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
        <Clock className="h-3.5 w-3.5" />
        {"Khung giờ vàng"}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
          <span key={d} className="text-center text-[9px] text-white/40">{d}</span>
        ))}
        {Array.from({ length: 35 }).map((_, i) => {
          const heat = [0,2,3,4,3,1,0, 1,3,4,3,2,0,0, 2,3,3,4,3,1,1, 0,2,4,4,3,2,0, 1,2,3,3,2,1,0][i]
          const bg = heat === 4 ? "bg-blue-400" : heat === 3 ? "bg-blue-400/60" : heat === 2 ? "bg-blue-400/30" : heat === 1 ? "bg-blue-400/10" : "bg-white/5"
          return <div key={i} className={`h-4 rounded-sm ${bg}`} />
        })}
      </div>
      <div className="mt-3 flex items-center gap-1.5 rounded-md bg-blue-500/20 px-2 py-1">
        <TrendingUp className="h-3 w-3 text-blue-400" />
        <span className="text-[10px] font-medium text-blue-300">
          {"Tốt nhất: T4 & T5 lúc 19:00–21:00"}
        </span>
      </div>
    </div>
  )
}

function ReportMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
        <FileText className="h-3.5 w-3.5" />
        {"Báo cáo tuần 12"}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/50">{"Tổng reach"}</span>
          <span className="font-medium text-white/90">48,320</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/50">{"Tương tác"}</span>
          <span className="font-medium text-white/90">6,840</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/50">{"Follower mới"}</span>
          <span className="font-medium text-white/90">+1,240</span>
        </div>
        <div className="h-px bg-white/10 my-1" />
        <div className="rounded-md bg-white/5 p-2">
          <p className="text-[10px] text-white/50 italic">
            {"\"Tuần này tăng trưởng 12.4% reach. Bài video ngắn hoạt động tốt nhất.\""}
          </p>
        </div>
      </div>
      <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-500/20 py-2 text-[11px] font-medium text-blue-300">
        <Download className="h-3 w-3" />
        {"Tải báo cáo PDF"}
      </button>
    </div>
  )
}

function CompetitorMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
        <Users className="h-3.5 w-3.5" />
        {"So sánh"}
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div />
        <div className="text-[10px] font-semibold text-blue-400">{"Bạn"}</div>
        <div className="text-[10px] font-semibold text-white/50">@other</div>
        {[
          ["Followers", "14.7K", "13.1K"],
          ["Eng rate", "18.6%", "11.2%"],
          ["Posts/wk", "5", "7"],
        ].map(([label, you, them]) => (
          <Fragment key={label}>
            <div className="text-left text-[10px] text-white/50">{label}</div>
            <div className="text-[10px] font-medium text-white/90">{you}</div>
            <div className="text-[10px] text-white/40">{them}</div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function AIMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
        <MessageSquare className="h-3.5 w-3.5" />
        {"Trợ lý AI"}
      </div>
      <div className="flex gap-2 mb-3">
        {["Chuyên nghiệp", "Thân thiện", "Viral"].map((tone) => (
          <span key={tone} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tone === "Thân thiện" ? "bg-blue-500/30 text-blue-300" : "bg-white/5 text-white/40"}`}>
            {tone}
          </span>
        ))}
      </div>
      <div className="rounded-lg bg-white/5 p-3">
        <p className="text-[11px] leading-relaxed text-white/70">
          {"\"Mùa hè này, hãy để phong cách nói lên câu chuyện của bạn! Khám phá BST mới nhất — từ streetwear đến minimal.\""}
        </p>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {["#fashion2025", "#streetstyle", "#muahe", "#ootd", "#minimal"].map((tag) => (
          <span key={tag} className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[9px] font-medium text-blue-300">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

const mockupMap: Record<string, React.FC> = {
  performance: PerformanceMockup,
  heatmap: HeatmapMockup,
  report: ReportMockup,
  competitor: CompetitorMockup,
  ai: AIMockup,
}

export function FeaturesSection() {
  return (
    <section className="bg-[#111827] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold tracking-tight text-white">
          {"Tính năng nổi bật"}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-base text-white/50">
          {"Tất cả đều có sẵn ngay từ ngày đầu — không hạn chế, không khoá."}
        </p>

        <div className="mt-14 flex flex-col gap-16">
          {features.map((feat, idx) => {
            const MockupComp = mockupMap[feat.mockup]
            const isReversed = idx % 2 === 1
            return (
              <div
                key={feat.title}
                className={`flex flex-col items-center gap-10 lg:flex-row ${isReversed ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="max-w-md">
                  <h3 className="text-2xl font-bold text-white">{feat.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/60">{feat.desc}</p>
                </div>
                <div className="w-full max-w-sm flex-1">
                  {MockupComp && <MockupComp />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
