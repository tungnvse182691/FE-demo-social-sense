import { TopBar } from "@/components/top-bar"
import { ProfilesContent } from "@/components/profiles-content"

export default function ProfilesPage() {
  return (
    <>
      <TopBar title="Connected Profiles" />
      <main className="flex-1 bg-background p-8">
        <ProfilesContent />
      </main>
    </>
  )
}
