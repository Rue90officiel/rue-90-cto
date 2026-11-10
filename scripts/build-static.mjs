/**
 * Export statique de Rue 90 pour GitHub Pages.
 *
 *   bun run build:static
 *
 * Produit :
 *   static-dist/        le site statique complet (index.html, boutique/, produit/<slug>/,
 *                       panier/, contact/, assets/, 404.html, .nojekyll)
 *   rue90-site.zip      ce même site à la racine du zip + _source/ (code du projet)
 *                       + README.md
 *
 * Le build tourne dans une copie isolée du projet (`.static-build/`) pour ne
 * jamais toucher `dist/` : le site publié sur le port 3000 reste intact.
 *
 * Deux particularités GitHub Pages sont traitées ici :
 *  1. Le site peut vivre sous https://<user>.github.io/<dépôt>/ : chaque page
 *     reçoit un petit script qui calcule la racine de déploiement dans
 *     `window.__RUE90_BASE__` (lu par `src/lib/base.ts` et le routeur), et toutes
 *     les URL absolues du HTML pré-rendu sont réécrites en chemins relatifs.
 *  2. 404.html est servi pour n'importe quelle URL inconnue, à n'importe quelle
 *     profondeur : il est donc autonome (CSS et logo en ligne).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const project = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const buildDir = path.join(project, ".static-build");
const outDir = path.join(project, "static-dist");
const zipPath = path.join(project, "rue90-site.zip");
const stageDir = "/tmp/rue90-zip-stage";

const SKIP_TOP = new Set([
  "node_modules",
  "dist",
  ".run",
  ".tanstack",
  ".static-build",
  "static-dist",
  ".git",
  "rue90-site.zip",
]);

const log = (msg) => console.log(`\x1b[1m▸\x1b[0m ${msg}`);

function rmrf(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

/* ------------------------------------------------------------------ 1. build */

function buildSite() {
  log("préparation du build isolé (.static-build)");
  rmrf(buildDir);
  rmrf(outDir);
  fs.mkdirSync(buildDir, { recursive: true });

  // copie entrée par entrée : `.static-build` est dans le projet, donc copier
  // le projet entier dans son propre sous-dossier est refusé (EINVAL).
  for (const entry of fs.readdirSync(project, { withFileTypes: true })) {
    if (SKIP_TOP.has(entry.name)) continue;
    fs.cpSync(path.join(project, entry.name), path.join(buildDir, entry.name), { recursive: true });
  }

  // node_modules en liens durs : instantané, et rien n'est réinstallé.
  execFileSync("cp", ["-al", path.join(project, "node_modules"), path.join(buildDir, "node_modules")]);

  log("build + pré-rendu des routes (TanStack Start)");
  execFileSync("bun", ["run", "vite", "build", "--config", "vite.config.static.ts"], {
    cwd: buildDir,
    stdio: "inherit",
  });

  const clientDir = path.join(buildDir, "dist", "client");
  if (!fs.existsSync(clientDir)) throw new Error(`sortie client absente : ${clientDir}`);
  log("copie de dist/client → static-dist");
  fs.cpSync(clientDir, outDir, { recursive: true });
}

/* ------------------------------------------------- 2. réécriture des chemins */

const ATTR_RE = /(\s(?:href|src|srcset|action|poster|content)=)("|')([^"']*)\2/gi;

function rewriteUrl(value, prefix) {
  if (!value.startsWith("/") || value.startsWith("//")) return value;
  return `${prefix}${value.slice(1)}`;
}

function rewriteTag(tag, prefix) {
  return tag.replace(ATTR_RE, (match, attr, quote, value) => {
    if (attr.trim().toLowerCase() === "srcset") {
      const next = value
        .split(",")
        .map((entry) => {
          const [url, ...descriptor] = entry.trim().split(/\s+/);
          return [rewriteUrl(url, prefix), ...descriptor].join(" ");
        })
        .join(", ");
      return `${attr}${quote}${next}${quote}`;
    }
    return `${attr}${quote}${rewriteUrl(value, prefix)}${quote}`;
  });
}

/** Réécrit les attributs d'URL d'un HTML (hors <script>/<style>) en relatifs. */
function rewriteHtml(html, depth) {
  const prefix = "../".repeat(depth);
  let out = "";
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt === -1) {
      out += html.slice(i);
      break;
    }
    out += html.slice(i, lt);
    const next = html[lt + 1] ?? "";

    // contenu brut : recopié tel quel jusqu'à la balise fermante
    const rawMatch = /^<(script|style|textarea)\b/i.exec(html.slice(lt, lt + 12));
    if (rawMatch) {
      const close = html.toLowerCase().indexOf(`</${rawMatch[1].toLowerCase()}`, lt);
      const end = close === -1 ? html.length : html.indexOf(">", close) + 1 || html.length;
      const block = html.slice(lt, end);
      // on réécrit uniquement la balise ouvrante, le corps reste intact
      const openEnd = block.indexOf(">") + 1;
      out += rewriteTag(block.slice(0, openEnd), prefix) + block.slice(openEnd);
      i = end;
      continue;
    }

    if (next === "!" || next === "/" || /[a-zA-Z]/.test(next)) {
      let j = lt + 1;
      let quote = null;
      while (j < html.length) {
        const ch = html[j];
        if (quote) {
          if (ch === quote) quote = null;
        } else if (ch === '"' || ch === "'") {
          quote = ch;
        } else if (ch === ">") {
          break;
        }
        j += 1;
      }
      out += rewriteTag(html.slice(lt, j + 1), prefix);
      i = j + 1;
      continue;
    }

    out += "<";
    i = lt + 1;
  }
  return out;
}

