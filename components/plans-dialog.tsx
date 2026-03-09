"use client"

import { useState } from "react"
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Zap,
  Users,
  Sparkles,
  Clock,
  CreditCard,
  Shield,
  Loader2,
  Building2,
  Smartphone,
  QrCode,
  Copy,
} from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

interface PlansDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const plans = [
  {
    id: "trial",
    name: "Dùng thử",
    price: null,
    priceLabel: "Miễn phí",
    priceSub: "còn 18 ngày",
    icon: Clock,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badge: "Đang dùng",
    badgeBg: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-300",
    highlight: false,
    cta: "Đang hoạt động",
    ctaDisabled: true,
    features: [
      "Kết nối không giới hạn tài khoản MXH",
      "Phân tích hiệu suất bài đăng chi tiết",
      "Gợi ý thời điểm đăng tối ưu (AI)",
      "Báo cáo tự động hàng tuần",
      "Trợ lý nội dung AI",
      "Hỗ trợ tiếng Việt 24/7",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "299,000",
    priceLabel: "299.000đ",
    priceSub: "/ tháng",
    icon: Zap,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badge: "Phổ biến nhất",
    badgeBg: "bg-primary text-primary-foreground",
    border: "border-primary",
    highlight: true,
    cta: "Chọn gói Pro",
    ctaDisabled: false,
    features: [
      "Tất cả tính năng bản dùng thử",
      "Tối đa 5 tài khoản mạng xã hội",
      "Báo cáo nâng cao & xuất PDF",
      "Lên lịch không giới hạn bài đăng",
      "So sánh với đối thủ cạnh tranh",
      "Hỗ trợ ưu tiên qua email",
    ],
  },
  {
    id: "team",
    name: "Team",
    price: "799,000",
    priceLabel: "799.000đ",
    priceSub: "/ tháng",
    icon: Users,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    badge: "Cho doanh nghiệp",
    badgeBg: "bg-violet-100 text-violet-700",
    border: "border-border",
    highlight: false,
    cta: "Chọn gói Team",
    ctaDisabled: false,
    features: [
      "Tất cả tính năng gói Pro",
      "Không giới hạn tài khoản MXH",
      "Workspace nhóm nhiều thành viên",
      "Phân công & duyệt nội dung nhóm",
      "API tích hợp riêng",
      "Hỗ trợ 24/7 qua điện thoại & chat",
    ],
  },
]

type Step = "plans" | "checkout" | "success"

export function PlansDialog({ open, onOpenChange }: PlansDialogProps) {
  const { upgradePlan } = useAuth()
  const [step, setStep] = useState<Step>("plans")
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)
  const [paying, setPaying] = useState(false)
  const [payMethod, setPayMethod] = useState<"card" | "momo" | "bank">("card")

  const [cardNumber, setCardNumber] = useState("4111 1111 1111 1111")
  const [cardName, setCardName] = useState("NGUYEN VAN A")
  const [expiry, setExpiry] = useState("12/27")
  const [cvv, setCvv] = useState("123")

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  const handleClose = (val: boolean) => {
    if (!paying) {
      onOpenChange(val)
      if (!val) setTimeout(() => { setStep("plans"); setPayMethod("card") }, 300)
    }
  }

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (plan.ctaDisabled) return
    setSelectedPlan(plan)
    setStep("checkout")
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlan) return
    setPaying(true)
    await new Promise((r) => setTimeout(r, 1800))
    setPaying(false)
    upgradePlan(selectedPlan.id as "pro" | "team")
    setStep("success")
    setTimeout(() => {
      handleClose(false)
      toast.success(`Nâng cấp gói ${selectedPlan.name} thành công! 🎉`, {
        description: "Gói đã được kích hoạt ngay lập tức. Cảm ơn bạn!",
      })
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl p-0 max-h-[90vh] overflow-hidden flex flex-col">

        {/* ── STEP: PLANS ── */}
        {step === "plans" && (
          <>
            {/* Header */}
            <div className="shrink-0 bg-gradient-to-br from-primary/5 to-violet-500/5 px-8 pt-7 pb-5 border-b border-border">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-xs font-semibold">
                    {"30 ngày dùng thử — còn 18 ngày"}
                  </Badge>
                </div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  {"Chọn gói phù hợp với bạn"}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                  {"Không cần thẻ tín dụng. Hủy bất kỳ lúc nào."}
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Scrollable plans grid */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6">
              <div className="grid grid-cols-3 gap-4">
                {plans.map((plan) => {
                  const Icon = plan.icon
                  return (
                    <div
                      key={plan.id}
                      className={cn(
                        "flex flex-col rounded-2xl border-2 overflow-hidden transition-all",
                        plan.highlight
                          ? "border-primary shadow-md shadow-primary/10"
                          : plan.border
                      )}
                    >
                      {/* Top ribbon */}
                      {plan.highlight ? (
                        <div className="bg-primary py-1.5 text-center text-xs font-semibold text-primary-foreground tracking-wide">
                          {"⭐ Phổ biến nhất"}
                        </div>
                      ) : (
                        <div className="py-1.5" />
                      )}

                      <div className="flex flex-col flex-1 p-5">
                        {/* Icon + name */}
                        <div className="flex items-center gap-3">
                          <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", plan.iconBg)}>
                            <Icon className={cn("h-4 w-4", plan.iconColor)} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-base font-bold text-foreground leading-tight">{plan.name}</p>
                            <span className={cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold leading-tight mt-0.5", plan.badgeBg)}>
                              {plan.badge}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mt-4 flex items-end gap-1.5 leading-none">
                          <span className="text-xl font-bold text-foreground">{plan.priceLabel}</span>
                          <span className="text-xs text-muted-foreground pb-0.5">{plan.priceSub}</span>
                        </div>

                        {/* Features */}
                        <ul className="mt-4 flex flex-col gap-2">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground leading-snug">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                              {f}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <Button
                          className={cn(
                            "mt-5 w-full rounded-xl font-semibold",
                            plan.ctaDisabled && "opacity-60 cursor-default"
                          )}
                          variant={plan.highlight ? "default" : "outline"}
                          disabled={plan.ctaDisabled}
                          onClick={() => handleSelectPlan(plan)}
                        >
                          {plan.ctaDisabled ? plan.cta : (
                            <>
                              {plan.cta}
                              <ArrowRight className="ml-1.5 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-border px-6 py-4 text-center">
              <p className="text-xs text-muted-foreground">
                {"Cần tư vấn thêm? Liên hệ "}
                <span className="font-medium text-primary">hello@socialsense.vn</span>
                {" hoặc hotline "}
                <span className="font-medium text-primary">1800 1234</span>
                {" (miễn phí)."}
              </p>
            </div>
          </>
        )}

        {/* ── STEP: CHECKOUT ── */}
        {step === "checkout" && selectedPlan && (
          <>
            <div className="shrink-0 px-6 pt-6 pb-4 border-b border-border flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => setStep("plans")}
                disabled={paying}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <DialogTitle className="text-lg font-bold leading-tight">Thanh toán</DialogTitle>
                <DialogDescription className="text-xs mt-0">
                  Hoàn tất mua gói {selectedPlan.name}
                </DialogDescription>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-6 flex flex-col gap-5">
              {/* Order summary */}
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Gói {selectedPlan.name}</span>
                  <span className="font-semibold text-foreground">{selectedPlan.priceLabel}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Chu kỳ thanh toán</span>
                  <span>Hàng tháng</span>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-sm">Tổng hôm nay</span>
                  <span className="text-base text-primary">{selectedPlan.priceLabel}</span>
                </div>
              </div>

              {/* Payment form */}
              {/* Payment method selector */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-muted-foreground">Đặt phương thức thanh toán</p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: "card", label: "Thẻ ngân hàng", Icon: CreditCard },
                    { id: "momo", label: "Ví MoMo", Icon: Smartphone },
                    { id: "bank", label: "Chuyển khoản", Icon: Building2 },
                  ] as const).map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPayMethod(id)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl border-2 p-2.5 text-[11px] font-medium transition-all",
                        payMethod === id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground/40"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card form */}
              {payMethod === "card" && (
            <form id="checkout-form" onSubmit={handlePay} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="card-number" className="text-xs font-medium">Số thẻ</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="card-number"
                      className="pl-9 font-mono text-sm tracking-widest"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="card-name" className="text-xs font-medium">Tên chủ thẻ</Label>
                  <Input
                    id="card-name"
                    className="uppercase text-sm"
                    placeholder="NGUYEN VAN A"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="expiry" className="text-xs font-medium">Ngày hết hạn</Label>
                    <Input
                      id="expiry"
                      className="text-sm"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="cvv" className="text-xs font-medium">CVV</Label>
                    <Input
                      id="cvv"
                      className="text-sm"
                      placeholder="123"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    />
                  </div>
                </div>
              </form>
              )}

              {/* MoMo */}
              {payMethod === "momo" && (
                <form id="checkout-form" onSubmit={handlePay}>
                  <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-pink-50/60 p-6">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-md">
                      <QrCode className="h-12 w-12 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-foreground">Quét mã QR MoMo</p>
                      <p className="mt-1 text-xs text-muted-foreground">Mở app MoMo → Quét mã → Xác nhận thanh toán</p>
                      <p className="mt-2.5 text-lg font-bold text-pink-600">{selectedPlan.priceLabel}</p>
                      <p className="text-[10px] text-muted-foreground">Gói {selectedPlan.name} — hàng tháng</p>
                    </div>
                    <div className="flex w-full items-center gap-2 rounded-lg bg-pink-100 px-3 py-2">
                      <span className="flex-1 text-center font-mono text-xs font-semibold text-pink-700">SOCIALSENSE.{selectedPlan.id.toUpperCase()}</span>
                    </div>
                  </div>
                </form>
              )}

              {/* Bank Transfer */}
              {payMethod === "bank" && (
                <form id="checkout-form" onSubmit={handlePay}>
                  <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <p className="text-xs font-bold text-foreground">Thông tin chuyển khoản</p>
                    </div>
                    {[
                      { label: "Ngân hàng", value: "Vietcombank" },
                      { label: "Số tài khoản", value: "1234 5678 9012" },
                      { label: "Chủ tài khoản", value: "CÔNG TY SOCIALSENSE" },
                      { label: "Số tiền", value: selectedPlan.priceLabel },
                      { label: "Nội dung CK", value: `SS ${selectedPlan.id.toUpperCase()} ${selectedPlan.priceLabel}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{label}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-semibold text-foreground">{value}</span>
                          {label !== "Ngân hàng" && label !== "Số tiền" && (
                            <button
                              type="button"
                              onClick={() => { navigator.clipboard.writeText(value); toast.success("Đã sao chép!") }}
                              className="rounded p-0.5 text-muted-foreground hover:text-primary"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </form>
              )}
            </div>

            <div className="shrink-0 px-6 pb-6 pt-4 border-t border-border flex flex-col gap-3">
              <Button
                type="submit"
                form="checkout-form"
                className="w-full font-semibold"
                disabled={paying}
              >
                {paying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {paying
                  ? "Đang xử lý..."
                  : payMethod === "card"
                  ? `Thanh toán ${selectedPlan.priceLabel}`
                  : payMethod === "momo"
                  ? `Xác nhận đã quét QR • ${selectedPlan.priceLabel}`
                  : `Xác nhận đã chuyển khoản • ${selectedPlan.priceLabel}`
                }
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Thanh toán an toàn & mã hóa SSL 256-bit</span>
              </div>
            </div>
          </>
        )}

        {/* ── STEP: SUCCESS ── */}
        {step === "success" && selectedPlan && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 px-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-center">
              <DialogTitle className="text-lg font-bold text-foreground">Thanh toán thành công!</DialogTitle>
              <DialogDescription className="mt-2 text-sm">
                Gói <span className="font-semibold text-primary">{selectedPlan.name}</span>{" "}
                đã được kích hoạt. Cảm ơn bạn đã tin dùng SocialSense! 🎉
              </DialogDescription>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}
