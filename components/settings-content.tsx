"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Mail,
  Smartphone,
  Save,
  Clock,
  ArrowRight,
  Check,
  Loader2,
  Zap,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { CheckoutDialog, type CheckoutPlan } from "@/components/checkout-dialog"

export function SettingsContent() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [twoFA, setTwoFA] = useState(false)
  const [notifs, setNotifs] = useState({ email: true, push: true, schedule: true, updates: false })
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutPlan, setCheckoutPlan] = useState<CheckoutPlan | null>(null)

  const handleSaveProfile = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 900))
    setIsSaving(false)
    toast.success("Đã lưu thay đổi thành công!")
  }

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ảnh vượt quá 2MB. Vui lòng chọn ảnh nhỏ hơn.")
      return
    }
    const url = URL.createObjectURL(file)
    setAvatarSrc(url)
    toast.success("Ảnh đại diện đã được cập nhật!")
  }

  const handleSelectPlan = (id: string, name: string, priceLabel: string) => {
    setCheckoutPlan({ id, name, priceLabel, priceSub: "/ tháng" })
    setCheckoutOpen(true)
  }

  const handleChangePassword = () => {
    toast.success("Email đặt lại mật khẩu đã được gửi!", {
      description: "Kiểm tra hộp thư minhtu@socialsense.vn",
    })
  }

  const handleToggle2FA = (checked: boolean) => {
    setTwoFA(checked)
    toast.success(checked ? "Xác thực 2 bước đã được bật!" : "Xác thực 2 bước đã tắt.")
  }

  const handleLogoutAll = () => {
    toast.success("Đã đăng xuất khỏi tất cả thiết bị!", {
      description: "Chỉ giữ lại phiên hiện tại.",
    })
  }

  return (
    <>
      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} plan={checkoutPlan} />
      <Tabs defaultValue="profile" className="flex flex-col gap-6">
      <TabsList className="h-9 w-fit bg-secondary">
        <TabsTrigger value="profile" className="text-xs">
          <User className="mr-1.5 h-3.5 w-3.5" /> {"Hồ sơ"}
        </TabsTrigger>
        <TabsTrigger value="notifications" className="text-xs">
          <Bell className="mr-1.5 h-3.5 w-3.5" /> {"Thông báo"}
        </TabsTrigger>
        <TabsTrigger value="billing" className="text-xs">
          <CreditCard className="mr-1.5 h-3.5 w-3.5" /> {"Thanh toán"}
        </TabsTrigger>
        <TabsTrigger value="security" className="text-xs">
          <Shield className="mr-1.5 h-3.5 w-3.5" /> {"Bảo mật"}
        </TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile" className="flex flex-col gap-6 mt-0">
        <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">
              {"Thông tin cá nhân"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                {avatarSrc && <AvatarImage src={avatarSrc} alt="Avatar" />}
                <AvatarFallback className="bg-primary/10 text-xl font-bold text-primary">
                  MT
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-fit rounded-lg text-xs"
                  onClick={handleAvatarClick}
                >
                  {"Thay đổi ảnh đại diện"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  {"JPG, PNG. Tối đa 2MB."}
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">{"Họ tên"}</Label>
                <Input defaultValue="Minh Tú" className="h-9 rounded-lg" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">{"Email"}</Label>
                <Input defaultValue="minhtu@socialsense.vn" className="h-9 rounded-lg" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">{"Số điện thoại"}</Label>
                <Input defaultValue="+84 901 234 567" className="h-9 rounded-lg" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">{"Ngôn ngữ"}</Label>
                <Select defaultValue="vi">
                  <SelectTrigger className="h-9 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">{"Công ty"}</Label>
                <Input defaultValue="SocialSense Vietnam" className="h-9 rounded-lg" />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">{"Vai trò"}</Label>
                <Input defaultValue="Marketing Manager" className="h-9 rounded-lg" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                className="rounded-lg font-semibold"
                size="sm"
                onClick={handleSaveProfile}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-1.5 h-4 w-4" />
                )}
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications" className="flex flex-col gap-6 mt-0">
        <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">
              {"Tùy chọn thông báo"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {[
              {
                key: "email" as const,
                icon: Mail,
                title: "Thông báo qua email",
                desc: "Nhận báo cáo hàng tuần và cảnh báo quan trọng",
              },
              {
                key: "push" as const,
                icon: Smartphone,
                title: "Thông báo push",
                desc: "Thông báo tức thời khi bài đăng được đăng",
              },
              {
                key: "schedule" as const,
                icon: Bell,
                title: "Nhắc lịch lên bài",
                desc: "Nhắc trước 30 phút khi bài đăng được đăng",
              },
              {
                key: "updates" as const,
                icon: Globe,
                title: "Cập nhật tính năng mới",
                desc: "Thông báo về các tính năng và cập nhật mới",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={notifs[item.key]}
                  onCheckedChange={(checked) => {
                    setNotifs((prev) => ({ ...prev, [item.key]: checked }))
                    toast.success(checked ? `${item.title} đã bật` : `${item.title} đã tắt`)
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Billing Tab */}
      <TabsContent value="billing" className="flex flex-col gap-6 mt-0">
        {/* Trial Status Card */}
        <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                {"Trạng thái tài khoản"}
              </CardTitle>
              <Badge className="bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-50">
                <Clock className="mr-1 h-3 w-3" />
                {"Trải nghiệm"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Trial progress */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-bold text-foreground">
                    {"Bạn đang trải nghiệm SocialSense"}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {"Bắt đầu: 15/02/2025 — Hết hạn: 17/03/2025"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-700">18</p>
                  <p className="text-xs text-muted-foreground">{"ngày còn lại"}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{"Hành trình của bạn"}</span>
                  <span>12/30 {"ngày"}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: "40%" }} />
                </div>
              </div>
            </div>

            {/* Encouragement section */}
            <div className="rounded-xl border border-border p-5">
              <p className="text-sm font-semibold text-foreground mb-3">
                {"Tại sao nên tiếp tục?"}
              </p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {"Dữ liệu và nội dung của bạn luôn được lưu trữ an toàn"}
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {"Tiếp tục tận dụng AI để tạo nội dung chất lượng"}
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {"Giữ đà tăng trưởng mà bạn đã xây dựng"}
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {"Chọn gói bất cứ lúc nào — không áp lực"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans — synced with plans-dialog */}
        <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">{"Chọn gói phù hợp"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Pro Plan */}
              <div className="flex flex-col rounded-2xl border-2 border-primary overflow-hidden shadow-md shadow-primary/10">
                <div className="bg-primary py-1.5 text-center text-xs font-semibold text-primary-foreground tracking-wide">
                  {"⭐ Phổ biến nhất"}
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-foreground leading-tight">Pro</p>
                      <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground leading-tight mt-0.5">
                        Phổ biến nhất
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-end gap-1.5 leading-none">
                    <span className="text-xl font-bold text-foreground">299.000đ</span>
                    <span className="text-xs text-muted-foreground pb-0.5">/ tháng</span>
                  </div>
                  <ul className="mt-4 flex flex-col gap-2 flex-1">
                    {[
                      "Tất cả tính năng bản dùng thử",
                      "Tối đa 5 tài khoản mạng xã hội",
                      "Báo cáo nâng cao & xuất PDF",
                      "Lên lịch không giới hạn bài đăng",
                      "So sánh với đối thủ cạnh tranh",
                      "Hỗ trợ ưu tiên qua email",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground leading-snug">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-5 w-full rounded-xl font-semibold"
                    onClick={() => handleSelectPlan("pro", "Pro", "299.000đ")}
                  >
                    Chọn gói Pro
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="flex flex-col rounded-2xl border-2 border-border overflow-hidden hover:border-violet-300 transition-all">
                <div className="py-1.5" />
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
                      <Users className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-foreground leading-tight">Team</p>
                      <span className="inline-block rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700 leading-tight mt-0.5">
                        Cho doanh nghiệp
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-end gap-1.5 leading-none">
                    <span className="text-xl font-bold text-foreground">799.000đ</span>
                    <span className="text-xs text-muted-foreground pb-0.5">/ tháng</span>
                  </div>
                  <ul className="mt-4 flex flex-col gap-2 flex-1">
                    {[
                      "Tất cả tính năng gói Pro",
                      "Không giới hạn tài khoản MXH",
                      "Workspace nhóm nhiều thành viên",
                      "Phân công & duyệt nội dung nhóm",
                      "API tích hợp riêng",
                      "Hỗ trợ 24/7 qua điện thoại & chat",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground leading-snug">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="mt-5 w-full rounded-xl font-semibold hover:border-violet-400 hover:text-violet-600"
                    onClick={() => handleSelectPlan("team", "Team", "799.000đ")}
                  >
                    Chọn gói Team
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security" className="flex flex-col gap-6 mt-0">
        <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">
              {"Bảo mật tài khoản"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">{"Đổi mật khẩu"}</p>
                <p className="text-xs text-muted-foreground">
                  {"Lần đổi cuối: 15/01/2025"}
                </p>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg text-xs" onClick={handleChangePassword}>
                {"Đổi mật khẩu"}
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {"Xác thực 2 bước (2FA)"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {"Bảo vệ tài khoản với mã OTP"}
                </p>
              </div>
              <Switch checked={twoFA} onCheckedChange={handleToggle2FA} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {"Phiên đăng nhập"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {"2 thiết bị đang hoạt động"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg text-xs text-destructive hover:text-destructive"
                onClick={handleLogoutAll}
              >
                {"Đăng xuất tất cả"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    </>
  )
}
