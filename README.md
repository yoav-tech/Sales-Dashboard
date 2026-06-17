# InfluencerMarketing.ai — Marketing Site

Static, multi-page marketing site for **InfluencerMarketing.ai (IMAI)**, deployed to Vercel.

## Build

```bash
python3 build_site.py    # site/*.html (+ flow pages) -> clean-URL pages under public/
python3 build_extras.py  # sitemap.xml, robots.txt, llms.txt, site.webmanifest, 404.html
```

Vercel serves the `public/` directory (see `vercel.json` — `outputDirectory: public`, `cleanUrls: true`). Re-running `build_site.py` wipes and regenerates `public/`, so always run `build_extras.py` after it.

## Structure

- `site/` — source pages, `css/`, `js/`, `assets/`
- `_ds/` — design-system tokens (`colors_and_type.css`)
- `register.html`, `personalize.html`, `payment.html`, `setup.html` — sign-up flow
- `public/` — generated build output (what gets deployed)

## Pages

Home, Platform (+ 6 feature pages), Solutions (+ 9 solution pages), Pricing, Find influencers, Customers, About, and the sign-up flow. Clean URLs, full SEO/GEO (canonicals, Open Graph, JSON-LD, sitemap, robots, `llms.txt`), mobile responsive.
