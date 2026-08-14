# Full Website Content Audit — PAS & AIDA

**Site:** InfluencerMarketing.ai (IMAI)
**Audit date:** 14 August 2026
**Scope:** 27 pages — every `<title>`, every `<meta name="description">`, every H1/H2/H3/H4, every eyebrow and every CTA.
**Frameworks:** PAS (Problem → Agitate → Solution) and AIDA (Attention → Interest → Desire → Action).

**Source of truth:**
- Body copy and headlines: `site/*.html` + 4 onboarding pages at repo root.
- Titles and meta descriptions: the `S={...}` SEO map in `build_site.py` (lines 43–99). `public/` is generated output — **do not edit `public/` directly**, it is wiped and rebuilt by `build_site.py`.

---

## Executive summary

The copy on this site is **better than most B2B SaaS**. Sixteen of 27 pages already run a disciplined, near-textbook PAS structure, and the agitate copy is specific and human ("A creator says yes in a DM you never see again"). Headline voice is consistent, concrete and benefit-led. That is the good news, and it is not a small thing.

The problems are not in the writing. They are in three places:

1. **Five factual contradictions that break the AIDA "Action" step.** The site promises a 7-day trial on some pages and 14-day on others; promises "no card required" on 18 pages and then asks for card details; quotes 400M+ creators in every meta description and 412M+ in the homepage hero; and is actively selling a webinar that happened 29 days ago. These are conversion defects, not style notes.
2. **The meta layer does zero PAS work.** All 27 descriptions are pure Solution — feature lists with no Problem and no Agitate. The SERP snippet is the highest-leverage PAS surface a site owns, and it is being used as a spec sheet. Five descriptions also overflow and truncate, and two of them lose their strongest hook in the cut.
3. **Eleven pages have no Problem/Agitate section at all** — including `platform`, `solutions`, `pricing`, `customers` and all four onboarding pages. These are pure Solution pages. `customers.html`, which should be the Desire engine of the whole site, has exactly two headlines.

Fix the five contradictions first. They cost money today and take an hour.

---

## Severity key

| | Meaning |
|---|---|
| **P0** | Factually wrong or self-contradictory. Costs conversions now. |
| **P1** | Framework gap with direct revenue impact. |
| **P2** | Framework gap, meaningful lift, not urgent. |
| **P3** | Polish. |

---

# Part 1 — Critical defects (P0)

These five are not opinions. Each is verifiable in the source and each breaks AIDA at the Action step, where it is most expensive.

## 1.1 — The trial length contradicts itself across the funnel

The site cannot decide whether the trial is 7 or 14 days, and the contradiction lands hardest on the payment page itself.

| Location | Claim |
|---|---|
| `build_site.py:53` (pricing meta) | **14-day** free trial |
| `build_site.py:79` (smb meta) | **7-day** free trial |
| `build_site.py:95` (payment title/desc) | **7-Day** trial |
| `payment.html:6` `<title>` | **7-day** free trial |
| `payment.html` `<h1>` | activate your **14-day** trial |
| `site/smb.html:28, 38, 39, 57` | **7-day** (hero, ticks, stat, FAQ) |
| `site/smb.html:38` timeline | "Day 5 — full access", "**Day 7** — you stay in control" |
| `site/solutions.html:94` | **7-day** free trial |
| `site/pricing.html:1501` | **14-day** free trial |
| `site/ecommerce.html:60`, `site/ugc.html:7`, `register.html:46` | **14 day** |

**Worst case:** `payment.html` — the final step before payment — has `7-day` in its own `<title>` and `14-day` in its own `<h1>`. A prospect arriving from `/solutions/smb` (which says 7-day four times, with a Day-5/Day-7 timeline) sees a browser tab saying 7 and a headline saying 14.

**AIDA impact:** Action. This is the last thing a buyer reads before entering a card. Contradiction here reads as bait-and-switch.

**Fix:** Pick one number. Propagate to all 11 locations. If SMB genuinely has a different trial to other plans, say so explicitly ("7 days on Starter, 14 on Growth and above") rather than letting two numbers float unlabelled.

## 1.2 — "No card required" is promised on 18 pages, then contradicted at checkout

Eighteen pages carry the phrase **"no card required"** (or "no credit card"): `agencies`, `ai-agents`, `campaign-management`, `competitive-intelligence`, `consumer-intelligence`, `creator-payouts`, `discovery`, `ecommerce`, `enterprise`, `index`, `influencer-crm`, `llm-visibility`, `pr`, `pricing`, `smb` (×4), `solutions`, `tracking-roi`, `ugc`.

`payment.html` H1: **"Enter card details to activate your 14-day trial"**

**AIDA impact:** Action, catastrophically. The single most repeated risk-reversal on the site is revoked at the moment of commitment. Worse, the H1 leads with the *friction* ("Enter card details") instead of the *reward* — a textbook conversion anti-pattern. The CTA below it ("Pay $0 and start your 14-day trial") does this correctly; the H1 does not.

