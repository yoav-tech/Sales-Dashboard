# IMAI Features section — Elementor build guide

Two ways to put this section into your WordPress site. Pick one.

---

## Option A — Drop-in HTML widget (recommended, fastest)

**Use when:** you want pixel-perfect parity with the live site and don't need
to edit copy/structure from the Elementor UI.

1. Edit the page in Elementor.
2. Drag an **HTML** widget where the section should go.
3. Open `features-section.html`, copy ALL of it, paste into the widget.
4. Set the parent section's **Layout → Content Width** to **Full Width** (or
   set the section to "Stretch Section" if it's not already full-bleed) — the
   inner `.container` handles its own max-width.
5. Optional: under the section's **Advanced → Spacing**, set Top/Bottom padding
   to `0` since the embedded CSS already adds `112px` top/bottom (`72px` tablet,
   `56px` mobile).
6. Publish.

Editing later:
- Copy text lives in the HTML widget — to change a headline, edit the widget.
- Brand colors live in the `:root`-style block at the top under `.imai-features`
  (`--accent`, `--ink`, `--lime`, etc.).

---

## Option B — Native Elementor widgets + Custom CSS

**Use when:** non-developers will need to edit the section copy from the
Elementor UI, and you accept that the bento/table mockups still need a
small HTML island (they're too custom for native widgets).

### Step 1 — Page setup

Add a new Section, set the section ID to `features` so anchors like
`#features` still scroll here.

### Step 2 — Site-wide Custom CSS

Go to **Elementor → Site Settings → Custom CSS** and paste the contents of
`features-section.css`. (This is just the `<style>` block from the HTML file
extracted; see below.) That way all three feature cards share styles.

### Step 3 — Section head (3 native widgets)

Inside the section, add a Column with these widgets stacked centered:

| Widget | Settings |
|---|---|
| **Heading** | Tag `span`, CSS class `section-eyebrow`, text `Three pillars · One platform`, inner `.dot` for the dot — easier to add as HTML widget instead. |
| **Heading** | Tag `h2`, CSS class `section-title`, text: `Everything you need to <span class="accent">work with creators.</span>` (use the Elementor HTML allowance). |
| **Text Editor** | CSS class `section-sub`, text: `From the first idea to the final invoice — IMAI replaces the spreadsheet, the inbox, and the agency.` |

Then wrap the column in a parent with class `imai-features` (Elementor:
section → Advanced → CSS Classes → `imai-features`).

### Step 4 — Each feature card (3 native columns with HTML islands)

Each `.feature` card has two inner columns: copy on one side, mockup on the
other. The mockup is too custom for native widgets (filter panel, platform
graph, campaign table) so it stays as an HTML island. The copy can be
native.

For each feature (3 total):

1. Add a Section with class `imai-features` (or nest inside the wrapping
   section). Set background, border-radius, padding, gap via the Custom CSS.
2. Inside, add a 2-column row with CSS class `feature` (add `dark flip` for
   Feature 2).
3. **Left column** (`.f-copy`): native widgets
   - Heading widget (tag `div`, class `lab`, text e.g. `01 · AI Influencer Search`)
   - Heading widget (tag `h3`, text `Search the way <span class="accent">you think.</span>`)
   - Text Editor widget (`<p>` body)
   - Icon List widget (3 items, custom marker → use class `f-list` if you don't
     want to use the `→` ::before from the CSS file)
   - Button widget with class `f-link` (text e.g. `Try AI Search →`, link to
     `/register`)
4. **Right column** (`.f-visual`): HTML widget. Paste the corresponding
   `<div class="f-visual v-search">…</div>` (or `v-disc` / `v-camp`) block
   from `features-section.html`.

### Step 5 — Test the responsive

Use Elementor's mobile preview to confirm:
- ≥980px: 2-col layout, mockup beside copy
- 640–980px: stacks (copy above mockup, even on `.flip`)
- <640px: tightens padding, hides Deliverables and Payout columns in the
  campaign table

---

## Native widget mapping cheat sheet

If you absolutely cannot use any HTML islands, here's how each piece would
map — note this loses fidelity on the mockups:

| Design element | Native Elementor widget | Notes |
|---|---|---|
| Section eyebrow pill | HTML or Tag-wrap Heading | Dark pill with green dot — needs the `section-eyebrow` CSS. |
| Big H2 with purple accent word | Heading widget with HTML tags allowed | `<span class="accent">…</span>` in title field. |
| Section sub paragraph | Text Editor | Apply `section-sub` class. |
| Feature card frame | Section / Inner Section / Container | 1.5px ink border, 28px radius, 48px padding, 24px gap. |
| Feature copy block | Column with stacked widgets | See Step 4 above. |
| Feature CTA chip | Button | Class `f-link`. Style with the included CSS, or use Elementor's button styling and target class `.imai-features .f-link`. |
| AI Search filter panel mockup | **HTML widget only** | Too many micro-elements (chips, toggles, AI sparkle markers) to recreate natively. |
| Discovery platform graph + map | **HTML widget only** | Custom grid + pin positioning via inline `style="left:18%;top:32%"`. |
| Campaign Management table | **HTML widget only** | 6-col CSS grid with status pills, avatars, deliverable tags. |

---

## Brand tokens (paste into Elementor Site Settings → Global Colors if you want)

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#1d1d1b` | Primary text & borders |
| `--ink-muted` | `#444444` | Secondary text |
| `--ink-soft` | `#8f8f8f` | Tertiary / placeholder |
| `--accent` | `#8564ff` | Primary brand (purple) |
| `--lime` / `--teal` | `#06c7a9` | Accent secondary (teal) |
| `--bg` | `#ffffff` | Section background |
| `--line` | `#ececec` | Hairline borders |

**Fonts:** Poppins (400/500/600/700/800) for everything; JetBrains Mono
(500/600) for eyebrows + mono microcopy. Already loaded via the `<link>` at
the top of `features-section.html`.

---

## What you can edit safely after install

In the HTML widget you can change:
- Any text inside the cards (headlines, body, list items, CTA labels)
- The 5 Unsplash face URLs in the campaign table (`background-image:url(...)`)
  — swap to your Media Library uploads
- The `href` on each `.f-link` CTA (currently `/register`)

Don't change without updating the matching CSS:
- Any `class=` value
- The `.feature.dark` / `.feature.flip` modifier classes (they control color
  and which side the copy appears on)
- The 6-column `.cm-row` grid template (alignment depends on column count)

---

## Live reference

Look at how this currently behaves at:
**[sales-dashboard-steel-zeta.vercel.app/#features](https://sales-dashboard-steel-zeta.vercel.app/#features)**

Anchor `#features` jumps right to this section.
