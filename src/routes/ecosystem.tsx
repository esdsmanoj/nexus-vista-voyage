import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useEcosystem } from "@/lib/ecosystem-store";
import { countProducts } from "@/data/ecosystem";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "The Ecosystem — FutureTech Group" },
      {
        name: "description",
        content:
          "Four specialist FutureTech companies: applied AI, sovereign cloud, critical-infrastructure security and quantum systems.",
      },
      { property: "og:title", content: "The Ecosystem — FutureTech Group" },
      {
        property: "og:description",
        content: "Navigate every FutureTech company, category and product from one connected view.",
      },
    ],
  }),
  component: EcosystemPage,
});

function EcosystemPage() {
  const { data } = useEcosystem();

  return (
    <div className="space-y-8">
      <Breadcrumbs />
      <header className="max-w-3xl">
        <p className="eyebrow text-primary">Child Companies</p>
        <h1 className="mt-4 font-display text-4xl font-semibold md:text-6xl">
          Four frontiers, one standard
        </h1>
        <p className="mt-4 text-muted-foreground">{data.description}</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {data.companies.map((company) => (
          <Link
            key={company.id}
            to="/company/$companyId"
            params={{ companyId: company.id }}
            className="glass clip-corner group relative overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1.5"
            style={{ borderColor: `${company.accent}33` }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${company.accent}, transparent)` }}
            />
            <p className="eyebrow" style={{ color: company.accent }}>
              {company.industry}
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold">{company.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{company.tagline}</p>
            <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-muted-foreground/80">
              {company.description}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
              <span>
                {company.categories.length} categories · {countProducts(company)} products
              </span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: company.accent }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
