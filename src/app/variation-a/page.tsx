"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoMark } from "../LogoMark";
import "./variation-a.css";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Where does the 400M creator data come from?",
    a: "We continuously crawl Instagram, TikTok, YouTube, and X public APIs and supplement with first-party verified accounts. Every creator profile is refreshed within 24 hours and audience demographics are recomputed weekly.",
  },
  {
    q: "How accurate is the audience demographics data?",
    a: "Audience demographics are inferred from a sample of followers using ML models we benchmark against ground-truth Meta & TikTok ad data. Accuracy is typically within 2–4% on age and gender.",
  },
  {
    q: "Can I pay creators in my local currency?",
    a: "Yes — IMAI supports payouts in 38 currencies and 130+ countries. We handle tax forms, VAT/GST, and currency conversion automatically.",
  },
  {
    q: "Do you offer SSO and SOC 2?",
    a: "SSO via SAML and OIDC is available on the Enterprise plan. We're SOC 2 Type II certified and GDPR compliant out of the box.",
  },
  {
    q: "How does IMAI compare to other influencer platforms?",
    a: "The short version: a bigger creator graph, real natural-language search (not keyword filters), and end-to-end payments in one platform. Book a demo and we'll show you side-by-side.",
  },
  {
    q: "Can I bring my own creator list?",
    a: "Absolutely. Drop in a CSV or connect your CRM and IMAI will enrich every creator with audience data, brand affinities, and historical performance.",
  },
];