/** Script qui déduit la racine de déploiement de l'URL réelle de la page. */
function baseScript(routePath) {
  return (
    "<script>window.__RUE90_BASE__=(function(){var p=location.pathname.replace(/index\\.html$/,\"\")" +
    ";if(p.length>1&&p.charAt(p.length-1)===\"/\"){p=p.slice(0,-1);}" +
    `var r=${JSON.stringify(routePath)};` +
    "if(r===\"/\"){return p===\"/\"?\"\":p;}" +
    "if(p.length>=r.length&&p.slice(p.length-r.length)===r){return p.slice(0,p.length-r.length);}" +
    "return \"\";})();</script>"
  );
}

function routeForHtmlFile(relFile) {
  const dir = path.dirname(relFile);
  if (dir === ".") return "/";
  return `/${dir.split(path.sep).join("/")}`;
}

function processHtmlFiles() {
  const htmlFiles = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) htmlFiles.push(full);
    }
  };
  walk(outDir);

  for (const file of htmlFiles) {
    const rel = path.relative(outDir, file);
    const depth = rel.split(path.sep).length - 1;
    const routePath = routeForHtmlFile(rel);
    let html = fs.readFileSync(file, "utf8");
    html = rewriteHtml(html, depth);
    // le script de base doit précéder toute balise d'actif de <head>
    if (html.includes("<head>")) {
      html = html.replace("<head>", `<head>${baseScript(routePath)}`);
    } else {
      html = baseScript(routePath) + html;
    }
    fs.writeFileSync(file, html);
  }
  return htmlFiles.length;
}

