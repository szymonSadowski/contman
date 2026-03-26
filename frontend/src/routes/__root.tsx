import { useState, useEffect } from "react";
import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { Sun, Moon } from "lucide-react";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const [theme, setTheme] = useState<"dark" | "light">(
    () => (localStorage.getItem("theme") as "dark" | "light") ?? "dark",
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#242424" : "#ffffff");
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header className="border-b border-border px-8 py-0 flex items-stretch justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 py-4 border-r border-border pr-6 mr-6"
        >
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          <span className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-foreground">
            Contman
          </span>
        </Link>
        <div className="flex items-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className="p-2 rounded text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <main id="main-content" className="flex-1 px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border px-8 py-3 flex items-center justify-between">
        <a
          href="https://szymonjakubsadowski.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-muted-foreground/60 hover:text-muted-foreground transition-colors"
        >
          szymonjakubsadowski.com
        </a>
        <span
          className="text-xs font-mono text-muted-foreground/60"
          suppressHydrationWarning
        >
          {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
