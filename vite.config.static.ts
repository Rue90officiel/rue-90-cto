/**
 * Config Vite dédiée à l'export statique (GitHub Pages).
 *
 * Identique à `vite.config.ts` côté plugins, avec en plus le pré-rendu de toutes
 * les routes : chaque URL devient un vrai fichier HTML hydraté
 * (`/` → index.html, `/boutique` → boutique/index.html, etc.).
 *
 * Le build est lancé depuis une copie isolée du projet (`.static-build/`) par
 * `scripts/build-static.mjs` : `dist/` n'est jamais touché, le site publié sur
 * le port 3000 continue de tourner sans interruption.
 */
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { products } from "./src/data/products";

const ROUTES: string[] = [
  "/",
  "/boutique",
  "/panier",
  "/contact",
  ...products.map((product) => `/produit/${product.id}`),
];

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: false,
        autoSubfolderIndex: true,
        failOnError: true,
        concurrency: 4,
      },
      pages: ROUTES.map((path) => ({ path, prerender: { enabled: true } })),
    }),
    viteReact(),
  ],
});
