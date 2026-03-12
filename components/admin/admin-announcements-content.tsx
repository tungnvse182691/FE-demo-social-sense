"use client"

import { useState } from "react"
import {
  Plus,
  Megaphone,
  Users,
  Clock,
  CheckCircle2,
  Pencil,
  Trash2,
  Info,
  AlertTriangle,
  Star,
  Gift,
} from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type AnnouncementStatus = "draft" | "active" | "ended"
type AnnouncementType = "info" | "warning" | "success" | "promo"

interface Announcement {
  id: number
  title: string
  content: string
  type: AnnouncementType
  targets: string[]
  startDate: string
  endDate: string
  status: AnnouncementStatus
  reach: number
}

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "🎉 Tính năng mới: AI Content Studio v2",
    content: "Chúng tôi vừa nâng cấp AI Content Studio với khả năng tạo nội dung đa ngôn ngữ và tích hợp xu hướng TikTok theo thời gian thực.",
    type: "success",
    targets: ["all"],
    startDate: "10/03/2026",
    endDate: "20/03/2026",
    status: "active",
    reach: 1284,
  },
  {
    id: 2,
    title: "⚠️ Bảo trì hệ thống Instagram API",
    content: "Chúng tôi đang xử lý sự cố độ trễ cao với Instagram API. Dự kiến khắc phục hoàn toàn trong 2-4 giờ tới.",
    type: "warning",
    targets: ["all"],
    startDate: "12/03/2026",
    endDate: "12/03/2026",
    status: "active",
    reach: 1284,
  },
  {
    id: 3,
    title: "💡 Mẹo: Đăng bài vào khung giờ vàng",
    content: "Nghiên cứu cho thấy đăng bài vào 18:00-20:00 thứ Tư và 10:00-12:00 thứ Bảy cho tỷ lệ tương tác cao hơn 40%.",
    type: "info",
    targets: ["beginner", "advanced"],
    startDate: "01/03/2026",
    endDate: "31/03/2026",
    status: "active",
    reach: 972,
  },
  {
    id: 4,
    title: "🎁 Ưu đãi: Nâng cấp lên Nâng cao — Giảm 30%",
    content: "Chỉ trong tháng 3, nâng cấp lên gói Nâng cao và nhận ưu đãi 30% ngay hôm nay. Dùng mã SPRING30.",
    type: "promo",
    targets: ["trial", "beginner"],
    startDate: "01/03/2026",
    endDate: "31/03/2026",
    status: "active",
    reach: 901,
  },
  {
    id: 5,
    title: "📊 Báo cáo Analytics tháng 2/2026",
    content: "Báo cáo hiệu suất tháng 2 đã sẵn sàng. Xem lại số liệu tổng quan và kế hoạch cải thiện tháng 3.",
    type: "info",
    targets: ["beginner", "advanced"],
    startDate: "01/02/2026",
    endDate: "28/02/2026",
    status: "ended",
    reach: 830,
  },
]

const typeConfig: Record<AnnouncementType, { label: string; icon: React.ElementType; badgeClass: string; previewClass: string; iconColor: string }> = {
  info: { label: "Thông tin", icon: Info, badgeClass: "bg-primary/10 text-primary", previewClass: "border-primary/30 bg-primary/5", iconColor: "text-primary" },
  warning: { label: "Cảnh báo", icon: AlertTriangle, badgeClass: "bg-amber-50 text-amber-700", previewClass: "border-amber-200 bg-amber-50", iconColor: "text-amber-600" },
  success: { label: "Tính năng mới", icon: Star, badgeClass: "bg-emerald-50 text-emerald-700", previewClass: "border-emerald-200 bg-emerald-50", iconColor: "text-emerald-600" },
  promo: { label: "Khuyến mãi", icon: Gift, badgeClass: "bg-violet-100 text-violet-700", previewClass: "border-violet-200 bg-violet-50", iconColor: "text-violet-600" },
}

const statusConfig: Record<AnnouncementStatus, { label: string; badgeClass: string }> = {
  draft: { label: "Nháp", badgeClass: "bg-secondary text-muted-foreground" },
  active: { label: "Đang chạy", badgeClass: "bg-emerald-50 text-emerald-700" },
  ended: { label: "Kết thúc", badgeClass: "bg-secondary text-muted-foreground" },
}

