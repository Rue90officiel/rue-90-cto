import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { BASE_PATH } from "./lib/base";

export function getRouter() {
  return createRouter({
    routeTree,
    // Vide quand le site est servi à la racine (port 3000) ; "/<sous-dossier>"
    // quand l'export statique tourne sous un sous-chemin (GitHub Pages).
    basepath: BASE_PATH || undefined,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: () => <p>Not found</p>,
  });
}
