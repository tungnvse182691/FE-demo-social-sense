"use client"

import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  Download,
  Eye,
  Settings2,
  Lock,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  CalendarDays,
  Clock,
  Facebook,
  Instagram,
  CreditCard,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface MockUser {
  id: number
  name: string
  email: string
  avatar: string
  plan: "trial" | "beginner" | "advanced" | "cancelled"
  trialDays?: number
  signedUp: string
  lastActive: string
  status: "active" | "inactive" | "blocked"
  phone: string
  connectedPlatforms: string[]
  paymentHistory: { date: string; amount: string; plan: string; method: string }[]
}

const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: "Nguyễn Minh Tú",
    email: "minhtu@gmail.com",
    avatar: "MT",
    plan: "beginner",
    signedUp: "01/12/2025",
    lastActive: "2 giờ trước",
    status: "active",
    phone: "+84 901 234 567",
    connectedPlatforms: ["facebook", "instagram"],
    paymentHistory: [
      { date: "01/03/2026", amount: "₫79,000", plan: "Người mới", method: "MoMo" },
      { date: "01/02/2026", amount: "₫79,000", plan: "Người mới", method: "MoMo" },
    ],
  },
  {
    id: 2,
    name: "Trần Thị Lan",
    email: "lan.tran@company.vn",
    avatar: "TL",
    plan: "trial",
    trialDays: 8,
    signedUp: "04/03/2026",
    lastActive: "1 giờ trước",
    status: "active",
    phone: "+84 912 345 678",
    connectedPlatforms: ["instagram"],
    paymentHistory: [],
  },
  {
    id: 3,
    name: "Lê Văn Cường",
    email: "cuong.le@business.com",
    avatar: "LC",
    plan: "advanced",
    signedUp: "15/11/2025",
    lastActive: "3 ngày trước",
    status: "active",
    phone: "+84 933 456 789",
    connectedPlatforms: ["facebook", "instagram", "tiktok"],
    paymentHistory: [
      { date: "01/03/2026", amount: "₫99,000", plan: "Nâng cao", method: "Thẻ ngân hàng" },
      { date: "01/02/2026", amount: "₫99,000", plan: "Nâng cao", method: "Thẻ ngân hàng" },
    ],
  },
  {
    id: 4,
    name: "Phạm Quốc Bảo",
    email: "baopq@startup.io",
    avatar: "PB",
    plan: "trial",
    trialDays: 22,
    signedUp: "20/02/2026",
    lastActive: "5 giờ trước",
    status: "active",
    phone: "+84 944 567 890",
    connectedPlatforms: ["tiktok"],
    paymentHistory: [],
  },
  {
    id: 5,
    name: "Hoàng Thị Mai",
    email: "mai.hoang@creative.vn",
    avatar: "HM",
    plan: "beginner",
    signedUp: "10/01/2026",
    lastActive: "1 ngày trước",
    status: "active",
    phone: "+84 955 678 901",
    connectedPlatforms: ["instagram", "tiktok"],
    paymentHistory: [
      { date: "10/02/2026", amount: "₫79,000", plan: "Người mới", method: "Chuyển khoản" },
    ],
  },
  {
    id: 6,
    name: "Vũ Đình Hùng",
    email: "hung.vu@agency.com",
    avatar: "VH",
    plan: "advanced",
    signedUp: "05/10/2025",
    lastActive: "30 phút trước",
    status: "active",
    phone: "+84 966 789 012",
    connectedPlatforms: ["facebook", "instagram", "tiktok"],
    paymentHistory: [
      { date: "05/03/2026", amount: "₫99,000", plan: "Nâng cao", method: "MoMo" },
    ],
  },
  {
    id: 7,
    name: "Đinh Thị Hồng",
    email: "hong.dinh@shop.vn",
    avatar: "DH",
    plan: "cancelled",
    signedUp: "20/09/2025",
    lastActive: "2 tuần trước",
    status: "inactive",
    phone: "+84 977 890 123",
    connectedPlatforms: [],
    paymentHistory: [
      { date: "20/11/2025", amount: "₫79,000", plan: "Người mới", method: "MoMo" },
      { date: "20/10/2025", amount: "₫79,000", plan: "Người mới", method: "MoMo" },
    ],
  },
  {
    id: 8,
    name: "Bùi Văn Khánh",
    email: "khanh.bui@media.vn",
    avatar: "BK",
    plan: "beginner",
    signedUp: "08/02/2026",
    lastActive: "4 giờ trước",
    status: "active",
    phone: "+84 988 901 234",
    connectedPlatforms: ["facebook"],
    paymentHistory: [
      { date: "08/03/2026", amount: "₫79,000", plan: "Người mới", method: "MoMo" },
    ],
  },
  {
    id: 9,
    name: "Ngô Thị Linh",
    email: "linh.ngo@brand.com",
    avatar: "NL",
    plan: "trial",
    trialDays: 14,
    signedUp: "26/02/2026",
    lastActive: "2 giờ trước",
    status: "active",
    phone: "+84 999 012 345",
    connectedPlatforms: ["instagram"],
    paymentHistory: [],
  },
  {
    id: 10,
    name: "Trương Văn Minh",
    email: "minh.truong@digital.io",
    avatar: "TM",
    plan: "advanced",
    signedUp: "01/11/2025",
    lastActive: "1 giờ trước",
    status: "active",
    phone: "+84 911 123 456",
    connectedPlatforms: ["facebook", "instagram", "tiktok"],
    paymentHistory: [
      { date: "01/03/2026", amount: "₫99,000", plan: "Nâng cao", method: "Thẻ ngân hàng" },
    ],
  },
  {
    id: 11,
    name: "Đặng Thị Nga",
    email: "nga.dang@content.vn",
    avatar: "DN",
    plan: "beginner",
    signedUp: "12/12/2025",
    lastActive: "6 giờ trước",
    status: "active",
    phone: "+84 922 234 567",
    connectedPlatforms: ["instagram", "tiktok"],
    paymentHistory: [],
  },
  {
    id: 12,
    name: "Lý Hoàng Phúc",
    email: "phuc.ly@corp.com",
    avatar: "LP",
    plan: "cancelled",
    signedUp: "14/08/2025",
    lastActive: "1 tháng trước",
    status: "inactive",
    phone: "+84 933 345 678",
    connectedPlatforms: [],
    paymentHistory: [],
  },
  {
    id: 13,
    name: "Kiều Văn Quang",
    email: "quang.kieu@sme.vn",
    avatar: "KQ",
    plan: "trial",
    trialDays: 3,
    signedUp: "09/03/2026",
    lastActive: "30 phút trước",
    status: "active",
    phone: "+84 944 456 789",
    connectedPlatforms: ["facebook"],
    paymentHistory: [],
  },
  {
    id: 14,
    name: "Tô Thị Roan",
    email: "roan.to@kreator.vn",
    avatar: "TR",
    plan: "advanced",
    signedUp: "25/10/2025",
    lastActive: "2 giờ trước",
    status: "active",
    phone: "+84 955 567 890",
    connectedPlatforms: ["instagram", "tiktok"],
    paymentHistory: [
      { date: "25/02/2026", amount: "₫99,000", plan: "Nâng cao", method: "MoMo" },
    ],
  },
  {
    id: 15,
    name: "Hứa Việt Sơn",
    email: "son.hua@ads.vn",
    avatar: "HS",
    plan: "beginner",
    signedUp: "30/01/2026",
    lastActive: "1 ngày trước",
    status: "blocked",
    phone: "+84 966 678 901",
    connectedPlatforms: ["facebook"],
    paymentHistory: [],
  },
  {
    id: 16,
    name: "Mai Thị Thu",
    email: "thu.mai@shop.io",
    avatar: "MT",
    plan: "trial",
    trialDays: 18,
    signedUp: "22/02/2026",
    lastActive: "3 giờ trước",
    status: "active",
    phone: "+84 977 789 012",
    connectedPlatforms: ["tiktok"],
    paymentHistory: [],
  },
  {
    id: 17,
    name: "Nguyễn Gia Uy",
    email: "uy.nguyen@market.vn",
    avatar: "NU",
    plan: "advanced",
    signedUp: "11/09/2025",
    lastActive: "1 tuần trước",
    status: "active",
    phone: "+84 988 890 123",
    connectedPlatforms: ["facebook", "instagram"],
    paymentHistory: [],
  },
  {
    id: 18,
    name: "Cao Thị Vân",
    email: "van.cao@studio.vn",
    avatar: "CV",
    plan: "beginner",
    signedUp: "18/01/2026",
    lastActive: "5 giờ trước",
    status: "active",
    phone: "+84 999 901 234",
    connectedPlatforms: ["instagram"],
    paymentHistory: [],
  },
  {
    id: 19,
    name: "Phan Minh Xuân",
    email: "xuan.phan@brand.com",
    avatar: "PX",
    plan: "trial",
    trialDays: 27,
    signedUp: "13/02/2026",
    lastActive: "4 giờ trước",
    status: "active",
    phone: "+84 911 012 345",
    connectedPlatforms: ["facebook", "tiktok"],
    paymentHistory: [],
  },
  {
    id: 20,
    name: "Quách Thị Yến",
    email: "yen.quach@creator.vn",
    avatar: "QY",
    plan: "advanced",
    signedUp: "07/12/2025",
    lastActive: "45 phút trước",
    status: "active",
    phone: "+84 922 123 456",
    connectedPlatforms: ["instagram", "tiktok"],
    paymentHistory: [
      { date: "07/03/2026", amount: "₫99,000", plan: "Nâng cao", method: "Chuyển khoản" },
    ],
  },
]

