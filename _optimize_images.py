# -*- coding: utf-8 -*-
"""One-shot: compress landing images for mobile LCP."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent


def save_webp(im: Image.Image, path: Path, quality=78):
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"  {path.name}: {path.stat().st_size // 1024} KB {im.size}")


def save_jpeg(im: Image.Image, path: Path, quality=78):
    rgb = im.convert("RGB")
    rgb.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  {path.name}: {path.stat().st_size // 1024} KB {rgb.size}")


def main():
    # Nav logo: displayed ~74px tall → 2× retina
    logo = Image.open(ROOT / "logo_top.png")
    h = 160
    w = max(1, round(logo.width * h / logo.height))
    logo_s = logo.resize((w, h), Image.Resampling.LANCZOS)
    save_webp(logo_s, ROOT / "logo_nav.webp", quality=82)
    # Keep a small PNG fallback (transparency)
    logo_s.save(ROOT / "logo_nav.png", "PNG", optimize=True)
    print(f"  logo_nav.png: {(ROOT / 'logo_nav.png').stat().st_size // 1024} KB")

    # Apple touch: square pad on white
    side = 180
    canvas = Image.new("RGBA", (side, side), (255, 255, 255, 255))
    fit = 150
    ratio = min(fit / logo.width, fit / logo.height)
    lw, lh = max(1, round(logo.width * ratio)), max(1, round(logo.height * ratio))
    thumb = logo.resize((lw, lh), Image.Resampling.LANCZOS)
    canvas.paste(thumb, ((side - lw) // 2, (side - lh) // 2), thumb if thumb.mode == "RGBA" else None)
    canvas.convert("RGB").save(ROOT / "apple-touch-icon.png", "PNG", optimize=True)
    print(f"  apple-touch-icon.png: {(ROOT / 'apple-touch-icon.png').stat().st_size // 1024} KB")

    # Hero
    hero = Image.open(ROOT / "kira_background.jpg").convert("RGB")
    for name, width, q in [("kira_background.webp", 1280, 78), ("kira_background-800.webp", 800, 76)]:
        h2 = max(1, round(hero.height * width / hero.width))
        save_webp(hero.resize((width, h2), Image.Resampling.LANCZOS), ROOT / name, quality=q)
    # Rewrite jpg fallback smaller (keep filename for OG/SW compat if needed)
    h2 = max(1, round(hero.height * 1280 / hero.width))
    save_jpeg(hero.resize((1280, h2), Image.Resampling.LANCZOS), ROOT / "kira_background.jpg", quality=78)

    # Doctor
    doc = Image.open(ROOT / "shurovv11.jpg").convert("RGB")
    for name, width, q in [("shurovv11.webp", 960, 78), ("shurovv11-640.webp", 640, 76)]:
        h2 = max(1, round(doc.height * width / doc.width))
        save_webp(doc.resize((width, h2), Image.Resampling.LANCZOS), ROOT / name, quality=q)
    h2 = max(1, round(doc.height * 960 / doc.width))
    save_jpeg(doc.resize((960, h2), Image.Resampling.LANCZOS), ROOT / "shurovv11.jpg", quality=78)

    print("done")


if __name__ == "__main__":
    main()
