"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Eye,
  Heart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Search,
  Image as ImageIcon,
  UserPlus,
  BarChart3,
  Zap,
  Loader2,
  MapPin,
  Plus,
  Minus,
  Timer,
  Target,
  PlayCircle,
} from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts"

/* ───── Date range options ───── */
const dateRanges = [
  { key: "7d", label: "7 ngày" },
  { key: "30d", label: "30 ngày" },
  { key: "90d", label: "3 tháng" },
  { key: "custom", label: "Tùy chỉnh" },
]

const platformTabs = [
  { key: "all", label: "Tất cả" },
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
]

/* ───── Section A — KPI cards ───── */
const overviewKPIs = [
  { label: "Tổng tiếp cận", value: "482,300", change: "+15.2%", up: true, icon: Eye, insight: "Tăng ổn định, bài viết viral tốt" },
  { label: "Tổng tương tác", value: "89,700", change: "+8.6%", up: true, icon: Heart, insight: "Tương tác khá tốt, tiếp tục duy trì" },
  { label: "Người theo dõi mới", value: "2,340", change: "+22.1%", up: true, icon: Users, insight: "Tăng trưởng mạnh, hơn trung bình ngành" },
  { label: "Tỉ lệ tương tác TB", value: "18.6%", change: "-1.3%", up: false, icon: TrendingUp, insight: "Giảm nhẹ, nên tăng tần suất đăng bài" },
]

/* ───── Section A — Advanced KPI cards ───── */
const advancedKPIs = [
  {
    label: "Tỷ lệ hoàn thành",
    sublabel: "Completion Rate",
    value: "72.4%",
    change: "+4.1%",
    up: true,
    icon: PlayCircle,
    insight: "Cao hơn TB ngành (~65%), nội dung hấp dẫn",
  },
  {
    label: "Thời gian xem TB",
    sublabel: "Avg. View Duration",
    value: "1:48",
    change: "+12s",
    up: true,
    icon: Timer,
    insight: "Tăng đều, khán giả xem lâu hơn mỗi tuần",
  },
  {
    label: "Tỷ lệ chuyển đổi",
    sublabel: "Conversion Rate",
    value: "3.2%",
    change: "-0.3%",
    up: false,
    icon: Target,
    insight: "Giảm nhẹ, cần tối ưu CTA trong bài",
  },
]

/* ───── Section B — Dual-line chart data (30 days) ───── */
const trendData = [
  { date: "01/03", reach: 14200, engagement: 2800 },
  { date: "03/03", reach: 15800, engagement: 3100 },
  { date: "05/03", reach: 13900, engagement: 2600 },
  { date: "07/03", reach: 17400, engagement: 3400 },
  { date: "09/03", reach: 19200, engagement: 3900 },
  { date: "11/03", reach: 16500, engagement: 3200 },
  { date: "13/03", reach: 21000, engagement: 4200 },
  { date: "15/03", reach: 18600, engagement: 3700 },
  { date: "17/03", reach: 22400, engagement: 4600 },
  { date: "19/03", reach: 20100, engagement: 4100 },
  { date: "21/03", reach: 24800, engagement: 5200 },
  { date: "23/03", reach: 23200, engagement: 4800 },
  { date: "25/03", reach: 26100, engagement: 5500 },
  { date: "27/03", reach: 24500, engagement: 5000 },
  { date: "29/03", reach: 28300, engagement: 5900 },
]

/* ───── Section B — Donut chart: interaction type distribution ───── */
const interactionTypes = [
  { name: "Likes", value: 52400, color: "#2563EB" },
  { name: "Comments", value: 18200, color: "#10B981" },
  { name: "Shares", value: 12600, color: "#F59E0B" },
  { name: "Saves", value: 6500, color: "#8B5CF6" },
]
const totalInteractions = interactionTypes.reduce((s, i) => s + i.value, 0)

/* ───── Section C — Top posts table data ───── */
type SortField = "reach" | "engagement" | "ratio" | "date"
type SortDir = "asc" | "desc"