const TARGET_OPTIONS = [
  { value: "all", label: "Tất cả người dùng" },
  { value: "trial", label: "Chỉ gói Trial" },
  { value: "beginner", label: "Chỉ gói Người mới" },
  { value: "advanced", label: "Chỉ gói Nâng cao" },
]

export function AdminAnnouncementsContent() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS)
  const [selected, setSelected] = useState<Announcement | null>(null)
  const [isNew, setIsNew] = useState(false)

  // Form state
  const [formTitle, setFormTitle] = useState("")
  const [formContent, setFormContent] = useState("")
  const [formType, setFormType] = useState<AnnouncementType>("info")
  const [formTargets, setFormTargets] = useState<string[]>(["all"])
  const [formStart, setFormStart] = useState("")
  const [formEnd, setFormEnd] = useState("")
  const [saving, setSaving] = useState(false)

  const openNew = () => {
    setSelected(null)
    setIsNew(true)
    setFormTitle("")
    setFormContent("")
    setFormType("info")
    setFormTargets(["all"])
    setFormStart("12/03/2026")
    setFormEnd("31/03/2026")
  }

  const openEdit = (a: Announcement) => {
    setSelected(a)
    setIsNew(false)
    setFormTitle(a.title)
    setFormContent(a.content)
    setFormType(a.type)
    setFormTargets(a.targets)
    setFormStart(a.startDate)
    setFormEnd(a.endDate)
  }

  const toggleTarget = (val: string) => {
    if (val === "all") {
      setFormTargets(["all"])
      return
    }
    setFormTargets((prev) => {
      const filtered = prev.filter((t) => t !== "all")
      if (filtered.includes(val)) {
        const next = filtered.filter((t) => t !== val)
        return next.length === 0 ? ["all"] : next
      }
      return [...filtered, val]
    })
  }

  const handleSave = async (asDraft = false) => {
    if (!formTitle.trim()) { toast.error("Vui lòng nhập tiêu đề"); return }
    if (!formContent.trim()) { toast.error("Vui lòng nhập nội dung"); return }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    if (isNew) {
      const newAnn: Announcement = {
        id: Date.now(),
        title: formTitle,
        content: formContent,
        type: formType,
        targets: formTargets,
        startDate: formStart,
        endDate: formEnd,
        status: asDraft ? "draft" : "active",
        reach: formTargets.includes("all") ? 1284 : 600,
      }
      setAnnouncements((prev) => [newAnn, ...prev])
      toast.success(asDraft ? "Đã lưu nháp thông báo" : "Đã đăng thông báo thành công", {
        description: asDraft ? "Bạn có thể chỉnh sửa sau" : `Đã gửi tới ${newAnn.reach.toLocaleString("vi-VN")} người dùng`,
      })
      setSelected(newAnn)
      setIsNew(false)
    } else if (selected) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === selected.id
            ? { ...a, title: formTitle, content: formContent, type: formType, targets: formTargets, startDate: formStart, endDate: formEnd, status: asDraft ? "draft" : "active" }
            : a
        )
      )
      toast.success("Đã cập nhật thông báo")
    }
    setSaving(false)
  }

  const handleDelete = async (id: number) => {
    await new Promise((r) => setTimeout(r, 400))
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    if (selected?.id === id) setSelected(null)
    toast.success("Đã xóa thông báo")
  }

  const activeCount = announcements.filter((a) => a.status === "active").length
  const endedThisMonth = announcements.filter((a) => a.status === "ended").length
  const totalReach = announcements.filter((a) => a.status === "active").reduce((s, a) => s + a.reach, 0)

  const PreviewTypeConfig = typeConfig[formType]

  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Đang chạy", value: activeCount, icon: Megaphone, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Đã gửi tháng này", value: endedThisMonth + activeCount, icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
          { label: "Tổng người nhận", value: totalReach.toLocaleString("vi-VN"), icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
        ].map((s) => (
          <Card key={s.label} className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main 2-column layout */}
      <div className="flex gap-4 items-start">
        {/* Left — list */}
        <Card className="w-96 shrink-0 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader className="pb-3">
            <Button onClick={openNew} className="w-full gap-2 rounded-xl text-sm font-semibold">
              <Plus className="h-4 w-4" />
              Tạo thông báo mới
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 p-0 pb-3">
            {announcements.map((a) => {
              const tc = typeConfig[a.type]
              const sc = statusConfig[a.status]
              const isActive = selected?.id === a.id || (isNew && false)
              return (
                <div
                  key={a.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openEdit(a)}
                  onKeyDown={(e) => e.key === "Enter" && openEdit(a)}
                  className={cn(
                    "flex cursor-pointer flex-col gap-1.5 px-4 py-3 text-left transition-colors hover:bg-secondary",
                    isActive && "bg-accent"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="line-clamp-1 text-sm font-semibold text-foreground">{a.title}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(a.id) }}
                      className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={`text-[10px] font-semibold ${sc.badgeClass}`}>
                      {sc.label}
                    </Badge>
                    <Badge variant="secondary" className={`text-[10px] font-semibold ${tc.badgeClass}`}>
                      {tc.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {a.startDate} → {a.endDate}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Right — form */}
        <Card className="flex-1 border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {!selected && !isNew ? (
            <CardContent className="flex flex-col items-center justify-center gap-3 py-20">
              <Megaphone className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Chọn thông báo để chỉnh sửa hoặc tạo mới</p>
            </CardContent>
          ) : (
            <>
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-primary" />
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {isNew ? "Tạo thông báo mới" : "Chỉnh sửa thông báo"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 p-6">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium">Tiêu đề thông báo</Label>
                  <Input
                    placeholder="VD: 🎉 Tính năng mới đã ra mắt!"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="h-10 rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium">Nội dung</Label>
                  <Textarea
                    placeholder="Mô tả chi tiết thông báo..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="min-h-[100px] rounded-lg resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <Label className="text-sm font-medium">Loại thông báo</Label>
                    <Select value={formType} onValueChange={(v) => setFormType(v as AnnouncementType)}>
                      <SelectTrigger className="h-10 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">ℹ️ Thông tin</SelectItem>
                        <SelectItem value="warning">⚠️ Cảnh báo</SelectItem>
                        <SelectItem value="success">✅ Tính năng mới</SelectItem>
                        <SelectItem value="promo">🎁 Khuyến mãi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <Label className="text-sm font-medium">Từ ngày</Label>
                    <Input
                      placeholder="DD/MM/YYYY"
                      value={formStart}
                      onChange={(e) => setFormStart(e.target.value)}
                      className="h-10 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <Label className="text-sm font-medium">Đến ngày</Label>
                    <Input
                      placeholder="DD/MM/YYYY"
                      value={formEnd}
                      onChange={(e) => setFormEnd(e.target.value)}
                      className="h-10 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">Đối tượng nhận</Label>
                  <div className="flex flex-wrap gap-3">
                    {TARGET_OPTIONS.map((opt) => (
                      <label key={opt.value} className="flex cursor-pointer items-center gap-2">
                        <Checkbox
                          checked={formTargets.includes(opt.value)}
                          onCheckedChange={() => toggleTarget(opt.value)}
                          className="rounded"
                        />
                        <span className="text-sm text-foreground">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                {formTitle && (
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-muted-foreground">Xem thử Preview</Label>
                    <div className={cn("flex items-start gap-3 rounded-xl border p-4", PreviewTypeConfig.previewClass)}>
                      <PreviewTypeConfig.icon className={`mt-0.5 h-4 w-4 shrink-0 ${PreviewTypeConfig.iconColor}`} />
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-foreground">{formTitle}</p>
                        {formContent && (
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{formContent}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl"
                    disabled={saving}
                    onClick={() => handleSave(true)}
                  >
                    Lưu nháp
                  </Button>
                  <Button
                    className="flex-1 rounded-xl font-semibold"
                    disabled={saving}
                    onClick={() => handleSave(false)}
                  >
                    {saving ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Đang đăng...
                      </div>
                    ) : "Đăng ngay"}
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
