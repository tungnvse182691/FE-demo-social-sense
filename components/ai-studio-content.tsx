"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Sparkles,
  Copy,
  RefreshCw,
  Check,
  TrendingUp,
  Pen,
  History,
  CalendarPlus,
  Save,
  Trash2,
  Edit3,
  Search,
  Flame,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type SubPage = "trends" | "write" | "history"

const platformFilters = ["Facebook", "Instagram", "TikTok"]
const formatFilters = ["Caption", "Script", "Hashtag", "Thread"]

const trends = [
  {
    title: "Thử thách 30 ngày",
    platform: "TikTok",
    platformColor: "#111827",
    hotness: 94,
    desc: "Trend thử thách 30 ngày đang được nhiều creator áp dụng để tăng tương tác và followers.",
  },
  {
    title: "Behind the scenes",
    platform: "Instagram",
    platformColor: "#E4405F",
    hotness: 87,
    desc: "Người dùng yêu thích nội dung hậu trường chân thực, giúp tăng độ tin cậy thương hiệu.",
  },
  {
    title: "Mẹo nhỏ hữu ích",
    platform: "Facebook",
    platformColor: "#1877F2",
    hotness: 81,
    desc: "Nội dung đăng tips ngắn gọn đang được chia sẻ mạnh mẽ trên Facebook.",
  },
  {
    title: "Storytelling thương hiệu",
    platform: "Instagram",
    platformColor: "#E4405F",
    hotness: 78,
    desc: "Kể chuyện về hành trình thương hiệu giúp kết nối cảm xúc với người theo dõi.",
  },
  {
    title: "Review sản phẩm thật",
    platform: "TikTok",
    platformColor: "#111827",
    hotness: 75,
    desc: "Video review chân thực đang là xu hướng được tin tưởng và tương tác cao.",
  },
  {
    title: "Infographic tips",
    platform: "Facebook",
    platformColor: "#1877F2",
    hotness: 72,
    desc: "Hình ảnh infographic tổng hợp tips đang được lưu và chia sẻ nhiều.",
  },
]

const toneOptions = [
  { value: "professional", label: "Chuyên nghiệp" },
  { value: "fun", label: "Vui vẻ" },
  { value: "emotional", label: "Cảm xúc" },
  { value: "viral", label: "Viral" },
]

const historyItems = [
  {
    id: 1,
    date: "03/03/2025",
    platform: "Facebook",
    platformColor: "#1877F2",
    content: "Bạn đang tìm cách tăng tương tác trên mạng xã hội? Đây là 5 mẹo đơn giản mà hiệu quả giúp bạn tạo nội dung thu hút hơn!",
    status: "published" as const,
  },
  {
    id: 2,
    date: "02/03/2025",
    platform: "Instagram",
    platformColor: "#E4405F",
    content: "5 bí kíp tăng followers thật sự hiệu quả! Không cần chạy ads, không cần mua followers — chỉ cần làm đúng 5 bước này...",
    status: "draft" as const,
  },
  {
    id: 3,
    date: "01/03/2025",
    platform: "TikTok",
    platformColor: "#111827",
    content: "POV: Bạn vừa học được 5 mẹo tăng tương tác mà chưa ai chỉ cho bạn #LearnOnTikTok #MarketingVietNam",
    status: "saved" as const,
  },
  {
    id: 4,
    date: "28/02/2025",
    platform: "Facebook",
    platformColor: "#1877F2",
    content: "Hướng dẫn chạy quảng cáo Facebook hiệu quả cho người mới bắt đầu. Bước 1: Xác định đối tượng mục tiêu của bạn...",
    status: "published" as const,
  },
  {
    id: 5,
    date: "27/02/2025",
    platform: "Instagram",
    platformColor: "#E4405F",
    content: "Carousel: 10 sai lầm phổ biến khi làm content marketing và cách khắc phục từng lỗi một. Swipe để xem chi tiết!",
    status: "saved" as const,
  },
  {
    id: 6,
    date: "26/02/2025",
    platform: "TikTok",
    platformColor: "#111827",
    content: "Script video: Hook đầu tiên là yếu tố quyết định. Hãy bắt đầu bằng 1 câu hỏi hoặc 1 tình huống bất ngờ...",
    status: "draft" as const,
  },
]

