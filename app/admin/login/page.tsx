"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldAlert, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { useAdminAuth } from "@/lib/admin-auth-context"

export default function AdminLoginPage() {
  const { adminLogin } = useAdminAuth()
  const router = useRouter()
  const [email, setEmail] = useState("admin@socialsense.vn")
  const [password, setPassword] = useState("admin123")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
      return
    }
    setLoading(true)
    try {
      await adminLogin(email, password)
      toast.success("Đăng nhập thành công", { description: "Chào mừng trở lại, Admin!" })
    } catch {
      toast.error("Đăng nhập thất bại", { description: "Vui lòng kiểm tra lại thông tin" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Logo width={40} height={40} />
            <span className="text-2xl font-bold text-foreground">SocialSense</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2">
            <ShieldAlert className="h-4 w-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Cổng quản trị hệ thống</span>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          <h2 className="mb-1 text-xl font-bold text-foreground">Đăng nhập Admin</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Chỉ dành cho nhân viên nội bộ SocialSense.vn
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Email admin
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@socialsense.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-lg"
                autoComplete="email"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-sm font-medium">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 rounded-lg pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-10 w-full rounded-lg bg-destructive text-sm font-semibold text-white hover:bg-destructive/90"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Đang đăng nhập...
                </div>
              ) : (
                "Đăng nhập Admin"
              )}
            </Button>
          </form>

          <div className="mt-4 rounded-lg bg-secondary p-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">Demo:</span> admin@socialsense.vn / admin123
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mx-auto mt-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Quay về trang người dùng
        </button>
      </div>
    </div>
  )
}
