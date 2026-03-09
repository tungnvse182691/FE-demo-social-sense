"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Link2,
  Plus,
  Check,
  X,
  MoreHorizontal,
  RefreshCw,
  ExternalLink,
  Users,
  TrendingUp,
  Loader2,
  Unplug,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const connectedProfiles = [
  {
    platform: "Facebook",
    name: "SocialSense Vietnam",
    handle: "@socialsensevn",
    color: "#1877F2",
    initials: "FB",
    status: "connected",
    followers: "24,500",
    lastSync: "2 phút trước",
  },
  {
    platform: "Instagram",
    name: "socialsense.vn",
    handle: "@socialsense.vn",
    color: "#E4405F",
    initials: "IG",
    status: "connected",
    followers: "18,200",
    lastSync: "5 phút trước",
  },
  {
    platform: "TikTok",
    name: "SocialSense Official",
    handle: "@socialsensevn",
    color: "#111827",
    initials: "TT",
    status: "connected",
    followers: "31,800",
    lastSync: "10 phút trước",
  },
]

const availablePlatforms = [
  { name: "YouTube", color: "#FF0000", initials: "YT", description: "Quản lý video và kênh YouTube" },
  { name: "LinkedIn", color: "#0A66C2", initials: "LI", description: "Kết nối trang doanh nghiệp LinkedIn" },
  { name: "Twitter/X", color: "#111827", initials: "X", description: "Quản lý tài khoản Twitter/X" },
]

export function ProfilesContent() {
  const [syncing, setSyncing] = useState<string | null>(null)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [profiles, setProfiles] = useState(connectedProfiles)

  const handleSync = async (platform: string) => {
    setSyncing(platform)
    await new Promise((r) => setTimeout(r, 1500))
    setSyncing(null)
    setProfiles((prev) =>
      prev.map((p) => (p.platform === platform ? { ...p, lastSync: "vừa xong" } : p))
    )
    toast.success(`Đồng bộ ${platform} thành công!`)
  }

  const handleDisconnect = (platform: string) => {
    setProfiles((prev) => prev.filter((p) => p.platform !== platform))
    toast.success(`Đã ngắt kết nối ${platform}.`, {
      description: "Bạn có thể kết nối lại bất kỳ lúc nào.",
    })
  }

  const handleConnect = async (platform: string) => {
    setConnecting(platform)
    await new Promise((r) => setTimeout(r, 2000))
    setConnecting(null)
    toast.success(`Kết nối ${platform} thành công!`, {
      description: "Tài khoản đã được thêm vào danh sách.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Connected Profiles */}
      <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-foreground">
              {"Tài khoản đã kết nối"}
            </CardTitle>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
              {connectedProfiles.length} đã kết nối
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {profiles.map((profile) => (
              <div
                key={profile.platform}
                className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/30"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback
                    className="text-sm font-bold"
                    style={{ backgroundColor: `${profile.color}15`, color: profile.color }}
                  >
                    {profile.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {profile.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0 hover:bg-emerald-50"
                    >
                      <Check className="mr-0.5 h-3 w-3" />
                      {"Đã kết nối"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{profile.handle}</p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="font-medium text-foreground">{profile.followers}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {syncing === profile.platform ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3.5 w-3.5" />
                    )}
                    {syncing === profile.platform ? "Đang đồng bộ..." : profile.lastSync}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem onClick={() => handleSync(profile.platform)}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Đồng bộ lại
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          toast.info(`Mở trang ${profile.platform} trong tab mới.`)
                        }
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Xem trang
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDisconnect(profile.platform)}
                      >
                        <Unplug className="mr-2 h-4 w-4" />
                        Ngắt kết nối
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Platform */}
      <Card className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            {"Thêm nền tảng mới"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {availablePlatforms.map((platform) => (
              <button
                key={platform.name}
                disabled={connecting === platform.name}
                onClick={() => handleConnect(platform.name)}
                className="flex items-center gap-4 rounded-xl border border-dashed border-border p-4 transition-colors hover:border-primary/40 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback
                    className="text-xs font-bold"
                    style={{ backgroundColor: `${platform.color}15`, color: platform.color }}
                  >
                    {platform.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">
                    {platform.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {connecting === platform.name ? "Đang kết nối..." : platform.description}
                  </p>
                </div>
                {connecting === platform.name ? (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                ) : (
                  <Plus className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Health */}
      <div className="grid grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <Card
            key={profile.platform}
            className="border-none bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: profile.color }}
                />
                <span className="text-sm font-semibold text-foreground">
                  {profile.platform}
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{"Trạng thái"}</span>
                  <span className="font-medium text-emerald-600">{"Hoạt động"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{"Token"}</span>
                  <span className="font-medium text-emerald-600">{"Hợp lệ"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{"Quyền"}</span>
                  <span className="font-medium text-foreground">{"Đầy đủ"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{"Đồng bộ cuối"}</span>
                  <span className="font-medium text-foreground">{profile.lastSync}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
