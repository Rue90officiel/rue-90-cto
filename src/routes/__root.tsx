import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "~/styles/app.css?url";
import { I18nProvider, useI18n } from "~/lib/i18n";
import { asset } from "~/lib/base";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Rue 90 — Équipement de football | Montréal",
      },
      {
        name: "description",
        content:
          "Rue 90 : chaussures de foot, souliers futsal, maillots personnalisables et équipement d'entraînement. Boutique en ligne en noir et blanc, prix en dollars canadiens.",
      },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: "Rue 90 — Équipement de football" },
      {
        property: "og:description",
        content:
          "Chaussures, maillots personnalisables et équipement d'entraînement pour joueurs et coachs. Prix en dollars canadiens.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_CA" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: asset("/favicon.png"), type: "image/png", sizes: "64x64" },
      { rel: "apple-touch-icon", href: asset("/apple-touch-icon.png"), sizes: "180x180" },
      { rel: "manifest", href: asset("/site.webmanifest") },
    ],
  }),
  notFoundComponent: NotFoundPage,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <I18nProvider>
        <Shell />
      </I18nProvider>
    </RootDocument>
  );
}

function Shell() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[90] focus:bg-white focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:uppercase focus:tracking-[0.16em] focus:text-black"
      >
        {t("header.skip")}
      </a>
      <Header />
      <main id="contenu" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="label">404</p>
      <h1 className="display text-3xl md:text-5xl">Page introuvable</h1>
      <p className="max-w-sm text-sm text-white/55">
        La page demandée n'existe pas. Le catalogue Rue 90, lui, est bien là.
      </p>
      <Link to="/boutique" className="btn btn-primary mt-2">
        Retour à la boutique
      </Link>
    </div>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="fr-CA">
      <head>
        <HeadContent />
      </head>
      <body className="bg-black text-white">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
