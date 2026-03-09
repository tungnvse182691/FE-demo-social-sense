"use client"

import { useState, useMemo } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Facebook,
  Instagram,
  Lightbulb,
  Pencil,
  Trash2,
  Sparkles,
  Upload,
  X,
  Video,
} from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- Types ---
type Platform = "facebook" | "instagram" | "tiktok"
type PostStatus = "scheduled" | "published" | "failed"
type ViewMode = "month" | "week" | "list"

interface ScheduledPost {
  id: number
  caption: string
  platform: Platform
  date: Date
  status: PostStatus
}

// --- Constants ---
const PLATFORM_CONFIG: Record<
  Platform,
  { label: string; chipBg: string; chipText: string; borderColor: string }
> = {
  facebook: {
    label: "Facebook",
    chipBg: "bg-blue-100",
    chipText: "text-blue-700",
    borderColor: "border-blue-500",
  },
  instagram: {
    label: "Instagram",
    chipBg: "bg-pink-100",
    chipText: "text-pink-700",
    borderColor: "border-pink-500",
  },
  tiktok: {
    label: "TikTok",
    chipBg: "bg-neutral-900",
    chipText: "text-neutral-50",
    borderColor: "border-neutral-900",
  },
}

const STATUS_CONFIG: Record<PostStatus, { label: string; bg: string; text: string }> = {
  scheduled: { label: "Lên lịch", bg: "bg-blue-50", text: "text-blue-700" },
  published: { label: "Đã đăng", bg: "bg-emerald-50", text: "text-emerald-700" },
  failed: { label: "Thất bại", bg: "bg-red-50", text: "text-red-700" },
}

const DAY_NAMES = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

function PlatformIcon({ platform, className }: { platform: Platform; className?: string }) {
  switch (platform) {
    case "facebook":
      return <Facebook className={className} />
    case "instagram":
      return <Instagram className={className} />
    case "tiktok":
      return <Video className={className} />
  }
}

// --- Sample Data ---
function getSamplePosts(): ScheduledPost[] {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  return [
    { id: 1, caption: "10 mẹo tăng tương tác trên Facebook cực hiệu quả", platform: "facebook", date: new Date(y, m, 5, 10, 0), status: "published" },
    { id: 2, caption: "Behind the scenes phiên chụp hình mới", platform: "instagram", date: new Date(y, m, 5, 18, 0), status: "published" },
    { id: 3, caption: "Trend challenge video mới cực hot", platform: "tiktok", date: new Date(y, m, 7, 12, 0), status: "scheduled" },
    { id: 4, caption: "Product showcase: BST mùa hè 2025", platform: "instagram", date: new Date(y, m, 9, 9, 0), status: "scheduled" },
    { id: 5, caption: "Tổng kết tuần — những điều đã làm được", platform: "facebook", date: new Date(y, m, 12, 17, 0), status: "scheduled" },
    { id: 6, caption: "Tips & Tricks: Cách quay video ngắn chuyên nghiệp", platform: "tiktok", date: new Date(y, m, 14, 15, 0), status: "scheduled" },
    { id: 7, caption: "Flash sale thông báo — giảm 50% hôm nay", platform: "facebook", date: new Date(y, m, 16, 8, 0), status: "scheduled" },
    { id: 8, caption: "Story Q&A session với fan", platform: "instagram", date: new Date(y, m, 18, 11, 0), status: "scheduled" },
    { id: 9, caption: "Review sản phẩm mới nhất", platform: "tiktok", date: new Date(y, m, 20, 19, 0), status: "scheduled" },
    { id: 10, caption: "Livestream thông báo sự kiện lớn", platform: "facebook", date: new Date(y, m, 22, 20, 0), status: "scheduled" },
    { id: 11, caption: "Carousel: 5 tips cho người mới bắt đầu", platform: "instagram", date: new Date(y, m, 25, 10, 0), status: "scheduled" },
    { id: 12, caption: "Duet challenge với KOL", platform: "tiktok", date: new Date(y, m, 27, 14, 0), status: "scheduled" },
  ]
}

