"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

export interface AdminUser {
  name: string
  email: string
  role: "super_admin" | "support" | "finance"
  avatar: string
}

interface AdminAuthContextType {
  adminUser: AdminUser | null
  loading: boolean
  adminLogin: (email: string, password: string) => Promise<void>
  adminLogout: () => void
}

export const AdminAuthContext = createContext<AdminAuthContextType | null>(null)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ss_admin")
      if (stored) setAdminUser(JSON.parse(stored))
    } catch {}
    setLoading(false)
  }, [])

  const saveAdmin = (u: AdminUser) => {
    setAdminUser(u)
    localStorage.setItem("ss_admin", JSON.stringify(u))
  }

  const adminLogin = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800))
    let role: AdminUser["role"] = "super_admin"
    if (email.includes("support")) role = "support"
    if (email.includes("finance")) role = "finance"
    const rawName =
      email === "admin@socialsense.vn"
        ? "Nguyễn Admin"
        : email
            .split("@")[0]
            .replace(/[._-]/g, " ")
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")
    const avatar = rawName
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    saveAdmin({ name: rawName, email, role, avatar })
    router.push("/admin/dashboard")
  }

  const adminLogout = useCallback(() => {
    setAdminUser(null)
    localStorage.removeItem("ss_admin")
    router.push("/admin/login")
  }, [router])

  return (
    <AdminAuthContext.Provider value={{ adminUser, loading, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider")
  return ctx
}