const generatedOutput = {
  text: `Bạn đang tìm cách tăng tương tác trên mạng xã hội? Đây là 5 mẹo đơn giản mà hiệu quả giúp bạn tạo nội dung thu hút hơn! 💡

1. Đặt câu hỏi mở cho người đọc — khởi tạo cuộc trò chuyện
2. Sử dụng hình ảnh chất lượng cao — thu hút từ cái nhìn đầu tiên
3. Đăng bài vào giờ vàng (18:00 - 20:00) — tiếp cận tối đa
4. Tạo chuỗi nội dung liên tục — xây dựng thói quen theo dõi
5. Tương tác lại với comment — thuật toán sẽ ưu tiên bài của bạn

Hãy lưu bài này và thử áp dụng ngay hôm nay nhé! 🚀

#SocialMedia #MarketingTips #ContentCreator #SocialSenseVN`,
  charCount: 412,
  charLimit: 500,
  platform: "Facebook",
}

export function AIStudioContent() {
  const [activeSubPage, setActiveSubPage] = useState<SubPage>("trends")
  const [activePlatformFilter, setActivePlatformFilter] = useState<string | null>(null)
  const [activeFormatFilter, setActiveFormatFilter] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [activeTone, setActiveTone] = useState("professional")
  const [showOutput, setShowOutput] = useState(false)
  const [historySearch, setHistorySearch] = useState("")
  const [historyPlatformFilter, setHistoryPlatformFilter] = useState<string>("all")
  const [trendHotness, setTrendHotness] = useState(trends.map((t) => t.hotness))
  const [history, setHistory] = useState(historyItems)

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUseTrend = (trend: typeof trends[0]) => {
    setPrompt(`Tạo bài về trend: ${trend.title} — ${trend.desc}`)
    setActiveSubPage("write")
    toast.success(`Đã tải trend "${trend.title}" vào editor!`)
  }

  const handleRefreshTrends = () => {
    setTrendHotness((prev) => prev.map((h) => Math.min(99, Math.max(50, h + Math.floor(Math.random() * 11) - 5))))
    toast.success("Đã cập nhật xu hướng mới nhất!")
  }

  const handleSchedule = () => {
    toast.success("Đã thêm vào lịch đăng!", { description: "Kiểm tra trong mục Lịch đăng bài." })
  }

  const handleSaveDraft = () => {
    const newItem = {
      id: history.length + 1,
      date: new Date().toLocaleDateString("vi-VN"),
      platform: "Facebook",
      platformColor: "#1877F2",
      content: generatedOutput.text.slice(0, 120) + "...",
      status: "draft" as const,
    }
    setHistory((prev) => [newItem, ...prev])
    toast.success("Đã lưu bản nháp!", { description: "Xem lại trong Lịch sử cá nhân hóa." })
  }

  const handleRegenerate = () => {
    setShowOutput(false)
    setTimeout(() => setShowOutput(true), 400)
    toast.success("Đang tạo lại nội dung...")
  }

  const handleHistoryDelete = (id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
    toast.success("Đã xoá nội dung khỏi lịch sử.")
  }

  const handleHistoryEdit = (item: typeof historyItems[0]) => {
    setPrompt(item.content)
    setActiveSubPage("write")
    toast.success(`Đang chỉnh sửa bài viết ngày ${item.date}`)
  }

  const handleHistorySchedule = (item: typeof historyItems[0]) => {
    toast.success("Đã thêm vào lịch đăng!", { description: `Bài ${item.platform} — ${item.date}` })
  }

  const subPages = [
    { id: "trends" as SubPage, label: "Gợi ý theo Trend", icon: TrendingUp },
    { id: "write" as SubPage, label: "Viết Caption / Script", icon: Pen },
    { id: "history" as SubPage, label: "Lịch sử cá nhân hóa", icon: History },
  ]

  const statusBadge = (status: "published" | "draft" | "saved") => {
    const styles = {
      published: "bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
      draft: "bg-amber-50 text-amber-700 hover:bg-amber-50",
      saved: "bg-blue-50 text-blue-700 hover:bg-blue-50",
    }
    const labels = {
      published: "Đã đăng",
      draft: "Bản nháp",
      saved: "Đã lưu",
    }
    return (
      <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0", styles[status])}>
        {labels[status]}
      </Badge>
    )
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Left Panel */}
      <div className="flex w-[360px] shrink-0 flex-col border-r border-border bg-card">
        {/* Sub-navigation */}
        <nav className="flex flex-col gap-1 p-4">
          {subPages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActiveSubPage(page.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left",
                activeSubPage === page.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <page.icon className="h-[18px] w-[18px] shrink-0" />
              {page.label}
            </button>
          ))}
        </nav>

        {/* Filter chips */}
        <div className="flex flex-col gap-4 border-t border-border px-4 pt-4 pb-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {"Nền tảng"}
            </p>
            <div className="flex flex-wrap gap-2">
              {platformFilters.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePlatformFilter(activePlatformFilter === p ? null : p)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    activePlatformFilter === p
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {"Định dạng"}
            </p>
            <div className="flex flex-wrap gap-2">
              {formatFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFormatFilter(activeFormatFilter === f ? null : f)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    activeFormatFilter === f
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick stats in left panel */}
        <div className="mt-auto border-t border-border p-4">
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>{"Nội dung đã tạo tháng này"}</span>
              <span className="font-semibold text-foreground">47</span>
            </div>
            <div className="flex justify-between">
              <span>{"Đã đăng"}</span>
              <span className="font-semibold text-emerald-600">32</span>
            </div>
            <div className="flex justify-between">
              <span>{"Bản nháp"}</span>
              <span className="font-semibold text-amber-600">15</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Main Workspace */}
      <div className="flex-1 overflow-y-auto bg-background p-6">
        {/* Sub-page 2A: Trends */}
        {activeSubPage === "trends" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {"Xu hướng đang nổi bật tuần này"}
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {"Cập nhật lúc 08:00 sáng nay"}
                </p>
              </div>
              <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs" onClick={handleRefreshTrends}>
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                {"Làm mới"}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {trends.map((trend, idx) => (
                <Card
                  key={trend.title}
                  className="border border-border bg-card shadow-none transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  <CardContent className="flex flex-col gap-3 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground">
                        {trend.title}
                      </h3>
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${trend.platformColor}12` }}
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: trend.platformColor }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{trend.platform}</span>
                      <span className="text-xs text-muted-foreground">{"•"}</span>
                      <div className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-primary" />
                        <span className="text-xs font-semibold text-primary">
                          {"Độ hot"} {trendHotness[idx]}%
                        </span>
                      </div>
                    </div>

                    {/* Hotness bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${trendHotness[idx]}%` }}
                      />
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {trend.desc}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-1 h-8 w-full rounded-lg text-xs font-medium hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleUseTrend(trend)}
                    >
                      {"Tạo bài về trend này →"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Sub-page 2B: Write Caption / Script */}
        {activeSubPage === "write" && (
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-foreground">
              {"Viết Caption / Script"}
            </h2>

            {/* Input Section */}
            <Card className="border border-border bg-card shadow-none">
              <CardContent className="flex flex-col gap-5 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      {"Chọn nền tảng"}
                    </label>
                    <Select defaultValue="facebook">
                      <SelectTrigger className="h-9 rounded-lg text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      {"Loại nội dung"}
                    </label>
                    <Select defaultValue="caption">
                      <SelectTrigger className="h-9 rounded-lg text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="caption">Caption</SelectItem>
                        <SelectItem value="script">Script</SelectItem>
                        <SelectItem value="hashtags">Hashtags</SelectItem>
                        <SelectItem value="thread">Thread</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    {"Mô tả ý tưởng của bạn"}
                  </label>
                  <Textarea
                    placeholder="Mô tả ý tưởng của bạn..."
                    className="min-h-[120px] resize-none rounded-lg border-border text-sm"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      {"Giọng điệu"}
                    </label>
                    <div className="flex gap-2">
                      {toneOptions.map((tone) => (
                        <button
                          key={tone.value}
                          onClick={() => setActiveTone(tone.value)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                            activeTone === tone.value
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          )}
                        >
                          {tone.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="rounded-lg font-semibold"
                    size="sm"
                    onClick={() => setShowOutput(true)}
                  >
                    <Sparkles className="mr-1.5 h-4 w-4" />
                    {"Tạo nội dung"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output Section */}
            {showOutput && (
              <Card className="border border-border border-t-[3px] border-t-primary bg-card shadow-none">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      {"Kết quả"}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className={cn(
                        "font-semibold",
                        generatedOutput.charCount > generatedOutput.charLimit ? "text-destructive" : "text-foreground"
                      )}>
                        {generatedOutput.charCount}
                      </span>
                      <span>/</span>
                      <span>/{generatedOutput.charLimit} ký tự ({generatedOutput.platform})</span>
                    </div>
                  </div>

                  <div className="whitespace-pre-line rounded-lg bg-secondary/50 p-4 text-sm leading-relaxed text-foreground">
                    {generatedOutput.text}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg text-xs"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="mr-1.5 h-3.5 w-3.5" />
                      )}
                      {copied ? "Đã copy" : "Copy"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg text-xs"
                      onClick={handleSchedule}
                    >
                      <CalendarPlus className="mr-1.5 h-3.5 w-3.5" />
                      {"Lên lịch ngay"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg text-xs"
                      onClick={handleSaveDraft}
                    >
                      <Save className="mr-1.5 h-3.5 w-3.5" />
                      {"Lưu bản nháp"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg text-xs"
                      onClick={handleRegenerate}
                    >
                      <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                      {"Tạo lại"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Sub-page 2C: History */}
        {activeSubPage === "history" && (
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-foreground">
              {"Lịch sử cá nhân hóa"}
            </h2>

            {/* Search + Filters */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm nội dung..."
                  className="h-9 rounded-lg pl-9 text-sm"
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                />
              </div>
              <Select
                value={historyPlatformFilter}
                onValueChange={setHistoryPlatformFilter}
              >
                <SelectTrigger className="h-9 w-40 rounded-lg text-sm">
                  <SelectValue placeholder="Nền tảng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-36 rounded-lg text-sm">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="published">Đã đăng</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                  <SelectItem value="saved">Đã lưu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* History List */}
            <Card className="border border-border bg-card shadow-none">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  {history.map((item, i) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary/30",
                        i < history.length - 1 && "border-b border-border"
                      )}
                    >
                      <span className="w-20 shrink-0 text-xs text-muted-foreground">
                        {item.date}
                      </span>
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${item.platformColor}12` }}
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: item.platformColor }}
                        />
                      </div>
                      <p className="flex-1 truncate text-sm text-foreground">
                        {item.content}
                      </p>
                      {statusBadge(item.status)}
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          aria-label="Edit"
                          onClick={() => handleHistoryEdit(item)}
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          aria-label="Schedule"
                          onClick={() => handleHistorySchedule(item)}
                        >
                          <CalendarPlus className="h-3.5 w-3.5" />
                        </button>
                        <button
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Delete"
                          onClick={() => handleHistoryDelete(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