const planBadge = {
  trial: "bg-emerald-50 text-emerald-700",
  beginner: "bg-primary/10 text-primary",
  advanced: "bg-violet-100 text-violet-700",
  cancelled: "bg-secondary text-muted-foreground",
}
const planLabel = {
  trial: "Trial",
  beginner: "Người mới",
  advanced: "Nâng cao",
  cancelled: "Đã hủy",
}
const statusBadge = {
  active: "bg-emerald-50 text-emerald-700",
  inactive: "bg-amber-50 text-amber-700",
  blocked: "bg-destructive/10 text-destructive",
}
const statusLabel = {
  active: "Hoạt động",
  inactive: "Không hoạt động",
  blocked: "Bị khóa",
}
const platformIcon: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-3.5 w-3.5 text-[#1877F2]" />,
  instagram: <Instagram className="h-3.5 w-3.5 text-[#E4405F]" />,
  tiktok: (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.83 1.56V6.79a4.85 4.85 0 01-1.06-.1z" />
    </svg>
  ),
}

type PlanFilter = "all" | "trial" | "beginner" | "advanced" | "cancelled"
type StatusFilter = "all" | "active" | "inactive" | "blocked"

export function AdminUsersContent() {
  const [search, setSearch] = useState("")
  const [planFilter, setPlanFilter] = useState<PlanFilter>("all")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 10

  const filtered = MOCK_USERS.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchPlan = planFilter === "all" || u.plan === planFilter
    const matchStatus = statusFilter === "all" || u.status === statusFilter
    return matchSearch && matchPlan && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const openDetail = (user: MockUser) => {
    setSelectedUser(user)
    setSheetOpen(true)
  }

  const handleAction = async (action: string, user: MockUser) => {
    await new Promise((r) => setTimeout(r, 600))
    if (action === "lock") toast.success(`Đã khóa tài khoản ${user.name}`)
    if (action === "unlock") toast.success(`Đã mở khóa tài khoản ${user.name}`)
    if (action === "delete") toast.success(`Đã xóa tài khoản ${user.name}`, { description: "Không thể hoàn tác hành động này" })
    if (action === "change-plan") toast.success(`Đã cập nhật gói của ${user.name}`)
  }

  const handleExportCSV = () => {
    toast.success("Đang xuất file CSV...", { description: "File sẽ được tải về trong giây lát" })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Tổng người dùng", value: "1,284", color: "text-foreground" },
          { label: "Đang Trial", value: "312", color: "text-emerald-700" },
          { label: "Đã trả phí", value: "972", color: "text-primary" },
          { label: "Đã hủy", value: "48", color: "text-destructive" },
        ].map((s) => (
          <Card key={s.label} className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardContent className="p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table card */}
      <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <CardHeader className="pb-0">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Danh sách người dùng</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="h-8 gap-1.5 rounded-lg text-xs"
              >
                <Download className="h-3.5 w-3.5" />
                Xuất CSV
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo tên, email..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
                  className="h-9 rounded-lg pl-9 text-sm"
                />
              </div>
              <div className="flex gap-1 rounded-lg bg-secondary p-1">
                {(["all", "trial", "beginner", "advanced", "cancelled"] as PlanFilter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => { setPlanFilter(f); setCurrentPage(1) }}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${planFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {f === "all" ? "Tất cả" : planLabel[f]}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 rounded-lg bg-secondary p-1">
                {(["all", "active", "inactive", "blocked"] as StatusFilter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => { setStatusFilter(f); setCurrentPage(1) }}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {f === "all" ? "Tất cả TT" : statusLabel[f as keyof typeof statusLabel]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-4 p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-5 text-xs font-semibold text-muted-foreground">Người dùng</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Gói</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Trial còn lại</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Ngày đăng ký</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Hoạt động cuối</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Trạng thái</TableHead>
                <TableHead className="pr-5 text-right text-xs font-semibold text-muted-foreground">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                    Không tìm thấy người dùng phù hợp
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((user) => (
                  <TableRow key={user.id} className="border-border">
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-secondary text-xs font-semibold text-foreground">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs font-semibold ${planBadge[user.plan]}`}>
                        {planLabel[user.plan]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {user.plan === "trial" ? (
                        <span className="font-semibold text-emerald-700">{user.trialDays} ngày</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-foreground">{user.signedUp}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs font-semibold ${statusBadge[user.status]}`}>
                        {statusLabel[user.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => openDetail(user)} className="gap-2 text-sm">
                            <Eye className="h-4 w-4" /> Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("change-plan", user)} className="gap-2 text-sm">
                            <Settings2 className="h-4 w-4" /> Đổi gói
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleAction(user.status === "blocked" ? "unlock" : "lock", user)}
                            className="gap-2 text-sm text-amber-700 focus:text-amber-700"
                          >
                            <Lock className="h-4 w-4" />
                            {user.status === "blocked" ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction("delete", user)}
                            className="gap-2 text-sm text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" /> Xóa tài khoản
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-5 py-3">
            <span className="text-xs text-muted-foreground">
              Hiển thị {Math.min((currentPage - 1) * PAGE_SIZE + 1, filtered.length)}–
              {Math.min(currentPage * PAGE_SIZE, filtered.length)} / {filtered.length} người dùng
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`rounded-md px-3 py-1 text-xs font-medium ${currentPage === i + 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User detail sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[480px] overflow-y-auto sm:max-w-[480px]">
          {selectedUser && (
            <>
              <SheetHeader className="pb-4">
                <SheetTitle>Chi tiết người dùng</SheetTitle>
              </SheetHeader>

              {/* Profile */}
              <div className="flex flex-col items-center gap-3 border-b border-border pb-6">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-xl font-bold text-primary">
                    {selectedUser.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="mt-2 flex justify-center gap-2">
                    <Badge variant="secondary" className={`text-xs font-semibold ${planBadge[selectedUser.plan]}`}>
                      {planLabel[selectedUser.plan]}
                    </Badge>
                    <Badge variant="secondary" className={`text-xs font-semibold ${statusBadge[selectedUser.status]}`}>
                      {statusLabel[selectedUser.status]}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-3 py-5 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Thông tin liên hệ</p>
                {[
                  { icon: Mail, label: selectedUser.email },
                  { icon: Phone, label: selectedUser.phone },
                  { icon: CalendarDays, label: `Đăng ký: ${selectedUser.signedUp}` },
                  { icon: Clock, label: `Hoạt động cuối: ${selectedUser.lastActive}` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Connected platforms */}
              <div className="flex flex-col gap-3 py-5 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Nền tảng đã kết nối</p>
                {selectedUser.connectedPlatforms.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Chưa kết nối nền tảng nào</p>
                ) : (
                  <div className="flex gap-2">
                    {selectedUser.connectedPlatforms.map((p) => (
                      <div key={p} className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2">
                        {platformIcon[p]}
                        <span className="text-xs font-medium capitalize text-foreground">{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment history */}
              <div className="flex flex-col gap-3 py-5">
                <p className="text-sm font-semibold text-foreground">Lịch sử thanh toán</p>
                {selectedUser.paymentHistory.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Chưa có giao dịch nào</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {selectedUser.paymentHistory.map((tx, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs font-semibold text-foreground">{tx.plan}</p>
                            <p className="text-xs text-muted-foreground">{tx.method} · {tx.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-foreground">{tx.amount}</span>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-sm"
                  onClick={() => { toast.success(`Đã gửi email đến ${selectedUser.email}`) }}
                >
                  <Mail className="h-4 w-4" /> Gửi email
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-sm"
                  onClick={() => { handleAction("change-plan", selectedUser); setSheetOpen(false) }}
                >
                  <Settings2 className="h-4 w-4" /> Đổi gói
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-destructive/30 text-sm text-destructive hover:bg-destructive/5"
                  onClick={() => { handleAction(selectedUser.status === "blocked" ? "unlock" : "lock", selectedUser); setSheetOpen(false) }}
                >
                  <Lock className="h-4 w-4" />
                  {selectedUser.status === "blocked" ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
