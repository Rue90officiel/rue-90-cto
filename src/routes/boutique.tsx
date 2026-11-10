import { useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  categories,
  categoryById,
  inBand,
  matchesQuery,
  priceBands,
  products,
  sortProducts,
  type CategoryId,
  type PriceBandId,
} from "~/data/products";
import { parseShopSearch, type SortQuery } from "~/lib/shopSearch";
import { useI18n } from "~/lib/i18n";
import { ProductCard } from "~/components/ProductCard";
import { CloseIcon, SearchIcon } from "~/components/Icons";

export const Route = createFileRoute("/boutique")({
  validateSearch: parseShopSearch,
  head: () => ({
    meta: [{ title: "Boutique — Rue 90" }],
  }),
  component: BoutiquePage,
});

function BoutiquePage() {
  const { lang, t } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/boutique" });

  const query = search.q ?? "";
  const activeCategory = search.cat;
  const activeBand = search.prix;
  const sort: SortQuery = search.tri ?? "nouveautes";
  const band = priceBands.find((item) => item.id === activeBand);

  const results = useMemo(() => {
    let list = products.filter((product) => matchesQuery(product, query));
    if (activeCategory) list = list.filter((product) => product.category === activeCategory);
    if (band) list = list.filter((product) => inBand(product.price, band));
    return sortProducts(list, sort);
  }, [query, activeCategory, band, sort]);

  const update = (patch: {
    q?: string | undefined;
    cat?: CategoryId | undefined;
    prix?: PriceBandId | undefined;
    tri?: SortQuery | undefined;
  }) => {
    void navigate({
      search: (prev) => ({ ...prev, ...patch }),
      replace: false,
    });
  };

  const clearAll = () => {
    void navigate({ search: {}, replace: false });
  };

  const activeCount =
    (query ? 1 : 0) + (activeCategory ? 1 : 0) + (activeBand ? 1 : 0);

  const bandLabel = (id: PriceBandId) =>
    t(`shop.band.${id}` as "shop.band.u50");

  return (
    <div className="container-x pb-16 pt-6 md:pt-10">
      <header className="border-b border-white/14 pb-6 md:pb-7">
        <p className="label">{t("shop.eyebrow")}</p>
        <h1 className="display mt-2 block text-4xl leading-[1.08] md:text-5xl">
          {t("shop.title")}
        </h1>
        <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/35">
          {t("common.currency")}
        </p>
        <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-white/50">
          {t("shop.intro")}
        </p>
      </header>

      {/* Barre de recherche + tri */}
      <section aria-label={t("shop.searchLabel")} className="relative mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2 border border-white/18 bg-[#101010] px-3 focus-within:border-white/60">
          <SearchIcon width={15} height={15} className="shrink-0 text-white/40" />
          <label htmlFor="shop-search" className="sr-only">
            {t("shop.searchLabel")}
          </label>
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(event) =>
              update({ q: event.target.value.length > 0 ? event.target.value : undefined })
            }
            placeholder={t("shop.searchPlaceholder")}
            className="h-11 w-full min-w-0 bg-transparent text-[13.5px] placeholder:text-white/35 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => update({ q: undefined })}
              aria-label={t("common.close")}
              className="shrink-0 p-1 text-white/40 hover:text-white"
            >
              <CloseIcon width={13} height={13} />
            </button>
          )}
        </div>

        <div className="relative md:w-56">
          <label htmlFor="shop-sort" className="sr-only">
            {t("shop.sortLabel")}
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(event) => update({ tri: event.target.value as SortQuery })}
            className="h-11 w-full appearance-none border border-white/18 bg-[#101010] px-3 pr-9 text-[12.5px] font-medium text-white focus:border-white/60 focus:outline-none"
          >
            <option value="nouveautes">{t("shop.sort.nouveautes")}</option>
            <option value="prix-asc">{t("shop.sort.prix-asc")}</option>
            <option value="prix-desc">{t("shop.sort.prix-desc")}</option>
          </select>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* Filtres */}
      <div className="mt-5 space-y-3">
        <div className="flex items-start gap-3">
          <span className="label hidden shrink-0 whitespace-nowrap pt-2.5 sm:block sm:w-28">
            {t("shop.categories")}
          </span>
          <div className="no-scrollbar -mx-1 flex w-full flex-wrap gap-1.5 sm:flex-nowrap sm:overflow-x-auto">
            <button
              type="button"
              onClick={() => update({ cat: undefined })}
              className={`chip ${!activeCategory ? "bg-white border-white text-black hover:text-black" : ""}`}
            >
              {t("shop.all")}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  update({ cat: category.id === activeCategory ? undefined : category.id })
                }
                className={`chip ${activeCategory === category.id ? "bg-white border-white text-black hover:text-black" : ""}`}
              >
                {lang === "fr" ? category.short : category.shortEn}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="label hidden shrink-0 whitespace-nowrap pt-2.5 sm:block sm:w-28">
            {t("shop.price")}
          </span>
          <div className="no-scrollbar -mx-1 flex w-full flex-wrap gap-1.5 sm:flex-nowrap sm:overflow-x-auto">
            {priceBands.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  update({ prix: item.id === activeBand ? undefined : item.id })
                }
                className={`chip ${activeBand === item.id ? "bg-white border-white text-black hover:text-black" : ""}`}
              >
                {bandLabel(item.id)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Compte de résultats + filtres actifs */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-white/14 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
          {results.length}{" "}
          {results.length === 1 ? t("shop.resultsOne") : t("shop.resultsMany")}
          {query && (
            <span className="ml-1 normal-case tracking-normal text-white/40">
              {t("shop.for")} « {query} »
            </span>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          {activeCount > 0 ? (
            <>
              <span className="label mr-1">{t("shop.active")}</span>
              {query && (
                <button
                  type="button"
                  onClick={() => update({ q: undefined })}
                  className="chip bg-white border-white text-black hover:text-black"
                >
                  {query}
                  <CloseIcon width={10} height={10} />
                </button>
              )}
              {activeCategory && (
                <button
                  type="button"
                  onClick={() => update({ cat: undefined })}
                  className="chip bg-white border-white text-black hover:text-black"
                >
                  {lang === "fr"
                    ? categoryById(activeCategory).short
                    : categoryById(activeCategory).shortEn}
                  <CloseIcon width={10} height={10} />
                </button>
              )}
              {activeBand && (
                <button
                  type="button"
                  onClick={() => update({ prix: undefined })}
                  className="chip bg-white border-white text-black hover:text-black"
                >
                  {bandLabel(activeBand)}
                  <CloseIcon width={10} height={10} />
                </button>
              )}
              <button
                type="button"
                onClick={clearAll}
                className="ml-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45 underline decoration-white/25 underline-offset-4 hover:text-white"
              >
                {t("shop.clearAll")}
              </button>
            </>
          ) : (
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/25">
              {t("common.all")} {t("common.products")}
            </span>
          )}
        </div>
      </div>

      {/* Grille */}
      {results.length === 0 ? (
        <div className="mt-14 flex flex-col items-center gap-3 border border-dashed border-white/20 px-6 py-16 text-center">
          <p className="display text-xl md:text-2xl">{t("shop.empty")}</p>
          <p className="text-[12.5px] text-white/45">{t("shop.emptyBody")}</p>
          <button type="button" onClick={clearAll} className="btn btn-primary mt-2">
            {t("shop.emptyCta")}
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
