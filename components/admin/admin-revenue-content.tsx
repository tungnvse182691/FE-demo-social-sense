"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Wallet,
  TrendingUp,
  Calculator,
  UserMinus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  RefreshCcw,
  XCircle,
  CreditCard,
  Smartphone,
  Building2,
  ArrowDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const MONTHLY_REVENUE = [
  { month: "T4/25", beginner: 8200000, advanced: 6400000 },
  { month: "T5/25", beginner: 9100000, advanced: 7200000 },
  { month: "T6/25", beginner: 9800000, advanced: 7800000 },
  { month: "T7/25", beginner: 10400000, advanced: 8100000 },
  { month: "T8/25", beginner: 11200000, advanced: 8600000 },
  { month: "T9/25", beginner: 11800000, advanced: 9000000 },
  { month: "T10/25", beginner: 12300000, advanced: 9200000 },
  { month: "T11/25", beginner: 12900000, advanced: 9400000 },
  { month: "T12/25", beginner: 13400000, advanced: 9600000 },
  { month: "T1/26", beginner: 13900000, advanced: 9800000 },
  { month: "T2/26", beginner: 14400000, advanced: 9850000 },
  { month: "T3/26", beginner: 14800000, advanced: 9880000 },
]

const QUARTERLY_REVENUE = [
  { month: "Q2/25", beginner: 27100000, advanced: 21400000 },
  { month: "Q3/25", beginner: 33400000, advanced: 25700000 },
  { month: "Q4/25", beginner: 38600000, advanced: 28200000 },
  { month: "Q1/26", beginner: 43100000, advanced: 29530000 },
]

const CONVERSION_FUNNEL = [
  { label: "Đăng ký mới", value: 1284, percent: 100, color: "bg-primary" },
  { label: "Bắt đầu Trial", value: 1091, percent: 84.9, color: "bg-primary" },
  { label: "Còn đang Trial", value: 312, percent: 28.5, color: "bg-amber-500", note: "đang chạy" },
  { label: "Chuyển sang Pro", value: 441, percent: 40.5, color: "bg-emerald-500" },
  { label: "Gói Nâng cao", value: 383, percent: 35.1, color: "bg-violet-500" },
]

const TRANSACTIONS = [
  { id: "TXN-2403-001", user: "Nguyễn Minh Tú", plan: "Người mới", amount: "₫79,000", method: "MoMo", date: "12/03/2026", status: "success" },
  { id: "TXN-2403-002", user: "Lê Văn Cường", plan: "Nâng cao", amount: "₫99,000", method: "Thẻ", date: "12/03/2026", status: "success" },
  { id: "TXN-2403-003", user: "Vũ Đình Hùng", plan: "Nâng cao", amount: "₫99,000", method: "MoMo", date: "11/03/2026", status: "success" },
  { id: "TXN-2403-004", user: "Hoàng Thị Mai", plan: "Người mới", amount: "₫79,000", method: "Chuyển khoản", date: "11/03/2026", status: "success" },
  { id: "TXN-2403-005", user: "Tô Thị Roan", plan: "Nâng cao", amount: "₫99,000", method: "MoMo", date: "10/03/2026", status: "refund" },
  { id: "TXN-2403-006", user: "Trương Văn Minh", plan: "Nâng cao", amount: "₫99,000", method: "Thẻ", date: "10/03/2026", status: "success" },
  { id: "TXN-2403-007", user: "Bùi Văn Khánh", plan: "Người mới", amount: "₫79,000", method: "MoMo", date: "09/03/2026", status: "success" },
  { id: "TXN-2403-008", user: "Quách Thị Yến", plan: "Nâng cao", amount: "₫99,000", method: "Chuyển khoản", date: "09/03/2026", status: "success" },
  { id: "TXN-2403-009", user: "Đinh Thị Hồng", plan: "Người mới", amount: "₫79,000", method: "MoMo", date: "08/03/2026", status: "failed" },
  { id: "TXN-2403-010", user: "Phạm Quốc Bảo", plan: "Người mới", amount: "₫79,000", method: "Thẻ", date: "07/03/2026", status: "success" },
]

const methodIcon: Record<string, React.ReactNode> = {
  MoMo: <Smartphone className="h-3.5 w-3.5 text-[#ae2070]" />,
  Thẻ: <CreditCard className="h-3.5 w-3.5 text-primary" />,
  "Chuyển khoản": <Building2 className="h-3.5 w-3.5 text-muted-foreground" />,
}