**Fix (two options):**
- If a card **is** required: remove "no card required" from all 18 pages. It is a false promise.
- If a card **is not** required: this page is mislabelled — reframe as an optional upgrade step.
- Either way, rewrite the H1 to lead with reward: **"Start your 14-day trial. You won't be charged today."** with card entry as the mechanism beneath, not the headline.

## 1.3 — The webinar page is selling an event that already happened

Today is **14 August 2026**. The event is dated **Thursday, 16 July 2026** — **29 days in the past**.

Every urgency device on the page now points backwards:

| Location | Content | Problem |
|---|---|---|
| `site/webinars.html:132, 238` | "Thursday, July 16, 2026 · 11:00 AM ET" | Past |
| `site/webinars.html:237` | **"Doors open in 29 days."** | Hardcoded countdown, now exactly inverted — it is 29 days *since* |
| `site/webinars.html:238` | "Grab your seat before it fills." | Dead urgency |
| `site/webinars.html` hero | "218 seats left" | Hardcoded scarcity on a finished event |
| `site/webinars.html:250` | "See you on July 16." | Confirmation state promises a past date |
| `site/webinars.html:308` | schema `2026-07-16` | Google may show an expired event |
| `build_site.py:61` | meta: "Thursday, July 16, 2026" | Stale date in SERP |

**AIDA impact:** Desire and Action both. Scarcity and countdown *are* the Desire→Action engine on a webinar page. Here they are the proof the page is abandoned. A visitor who does the arithmetic learns the company does not maintain its own site.

**Fix:** Either reschedule (new date, recomputed countdown, reset seat count, updated schema and meta) or convert the page to on-demand replay — the page already has a "Recent sessions, ready when you are" section that would carry it. **The countdown and seat count must be computed at build time from the event date, not hardcoded**, or this recurs every cycle.

## 1.4 — The creator-count number contradicts itself, including within the homepage

**400M+** appears ~90 times across every page and every meta description. **412M+** appears in six places:

| Location | Claim |
|---|---|
| `site/index.html:150` | "Natural-language search across **412M+** creators" |
| `site/index.html:157` | "AI search · **412M** creators" |
| `site/index.html:246` | "Plain-English search across **412M** creators" |
| `site/pricing.html:8` + `:1501` | "Full **412M+** creator database" |
| `build_site.py:53` (pricing meta) | "Full **412M+** creator database" |
| `build_site.py:93` (register meta) | "full access to **412M+** creators" |

The homepage's own meta description says **400M+** while its hero proof-point says **412M+**.

**AIDA impact:** Interest and Desire. This is the site's single most-repeated credibility number. Two versions of it means neither is trusted. Note `find-influencers.html` breaks down as 218M + 112M + 58M = 388M across three platforms — coherent with 400M+, less so with 412M+.

**Fix:** Pick one, propagate everywhere. If the database genuinely grew from 400M to 412M, update all ~90 instances — a stale number repeated 90 times is worse than a new number stated once.

## 1.5 — Five meta descriptions truncate, two lose their strongest hook

Google truncates around 155–160 characters. What gets cut:

| Page | Len | Text lost in truncation |
|---|---|---|
| `webinars.html` | 195 | "hursday, July 16, 2026. Replay included." |
| `pricing.html` | 181 | "y plan. **14-day free trial.**" ← the Action hook |
| `index.html` | 174 | "s and **provable ROI**." ← the strongest Desire hook |
| `find-influencers.html` | 162 | "safety." |
| `solutions.html` | 159 | "nts." |

`index.html` is the worst: the homepage description spends 155 characters listing features and gets cut immediately before "provable ROI" — the one phrase that differentiates IMAI from a database vendor. `pricing.html` loses its risk-reversal.

**Fix:** Rewrite to ≤155 with the payoff front-loaded. Rewrites in Part 2.

---

# Part 2 — Meta layer audit (all 27 titles + descriptions)

**The systemic finding:** all 27 descriptions are **Solution-only**. Not one opens with a Problem or an Agitate. Every one reads as a feature manifest.

This is the biggest single missed opportunity on the site, because the SERP snippet is where PAS pays best — you are competing for a click against nine other results, and "here is what we do" loses to "here is what is going wrong for you."

The irony: **the pages themselves already contain excellent problem statements.** `tracking-roi.html` opens with *"'It went well.' Prove it."* — and its meta description says *"Measure influencer ROI with sales attribution via SDK, UTMs and discount codes."* The PAS hook was already written. It just never made it into the meta layer.

Titles are mostly solid for SEO head terms but are category labels with no Attention value. Recommendation below keeps the head keyword and adds tension where the character budget allows.

### Rewrite table

Format: **C** = current, **R** = recommended. Lengths in brackets.

---

**`index.html`** — Home
- **C title** [57]: "InfluencerMarketing.ai — AI Influencer Marketing Platform"
- **R title** [51]: "InfluencerMarketing.ai — AI Platform That Proves ROI"
- **C desc** [174, truncates]: "Discover, vet, activate and pay creators from 400M+ profiles — one AI platform for influencer search, fraud detection, campaigns, payouts in 135+ currencies and provable ROI."
- **R desc** [146]: "Most influencer spend can't be traced to revenue. Discover, vet, activate and pay creators from 400M+ profiles — and prove every dollar back."
- *PAS: opens on Problem, closes on Solution + Desire. Fits without truncation.*

