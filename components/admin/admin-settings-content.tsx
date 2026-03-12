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
  Package,
  Pencil,
  X,
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

interface Plan {
  id: number
  name: string
  slug: string
  price: number
  annualDiscount: number
  trialDays: number
  maxPlatforms: number
  maxPosts: number
  features: string[]
  popular: boolean
  active: boolean
  users: number
}

const INITIAL_PLANS: Plan[] = [
  {
    id: 1,
    name: "Trial miễn phí",
    slug: "trial",
    price: 0,
    annualDiscount: 0,
    trialDays: 30,
    maxPlatforms: 3,
    maxPosts: 20,
    features: ["Kết nối 3 tài khoản MXH", "20 bài đăng/tháng", "Analytics cơ bản", "AI Studio (giới hạn)"],
    popular: false,
    active: true,
    users: 312,
  },
  {
    id: 2,
    name: "Gói Người mới",
    slug: "pro",
    price: 79000,
    annualDiscount: 15,
    trialDays: 0,
    maxPlatforms: 5,
    maxPosts: 100,
    features: ["Kết nối 5 tài khoản MXH", "100 bài đăng/tháng", "Analytics đầy đủ", "AI Studio", "Lịch đăng bài"],
    popular: false,
    active: true,
    users: 589,
  },
  {
    id: 3,
    name: "Gói Nâng cao",
    slug: "team",
    price: 99000,
    annualDiscount: 15,
    trialDays: 0,
    maxPlatforms: 10,
    maxPosts: -1,
    features: ["Kết nối không giới hạn MXH", "Đăng bài không giới hạn", "Analytics Nâng cao", "AI Studio Pro", "Phân tích đối thủ", "Báo cáo PDF", "Hỗ trợ ưu tiên"],
    popular: true,
    active: true,
    users: 383,
  },
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

  // Plans management
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS)
  const [showPlanDialog, setShowPlanDialog] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [planName, setPlanName] = useState("")
  const [planPrice, setPlanPrice] = useState("")
  const [planAnnualDiscount, setPlanAnnualDiscount] = useState("")
  const [planTrialDays, setPlanTrialDays] = useState("")
  const [planMaxPlatforms, setPlanMaxPlatforms] = useState("")
  const [planMaxPosts, setPlanMaxPosts] = useState("")
  const [planPopular, setPlanPopular] = useState(false)
  const [planActive, setPlanActive] = useState(true)
  const [planFeatures, setPlanFeatures] = useState<string[]>([])
  const [newFeatureInput, setNewFeatureInput] = useState("")

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

  const openPlanDialog = (plan: Plan | null) => {
    if (plan) {
      setEditingPlan(plan)
      setPlanName(plan.name)
      setPlanPrice(plan.price.toString())
      setPlanAnnualDiscount(plan.annualDiscount.toString())
      setPlanTrialDays(plan.trialDays.toString())
      setPlanMaxPlatforms(plan.maxPlatforms.toString())
      setPlanMaxPosts(plan.maxPosts.toString())
      setPlanPopular(plan.popular)
      setPlanActive(plan.active)
      setPlanFeatures([...plan.features])
    } else {
      setEditingPlan(null)
      setPlanName("")
      setPlanPrice("0")
      setPlanAnnualDiscount("0")
      setPlanTrialDays("0")
      setPlanMaxPlatforms("3")
      setPlanMaxPosts("50")
      setPlanPopular(false)
      setPlanActive(true)
      setPlanFeatures([])
    }
    setNewFeatureInput("")
    setShowPlanDialog(true)
  }

  const handleSavePlan = async () => {
    if (!planName.trim()) { toast.error("Vui lòng nhập tên gói"); return }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    const planData: Plan = {
      id: editingPlan?.id ?? Date.now(),
      name: planName,
      slug: editingPlan?.slug ?? planName.toLowerCase().replace(/\s+/g, "_"),
      price: parseInt(planPrice) || 0,
      annualDiscount: parseInt(planAnnualDiscount) || 0,
      trialDays: parseInt(planTrialDays) || 0,
      maxPlatforms: parseInt(planMaxPlatforms) || 3,
      maxPosts: parseInt(planMaxPosts) || 50,
      popular: planPopular,
      active: planActive,
      features: planFeatures,
      users: editingPlan?.users ?? 0,
    }
    if (editingPlan) {
      setPlans((prev) => prev.map((p) => (p.id === editingPlan.id ? planData : p)))
      toast.success(`Đã cập nhật gói ${planName}`)
    } else {
      setPlans((prev) => [...prev, planData])
      toast.success(`Đã tạo gói ${planName}`)
    }
    setSaving(false)
    setShowPlanDialog(false)
  }

  const handleDeletePlan = (id: number) => {
    setPlans((prev) => prev.filter((p) => p.id !== id))
    toast.success("Đã xóa gói")
  }

  const addPlanFeature = () => {
    if (!newFeatureInput.trim()) return
    setPlanFeatures((prev) => [...prev, newFeatureInput.trim()])
    setNewFeatureInput("")
  }

  const removePlanFeature = (index: number) => {
    setPlanFeatures((prev) => prev.filter((_, i) => i !== index))
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
          { value: "plans", label: "Quản lý gói", icon: Package },
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

        {/* ── TAB 5: Plans ── */}
        <TabsContent value="plans" className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Quản lý các gói dịch vụ hiển thị cho người dùng</p>
            <Button size="sm" onClick={() => openPlanDialog(null)} className="h-8 gap-1.5 rounded-lg text-sm">
              <Plus className="h-3.5 w-3.5" /> Tạo gói mới
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)] ${!plan.active ? "opacity-60" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-xs text-white">Phổ biến nhất</Badge>
                  </div>
                )}
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-base font-bold text-foreground">{plan.name}</p>
                      <p className="mt-1 text-xl font-bold text-foreground">
                        {plan.price === 0 ? "Miễn phí" : `₫${plan.price.toLocaleString("vi-VN")}`}
                        {plan.price > 0 && <span className="text-sm font-normal text-muted-foreground">/tháng</span>}
                      </p>
                      {plan.annualDiscount > 0 && (
                        <p className="text-xs text-muted-foreground">Tiết kiệm {plan.annualDiscount}% khi thanh toán năm</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openPlanDialog(plan)}
                        className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-xs">{plan.users} người dùng</Badge>
                    {!plan.active && <Badge variant="secondary" className="bg-secondary text-xs text-muted-foreground">Ẩn</Badge>}
                    {plan.trialDays > 0 && <Badge variant="secondary" className="bg-amber-50 text-xs text-amber-700">{plan.trialDays} ngày trial</Badge>}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                    <span>🔗 {plan.maxPlatforms} tài khoản MXH</span>
                    <span>📝 {plan.maxPosts === -1 ? "Không giới hạn" : `${plan.maxPosts} bài/tháng`}</span>
                  </div>

                  {plan.features.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-1 border-t border-border pt-3">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
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

      {/* Plan create/edit dialog */}
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPlan ? `Chỉnh sửa: ${editingPlan.name}` : "Tạo gói mới"}</DialogTitle>
          </DialogHeader>
          <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1 pt-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Tên gói</Label>
              <Input value={planName} onChange={(e) => setPlanName(e.target.value)} className="h-10 rounded-lg" placeholder="VD: Gói Doanh nghiệp" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Giá/tháng (VND)</Label>
                <Input value={planPrice} onChange={(e) => setPlanPrice(e.target.value)} className="h-10 rounded-lg" placeholder="0 = miễn phí" type="number" min="0" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Giảm giá năm (%)</Label>
                <Input value={planAnnualDiscount} onChange={(e) => setPlanAnnualDiscount(e.target.value)} className="h-10 rounded-lg" placeholder="VD: 15" type="number" min="0" max="100" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Số ngày trial</Label>
                <Input value={planTrialDays} onChange={(e) => setPlanTrialDays(e.target.value)} className="h-10 rounded-lg" placeholder="0 = không có trial" type="number" min="0" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Tài khoản MXH tối đa</Label>
                <Input value={planMaxPlatforms} onChange={(e) => setPlanMaxPlatforms(e.target.value)} className="h-10 rounded-lg" type="number" min="1" />
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Số bài đăng/tháng (-1 = không giới hạn)</Label>
                <Input value={planMaxPosts} onChange={(e) => setPlanMaxPosts(e.target.value)} className="h-10 rounded-lg" type="number" min="-1" />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Gắn badge "Phổ biến nhất"</p>
                <p className="text-xs text-muted-foreground">Hiển thị nổi bật trên trang pricing</p>
              </div>
              <Switch checked={planPopular} onCheckedChange={setPlanPopular} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Kích hoạt gói</p>
                <p className="text-xs text-muted-foreground">Ẩn gói sẽ không hiển thị cho người dùng mới</p>
              </div>
              <Switch checked={planActive} onCheckedChange={setPlanActive} />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Tính năng bao gồm</Label>
              <div className="flex flex-col gap-1.5">
                {planFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span className="flex-1 text-sm text-foreground">{f}</span>
                    <button onClick={() => removePlanFeature(i)} className="text-muted-foreground hover:text-destructive">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newFeatureInput}
                  onChange={(e) => setNewFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addPlanFeature()}
                  className="h-9 flex-1 rounded-lg text-sm"
                  placeholder="VD: Xuất báo cáo PDF"
                />
                <Button size="sm" variant="outline" onClick={addPlanFeature} className="h-9 rounded-lg text-sm">Thêm</Button>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Button variant="outline" className="flex-1" onClick={() => setShowPlanDialog(false)}>Hủy</Button>
              <Button className="flex-1" onClick={handleSavePlan} disabled={saving}>
                {saving ? "Đang lưu..." : editingPlan ? "Lưu thay đổi" : "Tạo gói"}
              </Button>
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
