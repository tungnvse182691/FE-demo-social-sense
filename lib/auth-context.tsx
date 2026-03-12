"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

export interface AuthUser {
  name: string
  email: string
  plan: "trial" | "pro" | "team"
  trialDaysLeft: number
  avatar: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  upgradePlan: (plan: "pro" | "team") => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ss_user")
      if (stored) setUser(JSON.parse(stored))
    } catch {}
  }, [])

  const saveUser = (u: AuthUser) => {
    setUser(u)
    localStorage.setItem("ss_user", JSON.stringify(u))
  }

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800))

    // Admin credentials → set admin session and redirect to admin panel
    if (email === "admin@socialsense.vn" && password === "admin123") {
      const adminUser = {
        name: "Nguyễn Admin",
        email,
        role: "super_admin" as const,
        avatar: "NA",
      }
      localStorage.setItem("ss_admin", JSON.stringify(adminUser))
      router.push("/admin/dashboard")
      return
    }

    const raw = email.split("@")[0].replace(/[._-]/g, " ")
    const name = raw
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
    const avatar = name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    saveUser({ name, email, plan: "trial", trialDaysLeft: 18, avatar })
    router.push("/dashboard")
  }

  const register = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 1000))
    const avatar = name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    saveUser({ name, email, plan: "trial", trialDaysLeft: 30, avatar })
    router.push("/dashboard")
  }

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("ss_user")
    router.push("/")
  }, [router])

  const upgradePlan = (plan: "pro" | "team") => {
    if (!user) return
    const updated: AuthUser = { ...user, plan }
    saveUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, upgradePlan }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