const topPostsData = [
  {
    content: "10 mẹo tăng followers Instagram trong 2025",
    platform: "Instagram",
    platformColor: "#E4405F",
    reach: 45200,
    engagement: 5780,
    ratio: 12.8,
    date: "2025-03-28",
  },
  {
    content: "Hướng dẫn chạy ads Facebook hiệu quả",
    platform: "Facebook",
    platformColor: "#1877F2",
    reach: 38900,
    engagement: 3968,
    ratio: 10.2,
    date: "2025-03-26",
  },
  {
    content: "Trend challenge #SocialSense việt nam",
    platform: "TikTok",
    platformColor: "#111827",
    reach: 62100,
    engagement: 11489,
    ratio: 18.5,
    date: "2025-03-25",
  },
  {
    content: "Story Q&A: Hỏi đáp về Social Media",
    platform: "Instagram",
    platformColor: "#E4405F",
    reach: 28400,
    engagement: 4288,
    ratio: 15.1,
    date: "2025-03-24",
  },
  {
    content: "Livestream: Tips content marketing hiệu quả",
    platform: "Facebook",
    platformColor: "#1877F2",
    reach: 34600,
    engagement: 3391,
    ratio: 9.8,
    date: "2025-03-23",
  },
  {
    content: "Review công cụ lên lịch đăng bài tốt nhất",
    platform: "TikTok",
    platformColor: "#111827",
    reach: 51800,
    engagement: 8288,
    ratio: 16.0,
    date: "2025-03-22",
  },
  {
    content: "Bí quyết viết caption thu hút",
    platform: "Instagram",
    platformColor: "#E4405F",
    reach: 32100,
    engagement: 4174,
    ratio: 13.0,
    date: "2025-03-21",
  },
  {
    content: "Phân tích xu hướng Reels tháng 3",
    platform: "Facebook",
    platformColor: "#1877F2",
    reach: 27800,
    engagement: 3058,
    ratio: 11.0,
    date: "2025-03-20",
  },
  {
    content: "Đối chiến lược nội dung đa nền tảng",
    platform: "TikTok",
    platformColor: "#111827",
    reach: 44300,
    engagement: 6645,
    ratio: 15.0,
    date: "2025-03-19",
  },
  {
    content: "Cách tạo video ngắn viral trên TikTok",
    platform: "TikTok",
    platformColor: "#111827",
    reach: 58400,
    engagement: 10512,
    ratio: 18.0,
    date: "2025-03-18",
  },
]

function formatNum(n: number) {
  return n.toLocaleString("vi-VN")
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })
}

/* ───── Section E — User comparison data ───── */
const comparisonGrowthData = [
  { month: "T10", you: 8200, other: 9400 },
  { month: "T11", you: 9100, other: 10100 },
  { month: "T12", you: 10600, other: 10800 },
  { month: "T01", you: 11400, other: 11500 },
  { month: "T02", you: 13100, other: 12200 },
  { month: "T03", you: 14740, other: 13100 },
]

const comparisonMetrics = [
  {
    label: "Tăng trưởng followers",
    you: "+79.8%",
    other: "+39.4%",
    youBetter: true,
    icon: UserPlus,
  },
  {
    label: "Tương tác TB/bài",
    you: "1,420",
    other: "980",
    youBetter: true,
    icon: Heart,
  },
  {
    label: "Tần suất đăng",
    you: "5 bài/tuần",
    other: "7 bài/tuần",
    youBetter: false,
    icon: BarChart3,
  },
  {
    label: "Tỉ lệ tương tác",
    you: "18.6%",
    other: "11.2%",
    youBetter: true,
    icon: Zap,
  },
]

