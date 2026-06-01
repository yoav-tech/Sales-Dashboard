# IMAI — Features section · WordPress Elementor handoff

Drop-in package for the **Features section only** of the IMAI landing page
(everything under `#features` — the section titled "Everything you need to
work with creators." with the three alternating feature cards).

**Live reference:** https://sales-dashboard-steel-zeta.vercel.app/#features

---

## What's in this folder

| File | Purpose |
|---|---|
| `features-section.html` | **The fastest path.** Single self-contained HTML file with embedded `<style>` + Google Fonts `<link>`. Paste into an Elementor HTML widget and you're done. |
| `features-section.css` | Same CSS extracted as a standalone file. Use this if you'd rather put the styles in **Elementor → Site Settings → Custom CSS** and keep the markup separate. |
| `elementor-build-guide.md` | Step-by-step instructions for both approaches: Option A (HTML widget — recommended) and Option B (native Elementor widgets + Custom CSS, with HTML islands for the table/filter mockups). |
| `README.md` | This file. |

---

## TL;DR for the developer

```
1. Open the page in Elementor.
2. Drag an "HTML" widget where the Features section should go.
3. Open features-section.html, copy everything, paste into the widget.
4. Save. Done.
```

The section is fully self-contained — fonts load from Google, all CSS is
scoped under `.imai-features` so it won't interfere with the rest of your
theme.

---

## Brand tokens

These are baked into the CSS as custom properties on `.imai-features`. Edit
them once at the top of the embedded `<style>` block (or in
`features-section.css`) and the whole section retunes.

| Token | Hex | Used for |
|---|---|---|
| `--ink` | `#1d1d1b` | Primary text, borders, dark backgrounds |
| `--ink-muted` | `#444444` | Secondary text |
| `--ink-soft` | `#8f8f8f` | Tertiary text / placeholders |
| `--accent` | `#8564ff` | IMAI purple (CTAs, accents on light bg) |
| `--lime` / `--teal` | `#06c7a9` | IMAI teal (accents on dark bg, status pills) |
| `--bg` | `#ffffff` | Section background |
| `--line` / `--line-soft` | `#ececec` / `#e9e9e9` | Hairlines |

## Fonts

Loaded via Google Fonts at the top of `features-section.html`:

- **Poppins** — 400 / 500 / 600 / 700 / 800 — body, headings, list items
- **JetBrains Mono** — 500 / 600 — eyebrows, microcopy, monospaced data
  (creator handles, payouts, status pills)

If your theme already loads Poppins or has a different sans-serif you'd
prefer, delete the `<link>` at the top of the HTML and update
`font-family` on `.imai-features` to your preferred stack.

---

## What this section contains

```
.imai-features
└── .container
    ├── .section-head
    │   ├── Eyebrow pill  "Three pillars · One platform"
    │   ├── H2           "Everything you need to work with creators."
    │   └── Sub          "From the first idea to the final invoice…"
    │
    ├── .feature (Feature 1 — light)
    │   ├── .f-copy      AI Influencer Search · copy + 3-item list + CTA
    │   └── .f-visual.v-search   Filter-panel mockup (4 chip groups + toggles)
    │
    ├── .feature.dark.flip (Feature 2 — dark, mockup-left)
    │   ├── .f-copy      Creator Discovery · copy + 3-item list + CTA
    │   └── .f-visual.v-disc     Platform stats (4 cards) + world map with 10 pins
    │
    └── .feature (Feature 3 — light)
        ├── .f-copy      Campaign Management · copy + 3-item list + CTA
        └── .f-visual.v-camp     SS26 launch table (5 tabs, search, 5-row table, footer)
```

Section ID is `features` — anchor links like `#features` from other pages
will scroll here.

---

## Asset list

Five Unsplash portrait URLs are referenced in the campaign-management table
(Feature 3) as inline `background-image` styles. They render the creator
avatars in the campaign rows.

If you want to host these on your own server / Media Library:

1. Download each URL (96×96 crop, faces, q=80, ~3–5 KB each)
2. Upload to **WordPress Media → Library**
3. Find-and-replace inside `features-section.html`:

| Creator | Current URL (Unsplash) |
|---|---|
| Mara Linde | `photo-1494790108377-be9c29b29330` |
| Jonas Becker | `photo-1500648767791-00dcc994a43e` |
| Anika Roth | `photo-1438761681033-6461ffad8d80` |
| Lea Vogel | `photo-1573497019940-1c28c88b4f3e` |
| Sofia Kraus | `photo-1531123897727-8f129e1688ce` |

Otherwise the Unsplash CDN serves them with caching headers — no action
needed.

---

## Responsive behavior

Built mobile-first with three breakpoints, all baked into the embedded CSS:

| Viewport | Layout |
|---|---|
| **≥980px** | Each `.feature` is 2-col (`1fr 1.2fr`), 48px padding, 48px gap |
| **640–980px** | `.feature` stacks to 1-col (copy above mockup, even on `.flip`), 24px gap |
| **<640px** | Tightens padding (20px), shrinks H3 (48 → 30px), hides "Deliverables" and "Payout" columns in the campaign table so only Creator + Status + ⋯ show |

---

## Editing copy without breaking layout

Inside `features-section.html`, search for these strings to find the text
you can change:

| What you'd want to edit | Search for |
|---|---|
| Eyebrow text | `Three pillars · One platform` |
| Section title | `Everything you need to` |
| Feature 1 number | `01 · AI Influencer Search` |
| Feature 1 title | `Search the way` |
| Feature 1 body / list | the `<p>` and `<li>` items right under it |
| Feature 1 CTA | `Try AI Search →` |
| Feature 2 number | `02 · Creator Discovery` |
| Feature 2 title | `The world's largest` |
| Feature 3 number | `03 · Campaign Management` |
| Feature 3 title | `From brief to` |
| Campaign rows | `Mara Linde`, `Jonas Becker`, etc. |
| Campaign payouts | `€2,400`, `€1,200`, etc. |
| Campaign totals | `€7,200 ready to pay` |

The CTAs all currently link to `/register` — change `href="/register"` to
your actual signup URL in three places.

---

## Known limitations / things this section can't do via Elementor UI

These pieces are too custom for Elementor's native widgets and will always
need to live in an HTML widget:

1. The **AI Search filter panel mockup** (Feature 1's right side) — too many
   micro-pieces (chip groups, "AI" sparkle markers, the iOS-style toggles
   at the bottom). All in `.v-search`.

2. The **Creator Discovery platform graph + world map** (Feature 2's
   left side, since it's flipped) — uses CSS Grid for the 2×2 platform
   stats and absolute-positioned pins for the map. All in `.v-disc`.

3. The **Campaign Management table** (Feature 3's right side) — 6-column
   CSS Grid with status pills, deliverable tags, currency-formatted
   payouts. All in `.v-camp`.

For the headings, body copy, CTAs, and lists — those CAN be ported to
native Elementor widgets (see `elementor-build-guide.md` Option B). But
the mockups stay HTML islands either way.

---

## Cross-browser

Tested in:
- Chrome / Edge (current)
- Safari 17 (current)
- Firefox (current)
- iOS Safari (iPhone 15)
- Android Chrome

CSS used: Flexbox, CSS Grid, custom properties, `clamp()`, `background-image`
on `<div>`s. Nothing exotic — works in everything from ~2022 onward. No
JavaScript dependencies.

---

## Questions

If you have any issues during the import, the live React source for this
section is at:
`src/app/page.tsx` lines 377–560
`src/app/variation-c.css` (search for `.features`, `.feature`, `.v-search`,
`.v-disc`, `.v-camp`)

Both files in this repo.