**`platform.html`** — Platform
- **C title** [43]: "Platform — AI Influencer Marketing Software"
- **R title** [52]: "Influencer Marketing Software — One Connected Platform"
- **C desc** [154]: "Creator discovery, influencer CRM, campaign management, ROI tracking and global payouts — the complete AI platform to run influencer marketing end to end."
- **R desc** [150]: "Stop stitching together a database, an inbox, a spreadsheet and a payments app. Discovery, CRM, campaigns, ROI and payouts — one connected platform."
- *Reuses the page's own excellent hero deck, which already states the problem.*

**`solutions.html`** — Solutions
- **C title** [51]: "Solutions for Enterprise, Agencies, SMB & Ecommerce"
- **R title** [51]: "Solutions for Enterprise, Agencies, SMB & Ecommerce" *(keep — strong keyword coverage)*
- **C desc** [159, truncates]: "One AI platform for enterprise, agencies, SMBs and ecommerce — across influencer marketing, PR, UGC video, consumer intelligence, LLM visibility and AI agents."
- **R desc** [147]: "Every team buys its own tool and none of them share data. One AI platform for enterprise, agencies, SMBs and ecommerce — six workspaces, one login."

**`pricing.html`** — Pricing
- **C title** [58]: "Pricing — Influencer Marketing Plans for Brands & Agencies"
- **R title** [58]: *keep — good keyword coverage, within budget*
- **C desc** [181, truncates, wrong number]: "Flexible influencer marketing pricing: Personal $129, Starter $299, Growth $499, Scale $1,200/mo and custom Enterprise. Full 412M+ creator database on every plan. 14-day free trial."
- **R desc** [136]: "Full 400M+ creator database on every plan. Personal $129, Starter $299, Growth $499, Scale $1,200/mo. 14-day trial, no credit card."
- *Fixes the 412M error (1.4), and saves "14-day trial" from truncation (1.5).*

**`customers.html`** — Customers
- **C title** [31]: "Customer Stories & Case Studies" — generic, no brand, no keyword, no tension
- **R title** [49]: "Customer Stories — Proven Influencer Marketing ROI"
- **C desc** [133]: "See how 1,000+ brands and agencies — including Estée Lauder, Samsung and Playtika — drive measurable ROI with InfluencerMarketing.ai."
- **R desc** [141]: "Most teams can't prove influencer ROI. See how Estée Lauder, Samsung, Playtika and 1,000+ brands turned creator spend into attributed revenue."

**`about.html`** — About
- **C title** [28]: "About InfluencerMarketing.ai"
- **R title** [48]: "About InfluencerMarketing.ai — Our Mission & Team"
- **C desc** [120]: "The AI platform helping 1,000+ brands discover, vet, activate and pay creators from 400M+ profiles across 50+ countries."
- **R desc** [146]: "Influencer marketing ran on spreadsheets and gut feel. We built the AI platform that helps 1,000+ brands prove what creator spend actually returns."

**`find-influencers.html`**
- **C title** [40]: "Find Influencers — Search 400M+ Creators"
- **R title** [40]: *keep*
- **C desc** [162, truncates]: "Search 400M+ influencers across Instagram, TikTok, YouTube and X by niche, location, audience and engagement. Vet any creator for fake followers and brand safety."
- **R desc** [137]: "Follower counts don't tell you who converts. Search 400M+ creators on Instagram, TikTok, YouTube and X — and vet every audience for fakes."

**`webinars.html`** — ⚠️ blocked on defect 1.3; rewrite assumes a new date
- **C title** [45]: "Live Webinar — Proving Influencer ROI in 2026"
- **R title** [47]: "Live Webinar — Prove Influencer ROI to Your CFO"
- **C desc** [195, truncates, dead date]
- **R desc** [148]: "Finance doesn't trust EMV. Free live webinar: turn 400M+ creators into attributed revenue — AI discovery, vetting and a client-ready ROI dashboard."
- *Move the date out of the meta entirely — it is what makes this description go stale. Let the event schema carry the date.*

**`discovery.html`**
- **C title** [47]: "AI Creator Discovery — Search 400M+ Influencers" — *keep*
- **C desc** [156]: "Find and vet creators with natural-language AI search across 400M+ Instagram, TikTok, YouTube and X profiles, with fake-follower and brand-safety screening."
- **R desc** [142]: "Boolean filters surface the obvious accounts, not the ones that fit. Describe your creator in plain English and AI ranks 400M+ vetted matches."

**`influencer-crm.html`**
- **C title** [37]: "Influencer CRM & AI Outreach Software" — *keep*
- **C desc** [157]: "Manage every creator, message and deliverable in one pipeline with AI outreach and automatic follow-ups — a 62% average reply rate, 3.1× the manual baseline."
- **R desc** [150]: "Your pipeline lives in 15 open inboxes. Move every creator, message and deliverable into one pipeline — AI outreach, auto follow-ups, 62% reply rate."
- *Keeps the 62% proof point, which is the strongest number in the whole meta layer.*

