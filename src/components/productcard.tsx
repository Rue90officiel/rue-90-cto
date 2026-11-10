import { Link } from "@tanstack/react-router";
import { categoryById, formatPrice, type Product } from "~/data/products";
import { useI18n } from "~/lib/i18n";
import { ProductArt } from "~/components/ProductArt";

const badgeTone: Record<string, string> = {
  nouveau: "bg-white text-black",
  bestseller: "bg-black text-white border border-white/40",
  elite: "bg-black text-white border border-white/70",
};

export function ProductBadge({ badge }: { badge?: Product["badge"] }) {
  const { t } = useI18n();
  if (!badge) return null;
  const label =
    badge === "nouveau"
      ? t("badge.nouveau")
      : badge === "bestseller"
        ? t("badge.bestseller")
        : t("badge.elite");
  return (
    <span
      className={`inline-flex items-center px-2 py-[3px] text-[9px] font-bold uppercase tracking-[0.18em] ${badgeTone[badge]}`}
    >
      {label}
    </span>
  );
}

interface Props {
  product: Product;
  className?: string;
  showCta?: boolean;
}

export function ProductCard({
  product,
  className = "",
  showCta = true,
}: Props) {
  const { lang, t } = useI18n();
  const category = categoryById(product.category);

  return (
    <article
      className={`group relative flex h-full flex-col border border-white/14 bg-[#0d0d0d] transition-colors duration-300 hover:border-white/40 ${className}`}
    >
      <div className="relative">
        <Link
          to="/produit/$id"
          params={{ id: product.id }}
          aria-label={product.name}
          className="block overflow-hidden"
        >
          <ProductArt
            kind={product.art}
            image={product.images?.[0]}
            className="aspect-square w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </Link>
        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
          <ProductBadge badge={product.badge} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <span className="label mb-1.5">{lang === "fr" ? category.short : category.shortEn}</span>
        <Link
          to="/produit/$id"
          params={{ id: product.id }}
          className="line-clamp-2 text-[13px] font-semibold leading-snug text-white decoration-white/50 underline-offset-4 hover:underline sm:text-sm"
        >
          {lang === "fr" ? product.name : product.nameEn}
        </Link>

        <div className="mt-auto flex items-baseline justify-between pt-3">
          <span className="text-sm font-bold tracking-tight sm:text-[15px]">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">
            {t("common.cad")}
          </span>
        </div>

        {showCta && (
          <div className="mt-3">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="flex w-full cursor-not-allowed items-center justify-center border border-white/14 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35"
            >
              {t("product.comingSoon")}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
