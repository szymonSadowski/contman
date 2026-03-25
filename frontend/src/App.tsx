import { Stats } from "./components/Stats";
import { UsersTable } from "./components/users-table";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border px-8 py-0 flex items-stretch">
        <div className="flex items-center gap-3 py-4 border-r border-border pr-6 mr-6">
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          <span className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-foreground">
            Contman
          </span>
        </div>
      </header>

      <main className="flex-1 px-8 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-1">
              Users
            </h1>
          </div>
          <Stats />
        </div>
        <UsersTable />
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
  );
}

export default App;
