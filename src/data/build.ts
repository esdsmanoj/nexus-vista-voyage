import type { Model3DConfig, ModelShape, Hotspot } from "./types";

export const defaultCameraAngles = {
  front: { position: [0, 0, 6] as [number, number, number] },
  back: { position: [0, 0, -6] as [number, number, number] },
  left: { position: [-6, 0, 0] as [number, number, number] },
  right: { position: [6, 0, 0] as [number, number, number] },
  top: { position: [0, 6, 0.001] as [number, number, number] },
  isometric: { position: [4.2, 3.4, 4.2] as [number, number, number] },
};

export function model(
  shape: ModelShape,
  accent: string,
  hotspots: Array<[string, string, string, [number, number, number]]>,
  rotationSpeed = 0.45,
): Model3DConfig {
  return {
    shape,
    autoRotate: true,
    rotationSpeed,
    accent,
    cameraAngles: defaultCameraAngles,
    hotspots: hotspots.map(
      ([id, title, description, position]): Hotspot => ({ id, title, description, position }),
    ),
  };
}

import type { Product, ProductCategory } from "./types";

type ProductInput = Omit<Product, "id" | "slug" | "categoryId" | "companyId">;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function cat(
  companyId: string,
  id: string,
  name: string,
  icon: string,
  description: string,
  displayOrder: number,
  products: ProductInput[],
): ProductCategory {
  return {
    id,
    companyId,
    name,
    icon,
    description,
    displayOrder,
    products: products.map((p) => ({
      ...p,
      id: `${id}-${slugify(p.name)}`,
      slug: slugify(p.name),
      categoryId: id,
      companyId,
    })),
  };
}
