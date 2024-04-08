import { ToggleTheme } from "./toggle-theme"

export const Header = () => {
  return (
    <header className="border-b bg-background p-2">
      <nav className="container mx-auto flex items-center justify-between gap-4 p-0">
        <h3 className="font-bold text-foreground">RPC Todo</h3>
        <ToggleTheme />
      </nav>
    </header>
  )
}