const CREATORS = [
  { name: "Mara Linde", handle: "@maralinde", platform: "IG", followers: "128K", er: "5.2%", tag: "98% match", tagClass: "" as string, bg: "linear-gradient(135deg,#ffd0b8,#8564ff)" },
  { name: "Jonas Becker", handle: "@jonasthrift", platform: "IG", followers: "84K", er: "4.7%", tag: "94% match", tagClass: "green", bg: "linear-gradient(135deg,#eeecff,#8564ff)" },
  { name: "Anika Roth", handle: "@anikaroth_", platform: "IG", followers: "311K", er: "3.8%", tag: "91% match", tagClass: "blue", bg: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
  { name: "Lea Vogel", handle: "@lea.vogel", platform: "TT", followers: "52K", er: "8.1%", tag: "89% match", tagClass: "", bg: "linear-gradient(135deg,#ffecf0,#f9476c)" },
  { name: "Sofia Kraus", handle: "@sofiakraus", platform: "IG", followers: "96K", er: "4.1%", tag: "87% match", tagClass: "green", bg: "linear-gradient(135deg,#e0f8f2,#299d88)" },
  { name: "Helena Witt", handle: "@helena.witt", platform: "YT", followers: "187K", er: "3.4%", tag: "85% match", tagClass: "blue", bg: "linear-gradient(135deg,#fdf4c0,#c94865)" },
];

function Logo({ compact = true }: { compact?: boolean }) {
  return (
    <Link className={`logo ${compact ? "compact" : ""}`} href="/variation-a">
      <LogoMark />
      <span className="name">
        <span>Influencer</span>
        <span>Marketing<span className="ai">.Ai</span></span>
      </span>
    </Link>
  );
}

export default function VariationAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="v-a">
      {/* NAV */}
      <nav className="top">
        <div className="container inner">
          <Logo />
          <ul>
            <li><a href="#features">Product</a></li>
            <li><a href="#how">How it works</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
          <div className="nav-cta">
            <Link href="/register" className="btn btn-ghost">Sign in</Link>
            <Link href="/register" className="btn btn-primary">Start free →</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="badge">
            <span className="pill">New</span>
            <span>Creator Match 2.0 — now with audience overlap analysis</span>
          </div>

          <h1 className="hero-h1">
            Find creators <span className="italic">worth</span><br />paying for.
          </h1>

          <p className="sub">
            AI-powered influencer discovery across <b>400M+ creators.</b> Vet audiences, run campaigns, and pay talent — all without leaving the platform.
          </p>

          <div className="hero-cta">
            <Link href="/register" className="btn btn-accent">Start free trial</Link>
            <Link href="/register" className="btn btn-ghost">Book a demo →</Link>
          </div>
          <p className="micro">No credit card · 14-day trial · Cancel anytime</p>
        </div>

        <div className="dash-wrap container">
          <div className="dashboard">
            <div className="dash-top">
              <div className="dash-dot r" /><div className="dash-dot y" /><div className="dash-dot g" />
              <div className="dash-url">app.imai.com/discover</div>
              <div style={{ width: 50 }} />
            </div>
            <div className="dash-body">
              <aside className="dash-side">
                <h6>Workspace</h6>
                <div className="item active">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                  Discover
                </div>
                <div className="item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></svg>
                  Lists
                </div>
                <div className="item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                  Campaigns
                </div>
                <div className="item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m7 14 4-4 4 4 6-6" /></svg>
                  Reports
                </div>
                <div className="section-gap" />
                <h6>Saved searches</h6>
                <div className="item" style={{ fontSize: 13 }}>Berlin · Fashion · Mid</div>
                <div className="item" style={{ fontSize: 13 }}>US · Fitness · Female 25-34</div>
                <div className="item" style={{ fontSize: 13 }}>Beauty · 100K-500K · &gt;3% ER</div>
              </aside>
              <div className="dash-main">
                <h3>Discover creators</h3>
                <div className="meta">Searching 412,388,201 creators across IG, TikTok, YT</div>

                <div className="search-bar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8564ff" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                  <div className="q">
                    Fashion creators in Berlin with 80%+ female audience and &gt;3% engagement<span className="typed">&nbsp;</span>
                  </div>
                  <span className="chip on" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>⌘ K</span>
                </div>

                <div className="filter-chips">
                  <span className="chip on">Instagram</span>
                  <span className="chip">TikTok</span>
                  <span className="chip on">10K–500K</span>
                  <span className="chip">DE · Berlin</span>
                  <span className="chip on">ER &gt; 3%</span>
                  <span className="chip">Fashion</span>
                  <span className="chip">+ 2 more</span>
                </div>

                <div className="creators">
                  {CREATORS.map((c) => (
                    <div key={c.handle} className="creator-card">
                      <div className="cc-head">
                        <div className="avatar" style={{ background: c.bg }} />
                        <div>
                          <div className="cc-name">{c.name}</div>
                          <div className="cc-handle">{c.handle}</div>
                        </div>
                        <span className="cc-platform">{c.platform}</span>
                      </div>
                      <div className="cc-stats">
                        <div><div className="lab">Followers</div><div className="val">{c.followers}</div></div>
                        <div><div className="lab">Engagement</div><div className="val">{c.er}</div></div>
                      </div>
                      <span className={`cc-tag ${c.tagClass}`}>{c.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container grid">
          <div className="stat"><div className="n"><span className="accent">400M</span>+</div><div className="lab">Creators indexed</div></div>
          <div className="stat"><div className="n">5,000+</div><div className="lab">Brands using IMAI</div></div>
          <div className="stat"><div className="n"><span className="accent">92%</span></div><div className="lab">Avg ROI lift</div></div>
          <div className="stat"><div className="n">$1.2B</div><div className="lab">Paid to creators</div></div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="logos">
        <div className="container">
          <p className="eyebrow">Trusted by marketing teams at</p>
          <div className="logo-row">
            <span className="lg">Lumora</span>
            <span className="lg b">stride</span>
            <span className="lg c">finch/labs</span>
            <span className="lg d">paloma</span>
            <span className="lg" style={{ fontWeight: 600, fontFamily: "var(--font-poppins), sans-serif" }}>Northwood</span>
            <span className="lg" style={{ fontFamily: "var(--font-bodoni), serif", fontStyle: "italic" }}>olive &amp; oak</span>
            <span className="lg c">∞ apex</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Three pillars</span>
            <h2 className="section-title">Everything you need to <span className="italic">work</span> with creators.</h2>
            <p className="section-sub">From the first idea to the final invoice — IMAI replaces the spreadsheet, the inbox, and the agency.</p>
          </div>

          {/* Feature 1 */}
          <div className="feature">
            <div className="f-visual ai-search">
              <div className="query-box">
                Find <span className="em">fashion creators</span> in <span className="em">Berlin</span> with <span className="em">80%+ female audience</span> aged <span className="em">25–34</span> and engagement <span className="em">above 3%</span>.
              </div>
              <div className="results-head">
                <span className="lab">Top matches</span><span className="count">2,418 creators</span>
              </div>
              {[
                { nm: "Mara Linde", meta: "128K · IG · DE", m: "98%", bg: "linear-gradient(135deg,#ffd0b8,#8564ff)" },
                { nm: "Jonas Becker", meta: "84K · IG · DE", m: "94%", bg: "linear-gradient(135deg,#eeecff,#8564ff)" },
                { nm: "Anika Roth", meta: "311K · IG · DE", m: "91%", bg: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
              ].map((r) => (
                <div key={r.nm} className="result-row">
                  <div className="avatar" style={{ background: r.bg }} />
                  <div className="info"><div className="name">{r.nm}</div><div className="meta">{r.meta}</div></div>
                  <div className="match">{r.m}</div>
                </div>
              ))}
            </div>
            <div className="f-copy">
              <div className="num">01</div>
              <h3>Search the way <span className="italic">you think.</span></h3>
              <p>No more boolean filters from 2014. Describe who you want to reach in plain language and our AI does the rest — translating intent into audience demographics, content semantics, and brand-safety signals.</p>
              <ul>
                <li>Natural-language search across 400M+ creators</li>
                <li>Audience overlap with your existing buyers</li>
                <li>Lookalikes from any creator or list</li>
              </ul>
              <Link className="f-link" href="/register">Try AI Search</Link>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature flip">
            <div className="f-visual discovery-vis">
              <div className="platforms">
                <div className="platform"><span className="name">Instagram</span><span className="num"><span className="a">218</span>M</span></div>
                <div className="platform"><span className="name">TikTok</span><span className="num"><span className="a">112</span>M</span></div>
                <div className="platform"><span className="name">YouTube</span><span className="num"><span className="a">58</span>M</span></div>
                <div className="platform"><span className="name">X &amp; more</span><span className="num"><span className="a">14</span>M</span></div>
              </div>
              <div className="geo-map" />
              <p style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: 11, color: "var(--ink-soft)", marginTop: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Live coverage · 187 countries · refreshed every 24h
              </p>
            </div>
            <div className="f-copy">
              <div className="num">02</div>
              <h3>The world&apos;s largest <span className="italic">creator graph.</span></h3>
              <p>IMAI continuously crawls and verifies creators across every major platform. You get audience demographics, brand affinities, and content semantics on creators most tools have never even heard of.</p>
              <ul>
                <li>400M+ creators · 187 countries · 4 platforms</li>
                <li>Audience demographics &amp; psychographics</li>
                <li>Fake-follower &amp; brand-safety screening</li>
              </ul>
              <Link className="f-link" href="/register">See the data</Link>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature">
            <div className="f-visual campaign-vis">
              <div className="pipeline">
                <div className="stage done"><div className="lab">Outreach</div><div className="n">142</div></div>
                <div className="stage done"><div className="lab">Negotiated</div><div className="n">38</div></div>
                <div className="stage"><div className="lab">Live</div><div className="n">19</div></div>
                <div className="stage"><div className="lab">Paid</div><div className="n">11</div></div>
              </div>
              <div className="campaign-list">
                {[
                  { nm: "Mara Linde", st: "SS26 launch · 2 posts + 1 reel", pay: "€2,400", pill: "paid", label: "Paid", bg: "linear-gradient(135deg,#ffd0b8,#8564ff)" },
                  { nm: "Jonas Becker", st: "SS26 launch · 1 reel", pay: "€1,200", pill: "live", label: "Live", bg: "linear-gradient(135deg,#eeecff,#8564ff)" },
                  { nm: "Anika Roth", st: "SS26 launch · 3 stories", pay: "€3,600", pill: "live", label: "Live", bg: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
                  { nm: "Lea Vogel", st: "SS26 launch · 1 TikTok", pay: "€900", pill: "draft", label: "Draft", bg: "linear-gradient(135deg,#ffecf0,#f9476c)" },
                ].map((r) => (
                  <div key={r.nm} className="creator-row">
                    <div className="avatar" style={{ background: r.bg }} />
                    <div className="info"><div className="nm">{r.nm}</div><div className="st">{r.st}</div></div>
                    <div className="pay">{r.pay}</div>
                    <span className={`pill ${r.pill}`}>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="f-copy">
              <div className="num">03</div>
              <h3>From brief to <span className="italic">bank transfer.</span></h3>
              <p>Brief, outreach, contracts, content review, payment, reporting. Nothing falls outside the platform — and nothing falls through the cracks.</p>
              <ul>
                <li>Outreach with templates &amp; AI personalization</li>
                <li>Contracts &amp; payouts in 130+ countries</li>
                <li>Live ROI tracking — EMV, CPM, CAC, GMV</li>
              </ul>
              <Link className="f-link" href="/register">See campaigns</Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="how" id="how">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">How it works</span>
            <h2 className="section-title">Four steps. <span className="italic">No spreadsheet.</span></h2>
          </div>
          <div className="how-steps">
            {[
              { n: "i.", t: "Search", p: "Describe your ideal creator in plain English. AI translates it into 40+ audience & content signals." },
              { n: "ii.", t: "Vet", p: "Inspect audience quality, fake-follower scores, brand-safety, and historical performance — at a glance." },
              { n: "iii.", t: "Activate", p: "Brief, negotiate, contract, and pay creators. Everything inside IMAI, in 130+ countries." },
              { n: "iv.", t: "Measure", p: "Track EMV, GMV, CAC, and engagement live. Roll up performance across creators, campaigns, and brands." },
            ].map((s) => (
              <div key={s.n} className="step">
                <div className="num">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Pricing</span>
            <h2 className="section-title">Pick a plan that <span className="italic">scales with you.</span></h2>
            <p className="section-sub">Every plan includes the full 400M+ creator database. You only pay for seats, searches, and campaigns.</p>
          </div>
          <div className="price-grid">
            <div className="price">
              <h4>Starter</h4>
              <p className="tag">For solo marketers and in-house teams getting started.</p>
              <div className="amt"><span className="n">$175</span><span className="per">/month</span></div>
              <ul>
                <li>2 seats</li>
                <li>Unlimited discovery · 250 creator unlocks / mo</li>
                <li>AI Influencer Search — Unlimited</li>
                <li>Creator Discovery · 400M+</li>
                <li>Analyze creators · 50 / mo</li>
                <li>Email export · 250 / mo</li>
                <li>Priority support</li>
              </ul>
              <Link href="/register" className="btn btn-primary">Start free trial</Link>
            </div>
            <div className="price pop">
              <span className="pop-badge">Most popular</span>
              <h4>Growth</h4>
              <p className="tag">For in-house brand teams shipping campaigns weekly.</p>
              <div className="amt"><span className="n">$349</span><span className="per">/month</span></div>
              <ul>
                <li>4 seats</li>
                <li>Unlimited discovery · 500 creator unlocks / mo</li>
                <li>AI Influencer Search — Unlimited</li>
                <li>Analyze creators · 100 / mo</li>
                <li>Email export · 500 / mo</li>
                <li>Campaign management · 5 active</li>
                <li>Unlimited creator payouts</li>
                <li>API &amp; integrations</li>
                <li>Priority support</li>
              </ul>
              <Link href="/register" className="btn btn-primary">Start free trial</Link>
            </div>
            <div className="price">
              <h4>Enterprise</h4>
              <p className="tag">All custom — every workspace, every seat, every integration.</p>
              <div className="amt"><span className="n" style={{ fontSize: 48, fontStyle: "italic" }}>Custom</span></div>
              <ul>
                <li>Everything in Growth, unlimited</li>
                <li>Influencer Marketing workspace</li>
                <li>PR &amp; Media workspace</li>
                <li>UGC Video Ads workspace</li>
                <li>LLM Visibility workspace</li>
                <li>AI Agents workspace</li>
                <li>SSO, SOC 2, custom data residency</li>
                <li>Dedicated CSM + white-glove onboarding</li>
              </ul>
              <Link href="/register" className="btn btn-primary">Talk to sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="container faq-grid">
          <div className="left">
            <h2>Frequently <span className="italic">asked.</span></h2>
            <p>Can&apos;t find what you&apos;re looking for? Our team replies within an hour.</p>
            <a href="#" className="btn btn-primary">Chat with us</a>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={`item ${openFaq === i ? "open" : ""}`}>
                <button className="q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q} <span className="pl">+</span>
                </button>
                <div className="a"><div className="a-inner">{f.a}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>Stop guessing which<br />creators <span className="italic">actually</span> work.</h2>
        <p>Join 5,000+ brands using IMAI to find creators worth paying for — and pay them well.</p>
        <div className="cta-row">
          <Link href="/register" className="btn btn-primary">Start free trial</Link>
          <Link href="/register" className="btn btn-ghost">Book a demo</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Logo compact={false} />
              <p className="tag">The #1 influencer marketing platform powered by AI.</p>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", fontFamily: "var(--font-jetbrains), monospace" }}>© 2026 IMAI Labs Inc.</p>
            </div>
            <div>
              <h5>Product</h5>
              <ul>
                <li><a href="#">AI Search</a></li>
                <li><a href="#">Creator Discovery</a></li>
                <li><a href="#">Campaign Management</a></li>
                <li><a href="#">Payouts</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
            <div>
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Case studies</a></li>
                <li><a href="#">Reports</a></li>
                <li><a href="#">Help center</a></li>
              </ul>
            </div>
            <div>
              <h5>Company</h5>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5>Legal</h5>
              <ul>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">DPA</a></li>
                <li><a href="#">SOC 2</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bot">
            <div>v 2.0 · all systems operational</div>
            <div>made for marketers · not spreadsheets</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
