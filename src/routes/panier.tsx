import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "~/lib/i18n";

export const Route = createFileRoute("/panier")({
  head: () => ({ meta: [{ title: "Panier — À venir | Rue 90" }] }),
  component: CartComingSoonPage,
});

function CartComingSoonPage() {
  const { t } = useI18n();

  return (
    <div className="container-x flex min-h-[62vh] items-center justify-center py-16 md:py-24">
      <div className="w-full max-w-md border border-white/14 bg-[#0b0b0b] p-6 text-center md:p-9">
        <p className="label">{t("cartPage.eyebrow")}</p>
        <h1 className="display mt-3 text-3xl md:text-4xl">{t("cartPage.title")}</h1>
        <p className="mx-auto mt-4 max-w-sm text-[13px] leading-relaxed text-white/55">
          {t("cartPage.body")}
        </p>
        <Link to="/boutique" className="btn btn-primary mt-7 w-full sm:w-auto">
          {t("cartPage.cta")}
        </Link>
      </div>
    </div>
  );
}
