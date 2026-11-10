import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { categories, categoryCount } from "~/data/products";
import { asset } from "~/lib/base";
import { useI18n } from "~/lib/i18n";
import { LangSwitch } from "~/components/LangSwitch";
import { CheckIcon } from "~/components/Icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function Footer() {
  const { lang, t } = useI18n();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError(true);
      setDone(false);
      return;
    }
    setError(false);
    setDone(true);
    setEmail("");
  };

  return (
    <footer className="mt-20 border-t border-white/14 bg-[#080808]">
      <div className="container-x py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Link to="/" aria-label="Rue 90" className="inline-flex flex-col">
              <img
                src={asset("/logo-rue90.png")}
                alt="Rue 90"
                width={194}
                height={259}
                className="block h-16 w-auto"
              />
              <span className="display mt-3 text-xl leading-none">RUE 90</span>
            </Link>
            <p className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.26em] text-white/40">
              {t("brand.tagline")}
            </p>
            <p className="mt-5 max-w-xs text-[12.5px] leading-relaxed text-white/50">
              {t("footer.tagline")}
            </p>
            <div className="mt-5">
              <p className="label mb-2">{t("footer.language")}</p>
              <LangSwitch />
            </div>
          </div>

          <div>
            <p className="label mb-3">{t("footer.shop")}</p>
            <ul className="flex flex-col gap-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to="/boutique"
                    search={{ cat: category.id }}
                    className="group flex items-center gap-1.5 text-[12.5px] text-white/55 transition-colors hover:text-white"
                  >
                    {lang === "fr" ? category.fr : category.en}
                    <span className="text-[10px] text-white/25 group-hover:text-white/50">
                      {categoryCount(category.id)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-3">{t("footer.help")}</p>
            <ul className="flex flex-col gap-2.5 text-[12.5px] text-white/55">
              <li>
                <Link to="/boutique" className="hover:text-white">
                  {t("nav.boutique")}
                </Link>
              </li>
              <li>
                <Link
                  to="/boutique"
                  search={{ cat: "vetements" }}
                  className="hover:text-white"
                >
                  {t("nav.maillots")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label mb-3">{t("footer.newsletter")}</p>
            <p className="text-[12.5px] leading-relaxed text-white/50">
              {t("footer.newsletterBody")}
            </p>
            <form onSubmit={subscribe} className="mt-3" noValidate>
              <div className="flex">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t("footer.emailPlaceholder")}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError(false);
                  }}
                  placeholder={t("footer.emailPlaceholder")}
                  aria-invalid={error}
                  className={`field !rounded-none border-r-0 ${error ? "field-error" : ""}`}
                />
                <button type="submit" className="btn btn-primary shrink-0">
                  {t("footer.subscribe")}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-[11px] text-white/70">
                  {t("footer.emailError")}
                </p>
              )}
              {done && (
                <p className="mt-2 flex items-start gap-1.5 text-[11px] text-white/70">
                  <CheckIcon width={12} height={12} className="mt-[2px]" />
                  {t("footer.subscribed")}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-[10.5px] uppercase tracking-[0.14em] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>{t("footer.rights")}</p>
          <p>{t("footer.legal")}</p>
          <p className="normal-case tracking-normal text-white/30">
            {t("footer.placeholder")}
          </p>
        </div>
      </div>
    </footer>
  );
}
