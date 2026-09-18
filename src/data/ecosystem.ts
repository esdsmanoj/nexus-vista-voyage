import { futuretechAI } from "./companies/ai";
import { futuretechCloud } from "./companies/cloud";
import { futuretechCyberSec } from "./companies/cybersec";
import { futuretechQuantum } from "./companies/quantum";
import type { ChildCompany, ParentCompany, Product, ProductCategory, Trail } from "./types";

export const ecosystem: ParentCompany = {
  id: "futuretech-group",
  name: "FutureTech Group",
  tagline: "One ecosystem. Four frontiers. Infinite capability.",
  description:
    "FutureTech Group unites four specialist technology companies behind a single engineering standard — from applied intelligence and sovereign cloud to critical-infrastructure defence and quantum systems.",
  companies: [futuretechAI, futuretechCloud, futuretechCyberSec, futuretechQuantum],
};

export function findCompany(parent: ParentCompany, companyId: string): ChildCompany | undefined {
  return parent.companies.find((c) => c.id === companyId);
}

export function findCategory(
  parent: ParentCompany,
  categoryId: string,
): { company: ChildCompany; category: ProductCategory } | undefined {
  for (const company of parent.companies) {
    const category = company.categories.find((c) => c.id === categoryId);
    if (category) return { company, category };
  }
  return undefined;
}

export function findProduct(parent: ParentCompany, productId: string): Trail | undefined {
  for (const company of parent.companies) {
    for (const category of company.categories) {
      const product = category.products.find((p) => p.id === productId);
      if (product) return { parent, company, category, product };
    }
  }
  return undefined;
}

export function allProducts(parent: ParentCompany): Trail[] {
  const out: Trail[] = [];
  for (const company of parent.companies)
    for (const category of company.categories)
      for (const product of category.products) out.push({ parent, company, category, product });
  return out;
}

export function flagshipProducts(parent: ParentCompany): Trail[] {
  return allProducts(parent).filter((t) => t.product.flagship);
}

export function countProducts(company: ChildCompany): number {
  return company.categories.reduce((n, c) => n + c.products.length, 0);
}

export type { ChildCompany, ParentCompany, Product, ProductCategory, Trail };
