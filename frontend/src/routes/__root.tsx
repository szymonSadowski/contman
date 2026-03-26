import { createRootRoute, Outlet, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border px-8 py-0 flex items-stretch">
        <Link
          to="/"
          className="flex items-center gap-3 py-4 border-r border-border pr-6 mr-6"
        >
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          <span className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-foreground">
            Contman
          </span>
        </Link>
      </header>

      <main className="flex-1 px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border px-8 py-3 flex items-center justify-between">
        <a
          href="https://szymonjakubsadowski.com"
          className="text-xs font-mono text-muted-foreground/40 hover:text-muted-foreground transition-colors"
        >
          szymonjakubsadowski.com
        </a>
        <span className="text-xs font-mono text-muted-foreground/40">
          {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  )
}
