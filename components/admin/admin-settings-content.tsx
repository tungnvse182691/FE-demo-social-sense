"use client"

import { useState } from "react"
import {
  UserCircle,
  Flag,
  Tag,
  Wallet,
  Plus,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Copy,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const ADMIN_ACCOUNTS = [
  { id: 1, name: "Nguyễn Admin", email: "admin@socialsense.vn", role: "super_admin", createdAt: "01/10/2025" },
  { id: 2, name: "Lê Support", email: "support@socialsense.vn", role: "support", createdAt: "15/11/2025" },
  { id: 3, name: "Trần Finance", email: "finance@socialsense.vn", role: "finance", createdAt: "01/01/2026" },
]

const FEATURE_FLAGS = [
  { id: "ai_studio", label: "AI Content Studio", desc: "Cho phép tạo nội dung bằng AI", enabled: true },
  { id: "competitor_analysis", label: "Phân tích đối thủ", desc: "So sánh chỉ số với competitor", enabled: true },
  { id: "scheduler", label: "Lịch đăng bài", desc: "Module lên lịch và đăng tự động", enabled: true },
  { id: "analytics_advanced", label: "Analytics Nâng cao", desc: "Biểu đồ và báo cáo chi tiết", enabled: true },
  { id: "youtube_integration", label: "YouTube Integration", desc: "Kết nối và phân tích YouTube", enabled: false },
  { id: "pdf_report", label: "Báo cáo PDF", desc: "Xuất báo cáo dưới dạng PDF", enabled: false },
  { id: "team_collaboration", label: "Cộng tác nhóm", desc: "Nhiều thành viên cùng quản lý", enabled: false },
  { id: "api_access", label: "API Access (Public)", desc: "Cho phép người dùng gọi API trực tiếp", enabled: false },
]

interface Coupon {
  id: number
  code: string
  discount: string
  type: "percent" | "days"
  used: number
  maxUses: number
  expiry: string
  active: boolean
}

const INITIAL_COUPONS: Coupon[] = [
  { id: 1, code: "LAUNCH50", discount: "50%", type: "percent", used: 47, maxUses: 100, expiry: "31/03/2026", active: true },
  { id: 2, code: "TRIAL2X", discount: "+30 ngày", type: "days", used: 123, maxUses: 500, expiry: "30/06/2026", active: true },
  { id: 3, code: "SUMMER30", discount: "30%", type: "percent", used: 12, maxUses: 200, expiry: "30/09/2026", active: false },
  { id: 4, code: "SPRING2026", discount: "25%", type: "percent", used: 8, maxUses: 150, expiry: "31/05/2026", active: true },
]

const roleLabels: Record<string, { label: string; className: string }> = {
  super_admin: { label: "Super Admin", className: "bg-destructive/10 text-destructive" },
  support: { label: "Support", className: "bg-amber-50 text-amber-700" },
  finance: { label: "Finance", className: "bg-emerald-50 text-emerald-700" },
}

export function AdminSettingsContent() {
  const [flags, setFlags] = useState(INITIAL_FEATURE_FLAGS())
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS)
  const [saving, setSaving] = useState(false)
  const [showAddAdmin, setShowAddAdmin] = useState(false)
  const [showAddCoupon, setShowAddCoupon] = useState(false)

  // Profile form
  const [adminName, setAdminName] = useState("Nguyễn Admin")
  const [adminEmail, setAdminEmail] = useState("admin@socialsense.vn")
  const [showPass, setShowPass] = useState(false)
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")

  // New admin form
  const [newAdminName, setNewAdminName] = useState("")
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [newAdminRole, setNewAdminRole] = useState("support")

  // New coupon form
  const [newCode, setNewCode] = useState("")
  const [newDiscount, setNewDiscount] = useState("")

  const handleSaveProfile = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success("Đã lưu thông tin tài khoản")
    setSaving(false)
  }

  const handleSavePassword = async () => {
    if (!currentPass || !newPass) { toast.error("Vui lòng nhập đầy đủ thông tin"); return }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success("Đã đổi mật khẩu", { description: "Email xác nhận đã được gửi" })
    setCurrentPass("")
    setNewPass("")
    setSaving(false)
  }

  const handleToggleFlag = async (id: string) => {
    setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)))
    await new Promise((r) => setTimeout(r, 300))
    toast.success("Đã cập nhật tính năng", { description: "Thay đổi có hiệu lực ngay lập tức" })
  }

  const handleToggleCoupon = (id: number) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)))
    toast.success("Đã cập nhật trạng thái mã giảm giá")
  }

  const handleDeleteCoupon = (id: number) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id))
    toast.success("Đã xóa mã giảm giá")
  }

  const handleAddCoupon = async () => {
    if (!newCode.trim() || !newDiscount.trim()) { toast.error("Vui lòng nhập đầy đủ thông tin"); return }
    await new Promise((r) => setTimeout(r, 500))
    setCoupons((prev) => [...prev, {
      id: Date.now(),
      code: newCode.toUpperCase(),
      discount: newDiscount,
      type: "percent",
      used: 0,
      maxUses: 100,
      expiry: "31/12/2026",
      active: true,
    }])
    toast.success(`Đã tạo mã ${newCode.toUpperCase()}`)
    setNewCode("")
    setNewDiscount("")
    setShowAddCoupon(false)
  }

  const handleAddAdmin = async () => {
    if (!newAdminName || !newAdminEmail) { toast.error("Vui lòng nhập đầy đủ thông tin"); return }
    await new Promise((r) => setTimeout(r, 600))
    toast.success(`Đã tạo tài khoản ${newAdminName}`, { description: "Email mời đã được gửi" })
    setNewAdminName("")
    setNewAdminEmail("")
    setShowAddAdmin(false)
  }

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code).then(() => toast.success(`Đã sao chép mã ${code}`))
  }

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="accounts">
        <TabsList className="h-10 rounded-xl bg-secondary p-1">
          {[
            { value: "accounts", label: "Tài khoản Admin", icon: UserCircle },
            { value: "features", label: "Tính năng", icon: Flag },
            { value: "coupons", label: "Mã giảm giá", icon: Tag },
            { value: "billing", label: "Cấu hình thanh toán", icon: Wallet },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-foreground"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── TAB 1: Admin Accounts ── */}
        <TabsContent value="accounts" className="mt-6 flex flex-col gap-5">
          {/* Profile */}
          <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Thông tin tài khoản của bạn</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5 pb-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-destructive/10 text-lg font-bold text-destructive">NA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-semibold text-foreground">Nguyễn Admin</p>
                  <p className="text-sm text-muted-foreground">admin@socialsense.vn · Super Admin</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium">Tên hiển thị</Label>
                  <Input value={adminName} onChange={(e) => setAdminName(e.target.value)} className="h-10 rounded-lg" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium">Email</Label>
                  <Input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="h-10 rounded-lg" />
                </div>
              </div>
              <Button onClick={handleSaveProfile} disabled={saving} size="sm" className="w-fit gap-2 rounded-lg text-sm">
                <Save className="h-4 w-4" /> Lưu thay đổi
              </Button>

              <div className="border-t border-border pt-4">
                <p className="mb-3 text-sm font-semibold text-foreground">Đổi mật khẩu</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium">Mật khẩu hiện tại</Label>
                    <div className="relative">
                      <Input
                        type={showPass ? "text" : "password"}
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        className="h-10 rounded-lg pr-10"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium">Mật khẩu mới</Label>
                    <Input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="h-10 rounded-lg"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <Button onClick={handleSavePassword} disabled={saving} size="sm" variant="outline" className="mt-3 w-fit gap-2 rounded-lg text-sm">
                  Đổi mật khẩu
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Admin list */}
          <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-foreground">Tài khoản quản trị</CardTitle>
                <Button size="sm" variant="outline" onClick={() => setShowAddAdmin(true)} className="h-8 gap-1.5 rounded-lg text-xs">
                  <Plus className="h-3.5 w-3.5" /> Thêm admin
                </Button>
              </div>
            </CardHeader>
            <CardContent className="mt-4 p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {["Tên", "Email", "Vai trò", "Ngày tạo", ""].map((h) => (
                      <TableHead key={h} className={`${h === "Tên" ? "pl-5" : ""} text-xs font-semibold text-muted-foreground`}>{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ADMIN_ACCOUNTS.map((a) => (
                    <TableRow key={a.id} className="border-border">
                      <TableCell className="pl-5">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="bg-secondary text-xs font-semibold">{a.name.split(" ").map((w) => w[0]).slice(-2).join("")}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">{a.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{a.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-xs font-semibold ${roleLabels[a.role]?.className}`}>
                          {roleLabels[a.role]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{a.createdAt}</TableCell>
                      <TableCell className="pr-5 text-right">
                        {a.role !== "super_admin" && (
                          <button className="rounded p-1 text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB 2: Feature Flags ── */}
        <TabsContent value="features" className="mt-6">
          <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Quản lý tính năng hệ thống</CardTitle>
              <p className="text-sm text-muted-foreground">Bật/tắt tính năng sẽ có hiệu lực ngay với tất cả người dùng</p>
            </CardHeader>
            <CardContent className="flex flex-col divide-y divide-border px-5 pb-5">
              {flags.map((flag) => (
                <div key={flag.id} className="flex items-center justify-between py-4">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{flag.label}</span>
                      {!flag.enabled && (
                        <Badge variant="secondary" className="bg-secondary px-1.5 py-0 text-[10px] text-muted-foreground">
                          Tắt
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{flag.desc}</span>
                  </div>
                  <Switch
                    checked={flag.enabled}
                    onCheckedChange={() => handleToggleFlag(flag.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB 3: Coupons ── */}
        <TabsContent value="coupons" className="mt-6 flex flex-col gap-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={() => setShowAddCoupon(true)} className="h-8 gap-1.5 rounded-lg text-sm">
              <Plus className="h-3.5 w-3.5" /> Tạo mã mới
            </Button>
          </div>
          <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    {["Mã code", "Giảm giá", "Đã dùng", "Hết hạn", "Kích hoạt", ""].map((h) => (
                      <TableHead key={h} className={`${h === "Mã code" ? "pl-5" : ""} text-xs font-semibold text-muted-foreground`}>{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((c) => (
                    <TableRow key={c.id} className="border-border">
                      <TableCell className="pl-5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-foreground">{c.code}</span>
                          <button onClick={() => copyCoupon(c.code)} className="rounded p-0.5 text-muted-foreground hover:text-foreground">
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-emerald-50 font-mono font-bold text-emerald-700">
                          {c.discount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-foreground">
                        {c.used}
                        <span className="text-muted-foreground">/{c.maxUses}</span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.expiry}</TableCell>
                      <TableCell>
                        <Switch checked={c.active} onCheckedChange={() => handleToggleCoupon(c.id)} />
                      </TableCell>
                      <TableCell className="pr-5 text-right">
                        <button onClick={() => handleDeleteCoupon(c.id)} className="rounded p-1 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB 4: Billing config ── */}
        <TabsContent value="billing" className="mt-6 flex flex-col gap-5">
          <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Cổng thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-5 pb-5">
              {[
                { name: "MoMo Business", status: "Đã kết nối", key: "momo_biz_prod_****3421", color: "bg-[#ae2070]/10 text-[#ae2070]" },
                { name: "Stripe", status: "Đã kết nối", key: "sk_live_****AbcDef123", color: "bg-primary/10 text-primary" },
                { name: "Chuyển khoản ngân hàng", status: "Đã cấu hình", key: "ACB · 12345678910 · SocialSense Vietnam LLC", color: "bg-emerald-50 text-emerald-700" },
              ].map((g) => (
                <div key={g.name} className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg px-2.5 py-1 text-xs font-bold ${g.color}`}>{g.name[0]}</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{g.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{g.key}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-50 gap-1 text-xs text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" />{g.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Cấu hình giá gói</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-5 pb-5">
              {[
                { plan: "Gói Người mới", price: "₫79,000/tháng", annual: "₫67,083/tháng (thanh toán năm)", users: "589 người đang dùng" },
                { plan: "Gói Nâng cao", price: "₫99,000/tháng", annual: "₫82,500/tháng (thanh toán năm)", users: "383 người đang dùng" },
                { plan: "Trial miễn phí", price: "₫0", annual: "30 ngày mặc định", users: "312 người trong trial" },
              ].map((p) => (
                <div key={p.plan} className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{p.plan}</p>
                    <p className="text-xs text-muted-foreground">{p.annual}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{p.price}</p>
                    <p className="text-xs text-muted-foreground">{p.users}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add admin dialog */}
      <Dialog open={showAddAdmin} onOpenChange={setShowAddAdmin}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Thêm tài khoản Admin mới</DialogTitle></DialogHeader>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Tên</Label>
              <Input value={newAdminName} onChange={(e) => setNewAdminName(e.target.value)} className="h-10 rounded-lg" placeholder="VD: Nguyễn Văn A" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Email</Label>
              <Input value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} className="h-10 rounded-lg" placeholder="admin@socialsense.vn" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Vai trò</Label>
              <select
                value={newAdminRole}
                onChange={(e) => setNewAdminRole(e.target.value)}
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground"
              >
                <option value="support">Support</option>
                <option value="finance">Finance</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddAdmin(false)}>Hủy</Button>
              <Button className="flex-1" onClick={handleAddAdmin}>Tạo tài khoản</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add coupon dialog */}
      <Dialog open={showAddCoupon} onOpenChange={setShowAddCoupon}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Tạo mã giảm giá mới</DialogTitle></DialogHeader>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Mã code</Label>
              <Input
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                className="h-10 rounded-lg font-mono"
                placeholder="VD: NEWYEAR50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Giảm giá</Label>
              <Input
                value={newDiscount}
                onChange={(e) => setNewDiscount(e.target.value)}
                className="h-10 rounded-lg"
                placeholder="VD: 30% hoặc +15 ngày"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddCoupon(false)}>Hủy</Button>
              <Button className="flex-1" onClick={handleAddCoupon}>Tạo mã</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function INITIAL_FEATURE_FLAGS() {
  return FEATURE_FLAGS.map((f) => ({ ...f }))
}
