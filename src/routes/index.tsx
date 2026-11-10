import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  bestsellers,
  categories,
  categoryCount,
  customizableJersey,
  formatPrice,
  productCount,
  type ArtKind,
  type CategoryId,
} from "~/data/products";
import { asset } from "~/lib/base";
import { useI18n } from "~/lib/i18n";
import { ProductArt } from "~/components/ProductArt";
import { ProductCard } from "~/components/ProductCard";
import {
  ArrowRight,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  SearchIcon,
  ShirtIcon,
  SparkIcon,
} from "~/components/Icons";
import { JerseyPreview } from "~/components/ProductArt";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const categoryArt: Record<CategoryId, ArtKind> = {
  chaussures: "boot",
  sacs: "bag",
  futsal: "futsal",
  entrainement: "goal",
  vetements: "jersey",
  accessoires: "gloves",
};

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative isolate overflow-hidden border-b border-white/14 bg-black">
      <picture>
        <source media="(max-width: 767px)" srcSet={asset("/img/hero-mobile.webp")} />
        <img
          src={asset("/img/hero.webp")}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[72%_center] opacity-[0.85]"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/72 to-black/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent to-black/25" />
      <div className="grain absolute inset-0 -z-10 opacity-40" />

      <div className="container-x flex min-h-[74vh] flex-col justify-end pb-10 pt-16 sm:min-h-[78vh] md:min-h-[82vh] md:pb-14">
        <div className="max-w-2xl">
          <p className="label anim-fade-up">{t("home.eyebrow")}</p>
          <h1 className="display anim-fade-up mt-3 text-[13vw] leading-[0.86] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {t("home.title1")}
            <br />
            <span className="text-white/85">{t("home.title2")}</span>
          </h1>
          <p className="anim-fade-up mt-5 max-w-lg text-[13.5px] leading-relaxed text-white/65 sm:text-[15px]">
            {t("home.sub")}
          </p>
          <div className="anim-fade-up mt-7 flex flex-wrap items-center gap-3">
            <Link to="/boutique" className="btn btn-primary">
              {t("home.cta")}
              <ArrowRight width={14} height={14} />
            </Link>
            <a href="#bestsellers" className="btn btn-ghost">
              {t("home.secondary")}
            </a>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-px border-t border-white/14 pt-5 sm:grid-cols-3">
          {[
            { k: productCount, v: t("home.stat1") },
            { k: categories.length, v: t("home.stat2") },
            { k: "CAD", v: t("home.stat3") },
          ].map((item) => (
            <div key={item.v} className="flex items-baseline gap-2.5 py-1.5">
              <dt className="text-lg font-bold tabular-nums">{item.k}</dt>
              <dd className="text-[10.5px] uppercase tracking-[0.16em] text-white/45">
                {item.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CategoryGrid() {
  const { lang, t } = useI18n();
  return (
    <section className="container-x py-14 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label">{t("home.catEyebrow")}</p>
          <h2 className="display mt-2 text-3xl md:text-4xl">{t("home.catTitle")}</h2>
        </div>
        <Link
          to="/boutique"
          className="group inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/60 hover:text-white"
        >
          {t("home.bestAll")}
          <ArrowRight
            width={13}
            height={13}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-px bg-white/14 md:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            to="/boutique"
            search={{ cat: category.id }}
            className="group relative flex flex-col overflow-hidden bg-[#0b0b0b] transition-colors hover:bg-[#131313]"
          >
            <ProductArt
              kind={categoryArt[category.id]}
              showFrame={false}
              className="h-28 w-full opacity-80 transition-opacity duration-500 group-hover:opacity-100 md:h-36"
            />
            <div className="relative p-4 md:p-5">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/30">
                0{index + 1}
              </span>
              <h3 className="mt-2 text-[15px] font-bold uppercase leading-tight tracking-[-0.01em] md:text-base">
                {lang === "fr" ? category.fr : category.en}
              </h3>
              <p className="mt-2 text-[11.5px] leading-snug text-white/40">
                {lang === "fr" ? category.blurbFr : category.blurbEn}
              </p>
            </div>
            <div className="relative mt-auto flex items-center justify-between px-4 pb-4 md:px-5 md:pb-5">
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                {categoryCount(category.id)} {t("common.products")}
              </span>
              <ArrowRight
                width={14}
                height={14}
                className="text-white/30 transition-all group-hover:translate-x-1 group-hover:text-white"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  const { t } = useI18n();
  const rail = useRef<HTMLDivElement | null>(null);
  const items = useMemo(() => bestsellers(), []);

  const scrollBy = (direction: 1 | -1) => {
    const element = rail.current;
    if (!element) return;
    const card = element.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 12 : element.clientWidth * 0.8;
    element.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section
      id="bestsellers"
      className="border-y border-white/14 bg-[#070707] py-14 md:py-20"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">{t("home.bestEyebrow")}</p>
            <h2 className="display mt-2 text-3xl md:text-4xl">
              {t("home.bestTitle")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={t("home.prev")}
              className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              <ChevronLeft width={16} height={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={t("home.next")}
              className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              <ChevronRight width={16} height={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={rail}
        tabIndex={0}
        role="region"
        aria-label={t("home.bestTitle")}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollBy(1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollBy(-1);
          }
        }}
        className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pt-2 pb-2 scroll-px-4 md:px-8 md:scroll-px-8 xl:px-12 xl:scroll-px-12"
      >
        {items.map((product) => (
          <div
            key={product.id}
            data-card
            className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-[31%] xl:w-[23.6%]"
          >
            <ProductCard product={product} hoverLift />
          </div>
        ))}
      </div>
    </section>
  );
}

function JerseyPromo() {
  const { t } = useI18n();
  const jersey = customizableJersey();
  const [name, setName] = useState("RUE 90");
  const [number, setNumber] = useState("90");

  const cleanName = name.toUpperCase().replace(/[^A-Z0-9' -]/g, "").slice(0, 12);
  const cleanNumber = number.replace(/[^0-9]/g, "").slice(0, 2);

  return (
    <section className="bg-white text-black">
      <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
            {t("home.promoEyebrow")}
          </p>
          <h2 className="display mt-3 text-4xl md:text-5xl">
            {t("home.promoTitle")}
          </h2>
          <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-black/65">
            {t("home.promoBody")}
          </p>

          <div className="mt-7 grid max-w-md grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/50">
                {t("home.promoNameLabel")}
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={12}
                placeholder="DUPONT"
                className="mt-1.5 w-full border border-black/25 bg-white px-3 py-2.5 text-sm font-semibold uppercase tracking-[0.06em] text-black placeholder:text-black/30 focus:border-black focus:outline-none"
              />
              <span className="mt-1 block text-[10px] text-black/40">
                {t("home.promoNameHint")} · {cleanName.length}/12
              </span>
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/50">
                {t("home.promoNumberLabel")}
              </span>
              <input
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                inputMode="numeric"
                placeholder="10"
                className="mt-1.5 w-full border border-black/25 bg-white px-3 py-2.5 text-sm font-semibold tabular-nums text-black placeholder:text-black/30 focus:border-black focus:outline-none"
              />
              <span className="mt-1 block text-[10px] text-black/40">
                {t("home.promoNumberHint")} · {cleanNumber || "0"}
              </span>
            </label>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/produit/$id"
              params={{ id: jersey.id }}
              className="btn bg-black text-white hover:bg-transparent hover:text-black"
              style={{ borderColor: "#000" }}
            >
              {t("home.promoCta")}
              <ArrowRight width={14} height={14} />
            </Link>
            <span className="text-[10.5px] uppercase tracking-[0.16em] text-black/45">
              {t("home.promoFoot")}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="border border-black/20 bg-[#0a0a0a] p-3">
            <JerseyPreview
              name={cleanName}
              number={cleanNumber}
              placeholderName={t("product.customEmpty")}
              className="aspect-square w-full border border-white/10"
            />
          </div>
          <p className="mt-2 text-right text-[10px] uppercase tracking-[0.16em] text-black/40">
            {jersey.name} · {formatPrice(jersey.price)}
          </p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useI18n();
  const items = [
    { icon: SparkIcon, title: t("home.svc1Title"), body: t("home.svc1Body") },
    { icon: ShirtIcon, title: t("home.svc2Title"), body: t("home.svc2Body") },
    { icon: SearchIcon, title: t("home.svc3Title"), body: t("home.svc3Body") },
    { icon: CheckIcon, title: t("home.svc4Title"), body: t("home.svc4Body") },
  ];
  return (
    <section className="container-x py-14 md:py-20">
      <p className="label">{t("home.servicesTitle")}</p>
      <div className="mt-5 grid grid-cols-1 gap-px bg-white/14 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="bg-[#0b0b0b] p-5">
            <item.icon width={20} height={20} className="text-white/60" />
            <h3 className="mt-4 text-[13px] font-bold uppercase tracking-[0.1em]">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <BestSellers />
      <JerseyPromo />
      <Services />
    </>
  );
}
