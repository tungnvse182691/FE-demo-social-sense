"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  CheckCircle2,
  AlertTriangle,
  WrenchIcon,
  ExternalLink,
  Facebook,
  Instagram,
  CreditCard,
} from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const WEEK_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]

const PLATFORMS = [
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877F2",
    bgColor: "bg-[#1877F2]/10",
    textColor: "text-[#1877F2]",
    status: "ok",
    connected: 847,
    requestsToday: 142390,
    rateLimit: 68,
    errors24h: 3,
    uptime: "99.8%",
    chartData: [
      { day: "T2", requests: 118200 },
      { day: "T3", requests: 124500 },
      { day: "T4", requests: 131000 },
      { day: "T5", requests: 128400 },
      { day: "T6", requests: 135800 },
      { day: "T7", requests: 139200 },
      { day: "CN", requests: 142390 },
    ],
    errors: [
      { time: "10:24 12/03", code: "API_RATE_LIMIT", desc: "Vượt rate limit endpoint /graph/posts", affected: "@minhtubusiness", resolved: true },
      { time: "08:11 12/03", code: "TOKEN_EXPIRED", desc: "Access token hết hạn", affected: "@brandvietnam", resolved: true },
      { time: "15:30 11/03", code: "PERMISSION_DENIED", desc: "Thiếu quyền read_insights", affected: "@fashion.vnm", resolved: false },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "#E4405F",
    bgColor: "bg-[#E4405F]/10",
    textColor: "text-[#E4405F]",
    status: "warning",
    connected: 614,
    requestsToday: 98420,
    rateLimit: 45,
    errors24h: 12,
    uptime: "98.2%",
    chartData: [
      { day: "T2", requests: 78200 },
      { day: "T3", requests: 82500 },
      { day: "T4", requests: 79000 },
      { day: "T5", requests: 86400 },
      { day: "T6", requests: 90800 },
      { day: "T7", requests: 94200 },
      { day: "CN", requests: 98420 },
    ],
    errors: [
      { time: "11:02 12/03", code: "HIGH_LATENCY", desc: "Độ trễ API > 400ms liên tục", affected: "Toàn hệ thống", resolved: false },
      { time: "09:45 12/03", code: "MEDIA_UPLOAD_FAIL", desc: "Lỗi upload media vượt 10MB", affected: "@foodlover.vn", resolved: true },
      { time: "07:20 12/03", code: "TOKEN_EXPIRED", desc: "Access token hết hạn hàng loạt", affected: "14 tài khoản", resolved: false },
      { time: "23:00 11/03", code: "WEBHOOK_FAIL", desc: "Webhook callback timeout", affected: "Toàn hệ thống", resolved: true },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#111827",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    status: "ok",
    connected: 391,
    requestsToday: 67300,
    rateLimit: 82,
    errors24h: 0,
    uptime: "99.5%",
    chartData: [
      { day: "T2", requests: 48200 },
      { day: "T3", requests: 52500 },
      { day: "T4", requests: 55000 },
      { day: "T5", requests: 58400 },
      { day: "T6", requests: 61800 },
      { day: "T7", requests: 64200 },
      { day: "CN", requests: 67300 },
    ],
    errors: [],
  },
  {
    id: "payment",
    name: "Thanh toán (MoMo + Stripe)",
    color: "#ae2070",
    bgColor: "bg-[#ae2070]/10",
    textColor: "text-[#ae2070]",
    status: "ok",
    connected: null,
    requestsToday: 1284,
    rateLimit: 95,
    errors24h: 1,
    uptime: "100%",
    chartData: [
      { day: "T2", requests: 892 },
      { day: "T3", requests: 1041 },
      { day: "T4", requests: 1120 },
      { day: "T5", requests: 1089 },
      { day: "T6", requests: 1201 },
      { day: "T7", requests: 1248 },
      { day: "CN", requests: 1284 },
    ],
    errors: [
      { time: "14:22 11/03", code: "PAYMENT_DECLINED", desc: "Thẻ thanh toán bị từ chối (insufficient funds)", affected: "Trần Thị Hoa", resolved: true },
    ],
  },
]

const COMING_SOON = [
  { name: "YouTube", color: "#FF0000" },
  { name: "LinkedIn", color: "#0A66C2" },
  { name: "Twitter / X", color: "#000000" },
]

const statusConfig = {
  ok: {
    label: "Hoạt động bình thường",
    icon: CheckCircle2,
    badgeClass: "bg-emerald-50 text-emerald-700",
    borderClass: "border-emerald-100",
  },
  warning: {
    label: "Độ trễ cao bất thường",
    icon: AlertTriangle,
    badgeClass: "bg-amber-50 text-amber-700",
    borderClass: "border-amber-200",
  },
  maintenance: {
    label: "Đang bảo trì",
    icon: WrenchIcon,
    badgeClass: "bg-secondary text-muted-foreground",
    borderClass: "border-border",
  },
}

type Platform = (typeof PLATFORMS)[number]

export function AdminIntegrationsContent() {
  const [logPlatform, setLogPlatform] = useState<Platform | null>(null)
  const [logOpen, setLogOpen] = useState(false)

  const openLog = (p: Platform) => {
    setLogPlatform(p)
    setLogOpen(true)
  }

  const handleRefresh = async (name: string) => {
    await new Promise((r) => setTimeout(r, 800))
    toast.success(`Đã làm mới dữ liệu ${name}`)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Status summary bar */}
      <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-3">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
        <p className="text-sm font-medium text-emerald-800">
          3/4 nền tảng hoạt động bình thường — Instagram đang có độ trễ cao, đội kỹ thuật đã được thông báo.
        </p>
      </div>

      {/* Platform cards */}
      <div className="grid grid-cols-2 gap-4">
        {PLATFORMS.map((p) => {
          const s = statusConfig[p.status as keyof typeof statusConfig]
          return (
            <Card
              key={p.id}
              className={`border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)] ${p.status === "warning" ? "border-amber-200" : "border-border"}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.bgColor}`}>
                      {p.id === "facebook" && <Facebook className={`h-5 w-5 ${p.textColor}`} />}
                      {p.id === "instagram" && <Instagram className={`h-5 w-5 ${p.textColor}`} />}
                      {p.id === "tiktok" && (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.83 1.56V6.79a4.85 4.85 0 01-1.06-.1z" />
                        </svg>
                      )}
                      {p.id === "payment" && <CreditCard className={`h-5 w-5 ${p.textColor}`} />}
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold text-foreground">{p.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">Uptime: {p.uptime}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={`gap-1 text-xs font-semibold ${s.badgeClass}`}>
                    <s.icon className="h-3 w-3" />
                    {s.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-5 pb-5">
                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-3">
                  {p.connected !== null && (
                    <div className="rounded-lg bg-secondary px-3 py-2.5">
                      <p className="text-xs text-muted-foreground">Tài khoản kết nối</p>
                      <p className="mt-0.5 text-base font-bold text-foreground">
                        {p.connected.toLocaleString("vi-VN")}
                      </p>
                    </div>
                  )}
                  <div className="rounded-lg bg-secondary px-3 py-2.5">
                    <p className="text-xs text-muted-foreground">Requests hôm nay</p>
                    <p className="mt-0.5 text-base font-bold text-foreground">
                      {p.requestsToday.toLocaleString("vi-VN")}
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary px-3 py-2.5">
                    <p className="text-xs text-muted-foreground mb-1.5">Rate limit còn lại</p>
                    <Progress value={p.rateLimit} className="h-1.5" />
                    <p className={`mt-1 text-xs font-semibold ${p.rateLimit < 50 ? "text-amber-700" : "text-emerald-700"}`}>
                      {p.rateLimit}%
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary px-3 py-2.5">
                    <p className="text-xs text-muted-foreground">Lỗi 24h qua</p>
                    <p className={`mt-0.5 text-base font-bold ${p.errors24h > 0 ? "text-destructive" : "text-emerald-700"}`}>
                      {p.errors24h} lỗi
                    </p>
                  </div>
                </div>

                {/* Mini chart */}
                <div>
                  <p className="mb-1 text-xs text-muted-foreground">Requests 7 ngày</p>
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={p.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`grad-${p.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={p.color} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={p.color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" hide />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 11 }}
                        formatter={(v) => [v.toLocaleString("vi-VN"), "Requests"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="requests"
                        stroke={p.color}
                        strokeWidth={1.5}
                        fill={`url(#grad-${p.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 flex-1 gap-1.5 rounded-lg text-xs"
                    onClick={() => handleRefresh(p.name)}
                  >
                    Làm mới dữ liệu
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-8 flex-1 gap-1.5 rounded-lg text-xs ${p.errors24h > 0 ? "border-destructive/30 text-destructive hover:bg-destructive/5" : ""}`}
                    onClick={() => openLog(p)}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Xem log lỗi ({p.errors24h})
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Coming soon */}
      <div>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">Nền tảng sắp tích hợp</p>
        <div className="grid grid-cols-3 gap-4 opacity-60">
          {COMING_SOON.map((p) => (
            <Card key={p.name} className="border-dashed border-border bg-card shadow-none">
              <CardContent className="flex flex-col items-center justify-center gap-2 py-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                  <span className="text-base font-bold text-muted-foreground">{p.name[0]}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{p.name}</p>
                <Badge variant="secondary" className="bg-secondary text-xs text-muted-foreground">
                  Sắp ra mắt
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Error log dialog */}
      <Dialog open={logOpen} onOpenChange={setLogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Log lỗi — {logPlatform?.name}
            </DialogTitle>
          </DialogHeader>
          {logPlatform && (
            logPlatform.errors.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                <p className="text-sm text-muted-foreground">Không có lỗi nào trong 24 giờ qua</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold">Thời gian</TableHead>
                    <TableHead className="text-xs font-semibold">Mã lỗi</TableHead>
                    <TableHead className="text-xs font-semibold">Mô tả</TableHead>
                    <TableHead className="text-xs font-semibold">Tài khoản</TableHead>
                    <TableHead className="text-xs font-semibold">Đã xử lý</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logPlatform.errors.map((e, i) => (
                    <TableRow key={i} className="border-border">
                      <TableCell className="font-mono text-xs text-muted-foreground">{e.time}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-destructive/10 font-mono text-xs text-destructive">
                          {e.code}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-foreground">{e.desc}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{e.affected}</TableCell>
                      <TableCell>
                        {e.resolved ? (
                          <Badge variant="secondary" className="bg-emerald-50 text-xs text-emerald-700">Đã xử lý</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-amber-50 text-xs text-amber-700">Chưa xử lý</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
