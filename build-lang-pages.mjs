/**
 * OG-шеллы для /en /uk /pl /es (шаринг в мессенджерах).
 * Sale сейчас RU-only: эти страницы только превью + редирект на /.
 * Корневой index.html НИКОГДА не перезаписывается.
 *
 * Мета/картинки: share-meta.json + promo-{lang}.jpg
 * Запуск: node build-lang-pages.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = "https://kira-ai.online";
const meta = JSON.parse(readFileSync(join(__dirname, "share-meta.json"), "utf8"));

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function shellHtml(lang) {
  const m = meta.langs[lang];
  if (!m) throw new Error(`нет мета для ${lang}`);
  const url = `${SITE}/${lang}/`;
  const image = `${SITE}/${m.image}`;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex,follow" />
  <title>${escapeHtml(m.title)}</title>
  <meta name="description" content="${escapeAttr(m.description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Kira" />
  <meta property="og:locale" content="${escapeAttr(m.locale)}" />
  <meta property="og:title" content="${escapeAttr(m.title)}" />
  <meta property="og:description" content="${escapeAttr(m.description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:alt" content="${escapeAttr(m.imageAlt)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(m.title)}" />
  <meta name="twitter:description" content="${escapeAttr(m.description)}" />
  <meta name="twitter:image" content="${image}" />
  <link rel="canonical" href="${SITE}/" />
  <meta http-equiv="refresh" content="0; url=/" />
  <script>location.replace("/");</script>
</head>
<body>
  <p><a href="/">Kira</a></p>
</body>
</html>
`;
}

const fallback = join(__dirname, "promo.jpg");
for (const lang of Object.keys(meta.langs)) {
  if (lang === "ru") continue; // корень правим руками, не этим скриптом
  const name = meta.langs[lang].image;
  const dest = join(__dirname, name);
  if (existsSync(fallback) && !existsSync(dest)) {
    copyFileSync(fallback, dest);
    console.log("created placeholder", name);
  }
  const dir = join(__dirname, lang);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), shellHtml(lang), "utf8");
  console.log(`updated ./${lang}/index.html (OG shell → /)`);
}

console.log("Root ./index.html not touched.");
console.log("Share URLs (redirect to /):");
for (const lang of Object.keys(meta.langs)) {
  if (lang === "ru") console.log(`  ${SITE}/`);
  else console.log(`  ${SITE}/${lang}/`);
}
