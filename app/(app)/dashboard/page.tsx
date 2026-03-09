import { TopBar } from "@/components/top-bar"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage() {
  return (
    <>
      <TopBar title="Dashboard" />
      <main className="flex-1 bg-background p-8">
        <DashboardContent />
      </main>
    </>
  )
}
