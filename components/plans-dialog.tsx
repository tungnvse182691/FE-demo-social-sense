"use client"

import { useState } from "react"
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

interface PlansDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type BillingCycle = "monthly" | "annual"

const planDefs = [
  {
    id: "beginner",
    name: "Người mới",
    monthly: "79,000đ",
    annual: "67,000đ",
    highlight: false,
    cta: "Chọn gói Người mới",
    features: ["Tính năng 1", "Tính năng 2", "Tính năng 3"],
  },
  {
    id: "advanced",
    name: "Nâng cao",
    monthly: "99,000đ",
    annual: "84,000đ",
    highlight: true,
    cta: "Chọn gói Nâng cao",
    features: ["Tính năng 1", "Tính năng 2", "Tính năng 3", "Tính năng 4"],
  },
]

type Step = "plans" | "checkout" | "success"

export function PlansDialog({ open, onOpenChange }: PlansDialogProps) {
  const { upgradePlan } = useAuth()
  const [step, setStep] = useState<Step>("plans")
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")
  const [selectedPlan, setSelectedPlan] = useState<typeof planDefs[0] | null>(null)
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

  const handleSelectPlan = (plan: typeof planDefs[0]) => {
    setSelectedPlan(plan)
    setStep("checkout")
  }

  const getPrice = (plan: typeof planDefs[0]) =>
    billingCycle === "monthly" ? plan.monthly : plan.annual

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlan) return
    setPaying(true)
    await new Promise((r) => setTimeout(r, 1800))
    setPaying(false)
    upgradePlan(selectedPlan.id === "advanced" ? "team" : "pro")
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
      <DialogContent className="max-w-[680px] w-full p-0 max-h-[90vh] overflow-hidden flex flex-col">

        {/* ── STEP: PLANS ── */}
        {step === "plans" && (
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
            {/* Top: title */}
            <div className="px-7 pt-7 pb-4">
              <DialogTitle className="text-xl font-bold text-foreground">Gói sử dụng</DialogTitle>
              <DialogDescription className="sr-only">Chọn gói phù hợp với bạn</DialogDescription>
            </div>

            <div className="flex flex-1 gap-0 px-7 pb-7">
              {/* Left: billing toggle + CTA */}
              <div className="flex flex-col gap-4 w-52 shrink-0 pr-6">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={cn(
                      "flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm font-medium transition-all text-left",
                      billingCycle === "monthly"
                        ? "border-border bg-background text-foreground shadow-sm"
                        : "border-border bg-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Gói 1 tháng
                    {billingCycle === "monthly" && <ArrowRight className="h-4 w-4 text-primary" />}
                  </button>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setBillingCycle("annual")}
                      className={cn(
                        "flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm font-medium transition-all text-left",
                        billingCycle === "annual"
                          ? "border-border bg-background text-foreground shadow-sm"
                          : "border-border bg-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Gói 1 năm
                      {billingCycle === "annual" && <ArrowRight className="h-4 w-4 text-primary" />}
                    </button>
                    {billingCycle === "annual" && (
                      <p className="text-xs font-medium text-primary px-1">Tiết kiệm 2 tháng sử dụng!</p>
                    )}
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <Button className="w-full font-semibold" onClick={() => handleClose(false)}>
                    Trải nghiệm trước 30 ngày
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    Không thẻ tín dụng, không yêu cầu tài khoản ngân hàng trước.
                  </p>
                </div>
              </div>

              {/* Right: plan cards side by side */}
              <div className="flex flex-1 gap-4">
                {planDefs.map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      "flex-1 rounded-2xl border-2 bg-background flex flex-col",
                      plan.highlight ? "border-primary shadow-md shadow-primary/10" : "border-border"
                    )}
                  >
                    <div className="p-5 pb-3">
                      <p className="text-xl font-bold text-foreground">{plan.name}</p>
                    </div>
                    <div className="mx-4 mb-4 rounded-xl bg-primary px-4 py-4 text-center">
                      <p className="text-3xl font-bold text-primary-foreground leading-none">
                        {getPrice(plan)}
                      </p>
                      <p className="text-sm font-medium text-primary-foreground/90 mt-1">tháng</p>
                    </div>
                    <ul className="px-5 flex flex-col gap-2.5 flex-1 pb-4">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-foreground shrink-0">•</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 pt-0">
                      <Button
                        className="w-full rounded-xl font-semibold"
                        variant={plan.highlight ? "default" : "outline"}
                        onClick={() => handleSelectPlan(plan)}
                      >
                        {plan.cta}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
                  <span className="font-semibold text-foreground">{getPrice(selectedPlan)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Chu kỳ thanh toán</span>
                  <span>{billingCycle === "monthly" ? "Hàng tháng" : "Hàng năm"}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-sm">Tổng hôm nay</span>
                  <span className="text-base text-primary">{getPrice(selectedPlan)}</span>
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
                      <p className="mt-2.5 text-lg font-bold text-pink-600">{getPrice(selectedPlan)}</p>
                      <p className="text-[10px] text-muted-foreground">Gói {selectedPlan.name} — {billingCycle === "monthly" ? "hàng tháng" : "hàng năm"}</p>
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
                      { label: "Số tiền", value: getPrice(selectedPlan) },
                      { label: "Nội dung CK", value: `SS ${selectedPlan.id.toUpperCase()} ${getPrice(selectedPlan)}` },
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
                  ? `Thanh toán ${getPrice(selectedPlan)}`
                  : payMethod === "momo"
                  ? `Xác nhận đã quét QR • ${getPrice(selectedPlan)}`
                  : `Xác nhận đã chuyển khoản • ${getPrice(selectedPlan)}`
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