**`campaign-management.html`**
- **C title** [39]: "Influencer Campaign Management Software" — *keep*
- **C desc** [143]: "Run influencer campaigns from brief to bank transfer — contracts, e-sign, content approval and payouts in 135+ currencies, all in one platform."
- **R desc** [152]: "One campaign, six disconnected tools — every handoff a dropped ball. Run brief to bank transfer in one place: contracts, e-sign, approvals, payouts."

**`tracking-roi.html`**
- **C title** [47]: "Influencer Marketing ROI Tracking & Attribution" — *keep*
- **C desc** [154]: "Measure influencer ROI with sales attribution via SDK, UTMs and discount codes. Roll up EMV, GMV, CAC and ROAS by creator, campaign or brand in real time."
- **R desc** [138]: "\"It went well\" isn't a number finance trusts. Attribute sales via SDK, UTMs and codes, then roll up EMV, GMV, CAC and ROAS in real time."
- *Lifts the page's own H2 into the SERP. Best PAS opportunity on the site.*

**`creator-payouts.html`**
- **C title** [34]: "Creator Payouts in 135+ Currencies" — *keep*
- **C desc** [157]: "Pay influencers in 135+ currencies across 100+ countries, with tax forms, VAT/GST and conversion handled automatically — batch a whole campaign in one click."
- **R desc** [148]: "Cross-border creator payments mean wires, tax forms and currency math. Pay in 135+ currencies across 100+ countries — VAT, 1099s and FX automated."

**`competitive-intelligence.html`**
- **C title** [49]: "Competitive Intelligence for Influencer Marketing" — *keep*
- **C desc** [146]: "Track competitor creator strategies, brand mentions and share of voice in real time — and see exactly which creators are driving the conversation."
- **R desc** [150]: "You find out about a competitor's winning play after it worked. Track their creators, mentions and share of voice live — and see who drove each spike."

**`enterprise.html`**
- **C title** [40]: "Enterprise Influencer Marketing Platform" — *keep*
- **C desc** [148]: "Consolidate influencer, PR, UGC and consumer intelligence into one governed platform with SSO, SOC 2 Type II, role-based access and a dedicated CSM."
- **R desc** [144]: "Five tools, five logins, zero governance. Consolidate influencer, PR, UGC and consumer intelligence into one platform — SSO, SOC 2 Type II, RBAC."

**`agencies.html`**
- **C title** [54]: "White-Label Influencer Marketing Platform for Agencies" — *keep, strong*
- **C desc** [158]: "Launch your own branded influencer platform — your logo, domain and colors. Manage every client, service and payout from one login, with client-ready reports."
- **R desc** [150]: "Manual reporting caps how many clients each strategist can carry. Launch your own branded platform — your logo, domain, colors, one login for all."

**`smb.html`** — ⚠️ trial length blocked on defect 1.1
- **C title** [40]: "Influencer Marketing for SMBs & Startups" — *keep*
- **C desc** [156]: "Launch influencer campaigns in minutes. Find vetted creators, run campaigns, see sales by creator and automate payouts — 7-day free trial, no card required."
- **R desc** [145]: "No media buyer, no agency, no spreadsheet wizard. Find vetted creators, launch campaigns and automate payouts in minutes — free trial, no card."
- *Trial length deliberately omitted until 1.1 is resolved; re-insert the agreed number.*

**`ecommerce.html`**
- **C title** [44]: "Influencer Marketing for Ecommerce & Shopify" — *keep*
- **C desc** [141]: "Find creators that convert, attribute Shopify GMV per creator, and produce UGC video ads at scale. Tie every influencer post to real revenue."
- **R desc** [135]: "Big followings, tiny carts. Find creators by conversion history, attribute Shopify GMV per creator, and produce UGC video ads at scale."

**`ugc.html`**
- **C title** [40]: "UGC Video Ads at Scale — AI Avatar Video" — *keep*
- **C desc** [158]: "Source creators and produce UGC video ads — including AI avatar video in 40+ languages — with usage rights and whitelisting handled. Brief to live in 14 days."
- **R desc** [146]: "Your best ad dies in two weeks. Produce UGC and AI avatar video in 40+ languages, rights and whitelisting handled — brief to live in 14 days."

**`pr.html`**
- **C title** [46]: "AI PR & Media Outreach — Pitch 1M+ Journalists" — *keep, strong*
- **C desc** [148]: "Pitch 1M+ verified journalists with AI, track coverage and EMV, and target the outlets AI answers cite. PR and influencer marketing in one platform."
- **R desc** [141]: "Great stories, pitched into the void. Pitch 1M+ verified journalists with AI, track coverage and EMV, and target the outlets AI answers cite."

**`consumer-intelligence.html`**
- **C title** [40]: "Consumer Intelligence & Social Listening" — *keep*
- **C desc** [151]: "Monitor 2T+ conversations across social, surface trends and sentiment in real time, and activate the creators driving them — listening plus activation."
- **R desc** [149]: "Most listening tools show you the spike but can't act on it. Monitor 2T+ conversations, surface trends live, then activate the creators driving them."

