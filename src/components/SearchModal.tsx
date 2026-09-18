import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CornerDownLeft, Search } from "lucide-react";
import { useEcosystem } from "@/lib/ecosystem-store";
import { allProducts } from "@/data/ecosystem";

type Entry = {
  id: string;
  kind: "Company" | "Category" | "Product";
  title: string;
  trail: string;
  blurb: string;
  to: string;
  haystack: string;
};

function score(query: string, entry: Entry) {
  const q = query.toLowerCase();
  const t = entry.title.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;
  if (entry.haystack.includes(q)) return 30;
  // loose subsequence match
  let i = 0;
  for (const ch of entry.haystack) if (ch === q[i]) i++;
  return i === q.length ? 10 : -1;
}

function Highlight({ text, query }: { text: string; query: string }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || idx < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/25 text-primary">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data } = useEcosystem();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo<Entry[]>(() => {
    const entries: Entry[] = [];
    for (const company of data.companies) {
      entries.push({
        id: company.id,
        kind: "Company",
        title: company.name,
        trail: data.name,
        blurb: company.tagline,
        to: `/company/${company.id}`,
        haystack: `${company.name} ${company.tagline} ${company.industry}`.toLowerCase(),
      });
      for (const category of company.categories) {
        entries.push({
          id: category.id,
          kind: "Category",
          title: category.name,
          trail: `${company.name} · ${data.name}`,
          blurb: category.description,
          to: `/company/${company.id}/category/${category.id}`,
          haystack: `${category.name} ${category.description}`.toLowerCase(),
        });
      }
    }
    for (const t of allProducts(data)) {
      entries.push({
        id: t.product.id,
        kind: "Product",
        title: t.product.name,
        trail: `${t.category.name} · ${t.company.name} · ${data.name}`,
        blurb: t.product.tagline,
        to: `/product/${t.product.id}`,
        haystack:
          `${t.product.name} ${t.product.tagline} ${t.product.description} ${t.product.technologies.join(" ")}`.toLowerCase(),
      });
    }
    return entries;
  }, [data]);

  const results = useMemo(() => {
    if (!query.trim()) return index.filter((e) => e.kind === "Company").slice(0, 6);
    return index
      .map((e) => ({ e, s: score(query.trim(), e) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.e);
  }, [index, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  if (!open) return null;

  const go = (to: string) => {
    onClose();
    void navigate({ to: to as never });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Global search"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setCursor((c) => Math.min(c + 1, results.length - 1));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setCursor((c) => Math.max(c - 1, 0));
        }
        if (e.key === "Enter" && results[cursor]) go(results[cursor]!.to);
      }}
    >
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div className="glass-strong clip-corner relative w-full max-w-2xl overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-4 w-4 text-primary" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies, categories and products…"
            aria-label="Search the ecosystem"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded-sm border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground md:block">
            ESC
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-foreground">No results found</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Try {data.companies.slice(0, 3).map((c) => c.short).join(", ")} — or a product like
                “Cortex Foundry”.
              </p>
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.kind}-${r.id}`}
              type="button"
              onMouseEnter={() => setCursor(i)}
              onClick={() => go(r.to)}
              className={`flex w-full items-center gap-4 rounded-sm px-4 py-3 text-left transition-colors ${
                i === cursor ? "bg-primary/10" : "hover:bg-primary/5"
              }`}
            >
              <span className="eyebrow w-16 shrink-0 text-primary/70">{r.kind}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-foreground">
                  <Highlight text={r.title} query={query} />
                </span>
                <span className="block truncate text-xs text-muted-foreground">{r.blurb}</span>
                <span className="mt-0.5 block truncate font-mono text-[10px] text-muted-foreground/70">
                  {r.trail}
                </span>
              </span>
              {i === cursor && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-primary" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