// --- Calendar helpers ---
function getMonthName(month: number): string {
  const names = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ]
  return names[month]
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay() // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const days: { date: number; month: "prev" | "current" | "next"; fullDate: Date }[] = []

  // Previous month fill
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i
    days.push({ date: d, month: "prev", fullDate: new Date(year, month - 1, d) })
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: i, month: "current", fullDate: new Date(year, month, i) })
  }
  // Next month fill
  const remaining = 42 - days.length // 6 rows max
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: i, month: "next", fullDate: new Date(year, month + 1, i) })
  }

  return days
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isToday(d: Date) {
  return isSameDay(d, new Date())
}

function formatTime(d: Date) {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

function formatFullDate(d: Date) {
  const dayName = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"][d.getDay()]
  return `${dayName}, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} lúc ${formatTime(d)}`
}

// --- Component ---
export function SchedulerContent() {
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [posts, setPosts] = useState<ScheduledPost[]>(getSamplePosts)
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [newPostOpen, setNewPostOpen] = useState(false)

  // New post form state
  const [newPlatform, setNewPlatform] = useState<Platform>("facebook")
  const [newCaption, setNewCaption] = useState("")
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("18:00")

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const calendarDays = useMemo(() => getCalendarDays(year, month), [year, month])

  const postsByDate = useMemo(() => {
    const map = new Map<string, ScheduledPost[]>()
    posts.forEach((p) => {
      const key = `${p.date.getFullYear()}-${p.date.getMonth()}-${p.date.getDate()}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    })
    return map
  }, [posts])

  function getPostsForDay(d: Date) {
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    return postsByDate.get(key) || []
  }

  function navigateMonth(delta: number) {
    setCurrentDate(new Date(year, month + delta, 1))
  }

  function openPostDetail(post: ScheduledPost) {
    setSelectedPost(post)
    setDetailOpen(true)
  }

  function deletePost(id: number) {
    setPosts((prev) => prev.filter((p) => p.id !== id))
    setDetailOpen(false)
    setSelectedPost(null)
  }

  function handleSuggestCaption() {
    const suggestions: Record<Platform, string[]> = {
      facebook: [
        "✨ Hôm nay chúng tôi muốn chia sẻ với bạn một điều đặc biệt! Đừng bỏ lỡ cơ hội này nhé 🚀 #SocialMedia #Marketing",
        "💡 5 mẹo đơn giản giúp tăng tương tác bài đăng hiệu quả. Bạn đã thử chưa? Để lại bình luận bên dưới nhé!",
        "🎉 Tuần mới — cơ hội mới! Hôm nay bạn sẽ tạo ra điều gì tuyệt vời? Hãy cùng chúng tôi chinh phục mục tiêu! 💪",
      ],
      instagram: [
        "Living my best life ✨ | Swipe để xem toàn bộ bộ sưu tập mới nhất của chúng tôi! 🌟\n\n#ootd #fashion #lifestyle #minimal",
        "Behind the lens 📸 | Mỗi khoảnh khắc đều xứng đáng được ghi lại. Đây là câu chuyện hôm nay của chúng tôi.\n\n#photography #content #creative",
        "New drop 🔥 | BST mùa hè chính thức ra mắt! Link in bio để xem chi tiết và đặt hàng sớm nhé!\n\n#newcollection #summer #fashion",
      ],
      tiktok: [
        "POV: Bạn vừa tìm ra bí kíp tăng tương tác mà không ai chỉ cho bạn 👀 #LearnOnTikTok #MarketingTips #viral",
        "Thử ngay trend này và xem điều gì xảy ra 🤩 Duet với tôi nhé! #challenge #fyp #trending",
        "1 ngày làm content creator trông như thế nào? Cùng xem behind the scenes của tôi! 🎬 #behindthescenes #contentcreator #vlog",
      ],
    }
    const list = suggestions[newPlatform]
    const pick = list[Math.floor(Math.random() * list.length)]
    setNewCaption(pick)
    toast.success("Đã gợi ý caption!", { description: "Bạn có thể chỉnh sửa theo ý muốn." })
  }

  function handleNewPost() {
    if (!newCaption.trim()) {
      toast.error("Vui lòng viết nội dung bài đăng")
      return
    }
    if (!newDate) {
      toast.error("Vui lòng chọn ngày đăng")
      return
    }
    const [y2, m2, d2] = newDate.split("-").map(Number)
    const [h, min] = newTime.split(":").map(Number)
    const date = new Date(y2, m2 - 1, d2, h, min)
    const newP: ScheduledPost = {
      id: Date.now(),
      caption: newCaption,
      platform: newPlatform,
      date,
      status: "scheduled",
    }
    setPosts((prev) => [...prev, newP])
    setNewCaption("")
    setNewDate("")
    setNewTime("18:00")
    setNewPlatform("facebook")
    setNewPostOpen(false)
    toast.success("Đã lên lịch bài đăng!", { description: `${PLATFORM_CONFIG[newPlatform].label} — ${formatFullDate(date)}` })
  }

  // --- Week helpers ---
  const weekDays = useMemo(() => {
    const d = new Date(currentDate)
    const day = d.getDay()
    const monday = new Date(d)
    monday.setDate(d.getDate() - ((day + 6) % 7))
    return Array.from({ length: 7 }, (_, i) => {
      const wd = new Date(monday)
      wd.setDate(monday.getDate() + i)
      return wd
    })
  }, [currentDate])

  // Sorted list of upcoming posts
  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => a.date.getTime() - b.date.getTime()),
    [posts]
  )

  return (
    <main className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Best Time Smart Bar */}
      <div className="mx-8 mt-6 mb-4">
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
            <Lightbulb className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Thứ 4, 18:00 - 20:00</span>{" "}
            {"là khung giờ tốt nhất của bạn tuần này — dựa trên 30 ngày dữ liệu."}
          </p>
        </div>
      </div>

      {/* Top Controls */}
      <div className="flex items-center justify-between px-6 pb-4">
        <div className="flex items-center gap-3">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
            <TabsList className="h-9 bg-secondary">
              <TabsTrigger value="month" className="text-xs font-medium px-4">
                {"Tháng"}
              </TabsTrigger>
              <TabsTrigger value="week" className="text-xs font-medium px-4">
                {"Tuần"}
              </TabsTrigger>
              <TabsTrigger value="list" className="text-xs font-medium px-4">
                {"Danh sách"}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 ml-4">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[160px] text-center text-sm font-semibold text-foreground">
              {viewMode === "week"
                ? `${weekDays[0].getDate()}/${weekDays[0].getMonth() + 1} - ${weekDays[6].getDate()}/${weekDays[6].getMonth() + 1}/${year}`
                : `${getMonthName(month)}, ${year}`}
            </span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigateMonth(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button size="sm" className="h-9 rounded-lg font-semibold" onClick={() => setNewPostOpen(true)}>
          <Plus className="mr-1.5 h-4 w-4" />
          {"Lên lịch bài mới"}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {viewMode === "month" && (
          <MonthView
            calendarDays={calendarDays}
            getPostsForDay={getPostsForDay}
            onPostClick={openPostDetail}
          />
        )}

        {viewMode === "week" && (
          <WeekView
            weekDays={weekDays}
            getPostsForDay={getPostsForDay}
            onPostClick={openPostDetail}
          />
        )}

        {viewMode === "list" && (
          <ListView posts={sortedPosts} onPostClick={openPostDetail} />
        )}
      </div>

      {/* Post Detail Drawer */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{"Chi tiết bài đăng"}</SheetTitle>
            <SheetDescription>{"Xem và chỉnh sửa bài đăng đã lên lịch."}</SheetDescription>
          </SheetHeader>
          {selectedPost && (
            <PostDetail
              post={selectedPost}
              onDelete={() => deletePost(selectedPost.id)}
              onClose={() => setDetailOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* New Post Sheet */}
      <Sheet open={newPostOpen} onOpenChange={setNewPostOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
          <SheetHeader className="shrink-0 px-6 py-5 border-b border-border">
            <SheetTitle className="text-base font-bold">{"Lên lịch bài mới"}</SheetTitle>
            <SheetDescription className="text-xs">{"Chọn nền tảng, viết nội dung và lên lịch đăng bài."}</SheetDescription>
          </SheetHeader>

          <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5 flex flex-col gap-5">
            {/* Platform selector */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold text-foreground">{"Nền tảng"}</Label>
              <div className="flex gap-2">
                {(["facebook", "instagram", "tiktok"] as Platform[]).map((p) => {
                  const cfg = PLATFORM_CONFIG[p]
                  const sel = newPlatform === p
                  return (
                    <button
                      key={p}
                      onClick={() => setNewPlatform(p)}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-xs font-medium transition-all ${
                        sel
                          ? `${cfg.borderColor} ${cfg.chipBg} ${cfg.chipText}`
                          : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30"
                      }`}
                    >
                      <PlatformIcon platform={p} className="h-3.5 w-3.5" />
                      {cfg.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Media upload */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold text-foreground">{"Hình ảnh / Video"}</Label>
              <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/20 py-7 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="h-5 w-5" />
                  <span className="text-xs">{"Kéo thả hoặc click để chọn"}</span>
                  <span className="text-[10px] text-muted-foreground/60">{"PNG, JPG, MP4 — tối đa 50MB"}</span>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-foreground">{"Caption"}</Label>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground">{newCaption.length}/2200</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 gap-1 px-2 text-[11px] text-primary hover:text-primary"
                    onClick={handleSuggestCaption}
                  >
                    <Sparkles className="h-3 w-3" />
                    {"Gợi ý"}
                  </Button>
                </div>
              </div>
              <Textarea
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="Viết nội dung bài đăng tại đây..."
                className="min-h-[120px] resize-none text-sm"
                maxLength={2200}
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold text-foreground">{"Ngày đăng"}</Label>
                <Input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-semibold text-foreground">{"Giờ đăng"}</Label>
                <Input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Best time hint */}
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
              <p className="text-xs text-amber-800">
                <span className="font-semibold">Khung giờ tốt nhất:</span>{" Thứ 4, 18:00–20:00 "}
                — tỷ lệ tương tác cao hơn <span className="font-semibold">2.4×</span> trung bình.
              </p>
            </div>
          </div>

          {/* Sticky footer */}
          <div className="shrink-0 border-t border-border px-6 py-4">
            <Button
              className="w-full rounded-xl font-semibold"
              onClick={handleNewPost}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              {"Lên lịch"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  )
}

// ============ Sub Components ============

function PostChip({ post, onClick }: { post: ScheduledPost; onClick: () => void }) {
  const cfg = PLATFORM_CONFIG[post.platform]
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-1.5 rounded-md ${cfg.chipBg} px-2 py-1 text-left transition-opacity hover:opacity-80`}
    >
      <PlatformIcon platform={post.platform} className={`h-3 w-3 shrink-0 ${cfg.chipText}`} />
      <span className={`truncate text-[11px] font-medium ${cfg.chipText}`}>
        {post.caption.slice(0, 20)}
        {post.caption.length > 20 ? "..." : ""}
      </span>
    </button>
  )
}

// --- Month View ---
function MonthView({
  calendarDays,
  getPostsForDay,
  onPostClick,
}: {
  calendarDays: ReturnType<typeof getCalendarDays>
  getPostsForDay: (d: Date) => ScheduledPost[]
  onPostClick: (p: ScheduledPost) => void
}) {
  return (
    <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
      <CardContent className="p-0">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {DAY_NAMES.map((d) => (
            <div key={d} className="border-r border-border last:border-r-0 px-3 py-2.5 text-center text-xs font-semibold text-muted-foreground">
              {d}
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, idx) => {
            const dayPosts = getPostsForDay(day.fullDate)
            const today = isToday(day.fullDate)
            const isOtherMonth = day.month !== "current"
            return (
              <div
                key={idx}
                className={`relative min-h-[110px] border-b border-r border-border p-2 transition-colors last:border-r-0 [&:nth-child(7n)]:border-r-0 ${
                  isOtherMonth ? "bg-secondary/30" : "bg-card"
                } hover:bg-accent/20`}
              >
                <div
                  className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                    today
                      ? "bg-primary text-primary-foreground"
                      : isOtherMonth
                        ? "text-muted-foreground/50"
                        : "text-foreground"
                  }`}
                >
                  {day.date}
                </div>
                <div className="flex flex-col gap-1">
                  {dayPosts.slice(0, 3).map((p) => (
                    <PostChip key={p.id} post={p} onClick={() => onPostClick(p)} />
                  ))}
                  {dayPosts.length > 3 && (
                    <span className="px-1 text-[10px] font-medium text-muted-foreground">
                      +{dayPosts.length - 3} {"bài khác"}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// --- Week View ---
function WeekView({
  weekDays,
  getPostsForDay,
  onPostClick,
}: {
  weekDays: Date[]
  getPostsForDay: (d: Date) => ScheduledPost[]
  onPostClick: (p: ScheduledPost) => void
}) {
  const hours = Array.from({ length: 14 }, (_, i) => i + 7) // 7–20

  return (
    <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-[56px_repeat(7,1fr)]">
          {/* Header row */}
          <div className="border-b border-r border-border bg-secondary/40 p-2" />
          {weekDays.map((wd, i) => {
            const today = isToday(wd)
            return (
              <div
                key={i}
                className={`border-b border-border ${i < 6 ? "border-r" : ""} px-2 py-2.5 text-center ${today ? "bg-accent" : ""}`}
              >
                <div className="text-[11px] font-medium text-muted-foreground">
                  {DAY_NAMES[(wd.getDay() + 7) % 7]}
                </div>
                <div
                  className={`mt-0.5 text-base font-bold ${today ? "text-primary" : "text-foreground"}`}
                >
                  {wd.getDate()}
                </div>
              </div>
            )
          })}

          {/* Time rows */}
          {hours.map((hour) => (
            <div key={`row-${hour}`} className="contents">
              <div className="border-b border-r border-border bg-secondary/20 px-2 py-2 text-right text-[11px] text-muted-foreground">
                {hour}:00
              </div>
              {weekDays.map((wd, dayIdx) => {
                const dayPosts = getPostsForDay(wd).filter(
                  (p) => p.date.getHours() === hour
                )
                return (
                  <div
                    key={`cell-${hour}-${dayIdx}`}
                    className={`border-b border-border ${dayIdx < 6 ? "border-r" : ""} min-h-[44px] p-0.5 hover:bg-accent/20 transition-colors`}
                  >
                    {dayPosts.map((p) => (
                      <PostChip key={p.id} post={p} onClick={() => onPostClick(p)} />
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// --- List View ---
function ListView({
  posts,
  onPostClick,
}: {
  posts: ScheduledPost[]
  onPostClick: (p: ScheduledPost) => void
}) {
  return (
    <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {posts.map((post) => {
            const pCfg = PLATFORM_CONFIG[post.platform]
            const sCfg = STATUS_CONFIG[post.status]
            return (
              <button
                key={post.id}
                onClick={() => onPostClick(post)}
                className="flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-secondary/50"
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${pCfg.chipBg}`}>
                  <PlatformIcon platform={post.platform} className={`h-4 w-4 ${pCfg.chipText}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{post.caption}</p>
                  <p className="text-xs text-muted-foreground">{pCfg.label}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formatFullDate(post.date)}</span>
                </div>
                <Badge
                  variant="secondary"
                  className={`shrink-0 ${sCfg.bg} ${sCfg.text} text-[10px] px-2 py-0.5 font-medium hover:${sCfg.bg}`}
                >
                  {sCfg.label}
                </Badge>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// --- Post Detail ---
function PostDetail({
  post,
  onDelete,
  onClose,
}: {
  post: ScheduledPost
  onDelete: () => void
  onClose: () => void
}) {
  const pCfg = PLATFORM_CONFIG[post.platform]
  const sCfg = STATUS_CONFIG[post.status]

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Platform + Status */}
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${pCfg.chipBg}`}>
          <PlatformIcon platform={post.platform} className={`h-5 w-5 ${pCfg.chipText}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{pCfg.label}</p>
          <Badge
            variant="secondary"
            className={`mt-0.5 ${sCfg.bg} ${sCfg.text} text-[10px] font-medium hover:${sCfg.bg}`}
          >
            {sCfg.label}
          </Badge>
        </div>
      </div>

      {/* Time */}
      <div className="flex items-center gap-2 rounded-lg bg-secondary/60 px-4 py-3">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground font-medium">{formatFullDate(post.date)}</span>
      </div>

      {/* Caption */}
      <div>
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Caption</Label>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{post.caption}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1 gap-2" onClick={onClose}>
          <Pencil className="h-4 w-4" />
          {"Chỉnh sửa"}
        </Button>
        <Button variant="outline" className="flex-1 gap-2 text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
          {"Xóa"}
        </Button>
      </div>
    </div>
  )
}