**`llm-visibility.html`**
- **C title** [46]: "LLM Visibility — Track Your Brand in AI Search" — *keep*
- **C desc** [143]: "See and shape how ChatGPT, Perplexity and Google AI Overviews describe your brand. Track AI share of voice and influence the sources they cite."
- **R desc** [152]: "Your buyers ask AI about your category. See how ChatGPT, Perplexity and AI Overviews describe you, track AI share of voice, shape the sources cited."

**`ai-agents.html`**
- **C title** [36]: "AI Voice & Chat Agents for Marketing" — *keep*
- **C desc** [117, under-used]: "Deploy AI agents that qualify leads, book meetings and support customers 24/7 — on-brand, multilingual and always on."
- **R desc** [148]: "Every question unanswered after 6pm is a sale your competitor wins. Deploy AI voice and chat agents that qualify, book and support 24/7, on-brand."

### Onboarding meta (noindex — titles still show in the browser tab)

**`register.html`** — C title [46] "Start Your Free Trial — InfluencerMarketing.ai" — good. Desc contains the **412M+** error (defect 1.4) → change to 400M+.

**`personalize.html`** — C title [26] "Personalize Your Workspace"; desc [45] "Tailor your InfluencerMarketing.ai workspace." Functional but does no Desire work at a drop-off point. **R desc:** "Two minutes of setup so your first creator shortlist is ready when you land."

**`payment.html`** — ⚠️ **P0.** C title [22] "Start Your 7-Day Trial" **contradicts the page's own H1 (14-day)**. Must be reconciled per 1.1.

**`setup.html`** — C title [21] "Set Up Your Workspace". The page's H1 — "We already started working." — is far stronger and should be echoed. **R title:** "Your Workspace Is Already Working"

---

# Part 3 — Page-by-page headline audit

## 3.1 — The 15 templated PAS pages

`agencies`, `ai-agents`, `campaign-management`, `competitive-intelligence`, `consumer-intelligence`, `creator-payouts`, `discovery`, `ecommerce`, `enterprise`, `influencer-crm`, `llm-visibility`, `pr`, `smb`, `tracking-roi`, `ugc`

**Shared structure — and it is genuinely good:**

```
H1                 → Attention + promise
hero deck          → Interest
H2 problem         → PAS: Problem
3 × H3 cards       → PAS: Agitate
2–3 × H3 splits    → PAS: Solution
H2 + 4 × H4 steps  → Desire (mechanism / believability)
H2 cross-links     → Desire (expansion)
H2 "Questions & answers." → objection handling
H2 final CTA       → Action
```

**PAS: A−. AIDA: B.** PAS is close to model. AIDA loses points only at Action.

### Individual page notes

**`discovery.html`** — Best-executed page on the site. "The right creator is in there. Finding them isn't." is a superb Problem line. Agitate trio ("Boolean filter hell" / "Followers ≠ fit" / "Siloed by platform") is specific and lands. **PAS: A. AIDA: A−.** No changes needed beyond the shared CTA note.

**`tracking-roi.html`** — "'It went well.' Prove it." is the single best headline on the site. Agitate is excellent ("EMV guesswork that leadership rightly doesn't trust"). **PAS: A. AIDA: A−.** Only issue: this quality never reaches the meta layer (Part 2).

**`influencer-crm.html`** — "Your pipeline lives in 15 open inboxes." — concrete, visual, specific number. "A creator says yes in a DM you never see again" is the best agitate line in the whole site. **PAS: A. AIDA: A−.**

**`creator-payouts.html`** — H2 "You found them and briefed them. Now pay them." is a *sequence* line, not a Problem line — it states a task, not a pain. Weaker than peers. **Rec:** "The campaign is done. The payments are a month of admin." **PAS: B+. AIDA: B.**

**`ecommerce.html`** — "Reach is nice. Revenue pays the bills." Strong. Uniquely has a *third* solution split (creative engine), which is correct — ecommerce has three distinct pains. **PAS: A. AIDA: A−.**

**`ugc.html`** — "Paid social is hungry. Creative can't keep up." Excellent, and "Your best ad dies in two weeks" is a top-3 agitate line. **PAS: A. AIDA: B+** — final CTA is the weak "Ready to put UGC Video Ads on IMAI?".

**`enterprise.html`** — "Five tools, five logins, zero control." Rhythmically strong. H1 "Six workspaces. One login." is a *solution* in the Attention slot; that works here because the contrast is the hook. **PAS: A−. AIDA: B+.**

**`agencies.html`** — "You sell the work. Spreadsheets sell you out." Best wordplay on the site. **PAS: A. AIDA: B+.** Note: "front and centre" (British) vs American spelling everywhere else — inconsistent. **P3.**

**`smb.html`** — "Big-team results without the big team." Good. Agitate is well targeted. ⚠️ Carries the 7-day trial claim in 4 places plus a Day-5/Day-7 timeline (defect 1.1). **PAS: A−. AIDA: C** — downgraded purely for the trial contradiction, which lands on the page where self-serve conversion actually happens.

**`pr.html`** — "Great stories, pitched into the void." Strong. "Contacts who moved on two beats ago" is precise, insider-credible. **PAS: A. AIDA: A−.**

