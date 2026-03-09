"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Eye,
  Heart,
  CalendarCheck,
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react"
import { PlansDialog } from "@/components/plans-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const performanceData = [
  { day: "T2", reach: 12400, engagement: 3200 },
  { day: "T3", reach: 15600, engagement: 4100 },
  { day: "T4", reach: 11200, engagement: 2800 },
  { day: "T5", reach: 18900, engagement: 5200 },
  { day: "T6", reach: 22100, engagement: 6800 },
  { day: "T7", reach: 19800, engagement: 5900 },
  { day: "CN", reach: 16500, engagement: 4500 },
]

const facebookData = [
  { day: "T2", reach: 5800, engagement: 1420, likes: 980, comments: 210, shares: 230 },
  { day: "T3", reach: 7200, engagement: 1830, likes: 1240, comments: 310, shares: 280 },
  { day: "T4", reach: 4900, engagement: 1100, likes: 760, comments: 180, shares: 160 },
  { day: "T5", reach: 8600, engagement: 2190, likes: 1510, comments: 390, shares: 290 },
  { day: "T6", reach: 10400, engagement: 2780, likes: 1920, comments: 470, shares: 390 },
  { day: "T7", reach: 9100, engagement: 2340, likes: 1600, comments: 420, shares: 320 },
  { day: "CN", reach: 7600, engagement: 1890, likes: 1300, comments: 330, shares: 260 },
]

const instagramData = [
  { day: "T2", reach: 4200, engagement: 1140, likes: 870, comments: 160, saves: 110 },
  { day: "T3", reach: 5100, engagement: 1390, likes: 1060, comments: 190, saves: 140 },
  { day: "T4", reach: 3900, engagement: 980, likes: 740, comments: 130, saves: 110 },
  { day: "T5", reach: 6400, engagement: 1720, likes: 1310, comments: 250, saves: 160 },
  { day: "T6", reach: 7800, engagement: 2180, likes: 1670, comments: 300, saves: 210 },
  { day: "T7", reach: 7200, engagement: 2020, likes: 1530, comments: 280, saves: 210 },
  { day: "CN", reach: 6100, engagement: 1680, likes: 1280, comments: 230, saves: 170 },
]

const tiktokData = [
  { day: "T2", reach: 2400, engagement: 640, views: 3800, likes: 520, comments: 80, shares: 40 },
  { day: "T3", reach: 3300, engagement: 880, views: 5200, likes: 720, comments: 110, shares: 50 },
  { day: "T4", reach: 2400, engagement: 720, views: 4100, likes: 600, comments: 90, shares: 30 },
  { day: "T5", reach: 3900, engagement: 1290, views: 7000, likes: 1080, comments: 140, shares: 70 },
  { day: "T6", reach: 3900, engagement: 1840, views: 9200, likes: 1580, comments: 200, shares: 60 },
  { day: "T7", reach: 3500, engagement: 1560, views: 7800, likes: 1330, comments: 170, shares: 60 },
  { day: "CN", reach: 2800, engagement: 930, views: 5600, likes: 790, comments: 100, shares: 40 },
]

const upcomingPosts = [
  {
    platform: "Facebook",
    title: "10 mẹo tăng tương tác trên Facebook",
    time: "Hôm nay, 18:00",
    status: "scheduled",
    color: "#1877F2",
  },
  {
    platform: "Instagram",
    title: "Behind the scenes: Quy trình sáng tạo",
    time: "Ngày mai, 09:00",
    status: "scheduled",
    color: "#E4405F",
  },
  {
    platform: "TikTok",
    title: "Trend challenge #SocialSense",
    time: "Ngày mai, 12:00",
    status: "draft",
    color: "#000000",
  },
  {
    platform: "Facebook",
    title: "Tổng kết tuần: Insights & Tips",
    time: "T6, 17:00",
    status: "scheduled",
    color: "#1877F2",
  },
]

const kpiCards = [
  {
    title: "Tổng lượt tiếp cận tuần này",
    value: "116,500",
    change: "+12.5%",
    trend: "up" as const,
    icon: Eye,
  },
  {
    title: "Tổng tương tác",
    value: "32,400",
    change: "+8.2%",
    trend: "up" as const,
    icon: Heart,
  },
  {
    title: "Bài đã lên lịch",
    value: "14",
    change: "xem lịch",
    trend: "neutral" as const,
    icon: CalendarCheck,
  },
  {
    title: "Điểm sức khỏe tài khoản",
    value: "87",
    change: "/100",
    trend: "score" as const,
    icon: Activity,
  },
]

