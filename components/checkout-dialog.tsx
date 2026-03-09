"use client"

import { useState } from "react"
import { Loader2, CreditCard, Shield, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
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

export interface CheckoutPlan {
  id: string
  name: string
  priceLabel: string
  priceSub: string
}

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: CheckoutPlan | null
}

export function CheckoutDialog({ open, onOpenChange, plan }: CheckoutDialogProps) {
  const { upgradePlan } = useAuth()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const [cardNumber, setCardNumber] = useState("4111 1111 1111 1111")
  const [cardName, setCardName] = useState("NGUYEN VAN A")
  const [expiry, setExpiry] = useState("12/27")
  const [cvv, setCvv] = useState("123")

  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim()

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  const handleClose = (val: boolean) => {
    if (!loading) {
      onOpenChange(val)
      if (!val) setDone(false)
    }
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!plan) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    setDone(true)
    upgradePlan(plan.id as "pro" | "team")
    setTimeout(() => {
      onOpenChange(false)
      setDone(false)
      toast.success(`Nâng cấp gói ${plan.name} thành công! 🎉`, {
        description: "Gói đã được kích hoạt ngay lập tức. Cảm ơn bạn!",
      })
    }, 1600)
  }

  if (!plan) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm">
        {done ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">Thanh toán thành công!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Gói <span className="font-semibold text-primary">{plan.name}</span> đã được kích hoạt.
              </p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Thanh toán</DialogTitle>
              <DialogDescription className="text-sm">
                Hoàn tất mua gói {plan.name}
              </DialogDescription>
            </DialogHeader>

            {/* Order summary */}
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gói {plan.name}</span>
                <span className="font-semibold text-foreground">{plan.priceLabel}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Chu kỳ thanh toán</span>
                <span>Hàng tháng</span>
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between font-semibold">
                <span className="text-sm">Tổng hôm nay</span>
                <span className="text-base text-primary">{plan.priceLabel}</span>
              </div>
            </div>

            <form onSubmit={handlePay} className="flex flex-col gap-3">
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

              <Button type="submit" className="mt-1 w-full font-semibold" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Đang xử lý..." : `Thanh toán ${plan.priceLabel}`}
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Thanh toán an toàn & mã hóa SSL 256-bit</span>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
