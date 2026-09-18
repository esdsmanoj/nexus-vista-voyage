import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Expand, Hexagon, Monitor, PlayCircle, Search, Settings2, StopCircle } from "lucide-react";
import { ParticleField } from "./ParticleField";
import { SearchModal } from "./SearchModal";
import { useKiosk } from "@/lib/kiosk";
import { useEcosystem } from "@/lib/ecosystem-store";

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to as never}
      className="rounded-sm px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-primary"
      activeProps={{ className: "text-primary" }}
    >
      {label}
    </Link>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { data } = useEcosystem();
  const kioskCtx = useKiosk();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const iconBtn =
    "flex h-11 w-11 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-primary";

  return (
    <div className="relative min-h-screen">
      <ParticleField />

      <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1800px] items-center gap-4 px-5 py-3 2xl:px-10">
          <Link to="/" className="flex items-center gap-3">
            <Hexagon className="h-6 w-6 text-primary" strokeWidth={1.4} />
            <span className="font-display text-sm font-semibold tracking-tight">{data.name}</span>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 md:flex">
            <NavLink to="/ecosystem" label="Ecosystem" />
            <NavLink to="/map" label="Map" />
            <NavLink to="/admin" label="Admin" />
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="glass flex h-11 items-center gap-3 rounded-sm px-3 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search ecosystem</span>
              <kbd className="hidden rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10px] lg:block">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              onClick={kioskCtx.demo ? kioskCtx.stopDemo : kioskCtx.startDemo}
              aria-pressed={kioskCtx.demo}
              className={`${iconBtn} ${kioskCtx.demo ? "border-primary text-primary" : ""}`}
              aria-label={kioskCtx.demo ? "Stop auto-demo tour" : "Start auto-demo tour"}
              title="Auto-demo tour"
            >
              {kioskCtx.demo ? (
                <StopCircle className="h-4 w-4" />
              ) : (
                <PlayCircle className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => kioskCtx.setKiosk(!kioskCtx.kiosk)}
              aria-pressed={kioskCtx.kiosk}
              className={`${iconBtn} ${kioskCtx.kiosk ? "border-primary text-primary" : ""}`}
              aria-label="Toggle kiosk mode"
              title="Kiosk / presentation mode"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={kioskCtx.toggleFullscreen}
              className={iconBtn}
              aria-label="Toggle fullscreen"
              title="Fullscreen"
            >
              <Expand className="h-4 w-4" />
            </button>
            <Link to="/admin" className={`${iconBtn} md:hidden`} aria-label="Admin">
              <Settings2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
        {kioskCtx.kiosk && (
          <div className="border-t border-border bg-primary/10 px-5 py-1 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Kiosk mode · auto reset after {Math.round(kioskCtx.config.resetAfterMs / 1000)}s idle
          </div>
        )}
      </header>

      <main key={pathname} className="ft-rise mx-auto max-w-[1800px] px-5 py-8 2xl:px-10">
        {children}
      </main>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {kioskCtx.kiosk && kioskCtx.attractor && !kioskCtx.demo && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/92 backdrop-blur-md">
          <div className="text-center">
            <p className="eyebrow text-primary">{data.name}</p>
            <h2 className="mt-5 font-display text-5xl font-semibold text-glow md:text-7xl">
              Explore Our Digital Ecosystem
            </h2>
            <button
              type="button"
              onClick={kioskCtx.dismissAttractor}
              className="mt-10 h-16 rounded-sm border border-primary bg-primary/15 px-12 text-sm uppercase tracking-[0.3em] text-primary transition-colors hover:bg-primary/25"
            >
              Start Experience
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