/* ═══════════════════ COMPONENT ═══════════════════ */
export function AnalyticsContent() {
  const [dateRange, setDateRange] = useState("30d")
  const [platform, setPlatform] = useState("all")
  const [sortField, setSortField] = useState<SortField>("reach")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [compareHandle, setCompareHandle] = useState("@marketing.vn")
  const [isComparing, setIsComparing] = useState(false)
  const [expandEngagement, setExpandEngagement] = useState(false)
  const [engagementTooltip, setEngagementTooltip] = useState<string | null>(null)

  const handleCompare = async () => {
    if (!compareHandle.trim()) {
      toast.error("Vui lòng nhập tên người dùng để so sánh.")
      return
    }
    setIsComparing(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsComparing(false)
    toast.success(`Đang so sánh với ${compareHandle}`, {
      description: "Dữ liệu đã được cập nhật theo người dùng bạn chọn.",
    })
  }

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "desc" ? "asc" : "desc")
    } else {
      setSortField(field)
      setSortDir("desc")
    }
  }

  const sortedPosts = [...topPostsData].sort((a, b) => {
    const av = a[sortField]
    const bv = b[sortField]
    if (typeof av === "string" && typeof bv === "string") {
      return sortDir === "desc" ? bv.localeCompare(av) : av.localeCompare(bv)
    }
    return sortDir === "desc" ? (bv as number) - (av as number) : (av as number) - (bv as number)
  })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-3 w-3 text-muted-foreground/40" />
    return sortDir === "desc" ? (
      <ChevronDown className="h-3 w-3 text-primary" />
    ) : (
      <ChevronUp className="h-3 w-3 text-primary" />
    )
  }

  return (
    <main className="flex-1 overflow-y-auto bg-background p-6">
      <div className="flex flex-col gap-6">
        {/* ── Top filters ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-lg bg-card p-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            {dateRanges.map((d) => (
              <button
                key={d.key}
                onClick={() => setDateRange(d.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  dateRange === d.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-card p-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            {platformTabs.map((p) => (
              <button
                key={p.key}
                onClick={() => setPlatform(p.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  platform === p.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Section A — KPI cards ── */}
        <div className="grid grid-cols-4 gap-4">
          {overviewKPIs.map((kpi) => {
            const isEngagement = kpi.label === "Tổng tương tác"
            const isReach = kpi.label === "Tổng tiếp cận"
            const engBreakdown = [
              { label: "likes", value: "52,400", up: true, insight: "Người dùng 25–34 tuổi chiếm 61% lượt like — nhóm này phản hồi tốt nhất với nội dung video ngắn và infographic. Tập trung sản xuất định dạng này sẽ tiếp tục thúc đẩy lượt like." },
              { label: "share", value: "18,200", up: true, insight: "Tỷ lệ share tăng 14% so với kỳ trước, chủ yếu đến từ các bài có tiêu đề dạng 'How-to' và danh sách. Đây là tín hiệu tốt cho reach tự nhiên." },
              { label: "cmts", value: "7,300", up: false, insight: "Lượt bình luận giảm nhẹ do tần suất đăng bài chưa đều. Thêm câu hỏi cuối bài và CTA rõ ràng có thể tăng comment lên 20–30%." },
            ]
            const topCities = [
              { city: "TP. Hồ Chí Minh", pct: "38.4%", value: "185,200" },
              { city: "Hà Nội", pct: "24.1%", value: "116,300" },
              { city: "Đà Nẵng", pct: "9.7%", value: "46,800" },
            ]
            return (
              <Card key={kpi.label} className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                      <kpi.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 text-xs font-medium ${ kpi.up ? "text-emerald-600" : "text-red-500" }`}>
                        {kpi.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                        {kpi.change}
                      </div>
                      {isEngagement && (
                        <button
                          onClick={() => { setExpandEngagement(!expandEngagement); setEngagementTooltip(null) }}
                          className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {expandEngagement ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{kpi.label}</p>

                  {/* Engagement breakdown */}
                  {isEngagement && expandEngagement && (
                    <div className="mt-3 flex flex-col gap-1.5">
                      {engBreakdown.map((item) => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {item.up
                                ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                                : <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />}
                              <span className={`text-xs font-semibold ${ item.up ? "text-emerald-600" : "text-red-500" }`}>
                                {item.value} {item.label}
                              </span>
                            </div>
                            <button
                              onClick={() => setEngagementTooltip(engagementTooltip === item.label ? null : item.label)}
                              className="flex h-4 w-4 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary transition-colors text-[10px] font-bold"
                            >
                              +
                            </button>
                          </div>
                          {engagementTooltip === item.label && (
                            <div className="mt-1.5 rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground leading-relaxed">
                              {item.insight}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reach top cities */}
                  {isReach && (
                    <div className="mt-3 flex flex-col gap-1.5">
                      {topCities.map((c, i) => (
                        <div key={c.city} className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-muted-foreground w-3">{i + 1}</span>
                          <MapPin className="h-3 w-3 shrink-0 text-primary" />
                          <span className="flex-1 text-xs text-foreground font-medium truncate">{c.city}</span>
                          <span className="text-xs font-semibold text-primary">{c.pct}</span>
                        </div>
                      ))}
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        TP.HCM tiếp tục dẫn đầu với <span className="font-semibold text-foreground">185,200</span> lượt tiếp cận — tăng 18% so với tháng trước nhờ chiến dịch hashtag địa phương. Hà Nội tăng trưởng ổn định ở mức <span className="font-semibold text-foreground">+11.3%</span>. Đà Nẵng là điểm bất ngờ: mặc dù quy mô nhỏ hơn nhưng tỷ lệ tương tác trên mỗi tiếp cận cao nhất (<span className="font-semibold text-foreground">22.4%</span>), cho thấy cộng đồng tại đây rất gắn kết — đây là thị trường tiềm năng nên đầu tư thêm nội dung được bản địa hoá.
                      </p>
                    </div>
                  )}

                  {!isEngagement && !isReach && (
                    <p className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${ kpi.up ? "text-emerald-600" : "text-amber-500" }`}>
                      {kpi.up
                        ? <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                        : <ArrowDownRight className="h-3.5 w-3.5 shrink-0" />}
                      {kpi.insight}
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* ── Advanced KPI cards (Completion / View Duration / Conversion) ── */}
        <div className="grid grid-cols-3 gap-4">
          {advancedKPIs.map((kpi) => (
            <Card key={kpi.label} className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <kpi.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${kpi.up ? "text-emerald-600" : "text-red-500"}`}>
                    {kpi.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {kpi.change}
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{kpi.label}</p>
                <p className="text-xs text-muted-foreground/70">{kpi.sublabel}</p>
                <p className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${kpi.up ? "text-emerald-600" : "text-amber-500"}`}>
                  {kpi.up
                    ? <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    : <ArrowDownRight className="h-3.5 w-3.5 shrink-0" />}
                  {kpi.insight}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Section B — Charts row ── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Dual-line chart */}
          <Card className="col-span-8 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-foreground">
                {"Xu hướng tiếp cận & tương tác"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    axisLine={{ stroke: "#E5E7EB" }}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: "#9CA3AF", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #E5E7EB",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                      fontSize: 12,
                    }}
                    formatter={(value: number, name: string) => [
                      formatNum(value),
                      name === "reach" ? "Tiếp cận" : "Tương tác",
                    ]}
                    labelFormatter={(label) => `Ngày ${label}`}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12 }}
                    formatter={(value) => (value === "reach" ? "Tiếp cận" : "Tương tác")}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="reach"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 4, fill: "#2563EB" }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="engagement"
                    stroke="#9CA3AF"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                    activeDot={{ r: 4, fill: "#9CA3AF" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Donut chart — Interaction type distribution */}
          <Card className="col-span-4 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-foreground">
                {"Phân phối loại tương tác"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={interactionTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                    paddingAngle={2}
                  >
                    {interactionTypes.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #E5E7EB",
                      fontSize: 12,
                    }}
                    formatter={(value: number, name: string) => [
                      `${formatNum(value)} (${((value / totalInteractions) * 100).toFixed(1)}%)`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
                {interactionTypes.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">
                      {item.name} ({((item.value / totalInteractions) * 100).toFixed(0)}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Section C — Top posts table ── */}
        <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">{"Top bài viết"}</CardTitle>
            <Link href="/analytics" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              {"Xem tất cả"} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="w-10 px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground" />
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      {"Nội dung"}
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      {"Nền tảng"}
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground">
                      <button onClick={() => toggleSort("reach")} className="inline-flex items-center gap-1">
                        {"Tiếp cận"} <SortIcon field="reach" />
                      </button>
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground">
                      <button onClick={() => toggleSort("engagement")} className="inline-flex items-center gap-1">
                        {"Tương tác"} <SortIcon field="engagement" />
                      </button>
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground">
                      <button onClick={() => toggleSort("ratio")} className="inline-flex items-center gap-1">
                        {"Tỉ lệ"} <SortIcon field="ratio" />
                      </button>
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground">
                      <button onClick={() => toggleSort("date")} className="inline-flex items-center gap-1">
                        {"Ngày đăng"} <SortIcon field="date" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPosts.map((post, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0 transition-colors hover:bg-secondary/30"
                    >
                      {/* Thumbnail placeholder */}
                      <td className="px-4 py-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </td>
                      <td className="max-w-[220px] truncate px-4 py-3 text-sm font-medium text-foreground">
                        {post.content}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: post.platformColor }} />
                          <span className="text-xs text-muted-foreground">{post.platform}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-foreground">{formatNum(post.reach)}</td>
                      <td className="px-4 py-3 text-right text-sm text-foreground">{formatNum(post.engagement)}</td>
                      <td className="px-4 py-3 text-right">
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs hover:bg-emerald-50">
                          {post.ratio}%
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-muted-foreground">{formatDate(post.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ── Section D — AI Insight card ── */}
        <Card className="border-l-4 border-l-primary border-t-0 border-r-0 border-b-0 bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardContent className="flex items-start gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-foreground">Chuyên gia phân tích</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {"Bài đăng dạng video của bạn đạt tương tác cao hơn "}
                <span className="font-semibold text-foreground">{"2.4×"}</span>
                {" so với ảnh tĩnh trong 30 ngày qua. Gợi ý: Tăng tần suất video lên "}
                <span className="font-semibold text-foreground">{"3 bài/tuần"}</span>.
              </p>
              <Link href="/ai-studio" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                {"Tạo bài video ngay"} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* ── Section E — So với người dùng khác (fully functional) ── */}
        <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-semibold text-foreground">
                  {"So với người dùng khác"}
                </CardTitle>
                <Badge className="bg-accent text-primary hover:bg-accent text-[10px] font-semibold">
                  {"Trải nghiệm"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={compareHandle}
                    onChange={(e) => setCompareHandle(e.target.value)}
                    className="h-8 w-52 rounded-lg pl-8 text-xs"
                    placeholder={"Nhập tên người dùng..."}
                  />
                </div>
                <Button size="sm" variant="secondary" className="h-8 rounded-lg text-xs font-medium" onClick={handleCompare} disabled={isComparing}>
                  {isComparing ? (
                    <><Loader2 className="mr-1.5 h-3 w-3 animate-spin" />{"Đang so sánh..."}</>
                  ) : "So sánh"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {/* User profile comparison header */}
            <div className="flex items-center gap-6 rounded-xl border border-border p-4">
              <div className="flex flex-1 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  SS
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">@socialsense.vn</p>
                  <p className="text-xs text-muted-foreground">{"Bạn • 14,740 followers"}</p>
                </div>
                <Badge className="ml-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-50 text-[10px]">
                  {"Bạn"}
                </Badge>
              </div>
              <div className="text-center text-xs font-semibold text-muted-foreground">VS</div>
              <div className="flex flex-1 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-muted-foreground">
                  MV
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{compareHandle}</p>
                  <p className="text-xs text-muted-foreground">{"13,100 followers"}</p>
                </div>
              </div>
            </div>

            {/* Growth chart — your followers vs other user's followers over 6 months */}
            <div>
              <p className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {"Tăng trưởng followers (6 tháng gần nhất)"}
              </p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={comparisonGrowthData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    axisLine={{ stroke: "#E5E7EB" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #E5E7EB",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                      fontSize: 12,
                    }}
                    formatter={(value: number, name: string) => [
                      formatNum(value),
                      name === "you" ? "Bạn" : compareHandle,
                    ]}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12 }}
                    formatter={(value) => (value === "you" ? "Bạn" : compareHandle)}
                  />
                  <Bar dataKey="you" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="other" fill="#D1D5DB" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Metric comparison grid */}
            <div>
              <p className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {"So sánh chỉ số chính"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {comparisonMetrics.map((m) => (
                  <div key={m.label} className="flex items-start gap-3 rounded-xl border border-border p-4">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${m.youBetter ? "bg-emerald-50" : "bg-amber-50"}`}>
                      <m.icon className={`h-4 w-4 ${m.youBetter ? "text-emerald-600" : "text-amber-600"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{m.label}</p>
                      <div className="mt-1.5 flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-base font-bold text-foreground">{m.you}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">vs</span>
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                          <span className="text-base font-medium text-muted-foreground">{m.other}</span>
                        </div>
                      </div>
                      {m.youBetter ? (
                        <p className="mt-1 flex items-center gap-1 text-sm font-medium text-emerald-600">
                          <ArrowUpRight className="h-4 w-4" />
                          {"Bạn đang làm tốt hơn!"}
                        </p>
                      ) : (
                        <p className="mt-1 flex items-center gap-1 text-sm font-medium text-amber-600">
                          <ArrowDownRight className="h-4 w-4" />
                          {"Có thể cải thiện"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight summary */}
            <div className="rounded-xl border border-primary/20 bg-accent p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{"Nhận xét từ AI"}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {"Tài khoản của bạn đang tăng trưởng "}
                    <span className="font-semibold text-foreground">{"nhanh hơn 40.4%"}</span>
                    {" so với "}{compareHandle}{" trong 6 tháng qua. Điểm mạnh: tỉ lệ tương tác cao hơn đáng kể ("}
                    <span className="font-semibold text-foreground">{"18.6% vs 11.2%"}</span>
                    {"). Điểm cần cải thiện: tần suất đăng bài — hãy tăng lên "}
                    <span className="font-semibold text-foreground">{"7 bài/tuần"}</span>
                    {" để tối ưu reach."}
                  </p>
                </div>
              </div>
            </div>

            {/* Encouraging CTA */}
            <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50/50 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <Heart className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-emerald-900">
                  {"Bạn đang làm rất tốt trong 18 ngày qua!"}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-emerald-700">
                  {"Tài khoản của bạn phát triển ấn tượng — hãy tiếp tục đồng hành cùng chúng tôi nhé! Chọn gói phù hợp để giữ đà tăng trưởng."}
                </p>
              </div>
              <Button size="sm" className="h-8 shrink-0 rounded-lg text-xs font-semibold" asChild>
                <Link href="/settings">
                  {"Tiếp tục cùng SocialSense"}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
