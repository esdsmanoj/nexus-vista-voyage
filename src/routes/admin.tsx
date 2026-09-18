import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, RotateCcw } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useEcosystem } from "@/lib/ecosystem-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — FutureTech Group" },
      {
        name: "description",
        content:
          "Prototype management console for editing FutureTech companies, categories and product specifications.",
      },
      { property: "og:title", content: "Admin Console — FutureTech Group" },
      {
        property: "og:description",
        content: "Edit companies, categories and product content in this prototype console.",
      },
    ],
  }),
  component: AdminPage,
});

const field =
  "w-full rounded-sm border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-border-strong";

function AdminPage() {
  const store = useEcosystem();
  const { data } = store;
  const [companyId, setCompanyId] = useState(data.companies[0]?.id ?? "");
  const company = data.companies.find((c) => c.id === companyId) ?? data.companies[0];
  const [categoryId, setCategoryId] = useState(company?.categories[0]?.id ?? "");
  const category =
    company?.categories.find((c) => c.id === categoryId) ?? company?.categories[0];
  const [productId, setProductId] = useState(category?.products[0]?.id ?? "");
  const product = category?.products.find((p) => p.id === productId) ?? category?.products[0];
  const [draft, setDraft] = useState("");

  return (
    <div className="space-y-8">
      <Breadcrumbs />
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-primary">Prototype</p>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Admin Console</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Edits are stored locally in this browser so you can tailor the demo before an event.
          </p>
        </div>
        <button
          type="button"
          onClick={store.reset}
          className="flex h-12 items-center gap-2 rounded-sm border border-border px-4 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" /> Reset to shipped data
        </button>
      </header>

      <section className="glass clip-corner space-y-4 p-6">
        <h2 className="eyebrow text-primary">Parent Company</h2>
        <input
          className={field}
          value={data.name}
          aria-label="Parent company name"
          onChange={(e) => store.updateParent({ name: e.target.value })}
        />
        <input
          className={field}
          value={data.tagline}
          aria-label="Parent tagline"
          onChange={(e) => store.updateParent({ tagline: e.target.value })}
        />
        <textarea
          className={`${field} min-h-24`}
          value={data.description}
          aria-label="Parent description"
          onChange={(e) => store.updateParent({ description: e.target.value })}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="glass clip-corner space-y-3 p-6">
          <h2 className="eyebrow text-primary">Companies</h2>
          {data.companies.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCompanyId(c.id);
                setCategoryId(c.categories[0]?.id ?? "");
                setProductId(c.categories[0]?.products[0]?.id ?? "");
              }}
              className={`block w-full rounded-sm border px-3 py-3 text-left text-sm ${
                c.id === company?.id
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            <input
              className={field}
              placeholder="New company name"
              aria-label="New company name"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (draft.trim()) store.addCompany(draft.trim());
                setDraft("");
              }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border text-primary"
              aria-label="Add company"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {company && (
            <div className="space-y-3 border-t border-border pt-4">
              <input
                className={field}
                value={company.name}
                aria-label="Company name"
                onChange={(e) => store.updateCompany(company.id, { name: e.target.value })}
              />
              <input
                className={field}
                value={company.industry}
                aria-label="Company industry"
                onChange={(e) => store.updateCompany(company.id, { industry: e.target.value })}
              />
              <textarea
                className={`${field} min-h-24`}
                value={company.description}
                aria-label="Company description"
                onChange={(e) => store.updateCompany(company.id, { description: e.target.value })}
              />
            </div>
          )}
        </section>

        <section className="glass clip-corner space-y-3 p-6">
          <h2 className="eyebrow text-primary">Categories</h2>
          {company?.categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCategoryId(c.id);
                setProductId(c.products[0]?.id ?? "");
              }}
              className={`block w-full rounded-sm border px-3 py-3 text-left text-sm ${
                c.id === category?.id
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => company && store.addCategory(company.id, "New Category")}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-sm border border-border text-xs text-primary"
          >
            <Plus className="h-4 w-4" /> Add category
          </button>
          {category && (
            <div className="space-y-3 border-t border-border pt-4">
              <input
                className={field}
                value={category.name}
                aria-label="Category name"
                onChange={(e) => store.updateCategory(category.id, { name: e.target.value })}
              />
              <textarea
                className={`${field} min-h-24`}
                value={category.description}
                aria-label="Category description"
                onChange={(e) =>
                  store.updateCategory(category.id, { description: e.target.value })
                }
              />
            </div>
          )}
        </section>

        <section className="glass clip-corner space-y-3 p-6">
          <h2 className="eyebrow text-primary">Products</h2>
          {category?.products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProductId(p.id)}
              className={`block w-full rounded-sm border px-3 py-3 text-left text-sm ${
                p.id === product?.id
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {p.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() =>
              company && category && store.addProduct(company.id, category.id, "New Product")
            }
            className="flex h-11 w-full items-center justify-center gap-2 rounded-sm border border-border text-xs text-primary"
          >
            <Plus className="h-4 w-4" /> Add product
          </button>
          {product && (
            <div className="space-y-3 border-t border-border pt-4">
              <input
                className={field}
                value={product.name}
                aria-label="Product name"
                onChange={(e) => store.updateProduct(product.id, { name: e.target.value })}
              />
              <input
                className={field}
                value={product.tagline}
                aria-label="Product tagline"
                onChange={(e) => store.updateProduct(product.id, { tagline: e.target.value })}
              />
              <textarea
                className={`${field} min-h-28`}
                value={product.description}
                aria-label="Product description"
                onChange={(e) => store.updateProduct(product.id, { description: e.target.value })}
              />
              <textarea
                className={`${field} min-h-28 font-mono text-xs`}
                aria-label="Product features, one per line"
                value={product.features.join("\n")}
                onChange={(e) =>
                  store.updateProduct(product.id, {
                    features: e.target.value.split("\n").filter(Boolean),
                  })
                }
              />
              <label className="flex items-center gap-3 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={product.model3D.autoRotate}
                  onChange={(e) =>
                    store.updateProduct(product.id, {
                      model3D: { ...product.model3D, autoRotate: e.target.checked },
                    })
                  }
                />
                3D auto-rotate by default
              </label>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
