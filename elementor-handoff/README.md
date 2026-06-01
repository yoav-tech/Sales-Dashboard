# IMAI — WordPress Elementor handoff

Two packages in this folder:

- **Full landing page** (`full-landing.*`) — all 12 sections from
  the live site, in one self-contained HTML widget.
- **Features section only** (`features-section.*`) — just the
  "Everything you need to work with creators" section if that's all
  you want.

**Live reference:** https://sales-dashboard-steel-zeta.vercel.app/

---

## TL;DR for the developer

### Full page

```
1. Open the page in Elementor.
2. Page Settings → "Elementor Canvas" template (hides your theme's
   header/footer; the file ships its own sticky nav and footer).
3. Drag an "HTML" widget onto the page.
4. Open full-landing.html, select ALL, copy, paste into the widget.
5. Save. Open the page — entire landing renders.
```

### Features section only

```
1. Edit page in Elementor.
2. Drag an "HTML" widget where the Features section should go.
3. Open features-section.html, copy all, paste in.
4. Save.
```

---

## What's in this folder

| File | Purpose |
|---|---|
| **`full-landing.html`** | ★ Full page in one file. 101 KB. Embedded `<style>` + Google Fonts `<link>` + `<script>` for the 3 interactive bits (hamburger / FAQ / ICP rotator). Paste into ONE Elementor HTML widget. |
| `full-landing.css` | Same CSS as the inline block in `full-landing.html`, broken out. Use this if you'd rather put styles in **Elementor → Site Settings → Custom CSS** and keep the HTML separate. |
| `full-landing.js` | Same JS as the inline `<script>` in `full-landing.html`. Use this if you'd rather upload a `.js` file and enqueue it (e.g. with WP Code or Code Snippets). |
| `features-section.html` | Just the Features section (3 alternating cards with the filter panel / platform graph / campaign table mockups). |
| `features-section.css` | CSS for the Features section, standalone. |
| `elementor-build-guide.md` | Step-by-step build instructions for both options (HTML widget vs native Elementor widgets) for the Features section. |
| `README.md` | This file. |

---

## What the full page contains

12 sections, in order:

| # | Section | Notes |
|---|---|---|
| 1 | **Sticky nav** | Dark pill, logo + 5 nav links + Sign in + Start free CTA + hamburger on mobile |
| 2 | **Hero** | "The #1 influencer marketing platform" + powered by AI + sub + 2 CTAs + 5-face avatar stack |
| 3 | **Logos marquee** | Auto-scrolling brand strip (Lufthansa / CLINIQUE / ESTRID / PRETTYLITTLETHING / SAMSUNG / CATRICE / boohooMAN / Budweiser) |
| 4 | **Inside the product (bento)** | 4 tiles in a 4-col grid: AI Search, 400M+ Database, ROI sparkline, Live Campaign with 4 horizontal stats. AI Search auto-rotates 4 ICPs every 4.2s. |
| 5 | **Problem** | 4 quiet purple-icon cards (Database / Email Outreach / Spreadsheets / Separate Payments) |
| 6 | **Features** | 3 alternating cards: AI Search (filter panel mockup) / Creator Discovery (dark + platform graph + world map) / Campaign Management (SS26 launch table with face avatars) |
| 7 | **How it works** | 4 step cards with portrait images: Search (teal) / Vet (purple) / Activate (ink) / Measure (white) |
| 8 | **Compare table** | IMAI vs Modash / Upfluence / GRIN / CreatorIQ across 9 rows, IMAI column highlighted teal |
| 9 | **Pricing** | 3 tiers: Starter $175 · Growth $349 (popular, dark) · Enterprise custom |
| 10 | **FAQ** | 11 accordion items, first open by default. Click to expand. |
| 11 | **Final CTA** | Purple block with "Stop guessing. Start paying creators who work." + 5-face joined-by stack |
| 12 | **Footer** | 5-col link grid + bottom legal row |

Section IDs (`#features`, `#how`, `#compare`, `#pricing`, `#faq`, `#problem`)
are wired so the nav's smooth-scroll anchors work.

---

## Interactive bits (the JS)

3 vanilla JS interactions, ~150 lines total, no dependencies:

