import { categories, priceBands, type CategoryId, type PriceBandId } from "~/data/products";

export type SortQuery = "nouveautes" | "prix-asc" | "prix-desc" | "note";

export interface ShopSearchShape {
  q?: string;
  cat?: CategoryId;
  prix?: PriceBandId;
  tri?: SortQuery;
}

const isCategory = (value: unknown): value is CategoryId =>
  typeof value === "string" && categories.some((c) => c.id === value);

const isBand = (value: unknown): value is PriceBandId =>
  typeof value === "string" && priceBands.some((b) => b.id === value);

const isSort = (value: unknown): value is SortQuery =>
  value === "nouveautes" ||
  value === "prix-asc" ||
  value === "prix-desc" ||
  value === "note";

/** Nettoie la chaîne de requête : seules les valeurs connues sont gardées. */
export function parseShopSearch(search: Record<string, unknown>): ShopSearchShape {
  const next: ShopSearchShape = {};
  if (typeof search.q === "string" && search.q.trim().length > 0) {
    next.q = search.q.slice(0, 80);
  }
  if (isCategory(search.cat)) next.cat = search.cat;
  if (isBand(search.prix)) next.prix = search.prix;
  if (isSort(search.tri)) next.tri = search.tri;
  return next;
}
