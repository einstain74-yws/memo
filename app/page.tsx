import { redirect } from "next/navigation"
import { auth, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import MemoList from "@/components/memo-list"

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">📝 메모 앱</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user?.email}
            </span>
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/login" })
              }}
            >
              <Button type="submit" variant="outline">
                로그아웃
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <MemoList />
      </main>
    </div>
  )
}