1. **Hamburger menu** — On mobile (≤980px) the nav's `<ul>` is hidden
   and a burger button appears. Click toggles `.menu-open` on the nav,
   which animates the burger into an X and drops the menu sheet under
   the pill. Click outside / press Escape / click a link to close.
   Body scroll-locks while open.

2. **FAQ accordion** — Click any `.faq-q` button to toggle `.open` on
   its parent `.faq-item`. The answer expands via CSS `max-height`
   transition. First item is open by default.

3. **AI Search ICP rotator** — Every 4.2 seconds the hero bento's AI
   Search tile cycles through 4 ICPs (Beauty / Fitness / B2B SaaS / PR
   Agency). The active tab gets a progress-bar fill animation, the
   query line and result cards fade-swap with a stagger.

If you don't want any JS (or want to disable interactions), simply
remove the entire `<script>` block at the bottom of `full-landing.html`
— the page still works, the menu just stays hidden on mobile (visitors
have to use the Start free CTA at top) and the FAQ stays closed.

---

## Brand tokens

These are baked into the CSS as custom properties on `.v-c`. Edit them
once at the top and the whole page retunes.

| Token | Hex | Used for |
|---|---|---|
| `--ink` | `#1d1d1b` | Primary text, borders, dark backgrounds |
| `--ink-muted` | `#444444` | Secondary text |
| `--ink-soft` | `#8f8f8f` | Tertiary / placeholder |
| `--accent` | `#8564ff` | IMAI purple (CTAs, accents on light bg) |
| `--accent-dark` | `#6442dd` | Purple hover |
| `--lime` / `--teal` | `#06c7a9` | IMAI teal (accents on dark bg, status pills, marquee fade) |
| `--bg` | `#ffffff` | Section background |
| `--lavender` | `#eeecff` | Purple tint (problem icons, "vet" how-it-works card) |
| `--mint` | `#e0f8f2` | Teal tint |

## Fonts

Loaded from Google Fonts via the `<link>` at the top:

- **Poppins** 300/400/500/600/700/800/900 — body, headings, list items
- **JetBrains Mono** 400/500/600 — eyebrows, microcopy, monospaced data
- **Bodoni Moda** 400/500/600/700 (regular + italic) — Budweiser
  wordmark, CLINIQUE wordmark

---

## The logo (brand mark)

The IMAI hashtag-logo is rendered as inline SVG (no image files
needed). 4 rounded rectangles forming a `#`:

```svg
<svg class="logo-mark" viewBox="0 0 32 32">
  <rect x="6"    y="2.5"  width="5.5" height="27"  rx="2.75" fill="#f9476c" /> <!-- pink left -->
  <rect x="20.5" y="2.5"  width="5.5" height="27"  rx="2.75" fill="#efcc01" /> <!-- yellow right -->
  <rect x="2.5"  y="9"    width="27"  height="5.5" rx="2.75" fill="#06c7a9" /> <!-- teal top -->
  <rect x="2.5"  y="17.5" width="27"  height="5.5" rx="2.75" fill="#8564ff" /> <!-- purple bottom -->
</svg>
```

It appears twice — top nav and footer. If you ever need to swap the
brand mark, search for `class="logo-mark"` in the HTML and replace both
SVGs.

---

## Image assets

The page references **15 image URLs**, all from the Unsplash CDN.
They're inline `background-image` URLs so no Media Library upload is
strictly required — but if you want to host them yourself, here's the
list:

### Hero avatar stack (5 faces, also reused in Final CTA stack)

| Photo ID |
|---|
| `photo-1494790108377-be9c29b29330` |
| `photo-1500648767791-00dcc994a43e` |
| `photo-1573497019940-1c28c88b4f3e` |
| `photo-1438761681033-6461ffad8d80` |
| `photo-1507003211169-0a1dd7228f2d` |

### Campaign-table avatars (5 creators in Feature 3)

| Creator | Photo ID |
|---|---|
| Mara Linde | `photo-1494790108377-be9c29b29330` |
| Jonas Becker | `photo-1500648767791-00dcc994a43e` |
| Anika Roth | `photo-1438761681033-6461ffad8d80` |
| Lea Vogel | `photo-1573497019940-1c28c88b4f3e` |
| Sofia Kraus | `photo-1531123897727-8f129e1688ce` |

