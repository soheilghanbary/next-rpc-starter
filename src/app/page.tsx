import { ToggleTheme } from "@components/shared/toggle-theme"
import { api } from "@server/trpc/server"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description: "hey there, this is a Home Page",
}

const msg = "I'm Ready to Use"

export default async function HomePage() {
  const res = await api.todo.all()
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className={"text-center text-lg font-medium"}>{msg}</h1>
        <ToggleTheme />
        <pre>{JSON.stringify(res, null, 2)}</pre>
      </div>
    </div>
  )
}
