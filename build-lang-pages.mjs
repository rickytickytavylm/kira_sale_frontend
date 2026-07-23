/**
 * Генерирует языковые entry-страницы для OG-превью в мессенджерах.
 *
 * Править разметку: корневой index.html (тело страницы).
 * Мета/картинки: share-meta.json + promo-{lang}.jpg
 *
 * Запуск: node build-lang-pages.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = "https://kira-ai.online";
const meta = JSON.parse(readFileSync(join(__dirname, "share-meta.json"), "utf8"));
const langs = Object.keys(meta.langs);

let template = readFileSync(join(__dirname, "index.html"), "utf8");
template = template
  .replace(/\s*<base href="\/"\s*\/?>/g, "")
  .replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+"\s*\/?>/g, "")
  .replace(/\s*<meta name="kira-lang" content="[^"]*"\s*\/?>/g, "")
  .replace(/\s*<meta property="og:locale" content="[^"]*"\s*\/?>/g, "");

function hreflangBlock() {
  const links = langs.map((lang) => {
    const href = lang === "ru" ? `${SITE}/` : `${SITE}/${lang}/`;
    return `  <link rel="alternate" hreflang="${lang}" href="${href}" />`;
  });
  links.push(`  <link rel="alternate" hreflang="x-default" href="${SITE}/en/" />`);
  return links.join("\n");
}

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Ассеты с корня — без <base>, чтобы #якоря не сбрасывали /pl/ → / */
function rootAssets(html) {
  const files = [
    "manifest.webmanifest",
    "logo_top.png",
    "eng_logo.jpg",
    "styles.css",
    "kira_background.jpg",
    "shurovv11.jpg",
    "config.js",
    "products.js",
    "legal.js",
    "app.js",
    "sw.js",
  ];
  let out = html;
  for (const f of files) {
    const re = new RegExp(`(href|src)="(${f.replace(".", "\\.")}[^"]*)"`, "g");
    out = out.replace(re, `$1="/$2"`);
  }
  out = out.replace(
    /navigator\.serviceWorker\.register\(["']\.\/sw\.js["']\)/,
    'navigator.serviceWorker.register("/sw.js")'
  );
  return out;
}

function injectHead(html, lang) {
  const m = meta.langs[lang];
  const url = lang === "ru" ? `${SITE}/` : `${SITE}/${lang}/`;
  const image = `${SITE}/${m.image}`;

  let out = rootAssets(html);
  out = out.replace(/<html\s+lang="[^"]*"/, `<html lang="${lang}"`);

  out = out.replace(
    /<title[^>]*>[\s\S]*?<\/title>/,
    `<title data-i18n-attr="title" data-i18n-attr-content="meta.title">${escapeHtml(m.title)}</title>`
  );
  out = out.replace(
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" data-i18n-attr="description" data-i18n-attr-content="meta.description" content="${escapeAttr(m.description)}" />`
  );

  const ogBlock = `<!-- Превью при пересылке в соцсетях / мессенджерах (${lang}) -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Kira" />
  <meta property="og:locale" content="${m.locale}" />
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
${hreflangBlock()}
  <meta name="kira-lang" content="${lang}" />`;

  if (/<!-- Превью при пересылке[\s\S]*?<meta name="twitter:image"[^>]*>/.test(out)) {
    out = out.replace(/<!-- Превью при пересылке[\s\S]*?<meta name="twitter:image"[^>]*>/, ogBlock);
  } else {
    out = out.replace(
      /<meta name="description"[^>]*>/,
      (match) => `${match}\n\n  ${ogBlock}`
    );
  }

  out = out.replace(/styles\.css\?v=\d+/, "styles.css?v=8");
  out = out.replace(/legal\.js\?v=\d+/, "legal.js?v=1");
  out = out.replace(/app\.js\?v=\d+/, "app.js?v=11");
  return out;
}

const fallback = join(__dirname, "promo.jpg");
if (existsSync(fallback)) {
  for (const lang of langs) {
    const name = meta.langs[lang].image;
    const dest = join(__dirname, name);
    if (!existsSync(dest)) {
      copyFileSync(fallback, dest);
      console.log("created placeholder", name);
    } else {
      console.log("keep existing", name);
    }
  }
} else {
  console.warn("promo.jpg не найден — og:image файлы не скопированы");
}

for (const lang of langs) {
  const html = injectHead(template, lang);
  if (lang === "ru") {
    writeFileSync(join(__dirname, "index.html"), html, "utf8");
    console.log("updated ./index.html (ru)");
  } else {
    const dir = join(__dirname, lang);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html, "utf8");
    console.log(`updated ./${lang}/index.html`);
  }
}

console.log("Share URLs:");
for (const lang of langs) {
  console.log(lang === "ru" ? `  ${SITE}/` : `  ${SITE}/${lang}/`);
}