### How-it-works step cards (4 portrait images)

| Step | Photo ID |
|---|---|
| 01 SEARCH | `photo-1573497019940-1c28c88b4f3e` |
| 02 VET | `photo-1554151228-14d9def656e4` |
| 03 ACTIVATE | `photo-1620916566398-39f1143ab7be` |
| 04 MEASURE | `photo-1554224155-6726b3ff858f` |

To swap to your own Media Library uploads, find-and-replace each
`https://images.unsplash.com/photo-...?...` URL in `full-landing.html`
with your `/wp-content/uploads/...` URLs.

---

## Responsive behaviour

Three breakpoints, all baked in:

| Viewport | Layout |
|---|---|
| ≥1080px | Desktop. Bento 4-col, Features 2-col cards, Personas-style grids, 5 nav links inline |
| 980–1080px | Bento collapses to 2-col (AI Search still spans both cols on top row) |
| 640–980px | Most multi-col grids stack to 1-col. Compare table gets horizontal scroll. Sign-in CTA hides; hamburger appears. |
| <640px | Tighter padding, smaller H1, table hides Deliverables + Payout columns, bento becomes pure 1-col stack, nav pill shrinks |

Tested in Chrome / Safari / Firefox (current) + iOS Safari + Android
Chrome. No exotic CSS — uses Flexbox, Grid, custom properties,
`clamp()`, `background-image` masks.

---

## Editing copy safely

Search-and-replace in `full-landing.html`:

| What you'd want to edit | Search for |
|---|---|
| Hero headline | `The <span class="accent">#1</span> influencer` |
| "powered by AI." tag | `>powered by AI.<` |
| Hero sub-copy | `Find, evaluate, and activate creators` |
| Hero "joined this week" | `Joined this week by` |
| Bento heading | `Search, vet, activate, measure` |
| Bento Live Campaign label | `Live campaign · SS26 launch` |
| Problem section title | `The problem with every other` |
| Features section title | `Everything you need to` |
| How section title | `Four steps.` |
| Compare table competitor names | `Modash`, `Upfluence`, `GRIN`, `CreatorIQ` |
| Pricing tier prices | `$175`, `$349`, `Custom` |
| FAQ questions | Any text between `<button class="faq-q">` and `<span class="pl">+</span>` |
| Final CTA | `Stop guessing.` |
| Footer column titles | `<h5>Product</h5>`, `<h5>Resources</h5>` etc. |

CTAs all link to `/register` — find `href="/register"` and replace
with your actual signup URL (appears ~11 times across the page).

---

## What CANNOT be edited via Elementor's native UI

These pieces are too custom for native widgets and will always live
inside the HTML widget:

1. **Hero h1** with the rotated black "platform" pill — uses custom
   transform + inline-block + asymmetric padding
2. **Bento section's 4 tiles** — custom grid spans + the AI Search
   ICP rotator animation
3. **Logo marquee** — CSS keyframe animation + duplicated set + mask
   gradient for the edge fade
4. **AI Search filter panel** (Feature 1) — 4 chip groups with
   AI-flagged subtype + toggle knobs
5. **Discovery platform graph + world map** (Feature 2) — 2×2 grid +
   absolute-positioned pins
6. **Campaign Management table** (Feature 3) — 6-col CSS Grid with
   status pills, face avatars, deliverable tags
7. **Compare table** — sticky teal-highlighted "IMAI" column
8. **Final CTA** — corner-blob decoration with `::before`

Everything else (eyebrows, H2 titles, body paragraphs, button labels,
list items, prices, FAQ questions/answers) is just plain HTML you can
edit inline.

---

## Cross-browser

Tested in:
- Chrome / Edge (current)
- Safari 17 (current)
- Firefox (current)
- iOS Safari (iPhone 15)
- Android Chrome

No JavaScript frameworks. No build step. No external dependencies
beyond Google Fonts (which loads via `<link>`).

---

## Source

The React Next.js source this was extracted from:
- HTML: `src/app/page.tsx`
- CSS: `src/app/variation-c.css`
- Logo SVG: `src/app/LogoMark.tsx`

Same git repo as this file.
