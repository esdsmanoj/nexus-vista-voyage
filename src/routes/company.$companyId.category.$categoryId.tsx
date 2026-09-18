import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useEcosystem } from "@/lib/ecosystem-store";

export const Route = createFileRoute("/company/$companyId/category/$categoryId")({
  head: () => ({
    meta: [
      { title: "Category — FutureTech Group" },
      {
        name: "description",
        content: "Browse the products inside a FutureTech product category.",
      },
      { property: "og:title", content: "Category — FutureTech Group" },
      {
        property: "og:description",
        content: "Browse the products inside a FutureTech product category.",
      },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { companyId, categoryId } = Route.useParams();
  const { data } = useEcosystem();
  const company = data.companies.find((c) => c.id === companyId);
  const category = company?.categories.find((c) => c.id === categoryId);

  if (!company || !category) {
    return (
      <div className="space-y-6">
        <Breadcrumbs companyId={companyId} />
        <p className="text-sm text-muted-foreground">That category no longer exists.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs companyId={company.id} categoryId={category.id} />

      <header className="max-w-3xl">
        <p className="eyebrow" style={{ color: company.accent }}>
          {company.name}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">{category.name}</h1>
        <p className="mt-3 text-muted-foreground">{category.description}</p>
      </header>

      {category.products.length === 0 ? (
        <p className="glass clip-corner p-8 text-sm text-muted-foreground">
          No products in this category yet. Add one from the admin console.
        </p>
      ) : (
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {category.products.map((product) => (
            <Link
              key={product.id}
              to="/product/$productId"
              params={{ productId: product.id }}
              className="glass clip-corner group w-[88vw] shrink-0 snap-center p-7 transition-transform duration-500 hover:-translate-y-1.5 md:w-[430px]"
            >
              <div className="flex items-center justify-between">
                <p className="eyebrow" style={{ color: company.accent }}>
                  {category.name}
                </p>
                {product.flagship && (
                  <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                    <Star className="h-3 w-3" /> Flagship
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold">{product.name}</h2>
              <p className="mt-1 text-sm" style={{ color: company.accent }}>
                {product.tagline}
              </p>
              <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.technologies.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs text-primary">
                Open 3D product detail
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