const txStatusConfig = {
  success: { label: "Thành công", className: "bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
  refund: { label: "Hoàn tiền", className: "bg-amber-50 text-amber-700", icon: RefreshCcw },
  failed: { label: "Thất bại", className: "bg-destructive/10 text-destructive", icon: XCircle },
}

function fmtRevenue(val: number) {
  if (val >= 1000000) return `₫${(val / 1000000).toFixed(1)}M`
  return `₫${(val / 1000).toFixed(0)}K`
}

export function AdminRevenueContent() {
  const [period, setPeriod] = useState<"monthly" | "quarterly">("monthly")
  const chartData = period === "monthly" ? MONTHLY_REVENUE : QUARTERLY_REVENUE

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "MRR — Doanh thu tháng",
            value: "₫24,680,000",
            sub: "+18.3% so tháng trước",
            up: true,
            icon: Wallet,
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
          },
          {
            label: "ARR — Doanh thu năm",
            value: "₫296,160,000",
            sub: "Ước tính theo MRR hiện tại",
            up: true,
            icon: TrendingUp,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
          },
          {
            label: "ARPU — Trung bình/user",
            value: "₫87,800",
            sub: "+₫2,100 so tháng trước",
            up: true,
            icon: Calculator,
            iconBg: "bg-violet-50",
            iconColor: "text-violet-600",
          },
          {
            label: "Churn — Tỷ lệ rời bỏ",
            value: "3.2%",
            sub: "-0.4% so tháng trước",
            up: false,
            icon: UserMinus,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
          },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${kpi.iconBg}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.iconColor}`} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.up ? "text-emerald-600" : "text-destructive"}`}>
                  {kpi.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {kpi.sub.split(" ")[0]}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + Funnel */}
      <div className="grid grid-cols-12 gap-4">
        {/* Revenue Bar Chart */}
        <Card className="col-span-8 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Doanh thu theo kỳ</CardTitle>
              <div className="flex gap-1 rounded-lg bg-secondary p-1">
                {(["monthly", "quarterly"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {p === "monthly" ? "Theo tháng" : "Theo quý"}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={fmtRevenue} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }}
                  formatter={(value, name) => [
                    fmtRevenue(value as number),
                    name === "beginner" ? "Gói Người mới" : "Gói Nâng cao",
                  ]}
                />
                <Bar dataKey="beginner" fill="#2563EB" radius={[4, 4, 0, 0]} name="beginner" />
                <Bar dataKey="advanced" fill="#7c3aed" radius={[4, 4, 0, 0]} name="advanced" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 flex justify-center gap-6">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Gói Người mới (₫79K)
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-600" /> Gói Nâng cao (₫99K)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="col-span-4 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">Funnel chuyển đổi</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-5 pb-5">
            {CONVERSION_FUNNEL.map((step, i) => (
              <div key={step.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{step.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-foreground">
                      {step.value.toLocaleString("vi-VN")}
                    </span>
                    {step.note && (
                      <Badge variant="secondary" className="bg-amber-50 px-1.5 py-0 text-[10px] font-semibold text-amber-700">
                        {step.note}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full transition-all ${step.color}`}
                    style={{ width: `${step.percent}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{step.percent}%</span>
                {i < CONVERSION_FUNNEL.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Transaction table */}
      <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold text-foreground">Giao dịch gần đây</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {["Mã GD", "Người dùng", "Gói", "Số tiền", "Phương thức", "Ngày", "Trạng thái"].map((h) => (
                  <TableHead key={h} className={`${h === "Mã GD" ? "pl-5" : ""} text-xs font-semibold text-muted-foreground`}>
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {TRANSACTIONS.map((tx) => {
                const s = txStatusConfig[tx.status as keyof typeof txStatusConfig]
                return (
                  <TableRow key={tx.id} className="border-border">
                    <TableCell className="pl-5 font-mono text-xs text-muted-foreground">{tx.id}</TableCell>
                    <TableCell className="text-sm font-medium text-foreground">{tx.user}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs ${tx.plan === "Nâng cao" ? "bg-violet-100 text-violet-700" : "bg-primary/10 text-primary"}`}>
                        {tx.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-foreground">{tx.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {methodIcon[tx.method]}
                        <span className="text-sm text-foreground">{tx.method}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tx.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`gap-1 text-xs font-semibold ${s.className}`}>
                        <s.icon className="h-3 w-3" />
                        {s.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