export function DashboardContent() {
  const [plansOpen, setPlansOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <PlansDialog open={plansOpen} onOpenChange={setPlansOpen} />
      {/* Trial Banner */}
      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
            <Clock className="h-4.5 w-4.5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-900">
              {"Bạn đã đồng hành cùng SocialSense được 12 ngày — tuyệt vời!"}
            </p>
            <p className="mt-0.5 text-xs text-emerald-700">
              {"Còn 18 ngày trải nghiệm. Chọn gói phù hợp bất cứ lúc nào để tiếp tục hành trình cùng chúng tôi."}
            </p>
          </div>
        </div>
        <Button size="sm" className="h-8 rounded-lg text-xs font-semibold" onClick={() => setPlansOpen(true)}>
          {"Khám phá các gói"}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Welcome Bar */}
      <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-base font-semibold text-foreground">
              {"Xin chào, Minh Tú 👋"}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {"Hôm nay là thứ Tư — bài đăng tiếp theo của bạn lên lịch lúc 18:00."}
            </p>
          </div>
          <Button className="rounded-lg font-semibold" size="sm" asChild>
            <Link href="/ai-studio">
              {"Tạo bài mới"}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <Card
            key={card.title}
            className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                {card.trend === "up" && (
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {card.change}
                  </div>
                )}
                {card.trend === "neutral" && (
                  <a
                    href="/scheduler"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    {card.change} <ArrowRight className="ml-0.5 inline h-3 w-3" />
                  </a>
                )}
                {card.trend === "score" && (
                  <span className="text-xs font-medium text-emerald-600">
                    {card.change}
                  </span>
                )}
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">{card.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{card.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart + Upcoming Posts */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-8 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">
              {"Hiệu suất 7 ngày qua"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4 h-8 bg-secondary">
                <TabsTrigger value="all" className="text-xs">Tất cả</TabsTrigger>
                <TabsTrigger value="facebook" className="text-xs">Facebook</TabsTrigger>
                <TabsTrigger value="instagram" className="text-xs">Instagram</TabsTrigger>
                <TabsTrigger value="tiktok" className="text-xs">TikTok</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={{ stroke: "#E5E7EB" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        fontSize: 12,
                      }}
                    />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ fontSize: 12 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="reach"
                      name="Tiếp cận"
                      stroke="#2563EB"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      name="Tương tác"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="facebook">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={facebookData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={{ stroke: "#E5E7EB" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        fontSize: 12,
                      }}
                    />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="reach" name="Tiếp cận" stroke="#1877F2" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="engagement" name="Tương tác" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="shares" name="Chia sẻ" stroke="#F59E0B" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="instagram">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={instagramData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={{ stroke: "#E5E7EB" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        fontSize: 12,
                      }}
                    />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="reach" name="Tiếp cận" stroke="#E4405F" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="engagement" name="Tương tác" stroke="#8B5CF6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="saves" name="Lưu bài" stroke="#F59E0B" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="tiktok">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={tiktokData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={{ stroke: "#E5E7EB" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        fontSize: 12,
                      }}
                    />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="views" name="Lượt xem" stroke="#111827" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="likes" name="Likes" stroke="#EF4444" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="shares" name="Chia sẻ" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-4 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">
              {"Bài đăng sắp tới"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {upcomingPosts.map((post, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border p-3"
                >
                  <div
                    className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: post.color }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {post.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {post.time}
                      </span>
                      <Badge
                        variant="secondary"
                        className={
                          post.status === "scheduled"
                            ? "bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0 hover:bg-emerald-50"
                            : "bg-amber-50 text-amber-700 text-[10px] px-1.5 py-0 hover:bg-amber-50"
                        }
                      >
                        {post.status === "scheduled" ? "Đã lên lịch" : "Nháp"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestion + Top Post */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {"AI gợi ý hôm nay"}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {"Trend đang hot: \"Ngày của Mẹ\" — Bạn có muốn tạo bài về chủ đề này?"}
                </p>
                <Button size="sm" className="mt-3 h-8 rounded-lg text-xs font-semibold" asChild>
                  <Link href="/ai-studio">{"Tạo ngay"}</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardContent className="p-5">
            <p className="text-sm font-semibold text-foreground">
              {"Bài viết nổi bật tuần này"}
            </p>
            <div className="mt-3 flex items-center gap-4 rounded-lg border border-border p-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Eye className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {"10 mẹo tăng followers Instagram"}
                </p>
                <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#E4405F" }} />
                    Instagram
                  </span>
                  <span>45,200 tiếp cận</span>
                  <span>12.8% tương tác</span>
                </div>
                <Link
                  href="/analytics"
                  className="mt-1 inline-flex items-center text-xs font-medium text-primary hover:underline"
                >
                  {"Xem chi tiết"} <ArrowRight className="ml-0.5 h-3 w-3" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
