import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  categoryById,
  formatPrice,
  getProduct,
  relatedProducts,
  sizeOptions,
  type Product,
} from "~/data/products";
import { useI18n, specLabel } from "~/lib/i18n";
import { ProductArt, JerseyPreview } from "~/components/ProductArt";
import { ProductBadge, ProductCard } from "~/components/ProductCard";
import { QtyStepper } from "~/components/QtyStepper";
import { CheckIcon, ReturnIcon } from "~/components/Icons";

export const Route = createFileRoute("/produit/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  const { t } = useI18n();

  if (!product) {
    return (
      <div className="container-x flex min-h-[58vh] flex-col items-center justify-center gap-3 py-20 text-center">
        <p className="label">404</p>
        <h1 className="display text-2xl md:text-4xl">{t("product.notFoundTitle")}</h1>
        <p className="max-w-sm text-[13px] leading-relaxed text-white/50">
          {t("product.notFoundBody")}
        </p>
        <Link to="/boutique" className="btn btn-primary mt-3">
          {t("product.backToShop")}
        </Link>
      </div>
    );
  }

  return <ProductDetail key={product.id} product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const { lang, t } = useI18n();
  const category = categoryById(product.category);
  const sizes = sizeOptions(product.sizeSet);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const cleanName = name.toUpperCase().replace(/[^A-Z0-9' -]/g, "").slice(0, 12);
  const cleanNumber = number.replace(/[^0-9]/g, "").slice(0, 2);

  const nameFilled = cleanName.trim().length > 0;
  const numberFilled = cleanNumber.length > 0;
  const nameError = nameFilled && cleanName.trim().length < 2;
  const numberError = numberFilled && Number(cleanNumber) > 99;
  const partialCustom = nameFilled !== numberFilled;
  const showSizeHint = sizes.length > 0 && !size;

  const related = relatedProducts(product, 4);
  const photos = product.images ?? [];
  const views = photos.length > 0 ? photos.map((_, i) => i) : [0, 1, 2, 3];

  return (
    <div className="container-x pb-16 pt-5 md:pt-8">
      <nav aria-label="Fil d'Ariane" className="text-[10.5px] uppercase tracking-[0.16em] text-white/35">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-white">
              {t("product.home")}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link to="/boutique" className="hover:text-white">
              {t("nav.boutique")}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              to="/boutique"
              search={{ cat: product.category }}
              className="hover:text-white"
            >
              {lang === "fr" ? category.fr : category.en}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="max-w-[14rem] truncate normal-case tracking-normal text-white/60">
            {lang === "fr" ? product.name : product.nameEn}
          </li>
        </ol>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
        {/* Galerie */}
        <div>
          <div className="relative border border-white/14">
            <ProductArt
              kind={product.art}
              variant={view}
              image={photos[view]}
              className="aspect-square w-full"
            />
            <div className="pointer-events-none absolute left-3 top-3">
              <ProductBadge badge={product.badge} />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {views.map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => setView(index)}
                aria-label={`${t("product.galleryView")} ${index + 1}`}
                aria-pressed={view === index}
                className={`border transition-colors ${
                  view === index
                    ? "border-white"
                    : "border-white/14 hover:border-white/50"
                }`}
              >
                <ProductArt
                  kind={product.art}
                  variant={index}
                  image={photos[index]}
                  className="aspect-square w-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informations */}
        <div className="flex flex-col">
          <p className="label">
            {lang === "fr" ? category.fr : category.en}
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl">
            {lang === "fr" ? product.name : product.nameEn}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/55">
            {lang === "fr" ? product.shortFr : product.shortEn}
          </p>

          <div className="mt-4 flex flex-wrap items-baseline gap-3 border-y border-white/14 py-4">
            <span className="text-2xl font-bold tracking-tight">
              {formatPrice(product.price)}
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">
              {t("common.cad")} · {t("product.stock")}
            </span>
          </div>

          {/* Tailles */}
          {sizes.length > 0 && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <p className="label">
                  {t("product.size")}
                  {size ? ` · ${size}` : ""}
                </p>
                {showSizeHint && (
                  <p className="text-[10.5px] text-white/40">{t("product.sizeHint")}</p>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option === size ? null : option)}
                    aria-pressed={size === option}
                    className={`min-w-11 border px-3 py-2 text-[12px] font-semibold transition-colors ${
                      size === option
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-white/80 hover:border-white/60"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Personnalisation */}
          {product.customizable && (
            <div className="mt-6 border border-white/16 bg-[#0c0c0c] p-4">
              <div className="flex items-center justify-between">
                <p className="label">{t("product.customTitle")}</p>
                <span className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                  {t("common.optional")}
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">
                {t("product.customBody")}
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                      {t("product.customName")}
                    </span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      maxLength={12}
                      placeholder={t("product.customNamePlaceholder")}
                      aria-invalid={nameError}
                      className={`field mt-1.5 uppercase tracking-[0.06em] ${
                        nameError ? "field-error" : ""
                      }`}
                    />
                    <span className="mt-1 block text-[10px] text-white/30">
                      {cleanName.length}/12
                    </span>
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                      {t("product.customNumber")}
                    </span>
                    <input
                      value={number}
                      onChange={(event) => setNumber(event.target.value)}
                      inputMode="numeric"
                      placeholder={t("product.customNumberPlaceholder")}
                      aria-invalid={numberError}
                      className={`field mt-1.5 tabular-nums ${
                        numberError ? "field-error" : ""
                      }`}
                    />
                    <span className="mt-1 block text-[10px] text-white/30">0 – 99</span>
                  </label>

                  {nameError && (
                    <p className="col-span-2 text-[11px] text-white/70">
                      {t("product.customNameError")}
                    </p>
                  )}
                  {numberError && (
                    <p className="col-span-2 text-[11px] text-white/70">
                      {t("product.customNumberError")}
                    </p>
                  )}
                  {!nameError && !numberError && partialCustom && (
                    <p className="col-span-2 text-[11px] text-white/50">
                      {t("product.customRequired")}
                    </p>
                  )}
                </div>

                <div className="w-full sm:w-32">
                  <JerseyPreview
                    name={cleanName}
                    number={cleanNumber}
                    placeholderName={t("product.customEmpty")}
                    className="aspect-square w-full border border-white/12"
                  />
                  <p className="mt-1 text-center text-[9.5px] uppercase tracking-[0.14em] text-white/30">
                    {t("product.customPreview")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quantité + achat à venir */}
          <div className="mt-6 flex flex-wrap items-end gap-3">
            <div>
              <p className="label mb-1.5">{t("product.qty")}</p>
              <QtyStepper
                value={qty}
                onChange={(next) => setQty(Math.max(1, next))}
                label={t("product.qty")}
              />
            </div>
            <div className="min-w-[12rem] flex-1">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="btn btn-primary w-full"
              >
                {t("product.comingSoon")}
              </button>
            </div>
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-white/45">
            {t("product.comingSoonNote")}
          </p>

          <ul className="mt-5 flex flex-col gap-2 text-[11.5px] text-white/45">
            <li className="flex items-center gap-2">
              <ReturnIcon width={14} height={14} />
              {t("product.returnsNote")}
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon width={14} height={14} />
              {t("common.currency")}
            </li>
          </ul>
        </div>
      </div>

      {/* Description + caractéristiques */}
      <div className="mt-12 grid gap-8 border-t border-white/14 pt-8 md:grid-cols-2 md:gap-14">
        <div>
          <h2 className="label">{t("product.description")}</h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
            {lang === "fr" ? product.longFr : product.longEn}
          </p>
        </div>
        <div>
          <h2 className="label">{t("product.specs")}</h2>
          <dl className="mt-3 divide-y divide-white/10 border-y border-white/10">
            {product.specs.map((spec) => (
              <div
                key={spec.k}
                className="flex items-baseline justify-between gap-4 py-2.5"
              >
                <dt className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                  {specLabel[spec.k] ? specLabel[spec.k][lang] : spec.k}
                </dt>
                <dd className="text-right text-[12.5px] font-medium text-white/85">
                  {lang === "fr" ? spec.fv : spec.ev}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Produits liés */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="label">{t("product.related")}</p>
            <p className="mt-2 text-[12.5px] text-white/45">
              {t("product.relatedSub")}
            </p>
          </div>
          <Link
            to="/boutique"
            search={{ cat: product.category }}
            className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/55 hover:text-white"
          >
            {t("common.seeAll")}
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
