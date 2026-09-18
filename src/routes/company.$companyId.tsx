import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useEcosystem } from "@/lib/ecosystem-store";

export const Route = createFileRoute("/company/$companyId")({
  head: () => ({
    meta: [
      { title: "Company — FutureTech Group" },
      {
        name: "description",
        content: "Explore a FutureTech company, its product categories and flagship technology.",
      },
      { property: "og:title", content: "Company — FutureTech Group" },
      {
        property: "og:description",
        content: "Explore a FutureTech company, its product categories and flagship technology.",
      },
    ],
  }),
  component: CompanyPage,
});

function CompanyPage() {
  const { companyId } = Route.useParams();
  const { data } = useEcosystem();
  const company = data.companies.find((c) => c.id === companyId);

  if (!company) {
    return (
      <div className="space-y-6">
        <Breadcrumbs />
        <p className="text-sm text-muted-foreground">That company is no longer in the ecosystem.</p>
        <Link to="/ecosystem" className="text-sm text-primary">
          Back to the ecosystem
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs companyId={company.id} />

      <header className="glass clip-corner relative overflow-hidden p-8 md:p-12">
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: `${company.accent}22` }}
        />
        <p className="eyebrow" style={{ color: company.accent }}>
          {company.industry}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold md:text-6xl">{company.name}</h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{company.tagline}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground/80">
          {company.description}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="eyebrow text-primary">Product Categories</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {company.categories.map((cat) => (
            <Link
              key={cat.id}
              to="/company/$companyId/category/$categoryId"
              params={{ companyId: company.id, categoryId: cat.id }}
              className="glass clip-corner group p-6 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <Layers className="h-6 w-6" style={{ color: company.accent }} strokeWidth={1.4} />
              <h3 className="mt-5 font-display text-xl font-semibold">{cat.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
              <p className="mt-5 font-mono text-[11px] text-muted-foreground">
                {cat.products.length} products
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export const _notFound = notFound;