**`competitive-intelligence.html`** — "Your competitors are moving. You're guessing." Strong. But H1 "See how you stack up." is notably weaker than the H2 — the better hook is in the second position. **Rec H1:** "Know their next move before it lands." **PAS: A−. AIDA: B.**

**`consumer-intelligence.html`** — "Listening tools that can't act." is a sharp category-competitor jab. **PAS: A. AIDA: B+.**

**`llm-visibility.html`** — "Your buyers ask AI. What does it say?" — the only H2 on the site that uses a question, and it earns it. **PAS: A. AIDA: B+.**

**`ai-agents.html`** — "Leads don't wait for business hours." Good. Sub "Every unanswered question after 6pm is a sale your competitor answers first" is stronger than the H2 itself. **Rec:** promote the sub to H2. **PAS: A−. AIDA: B.**

**`campaign-management.html`** — "One campaign, six disconnected tools." Strong, and the H1 "From brief to bank transfer." is memorable enough to be reused on `index` and `platform` (correctly). **PAS: A. AIDA: A−.**

### Two shared defects across all 15

**(a) The final CTA headline is a mail-merge. — P1**

Nine pages end with a templated Action headline with the page name slotted in:

> "Ready to put **Agencies** on IMAI?"
> "Ready to put **AI Agents** on IMAI?"
> "Ready to put **Enterprise** on IMAI?"
> "Ready to put **Consumer Intelligence** on IMAI?"
> "Ready to put **LLM Visibility** on IMAI?"
> "Ready to put **Ecommerce** on IMAI?"
> "Ready to put **SMB & startups** on IMAI?"
> "Ready to put **UGC Video Ads** on IMAI?"
> "Ready to put **PR & Media** on IMAI?"

The six platform pages use a better variant ("See Campaign Management in action.") but it is still a label, not a close.

This is the **most important Action headline on each page** and it is doing no work. It is product-centric ("put X on IMAI" is a phrase no buyer would use), grammatically awkward with plural nouns, and identical across nine pages.

Compare `index.html`, which gets this right: **"Stop guessing. Start paying creators who work."** — that is a real close, and the template should follow its lead: restate the resolved pain in the imperative.

**Recommended, per page:**

| Page | Recommended final CTA headline |
|---|---|
| `agencies` | Stop rebuilding decks. Start winning renewals. |
| `ai-agents` | Stop losing leads to your own business hours. |
| `campaign-management` | One campaign. One board. Zero dropped balls. |
| `competitive-intelligence` | Stop finding out second. |
| `consumer-intelligence` | Stop watching the spike. Start riding it. |
| `creator-payouts` | Pay every creator today, in their currency. |
| `discovery` | Stop scrolling filters. Start describing. |
| `ecommerce` | Stop buying reach. Start buying revenue. |
| `enterprise` | Six tools, one contract, one number to own. |
| `influencer-crm` | Close the inboxes. Open the pipeline. |
| `llm-visibility` | Find out what AI says about you. |
| `pr` | Stop pitching into the void. |
| `smb` | Launch your first campaign this afternoon. |
| `tracking-roi` | Bring finance a number they'll believe. |
| `ugc` | Never run out of creative again. |

**(b) The Action path is inconsistent across pages. — P1**

Four solution pages (`ai-agents`, `consumer-intelligence`, `llm-visibility`, `ugc`) end with **"Book a demo" + "See pricing"**. The other eleven end with **"Start free trial" + "Book a demo"**.

But all four of those pages *also* carry "Start free trial" in the hero and "no card required" in the trust bar. So the page opens by offering a trial and closes by withholding it, sending the highest-intent visitor to a pricing table instead.

Either these four products genuinely have no self-serve trial — in which case remove the trial CTA and the "no card required" line from their heroes — or they do, in which case the final CTA should match the other eleven. Right now the page argues with itself.

## 3.2 — Pages with **no** Problem/Agitate section — P1

Eleven pages skip straight to Solution. They are not bad pages; they are half-built ones.

**`platform.html`** — **PAS: D. AIDA: C.**
The hero deck contains a genuine problem statement — *"Stop stitching together a database, an inbox, a spreadsheet and a payments tool"* — and then the page never agitates it. It goes directly into a feature list (six capability H3s, then six more "AI that does the heavy lifting" H3s). Structurally it is a spec sheet with a good opening line.
Also: the first H2 is "Pay creators in 135+ currencies." — a *single feature* occupying the most prominent section headline on the whole-platform page. That is a hierarchy error; payouts are one of six capabilities.
**Rec:** Insert a Problem/Agitate section after the hero, reusing the four agitate cards `index.html` already has (Databases / Email inboxes / Spreadsheets / Separate payments) — they were written for exactly this argument. Then demote the payouts H2 to peer level with the other capabilities.

**`solutions.html`** — **PAS: C. AIDA: C+.**
Four solution H3s lifted verbatim from the child pages, then the expansion grid. No problem framing at all. The child pages each have a strong Problem line; this page has none.
**Rec:** Add an H2 before the four cards along the lines of *"Every team ends up buying its own tool."* with three agitate cards (fragmented data / duplicated spend / no shared creator graph) — the enterprise page's agitate copy adapts directly.

