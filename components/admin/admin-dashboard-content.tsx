"use client"

import { useState } from "react"
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
} from "recharts"
import {
  Users,
  Wallet,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle,
  Activity,
  UserPlus,
  CreditCard,
  Link2,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const GROWTH_DATA = [
  { day: "10/2", newUsers: 38, revenue: 3800000 },
  { day: "13/2", newUsers: 45, revenue: 4500000 },
  { day: "16/2", newUsers: 52, revenue: 5200000 },
  { day: "19/2", newUsers: 41, revenue: 4100000 },
  { day: "22/2", newUsers: 67, revenue: 6700000 },
  { day: "25/2", newUsers: 58, revenue: 5800000 },
  { day: "28/2", newUsers: 71, revenue: 7100000 },
  { day: "03/3", newUsers: 84, revenue: 8400000 },
  { day: "06/3", newUsers: 79, revenue: 7900000 },
  { day: "09/3", newUsers: 93, revenue: 9300000 },
  { day: "12/3", newUsers: 110, revenue: 11000000 },
]

const PLAN_DISTRIBUTION = [
  { name: "Trial", value: 312, color: "#10b981" },
  { name: "Người mới", value: 589, color: "#2563EB" },
  { name: "Nâng cao", value: 383, color: "#7c3aed" },
]

const RECENT_ACTIVITY = [
  {
    id: 1,
    user: "Nguyễn Văn An",
    avatar: "NA",
    action: "đăng ký tài khoản mới",
    time: "2 phút trước",
    type: "register",
  },
  {
    id: 2,
    user: "Trần Thị Bình",
    avatar: "TB",
    action: "nâng cấp lên gói Nâng cao",
    time: "15 phút trước",
    type: "upgrade",
  },
  {
    id: 3,
    user: "Lê Văn Cường",
    avatar: "LC",
    action: "hủy gói Người mới",
    time: "32 phút trước",
    type: "cancel",
  },
  {
    id: 4,
    user: "Phạm Minh Đức",
    avatar: "PD",
    action: "thanh toán thành công ₫99,000",
    time: "1 giờ trước",
    type: "payment",
  },
  {
    id: 5,
    user: "Hoàng Thị Em",
    avatar: "HE",
    action: "đăng ký tài khoản mới",
    time: "2 giờ trước",
    type: "register",
  },
  {
    id: 6,
    user: "Vũ Quốc Phong",
    avatar: "VP",
    action: "nâng cấp lên gói Người mới",
    time: "3 giờ trước",
    type: "upgrade",
  },
  {
    id: 7,
    user: "Đinh Thị Giang",
    avatar: "DG",
    action: "kết nối tài khoản TikTok",
    time: "4 giờ trước",
    type: "connect",
  },
  {
    id: 8,
    user: "Bùi Hải Hà",
    avatar: "BH",
    action: "đăng ký tài khoản mới",
    time: "5 giờ trước",
    type: "register",
  },
]

const API_STATUS = [
  { name: "Facebook API", status: "ok", uptime: "99.8%", latency: "124ms" },
  { name: "Instagram API", status: "warning", uptime: "98.2%", latency: "287ms" },
  { name: "TikTok API", status: "ok", uptime: "99.5%", latency: "156ms" },
  { name: "Hệ thống thanh toán", status: "ok", uptime: "100%", latency: "89ms" },
]

const activityIcon: Record<string, React.ReactNode> = {
  register: <UserPlus className="h-3.5 w-3.5 text-emerald-600" />,
  upgrade: <TrendingUp className="h-3.5 w-3.5 text-primary" />,
  cancel: <XCircle className="h-3.5 w-3.5 text-destructive" />,
  payment: <CreditCard className="h-3.5 w-3.5 text-violet-600" />,
  connect: <Link2 className="h-3.5 w-3.5 text-amber-600" />,
}

function formatRevenue(value: number) {
  return `₫${(value / 1000000).toFixed(1)}M`
}

export function AdminDashboardContent() {
  const [chartRange, setChartRange] = useState<"7d" | "30d">("30d")

  const chartData = chartRange === "7d" ? GROWTH_DATA.slice(-7) : GROWTH_DATA

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Tổng người dùng",
            value: "1,284",
            trend: "+47 tuần này",
            up: true,
            icon: Users,
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
          },
          {
            label: "Doanh thu tháng này",
            value: "₫24,680,000",
            trend: "+18.3%",
            up: true,
            icon: Wallet,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
          },
          {
            label: "Đang dùng Trial",
            value: "312",
            trend: "-12 so hôm qua",
            up: false,
            icon: Clock,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
          },
          {
            label: "Tỷ lệ chuyển đổi",
            value: "34.2%",
            trend: "+2.1%",
            up: true,
            icon: TrendingUp,
            iconBg: "bg-violet-50",
            iconColor: "text-violet-600",
          },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${kpi.iconBg}`}
                >
                  <kpi.icon className={`h-5 w-5 ${kpi.iconColor}`} />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.up ? "text-emerald-600" : "text-destructive"}`}
                >
                  {kpi.up ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {kpi.trend}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + Donut */}
      <div className="grid grid-cols-12 gap-4">
        {/* Growth chart */}
        <Card className="col-span-8 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Tăng trưởng hệ thống
              </CardTitle>
              <div className="flex gap-1 rounded-lg bg-secondary p-1">
                {(["7d", "30d"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setChartRange(r)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      chartRange === r
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r === "7d" ? "7 ngày" : "30 ngày"}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatRevenue}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }}
                  formatter={(value, name) => {
                    if (name === "revenue") return [formatRevenue(value as number), "Doanh thu"]
                    return [value, "Người dùng mới"]
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="newUsers"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={false}
                  name="newUsers"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  name="revenue"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 flex justify-center gap-6">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                Người dùng mới
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Doanh thu
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan distribution donut */}
        <Card className="col-span-4 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-semibold text-foreground">Phân phối gói</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={PLAN_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {PLAN_DISTRIBUTION.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }}
                  formatter={(value, name) => [`${value} users`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {PLAN_DISTRIBUTION.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="text-sm text-muted-foreground">{p.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{p.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity + API Status */}
      <div className="grid grid-cols-12 gap-4">
        {/* Recent activity */}
        <Card className="col-span-6 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <CardTitle className="text-lg font-semibold text-foreground">Hoạt động gần đây</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {RECENT_ACTIVITY.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 px-5 py-3 ${i < RECENT_ACTIVITY.length - 1 ? "border-b border-border" : ""}`}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-secondary text-xs font-semibold text-foreground">
                      {item.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-foreground">{item.user}</span>
                      {activityIcon[item.type]}
                    </div>
                    <span className="truncate text-xs text-muted-foreground">{item.action}</span>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Status */}
        <Card className="col-span-6 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">Trạng thái hệ thống</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-5 pb-5">
            {API_STATUS.map((api) => (
              <div
                key={api.name}
                className={`flex items-center justify-between rounded-xl border p-4 ${
                  api.status === "ok"
                    ? "border-emerald-100 bg-emerald-50"
                    : "border-amber-100 bg-amber-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {api.status === "ok" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{api.name}</span>
                    <span
                      className={`text-xs font-medium ${api.status === "ok" ? "text-emerald-700" : "text-amber-700"}`}
                    >
                      {api.status === "ok" ? "Hoạt động bình thường" : "Độ trễ cao bất thường"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-xs font-semibold text-foreground">Uptime {api.uptime}</span>
                  <span className="text-xs text-muted-foreground">Độ trễ: {api.latency}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
