import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Home } from "lucide-react";
import { useEcosystem } from "@/lib/ecosystem-store";

type Crumb = {
  label: string;
  to: string;
  siblings?: Array<{ label: string; to: string }>;
};

function CrumbItem({ crumb, last }: { crumb: Crumb; last: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center gap-1">
      <Link
        to={crumb.to as never}
        className={`max-w-[10rem] truncate rounded-sm px-2 py-1.5 text-xs transition-colors md:max-w-none ${
          last ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {crumb.label}
      </Link>
      {crumb.siblings && crumb.siblings.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={`Jump to another ${crumb.label} sibling`}
            className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {open && (
            <>
              <button
                type="button"
                aria-hidden
                tabIndex={-1}
                className="fixed inset-0 z-30 cursor-default"
                onClick={() => setOpen(false)}
              />
              <div className="glass-strong absolute left-0 top-full z-40 mt-2 w-60 rounded-sm p-1">
                {crumb.siblings.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to as never}
                    onClick={() => setOpen(false)}
                    className="block truncate rounded-sm px-3 py-2.5 text-xs text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export function Breadcrumbs({
  companyId,
  categoryId,
  productId,
}: {
  companyId?: string;
  categoryId?: string;
  productId?: string;
}) {
  const { data } = useEcosystem();
  const company = data.companies.find((c) => c.id === companyId);
  const category = company?.categories.find((c) => c.id === categoryId);
  const product = category?.products.find((p) => p.id === productId);

  const crumbs: Crumb[] = [{ label: data.name, to: "/ecosystem" }];

  if (company) {
    crumbs.push({
      label: company.name,
      to: `/company/${company.id}`,
      siblings: data.companies.map((c) => ({ label: c.name, to: `/company/${c.id}` })),
    });
  }
  if (company && category) {
    crumbs.push({
      label: category.name,
      to: `/company/${company.id}/category/${category.id}`,
      siblings: company.categories.map((c) => ({
        label: c.name,
        to: `/company/${company.id}/category/${c.id}`,
      })),
    });
  }
  if (category && product) {
    crumbs.push({
      label: product.name,
      to: `/product/${product.id}`,
      siblings: category.products.map((p) => ({ label: p.name, to: `/product/${p.id}` })),
    });
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="glass flex items-center gap-0.5 overflow-x-auto rounded-sm px-2 py-1"
    >
      <Link
        to="/"
        aria-label="Home"
        className="rounded-sm p-2 text-muted-foreground transition-colors hover:text-primary"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {crumbs.map((c, i) => (
        <div key={c.to} className="flex items-center">
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-border-strong" />
          <CrumbItem crumb={c} last={i === crumbs.length - 1} />
        </div>
      ))}
    </nav>
  );
}