**`find-influencers.html`** — **PAS: C+. AIDA: B−.**
Excellent Interest and Desire content (per-platform breakdowns with real numbers, "Quality you can score"). But H2 "One database, every network." is a Solution in the Problem slot. The page never says why finding influencers is hard today.
**Rec:** Add a Problem line before the platform grid: *"Six networks, six tools, six shortlists that never talk."*

**`pricing.html`** — **PAS: C. AIDA: B.**
H1 "Pricing that scales with you." is generic. The comparison table ("IMAI vs. the rest.") does real PAS work implicitly — that is the page's strength — but there is no explicit Problem. Also carries the 412M+ error (1.4).
**Rec:** Lead with the cost-of-the-status-quo: *"Cheaper than the four tools it replaces."* — a Problem framing that is also a pricing argument.

**`customers.html`** — **PAS: F. AIDA: D.** ⚠️ **Biggest structural gap on the site.**
This page has **two headlines total**: "Real results from real campaigns." and "Ready to replicate these results?" That is it.
Customer proof is the **Desire** engine of the entire funnel — it is where a skeptical buyer goes to be convinced, and every other page routes here. Two headlines and a logo wall cannot carry that.
**Rec (highest-ROI content investment on the site):** rebuild as PAS-per-case-study. For each of Estée Lauder / Samsung / Playtika: what was broken before → what it cost → what changed → the number. Add H2s that state outcomes, not labels: *"Estée Lauder cut creator vetting from 3 weeks to 2 days."* Right now the page asserts results without narrating them.

**`about.html`** — **PAS: D+. AIDA: C.**
"AI does the heavy lifting — people make the calls." is a good line. The values trio (Transparency / Partnership / Outcomes) is generic and interchangeable with any SaaS about page. No problem framing — though on an about page that is a softer requirement.
**Rec:** Open on the founding problem: *"Influencer marketing ran on spreadsheets and gut feel. We thought that was absurd."* Values H3s should carry a claim, not a noun — "Transparency" → "Real audience data, or we don't show it."

**`webinars.html`** — **PAS: B. AIDA: F (blocked by defect 1.3).**
Content structure is strong: "Four things you'll walk away able to do" is well-built Desire, and audience segmentation ("Built for the people running the campaigns") is good targeting. But the Problem is only implied, and every Action element is pointing at a dead date. Once rescheduled: **PAS B, AIDA B+.**
**Rec:** Add an explicit Problem H2 before "Four things": *"Your CFO doesn't accept EMV as a number."*

### The four onboarding pages — **PAS: F. AIDA: D.** — P1

`register` · `personalize` · `payment` · `setup`

These are the **highest-drop-off pages on the site** and they carry the least persuasion. Headlines: "Create your account" / "Get started" / "Tell us how you work." / "Enter card details to activate your 14-day trial" / "We already started working."

AIDA does not stop at the signup form. Desire has to be *maintained* through the funnel, especially where friction increases.

| Page | Current | Problem | Recommended |
|---|---|---|---|
| `register` | "Create your account" / "Get started" | Zero Desire reinforcement. Pure mechanics. | "Start finding creators in the next five minutes." |
| `personalize` | "Tell us how you work." | Asks for effort, promises nothing in return. | "Tell us how you work — we'll pre-build your first search." |
| `payment` | "Enter card details to activate your 14-day trial" | ⚠️ P0. Leads with friction; contradicts its own title (7-day) and 18 pages of "no card required". | "Start your 14-day trial. You won't be charged today." |
| `setup` | "We already started working." | Actually **good** — the strongest onboarding line. But the `<title>` ("Set Up Your Workspace") throws the payoff away. | Keep H1; align title to match. |

`setup.html` is the model here: "We already started working." delivers Desire at the exact moment a new user is deciding whether this was worth it. The other three should follow it.

## 3.3 — Repeated section furniture — P2/P3

| Headline | Pages | Assessment |
|---|---|---|
| "Questions & answers." | 17 | **P2.** FAQ is the objection-handling step — the last chance to resolve Problem before Action. A neutral label wastes it. Rec: "Still deciding?" or "The things people ask before they start." |
| "Expand without adding tools." | 10 | **P3.** Actually good — it is a benefit, not a label. Keep. |
| "It all connects." | 6 | **P3.** Vague. Rec: "Works with the rest of your stack." |
| "By team" / "By workspace" | all | Nav furniture. Fine. |
| "SOC 2 Type II / GDPR / G2 Leader" | all | Good trust signals, correctly placed in the Action zone. Keep. |

## 3.4 — CTA button inventory — P2

- **"Start free trial"** — dominant, appears 3–5× per page. Correct primary. But identical wording every time; the final CTA could carry more Desire ("Start free — find your first creator today").
- **"Book a demo"** — consistent secondary. Fine.
- **"Log in"** — correct in nav.
- **"See pricing"** — inconsistent, see 3.1(b).
- **"Explore this capability"** (`platform`, ×5) and **"Explore this solution"** (`solutions`, ×4) — generic. Rec: name the destination ("See how discovery works").
- **"✦ Try AI Search"** / **"✦ Check creator"** — the two best CTAs on the site. Specific, low-commitment, product-led. **These should be used more widely.**
- **"Pay $0 and start your 14-day trial"** (`payment`) — excellent CTA copy, undermined by the H1 above it.

