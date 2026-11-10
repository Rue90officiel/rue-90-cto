/**
 * Déploiement sous un sous-dossier (GitHub Pages : https://user.github.io/<dépôt>/).
 *
 * Le site publié sur port 3000 est servi à la racine (`BASE_PATH === ""`), donc
 * rien ne change pour lui. Pour l'export statique, `scripts/build-static.mjs`
 * injecte dans chaque page un petit script qui calcule le préfixe de déploiement
 * à partir de l'URL réelle et le dépose dans `window.__RUE90_BASE__`
 * (ex. "/rue-90", ou "" si le site est à la racine du domaine).
 *
 * Toute URL d'actif écrite en dur dans le JSX doit passer par `asset()` :
 * les chemins absolus "/img/..." casseraient sous un sous-dossier.
 */
declare global {
  interface Window {
    __RUE90_BASE__?: string;
  }
}

export const BASE_PATH: string = (() => {
  if (typeof window === "undefined") return "";
  const base = window.__RUE90_BASE__;
  if (typeof base !== "string") return "";
  return base === "/" ? "" : base.replace(/\/+$/, "");
})();

/** Préfixe une URL d'actif publique avec la racine de déploiement. */
export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