/** Le manifeste est servi à la racine : ses URL deviennent relatives. */
function processManifest() {
  const manifestPath = path.join(outDir, "site.webmanifest");
  if (!fs.existsSync(manifestPath)) return;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.start_url = ".";
  manifest.scope = ".";
  manifest.icons = (manifest.icons ?? []).map((icon) => ({
    ...icon,
    src: icon.src.replace(/^\//, ""),
  }));
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

/* ------------------------------------------------------------- 3. 404 autonome */

function write404() {
  const logo = fs.readFileSync(path.join(outDir, "logo-rue90.png")).toString("base64");
  const html = `<!doctype html>
<html lang="fr-CA">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#000000" />
<title>Page introuvable — Rue 90</title>
<meta name="robots" content="noindex" />
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #000; color: #fff; }
  body {
    min-height: 100vh; display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 26px; padding: 40px 20px; text-align: center;
    font-family: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .crest { width: 74px; height: auto; display: block; }
  .label {
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(255,255,255,0.55); margin: 0;
  }
  h1 {
    font-size: clamp(28px, 7vw, 46px); line-height: 1.02; margin: 0;
    font-weight: 800; letter-spacing: -0.02em; text-transform: uppercase;
  }
  p.body { margin: 0; max-width: 34ch; font-size: 13px; line-height: 1.7; color: rgba(255,255,255,0.55); }
  .card {
    border: 1px solid rgba(255,255,255,0.14); background: #0b0b0b;
    padding: 34px 26px; max-width: 440px; width: 100%;
    display: flex; flex-direction: column; align-items: center; gap: 18px;
  }
  .cta {
    display: inline-block; margin-top: 4px; padding: 13px 26px; background: #fff; color: #000;
    border: 1px solid #fff; text-decoration: none; font-size: 11px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase; transition: background 0.15s, color 0.15s;
  }
  .cta:hover { background: #000; color: #fff; }
  footer { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
</style>
</head>
<body>
  <div class="card">
    <img class="crest" src="data:image/png;base64,${logo}" alt="Rue 90" />
    <p class="label">Erreur 404</p>
    <h1>Page introuvable</h1>
    <p class="body">La page demandée n'existe pas. Le catalogue Rue 90, lui, est bien là.</p>
    <a class="cta" id="rue90-home" href="../">Retour à la boutique</a>
  </div>
  <footer>Rue 90 — Équipement de football · Montréal</footer>
<script>
  // 404.html est servi à n'importe quelle profondeur : on devine la racine du
  // site (racine du domaine, ou /<dépôt>/ pour un site de projet GitHub Pages)
  // puis on vérifie qu'elle contient bien le site avant de l'utiliser.
  (function () {
    var link = document.getElementById("rue90-home");
    var segments = location.pathname.split("/").filter(Boolean);
    var candidates = [];
    if (segments.length > 1) candidates.push("/" + segments[0] + "/");
    candidates.push("/");
    var found = null;
    var pending = candidates.length;
    candidates.forEach(function (root) {
      fetch(root + "site.webmanifest", { method: "HEAD" })
        .then(function (res) { if (res.ok && found === null) found = root; })
        .catch(function () {})
        .then(function () {
          pending -= 1;
          if (pending === 0) link.setAttribute("href", (found || candidates[0]) + "boutique/");
        });
    });
  })();
</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(outDir, "404.html"), html);
}

/* ----------------------------------------------------------------- 4. le zip */

const README = `# Rue 90 — site statique

Ce dossier est le site Rue 90 complet, prêt à être hébergé tel quel sur GitHub
Pages : \`index.html\` à la racine, puis \`boutique/\`, \`produit/\`, \`panier/\`,
\`contact/\`, \`assets/\`, \`404.html\`. Toutes les pages sont de vrais fichiers HTML
(pré-rendus puis hydratés) : la recherche, les filtres, le tiroir de navigation,
le sélecteur de taille, le personnalisateur de maillot et le commutateur FR/EN
fonctionnent sans serveur.

## Publier sur GitHub Pages

1. Créez un dépôt GitHub (par exemple \`rue-90\`) et poussez-y **le contenu de ce
   dossier** (pas le dossier lui-même) :

   \`\`\`bash
   cd rue-90-site        # dossier décompressé
   git init && git add -A
   git commit -m "Rue 90 — site statique"
   git branch -M main
   git remote add origin https://github.com/<votre-compte>/rue-90.git
   git push -u origin main
   \`\`\`

2. Sur GitHub : **Settings → Pages → Build and deployment**, source
   **Deploy from a branch**, branche **main**, dossier **/ (root)**. Enregistrez.

3. Après une minute, le site est en ligne à l'adresse
   \`https://<votre-compte>.github.io/rue-90/\`.

Le site fonctionne **tel quel dans n'importe quel sous-dossier** : les liens et
les fichiers CSS/JS/images sont relatifs, et chaque page déduit sa racine de
déploiement au chargement. Aucun réglage de \`base\` à refaire, même si vous
renommez le dépôt. (Le fichier \`.nojekyll\` est déjà présent : ne le supprimez pas.)

> Si le dépôt s'appelle exactement \`<votre-compte>.github.io\`, le site est servi
> à la racine du domaine et fonctionne aussi sans modification.

## Où vit le code source

Le dossier **\`_source/\`** contient le projet qui génère ce site
(TanStack Start + React + Vite + Tailwind) : \`src/\`, \`public/\`, \`scripts/\`,
\`package.json\`, les configurations et la documentation. Pour modifier le site :

\`\`\`bash
cd _source
bun install
bun run build:static   # régénère static-dist/ et rue90-site.zip
\`\`\`

Le contenu du catalogue (32 produits, prix en dollars canadiens) est dans
\`_source/src/data/products.ts\` ; les textes français/anglais dans
\`_source/src/lib/i18n.tsx\`.
`;

function makeZip() {
  log("préparation de rue90-site.zip");
  rmrf(stageDir);
  fs.mkdirSync(stageDir, { recursive: true });
  fs.cpSync(outDir, stageDir, { recursive: true });

  const sourceDir = path.join(stageDir, "_source");
  fs.mkdirSync(sourceDir, { recursive: true });
  fs.cpSync(project, sourceDir, {
    recursive: true,
    filter: (src) => {
      const rel = path.relative(project, src);
      if (rel === "") return true;
      const top = rel.split(path.sep)[0];
      return !SKIP_TOP.has(top) && !rel.startsWith("static-dist");
    },
  });

  fs.writeFileSync(path.join(stageDir, "README.md"), README);
  fs.writeFileSync(path.join(stageDir, ".nojekyll"), "");

  rmrf(zipPath);
  execFileSync("zip", ["-r", "-q", "-X", zipPath, "."], { cwd: stageDir, stdio: "inherit" });
  rmrf(stageDir);
}

/* -------------------------------------------------------------------- main */

buildSite();
const count = processHtmlFiles();
processManifest();
write404();
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");
log(`${count} pages HTML pré-rendues et réécrites en chemins relatifs`);
makeZip();

const zipSize = fs.statSync(zipPath).size;
log(`static-dist/ prêt — rue90-site.zip : ${(zipSize / 1024 / 1024).toFixed(2)} Mo`);