---

# Part 4 — Systemic patterns

**What is working — keep it**
1. PAS is genuinely well-executed on 15 pages. The agitate copy is specific, concrete and free of jargon. This is above B2B SaaS norm.
2. Headline voice is consistent: short, declarative, period-terminated, one idea each.
3. Real numbers used throughout (135+ currencies, 62% reply rate, 400M+, 2T+) rather than vague superlatives.
4. Trust signals (SOC 2, GDPR, G2) sit correctly in the Action zone.
5. Cross-linking between related pages is thorough and keeps Desire moving.

**What is not**
1. **The meta layer is Solution-only across all 27 pages** — the single biggest missed PAS opportunity, and the page copy already contains the fix.
2. **Action is the weakest AIDA stage site-wide.** Templated closes, inconsistent trial offers, contradictory card requirements, one dead event.
3. **Numbers contradict each other** — 7 vs 14 day trial, 400M vs 412M, card vs no card. Three separate credibility leaks.
4. **Hardcoded time-sensitive content** ("Doors open in 29 days", "218 seats left", "Thursday, July 16, 2026") with no build-time computation. This *will* go stale again.
5. **Proof is under-built.** `customers.html` — the Desire engine — has two headlines.
6. **Attention is often second.** On several pages the H2 outperforms the H1 (`competitive-intelligence`, `ai-agents`, `tracking-roi`). The best line should lead.

---

# Part 5 — Prioritized action plan

### P0 — Do first (~1–2 hours, no copywriting required)

1. **Resolve trial length** to one number across 11 locations (§1.1). Start with `payment.html`, which contradicts itself.
2. **Resolve "no card required" vs "Enter card details"** (§1.2) — either fix the claim on 18 pages or fix the payment page framing.
3. **Fix or retire the webinar** (§1.3). Nothing on the site is more visibly broken. Make the countdown and seat count build-time computed.
4. **Standardize the creator count** — 400M+ or 412M+, one of them, everywhere (§1.4).
5. **Trim the 5 over-length descriptions** (§1.5) — recovers "provable ROI" on the homepage and "14-day free trial" on pricing.

### P1 — High value (~1–2 days)

6. **Rewrite all 27 meta descriptions to PAS** (Part 2). Rewrites are drafted and length-checked. Highest-leverage content change available.
7. **Replace the 9 "Ready to put X on IMAI?" closes** (§3.1a). Replacements drafted.
8. **Reconcile the Action path on 4 solution pages** (§3.1b).
9. **Rebuild `customers.html`** (§3.2) — PAS per case study. Biggest structural gap.
10. **Add Desire copy to the 4 onboarding pages** (§3.2), starting with the `payment.html` H1.

### P2 — Structural (~2–3 days)

11. **Add Problem/Agitate sections** to `platform`, `solutions`, `find-influencers`, `pricing` (§3.2). The agitate copy already exists on sibling pages and can be adapted.
12. **Fix the `platform.html` hierarchy** — demote the payouts H2 to peer level.
13. **Promote stronger H2s into the H1 slot** on `competitive-intelligence` and `ai-agents`.
14. **Rewrite "Questions & answers."** across 17 pages.
15. **Rewrite generic titles** — `customers.html`, `about.html`, `setup.html`.

### P3 — Polish

16. "It all connects." → something concrete (6 pages).
17. "Explore this capability/solution" → name the destination (9 CTAs).
18. Fix "front and centre" → "front and center" (`agencies.html`, consistency).
19. Extend the `✦ Try AI Search` / `✦ Check creator` CTA pattern to more pages.

---

## Appendix — Coverage confirmation

| Asset | Count | Audited |
|---|---|---|
| Pages | 27 | ✅ |
| `<title>` tags | 27 | ✅ (Part 2) |
| `<meta name="description">` | 27 | ✅ (Part 2) |
| H1 | 27 | ✅ |
| H2 / H3 / H4 | 737 extracted elements across all pages | ✅ (Part 3) |
| Eyebrows / kickers | all | ✅ (§3.3) |
| CTAs | all | ✅ (§3.4) |

Pages audited: `index`, `platform`, `solutions`, `pricing`, `customers`, `about`, `find-influencers`, `webinars`, `discovery`, `influencer-crm`, `campaign-management`, `tracking-roi`, `creator-payouts`, `competitive-intelligence`, `enterprise`, `agencies`, `smb`, `ecommerce`, `ugc`, `pr`, `consumer-intelligence`, `llm-visibility`, `ai-agents`, `register`, `personalize`, `payment`, `setup`.

**Note on `public/`:** the 28 files under `public/` are build output of `build_site.py` and were not audited separately — they are generated from the sources above. All fixes belong in `site/*.html`, the root onboarding pages, and the `S={...}` map in `build_site.py`.
