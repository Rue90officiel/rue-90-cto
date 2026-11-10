import { useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import {
  categories,
  categoryCount,
  formatPrice,
  searchProducts,
} from "~/data/products";
import type { ShopSearchShape } from "~/lib/shopSearch";
import { asset } from "~/lib/base";
import { useI18n } from "~/lib/i18n";
import {
  ChevronRight,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "~/components/Icons";
import { LangSwitch } from "~/components/LangSwitch";
import { ProductArt } from "~/components/ProductArt";

function GlobalSearch({ idPrefix }: { idPrefix: string }) {
  const { lang, t } = useI18n();
  const navigate = useNavigate();
  const location = useSearch({ strict: false }) as ShopSearchShape;
  const pathname = useLocation({ select: (state) => state.pathname });
  const onShop = pathname === "/boutique";

  const [local, setLocal] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const value = onShop ? (location.q ?? "") : local;
  const query = value.trim();
  const results = useMemo(
    () => (query.length >= 2 ? searchProducts(query).slice(0, 6) : []),
    [query],
  );

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
        setActive(-1);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const setValue = (next: string) => {
    setActive(-1);
    if (onShop) {
      void navigate({
        to: "/boutique",
        search: (prev) => ({
          ...(prev as ShopSearchShape),
          q: next.trim().length > 0 ? next : undefined,
        }),
        replace: true,
      });
    } else {
      setLocal(next);
    }
  };

  const goToProduct = (productId: string) => {
    setOpen(false);
    setActive(-1);
    setLocal("");
    inputRef.current?.blur();
    void navigate({ to: "/produit/$id", params: { id: productId } });
  };

  const goToAll = () => {
    setOpen(false);
    setActive(-1);
    void navigate({
      to: "/boutique",
      search: (prev) => ({
        ...(prev as ShopSearchShape),
        q: query.length > 0 ? query : undefined,
      }),
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
      inputRef.current?.blur();
      return;
    }
    if (!open) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) =>
        results.length === 0 ? -1 : Math.min(current + 1, results.length - 1),
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, -1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (active >= 0 && results[active]) {
        goToProduct(results[active].id);
      } else {
        goToAll();
      }
    }
  };

  const showPanel = open && query.length > 0;

  return (
    <div ref={boxRef} className="relative w-full">
      <label htmlFor={`${idPrefix}-search`} className="sr-only">
        {t("search.label")}
      </label>
      <div className="flex items-center gap-2 border border-white/16 bg-[#101010] px-3 focus-within:border-white/60">
        <SearchIcon width={15} height={15} className="shrink-0 text-white/45" />
        <input
          id={`${idPrefix}-search`}
          ref={inputRef}
          type="search"
          value={value}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={`${idPrefix}-search-panel`}
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={t("search.placeholder")}
          onChange={(event) => {
            setValue(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-10 w-full min-w-0 bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {value.length > 0 && (
          <button
            type="button"
            aria-label={t("common.close")}
            onClick={() => {
              setValue("");
              inputRef.current?.focus();
            }}
            className="shrink-0 p-1 text-white/45 hover:text-white"
          >
            <CloseIcon width={13} height={13} />
          </button>
        )}
      </div>

      {showPanel && (
        <div
          id={`${idPrefix}-search-panel`}
          role="listbox"
          className="anim-fade absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-[70vh] overflow-y-auto border border-white/20 bg-[#0c0c0c] shadow-[0_24px_60px_rgba(0,0,0,0.8)]"
        >
          {query.length < 2 ? (
            <p className="px-4 py-4 text-xs text-white/50">{t("search.hint")}</p>
          ) : results.length === 0 ? (
            <p className="px-4 py-4 text-xs text-white/50">{t("search.empty")}</p>
          ) : (
            <>
              <p className="label border-b border-white/10 px-4 py-2.5">
                {t("search.results")}
              </p>
              <ul>
                {results.map((product, index) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active === index}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => goToProduct(product.id)}
                      className={`flex w-full items-center gap-3 border-b border-white/[0.07] px-3 py-2.5 text-left transition-colors ${
                        active === index ? "bg-white/10" : "hover:bg-white/[0.06]"
                      }`}
                    >
                      <ProductArt
                        kind={product.art}
                        image={product.images?.[0]}
                        className="h-10 w-10 shrink-0 border border-white/14"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] font-medium text-white">
                          {lang === "fr" ? product.name : product.nameEn}
                        </span>
                        <span className="block text-[11px] text-white/45">
                          {formatPrice(product.price)}
                        </span>
                      </span>
                      <ChevronRight
                        width={14}
                        height={14}
                        className="shrink-0 text-white/30"
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goToAll}
                className="flex w-full items-center justify-between px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-black"
              >
                {t("search.all")}
                <span className="text-[10px] opacity-60">
                  {searchProducts(query).length}
                </span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function AccountPanel({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  return (
    <div className="anim-fade absolute right-0 top-[calc(100%+8px)] z-50 w-[min(20rem,calc(100vw-2rem))] border border-white/20 bg-[#0c0c0c] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
      <div className="flex items-start justify-between">
        <p className="label">{t("header.accountTitle")}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("common.close")}
          className="text-white/45 hover:text-white"
        >
          <CloseIcon width={14} height={14} />
        </button>
      </div>
      <p className="mt-3 text-sm font-bold uppercase tracking-[0.08em]">
        {t("header.accountSoon")}
      </p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-white/55">
        {t("header.accountBody")}
      </p>
      <Link
        to="/contact"
        onClick={onClose}
        className="btn btn-ghost btn-sm mt-4 w-full"
      >
        {t("nav.contact")}
      </Link>
    </div>
  );
}

export function Header() {
  const { lang, t } = useI18n();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        setAccountOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (
        accountOpen &&
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [accountOpen]);

  const close = () => setDrawerOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/14 bg-black/95 backdrop-blur-md">
        <div className="container-x">
          <div className="flex h-15 min-h-[3.75rem] items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={t("common.openMenu")}
              aria-expanded={drawerOpen}
              className="-ml-1 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] hover:text-white/70"
            >
              <MenuIcon width={20} height={20} />
            </button>

            <Link
              to="/"
              aria-label="Rue 90"
              className="group flex shrink-0 items-center"
            >
              <img
                src={asset("/logo-rue90.png")}
                alt="Rue 90"
                width={194}
                height={259}
                className="block h-10 w-auto sm:h-[46px]"
              />
            </Link>

            <div className="mx-auto hidden w-full max-w-md px-4 lg:block">
              <GlobalSearch idPrefix="header" />
            </div>

            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <LangSwitch className="hidden sm:inline-flex" />
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountOpen((open) => !open)}
                  aria-label={t("header.account")}
                  aria-expanded={accountOpen}
                  className="flex h-10 w-9 items-center justify-center text-white/80 hover:text-white"
                >
                  <UserIcon width={19} height={19} />
                </button>
                {accountOpen && (
                  <AccountPanel onClose={() => setAccountOpen(false)} />
                )}
              </div>
            </div>
          </div>

          <div className="pb-2.5 lg:hidden">
            <GlobalSearch idPrefix="header-mobile" />
          </div>

          <div className="hidden items-center justify-between border-t border-white/10 py-2 lg:flex">
            <nav aria-label={t("nav.quicklinks")}>
              <ul className="flex items-center gap-7">
                <li>
                  <Link
                    to="/boutique"
                    className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                    activeProps={{ className: "text-white" }}
                  >
                    {t("nav.boutique")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/boutique"
                    search={{ tri: "nouveautes" }}
                    className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                  >
                    {t("nav.nouveautes")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/boutique"
                    search={{ cat: "vetements" }}
                    className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                  >
                    {t("nav.maillots")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                    activeProps={{ className: "text-white" }}
                  >
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </nav>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              {t("common.currency")} · {t("brand.city")}
            </p>
          </div>
        </div>
      </header>

      {/* Tiroir de navigation */}
      <div
        className={`fixed inset-0 z-[60] ${drawerOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={close}
          className={`absolute inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.menu")}
          className={`absolute left-0 top-0 flex h-full w-[min(87vw,22rem)] flex-col overflow-y-auto border-r border-white/20 bg-[#0a0a0a] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/14 px-5 py-4">
            <Link to="/" onClick={close} aria-label="Rue 90" className="flex items-center">
              <img
                src={asset("/logo-rue90.png")}
                alt="Rue 90"
                width={194}
                height={259}
                className="block h-10 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label={t("common.closeMenu")}
              className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/70 hover:border-white hover:text-white"
            >
              <CloseIcon width={15} height={15} />
            </button>
          </div>

          <nav className="px-5 py-5" aria-label={t("nav.categories")}>
            <p className="label mb-3">{t("nav.categories")}</p>
            <ul className="flex flex-col">
              {categories.map((category, index) => (
                <li key={category.id}>
                  <Link
                    to="/boutique"
                    search={{ cat: category.id }}
                    onClick={close}
                    className="group flex items-start justify-between gap-3 border-b border-white/[0.08] py-3.5 transition-colors hover:text-white"
                  >
                    <span className="flex min-w-0 gap-3">
                      <span className="mt-[3px] w-4 shrink-0 text-[10px] font-bold text-white/30">
                        0{index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13.5px] font-semibold leading-tight text-white/90 group-hover:text-white">
                          {lang === "fr" ? category.fr : category.en}
                        </span>
                        <span className="mt-1 block text-[11px] text-white/40">
                          {lang === "fr" ? category.blurbFr : category.blurbEn}
                        </span>
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-white/45">
                        {categoryCount(category.id)}
                      </span>
                      <ChevronRight
                        width={13}
                        height={13}
                        className="text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-5 pb-5">
            <p className="label mb-3">{t("nav.quicklinks")}</p>
            <ul className="flex flex-col gap-2.5 text-[12.5px] text-white/65">
              <li>
                <Link to="/boutique" onClick={close} className="hover:text-white">
                  {t("nav.boutique")}
                </Link>
              </li>
              <li>
                <Link
                  to="/boutique"
                  search={{ tri: "nouveautes" }}
                  onClick={close}
                  className="hover:text-white"
                >
                  {t("nav.nouveautes")}
                </Link>
              </li>
              <li>
                <Link
                  to="/boutique"
                  search={{ cat: "vetements" }}
                  onClick={close}
                  className="hover:text-white"
                >
                  {t("nav.maillots")}
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={close} className="hover:text-white">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-auto border-t border-white/14 px-5 py-4">
            <LangSwitch />
            <p className="mt-4 text-[11px] leading-relaxed text-white/35">
              {t("footer.tagline")}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
