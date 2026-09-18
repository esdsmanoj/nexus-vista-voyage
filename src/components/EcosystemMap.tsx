import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { useEcosystem } from "@/lib/ecosystem-store";

type Node = {
  id: string;
  label: string;
  kind: "parent" | "company" | "category" | "product";
  x: number;
  y: number;
  accent: string;
  to: string;
  companyId?: string;
};

const W = 1600;
const H = 900;

export function EcosystemMap({ focusCompanyId }: { focusCompanyId?: string }) {
  const { data } = useEcosystem();
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState<string | null>(focusCompanyId ?? null);

  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Array<{ from: string; to: string; accent: string }> = [];
    const parent: Node = {
      id: data.id,
      label: data.name,
      kind: "parent",
      x: W / 2,
      y: 80,
      accent: "#00F0FF",
      to: "/ecosystem",
    };
    nodes.push(parent);

    const n = data.companies.length || 1;
    data.companies.forEach((company, ci) => {
      const cx = ((ci + 0.5) / n) * W;
      const companyNode: Node = {
        id: company.id,
        label: company.name,
        kind: "company",
        x: cx,
        y: 300,
        accent: company.accent,
        to: `/company/${company.id}`,
        companyId: company.id,
      };
      nodes.push(companyNode);
      edges.push({ from: parent.id, to: company.id, accent: company.accent });

      const m = company.categories.length || 1;
      company.categories.forEach((cat, gi) => {
        const gx = cx + (gi - (m - 1) / 2) * 150;
        nodes.push({
          id: cat.id,
          label: cat.name,
          kind: "category",
          x: gx,
          y: 550,
          accent: company.accent,
          to: `/company/${company.id}/category/${cat.id}`,
          companyId: company.id,
        });
        edges.push({ from: company.id, to: cat.id, accent: company.accent });

        cat.products.forEach((p, pi) => {
          nodes.push({
            id: p.id,
            label: p.name,
            kind: "product",
            x: gx + (pi - (cat.products.length - 1) / 2) * 46,
            y: 790,
            accent: company.accent,
            to: `/product/${p.id}`,
            companyId: company.id,
          });
          edges.push({ from: cat.id, to: p.id, accent: company.accent });
        });
      });
    });
    return { nodes, edges };
  }, [data]);

  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const dim = (node?: Node) =>
    Boolean(selected) && node?.kind !== "parent" && node?.companyId !== selected;

  return (
    <div className="glass clip-corner relative overflow-hidden">
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(2.2, z + 0.2))}
          className="flex h-11 w-11 items-center justify-center rounded-sm border border-border text-muted-foreground hover:text-primary"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
          className="flex h-11 w-11 items-center justify-center rounded-sm border border-border text-muted-foreground hover:text-primary"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            setZoom(1);
            setSelected(null);
          }}
          className="flex h-11 w-11 items-center justify-center rounded-sm border border-border text-muted-foreground hover:text-primary"
          aria-label="Reset map view"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Ecosystem map of companies, categories and products"
          style={{ width: `${zoom * 100}%`, minWidth: "100%" }}
          className="block transition-[width] duration-500"
        >
          {edges.map((e) => {
            const a = byId[e.from];
            const b = byId[e.to];
            if (!a || !b) return null;
            const faded = dim(b);
            return (
              <path
                key={`${e.from}-${e.to}`}
                d={`M ${a.x} ${a.y} C ${a.x} ${(a.y + b.y) / 2}, ${b.x} ${(a.y + b.y) / 2}, ${b.x} ${b.y}`}
                fill="none"
                stroke={e.accent}
                strokeWidth={faded ? 0.6 : 1.4}
                opacity={faded ? 0.12 : 0.5}
              />
            );
          })}

          {nodes.map((n) => {
            const faded = dim(n);
            const r = n.kind === "parent" ? 26 : n.kind === "company" ? 20 : n.kind === "category" ? 12 : 6;
            return (
              <g
                key={n.id}
                opacity={faded ? 0.25 : 1}
                onMouseEnter={() => n.companyId && setSelected(n.companyId)}
                className="cursor-pointer"
              >
                <Link to={n.to as never}>
                  <circle cx={n.x} cy={n.y} r={r + 10} fill="transparent" />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={r}
                    fill={`${n.accent}22`}
                    stroke={n.accent}
                    strokeWidth={1.5}
                  />
                  {n.kind !== "product" && (
                    <text
                      x={n.x}
                      y={n.y + r + 20}
                      textAnchor="middle"
                      fill="currentColor"
                      className="fill-foreground font-mono"
                      fontSize={n.kind === "parent" ? 20 : n.kind === "company" ? 17 : 13}
                    >
                      {n.label}
                    </text>
                  )}
                  <title>{n.label}</title>
                </Link>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
