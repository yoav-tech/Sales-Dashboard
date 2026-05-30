"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoMark } from "./LogoMark";
import "./variation-c.css";

type Result = { h: string; m: string; bg: string };
type Icp = { q: string; res: Result[] };

const ICPS: Icp[] = [
  {
    q: "Beauty creators in LA, female 25–34, ER >4%",
    res: [
      { h: "@ariawild", m: "97%", bg: "linear-gradient(135deg,#ffecf0,#f9476c)" },
      { h: "@rosamora", m: "93%", bg: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
      { h: "@minimaskincare", m: "89%", bg: "linear-gradient(135deg,#e0f8f2,#06c7a9)" },
    ],
  },
  {
    q: "Fitness creators in NYC with >5% engagement",
    res: [
      { h: "@maeli", m: "98%", bg: "linear-gradient(135deg,#eeecff,#8564ff)" },
      { h: "@runwith.jp", m: "94%", bg: "linear-gradient(135deg,#e0f8f2,#299d88)" },
      { h: "@hadleyfit", m: "91%", bg: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
    ],
  },
  {
    q: "B2B SaaS reviewers, US, 50K–500K, dev audience",
    res: [
      { h: "@stackdaily", m: "96%", bg: "linear-gradient(135deg,#eeecff,#8564ff)" },
      { h: "@prodhunt.jen", m: "92%", bg: "linear-gradient(135deg,#e0f8f2,#06c7a9)" },
      { h: "@apicasey", m: "88%", bg: "linear-gradient(135deg,#ffecf0,#c94865)" },
    ],
  },
  {
    q: "Lifestyle journalists & podcasters · parenting niche",
    res: [
      { h: "@cribandcoffee", m: "95%", bg: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
      { h: "@parent.dispatch", m: "91%", bg: "linear-gradient(135deg,#ffecf0,#f9476c)" },
      { h: "@nightfeed.fm", m: "87%", bg: "linear-gradient(135deg,#eeecff,#8564ff)" },
    ],
  },
];

const ICP_LABELS = ["Beauty", "Fitness", "B2B SaaS", "PR · Agency"];

const FACES = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
];

const PERSONA_FACES = {
  inhouse: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
  agency: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
  b2b: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
  enterprise: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
};

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
    a: "Yes — IMAI supports payouts in 190 currencies across 50+ countries. We handle tax forms, VAT/GST, 1099s, and currency conversion automatically.",
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
  {
    q: "What is an AI influencer marketing platform?",
    a: "An AI influencer marketing platform uses machine learning to find, evaluate, and manage relationships with social-media creators on behalf of a brand. Unlike a static database or spreadsheet, IMAI uses AI for natural-language creator search, audience demographics inference, fake-follower detection, and personalized outreach — turning a manual workflow that takes a marketing team weeks into something that takes a single afternoon.",
  },
  {
    q: "How much does an influencer marketing platform cost?",
    a: "IMAI starts at $175/month for the Starter plan, $349/month for Growth, and Enterprise is fully custom with all workspaces (Influencer Marketing, PR & Media, UGC Video Ads, LLM Visibility, AI Agents). All plans scale with seats, creator unlocks, and managed-services needs. By contrast, most legacy platforms like GRIN or CreatorIQ start at $2,500+/month with annual contracts.",
  },
  {
    q: "Which social platforms does IMAI cover?",
    a: "Instagram (218M creators), TikTok (112M), YouTube (58M), and X / others (14M) — for a total of 400M+ creators indexed across 187 countries. LinkedIn coverage is included for B2B use cases.",
  },
  {
    q: "Does IMAI work for nano- and micro-influencers?",
    a: "Yes. IMAI's creator graph extends down to 1,000 followers — most platforms cap at 10K or 25K. Nano (1K–10K) and micro (10K–100K) creators often have 3–5× the engagement of macro creators, and they're where IMAI's database is dramatically larger than any competitor.",
  },
  {
    q: "Does IMAI integrate with Shopify, Salesforce, or HubSpot?",
    a: "Yes. Native two-way integrations with Shopify (for GMV attribution), Salesforce and HubSpot (for pipeline attribution and audience enrichment), and Slack (for live alerts). A REST API is available on the Growth plan and above.",
  },
];

function Logo({ compact = true }: { compact?: boolean }) {
  return (
    <a className={`logo ${compact ? "compact" : ""}`} href="/">
      <LogoMark />
      <span className="name">
        <span>Influencer</span>
        <span>
          Marketing<span className="ai">.Ai</span>
        </span>
      </span>
    </a>
  );
}

export default function VariationBPage() {
  const [icpIdx, setIcpIdx] = useState(0);
  const [icpKey, setIcpKey] = useState(0);
  const [swap, setSwap] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const SWAP_MS = 4200;
    const interval = setInterval(() => {
      setSwap(true);
      swapTimer.current = setTimeout(() => {
        setIcpIdx((i) => (i + 1) % ICPS.length);
        setIcpKey((k) => k + 1);
        setSwap(false);
      }, 280);
    }, SWAP_MS);
    return () => {
      clearInterval(interval);
      if (swapTimer.current) clearTimeout(swapTimer.current);
    };
  }, []);

  const icp = ICPS[icpIdx];

  return (
    <div className="v-c">
      {/* NAV */}
      <nav className="top">
        <div className="inner">
          <Logo />
          <ul>
            <li><a href="#features">Product</a></li>
            <li><a href="#for">Solutions</a></li>
            <li><a href="#compare">Compare</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <div className="nav-cta">
            <Link href="/register" className="btn btn-ghost">Sign in</Link>
            <Link href="/register" className="btn btn-primary">Start free →</Link>
          </div>
        </div>
      </nav>

      {/* HERO — single-column centered */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-left">
              <h1 className="display">
                The <span className="accent">#1</span> influencer<br />
                marketing <span className="wrap">platform</span>
              </h1>
              <div className="hero-tag">powered by AI.</div>
              <p className="sub" id="heroSub">
                Find, evaluate, and activate creators from <b>400M+ influencers.</b> AI discovery, campaign management, ROI tracking, and creator payouts — all in one platform.
              </p>
              <div className="cta-row">
                <Link href="/register" className="btn btn-primary">Start free trial</Link>
                <Link href="/register" className="btn btn-outline">Book a demo →</Link>
              </div>
              <div className="avatars">
                <div className="stack">
                  {FACES.map((url, i) => (
                    <span key={i} style={{ backgroundImage: `url('${url}')` }} />
                  ))}
                </div>
                <div className="text">
                  Joined this week by <b>Estée Lauder, Playtika</b> &amp; 23 more →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="container">
        <div className="ticker">
          <div className="ticker-track">
            {[...Array(2)].flatMap((_, dup) => [
              <span key={`${dup}-1`} className="ticker-item"><span className="dot" />412,388,201 creators indexed</span>,
              <span key={`${dup}-2`} className="ticker-item"><span className="dot" /><span className="lime">1,000+</span> brands using IMAI</span>,
              <span key={`${dup}-3`} className="ticker-item"><span className="dot" />$1.2B paid to creators</span>,
              <span key={`${dup}-4`} className="ticker-item"><span className="dot" />50+ countries · 190 currencies</span>,
              <span key={`${dup}-5`} className="ticker-item"><span className="dot" /><span className="lime">92%</span> avg ROI lift</span>,
              <span key={`${dup}-6`} className="ticker-item"><span className="dot" />SOC 2 Type II · GDPR ready</span>,
            ])}
          </div>
        </div>
      </div>

      {/* LOGOS */}
      <section className="logos">
        <div className="container">
          <div className="head">
            <h3>Trusted by the marketing teams that ship campaigns weekly.</h3>
            <div className="num">1,000+ brands · and counting</div>
          </div>
          <div className="logo-row">
            <div className="cell"><span className="lg">Estée Lauder</span></div>
            <div className="cell"><span className="lg b">playtika</span></div>
            <div className="cell"><span className="lg c">LUMENIS</span></div>
            <div className="cell"><span className="lg d">beluga</span></div>
            <div className="cell"><span className="lg">Coca-Cola</span></div>
            <div className="cell"><span className="lg b">Samsung</span></div>
            <div className="cell"><span className="lg c">/wpp</span></div>
          </div>
        </div>
      </section>

      {/* INSIDE THE PRODUCT — bento */}
      <section className="bento-section">
        <div className="container">
          <div className="bento-head">
            <span className="section-eyebrow"><span className="dot" />Inside the product</span>
            <h2 className="bento-title">
              Search, vet, activate, measure — <span className="accent">in one screen.</span>
            </h2>
          </div>
          <div className="hero-bento">
            <div className={`tile tile-search span2 ${swap ? "swap" : ""}`}>
              <div className="tile-lab">
                <span className="dot" />
                AI Search · 412M creators indexed
              </div>
              <div className="icp-tabs">
                {ICP_LABELS.map((label, i) => (
                  <span key={`${i}-${icpKey}`} className={`icp-tab ${i === icpIdx ? "on" : ""}`}>
                    {label}
                  </span>
                ))}
              </div>
              <div className="q">
                <span style={{ opacity: 0.6 }}>›</span>
                <span>{icp.q}</span>
                <span className="cursor" />
              </div>
              <div className="results">
                {icp.res.map((r, i) => (
                  <div key={`${icpKey}-${i}`} className="res" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="av" style={{ background: r.bg }} />
                    {r.h} · {r.m}
                  </div>
                ))}
              </div>
            </div>

            <div className="tile tile-count">
              <div className="tile-lab"><span className="dot" />Database</div>
              <div className="n">400M+</div>
              <div className="lab">creators across IG · TT · YT · X</div>
            </div>

            <div className="tile tile-creator">
              <div className="tile-lab"><span className="dot" />Top match</div>
              <div className="head">
                <div className="av" />
                <div>
                  <div className="nm">Mara Linde</div>
                  <div className="hd">@maralinde · IG · DE</div>
                </div>
              </div>
              <div className="metric-list">
                <div className="mrow"><span className="ml">Story views</span><span className="mv">412K</span></div>
                <div className="mrow"><span className="ml">Reels reach</span><span className="mv">128K</span></div>
                <div className="mrow"><span className="ml">ER</span><span className="mv">5.2%</span></div>
                <div className="mrow"><span className="ml">Audience cred.</span><span className="mv">94%</span></div>
              </div>
              <span className="match">98% match</span>
            </div>

            <div className="tile tile-pipe">
              <div className="tile-lab"><span className="dot" />Live campaign</div>
              <div className="pipe-row"><span>Outreach</span><span className="n">142</span></div>
              <div className="pipe-row"><span>Negotiating</span><span className="n">38</span></div>
              <div className="pipe-row"><span>Live</span><span className="n">19</span></div>
              <div className="pipe-row"><span>Paid out</span><span className="n">€48.2K</span></div>
            </div>

            <div className="tile tile-roi">
              <div className="tile-lab"><span className="dot" />ROI · last 30d</div>
              <div className="n">+52%</div>
              <div className="delta">▲ vs. last quarter</div>
              <div className="chart">
                <svg viewBox="0 0 200 56" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="grad-a" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8564ff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8564ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,48 L20,42 L40,46 L60,38 L80,40 L100,30 L120,32 L140,22 L160,24 L180,14 L200,8 L200,56 L0,56 Z" fill="url(#grad-a)" />
                  <path d="M0,48 L20,42 L40,46 L60,38 L80,40 L100,30 L120,32 L140,22 L160,24 L180,14 L200,8" stroke="#8564ff" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem" id="problem">
        <div className="container">
          <div className="problem-head">
            <h2>
              The problem with <span className="strike">every other</span><br />
              influencer marketing tool. <span className="accent">Fixed.</span>
            </h2>
            <p>
              Most &ldquo;platforms&rdquo; are really one workflow with three tools bolted on. You end up paying for a search tool, an outreach tool, a contracts tool, and a payments tool — then duct-taping them with spreadsheets.
            </p>
          </div>
          <div className="problem-grid">
            <div className="pcard">
              <div className="ico">01</div>
              <div className="lab">Database tools</div>
              <h4><span className="strike">Static lists.</span><br />Stale data.</h4>
              <p>Most &ldquo;creator databases&rdquo; are spreadsheets that update quarterly. You can&apos;t trust the engagement rate, you can&apos;t trust the audience breakdown, you definitely can&apos;t trust the contact info.</p>
              <div className="fix">Refreshed every 24h</div>
            </div>
            <div className="pcard">
              <div className="ico">02</div>
              <div className="lab">Email outreach</div>
              <h4><span className="strike">Cold emails.</span><br />Colder reply rates.</h4>
              <p>Generic mail-merge to 500 creators gets a 1% reply rate. AI-personalized outreach inside the platform — with creator context and brand history — gets 27%.</p>
              <div className="fix">In-platform inbox + AI replies</div>
            </div>
            <div className="pcard">
              <div className="ico">03</div>
              <div className="lab">Spreadsheets</div>
              <h4><span className="strike">Tabs &amp; tabs</span><br />of campaign rows.</h4>
              <p>Brief in Docs. Contracts in DocuSign. Approvals in Slack. Payments in Wise. Reporting in Looker. By month two, no one knows what&apos;s live.</p>
              <div className="fix">One pipeline, one source of truth</div>
            </div>
            <div className="pcard">
              <div className="ico">04</div>
              <div className="lab">Separate payments</div>
              <h4><span className="strike">Wire transfers</span><br />&amp; finance tickets.</h4>
              <p>You found the perfect creator in Brazil. Now your finance team needs a W-8, a Wise account, and 14 days to figure out withholding tax. IMAI handles all of it.</p>
              <div className="fix">190 currencies · auto tax forms</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="container">
          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <span className="section-eyebrow"><span className="dot" />Three pillars · One platform</span>
            <h2 className="section-title" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Everything you need to <span className="accent">work with creators.</span>
            </h2>
            <p className="section-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>
              From the first idea to the final invoice — IMAI replaces the spreadsheet, the inbox, and the agency.
            </p>
          </div>

          {/* Feature 1 */}
          <div className="feature">
            <div className="f-copy">
              <div className="lab">01 · AI Influencer Search</div>
              <h3>Search the way <span className="accent">you think.</span></h3>
              <p>No more boolean filters from 2014. Describe who you want to reach in plain language and our AI does the rest — translating intent into 40+ audience &amp; content signals.</p>
              <ul>
                <li>Natural-language search across 412M+ creators</li>
                <li>Audience overlap with your existing buyers</li>
                <li>Lookalikes from any creator, list, or competitor</li>
              </ul>
              <Link className="f-link" href="/register">Try AI Search →</Link>
            </div>
            <div className="f-visual v-search">
              <div className="vs-top">
                <button className="vs-platform"><span className="ig" />Instagram<span className="chev">▾</span></button>
                <div className="vs-url"><span className="at">@</span>Influencer profile URL, user ID or @handle</div>
                <button className="vs-ai-btn"><span className="spark">✦</span>AI Search<span className="arrow">›</span></button>
              </div>
              <div className="vs-title-row">
                <h4>Narrow your discovered influencers…</h4>
                <button className="vs-reset">START OVER</button>
              </div>

              <SearchChipSection label="Demographics" chips={["Location", "Gender", "Language", "Age", "Audience Type", "Ethnicity"]} />
              <SearchChipSection label="Performance" chips={["Followers", "Engagements", "Trending", "Reels Plays", "Hidden Likes"]} />
              <SearchChipSection
                label="Content"
                chips={[
                  { name: "NICHE AI", ai: true },
                  { name: "TOPICS AI", ai: true },
                  { name: "LOOKALIKES AI", ai: true, on: true },
                  { name: "Mentions" },
                  { name: "Interests" },
                  { name: "Caption Keyword" },
                  { name: "Partnerships" },
                  { name: "Brands" },
                ]}
              />
              <div className="vs-section" style={{ marginBottom: 0 }}>
                <div className="vs-label">Account</div>
                <div className="vs-chips">
                  <span className="vs-chip"><span className="ic" />Last Post<span className="chev">▾</span></span>
                  <span className="vs-chip"><span className="ic" />Account Type<span className="chev">▾</span></span>
                  <span className="vs-chip"><span className="ic" />Contacts<span className="chev">▾</span></span>
                  <span className="vs-toggles">
                    <span className="vs-toggle"><span className="knob" />Only verified</span>
                    <span className="vs-toggle"><span className="knob" />Only credible</span>
                    <span className="vs-toggle"><span className="knob" />Exclude private</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature dark flip">
            <div className="f-copy">
              <div className="lab">02 · Creator Discovery</div>
              <h3>The world&apos;s largest <span className="accent">creator graph.</span></h3>
              <p>IMAI continuously crawls every major platform — Instagram, TikTok, YouTube, X. The result: audience demographics, brand affinities, and content semantics on creators most tools have never even heard of.</p>
              <ul>
                <li>400M+ creators · 187 countries · 4 platforms</li>
                <li>Audience demographics &amp; psychographics</li>
                <li>Fake-follower &amp; brand-safety screening</li>
              </ul>
              <Link className="f-link" href="/register">See the data →</Link>
            </div>
            <div className="f-visual v-disc">
              <div className="grid4">
                <div className="platform"><div className="l">Instagram</div><div className="n"><span className="a">218</span>M</div><div className="bar"><div style={{ width: "88%" }} /></div></div>
                <div className="platform"><div className="l">TikTok</div><div className="n"><span className="a">112</span>M</div><div className="bar"><div style={{ width: "62%" }} /></div></div>
                <div className="platform"><div className="l">YouTube</div><div className="n"><span className="a">58</span>M</div><div className="bar"><div style={{ width: "40%" }} /></div></div>
                <div className="platform"><div className="l">X / others</div><div className="n"><span className="a">14</span>M</div><div className="bar"><div style={{ width: "18%" }} /></div></div>
              </div>
              <div className="map">
                {[
                  ["18%", "32%"], ["30%", "24%"], ["42%", "38%"], ["55%", "30%"], ["64%", "48%"],
                  ["75%", "38%"], ["82%", "58%"], ["24%", "60%"], ["50%", "72%"], ["36%", "78%"],
                ].map(([left, top], i) => (
                  <div key={i} className="pin" style={{ left, top }} />
                ))}
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature">
            <div className="f-copy">
              <div className="lab">03 · Campaign Management</div>
              <h3>From brief to <span className="accent">bank transfer.</span></h3>
              <p>Brief, outreach, contracts, content review, payment, reporting. Nothing falls outside the platform — and nothing falls through the cracks.</p>
              <ul>
                <li>AI-personalized outreach with templates</li>
                <li>Contracts &amp; payouts in 190 currencies · 50+ countries</li>
                <li>Live ROI tracking — EMV, CPM, CAC, GMV</li>
              </ul>
              <Link className="f-link" href="/register">See campaigns →</Link>
            </div>
            <div className="f-visual v-camp">
              <div className="cm-head">
                <div className="cm-title">
                  <h4>SS26 launch</h4>
                  <span className="live-pill"><span className="dot" />Live</span>
                </div>
                <div className="cm-actions">
                  <button className="cm-btn">Export</button>
                  <button className="cm-btn primary">+ Add creator</button>
                </div>
              </div>
              <div className="cm-tabs">
                {[
                  ["All", "60", false],
                  ["Outreach", "142", false],
                  ["Negotiating", "38", false],
                  ["Live", "19", true],
                  ["Paid", "11", false],
                ].map(([label, count, on], i) => (
                  <span key={i} className={`cm-tab ${on ? "on" : ""}`}>
                    {label as string} <span className="ct">{count as string}</span>
                  </span>
                ))}
              </div>
              <div className="cm-toolbar">
                <div className="cm-search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  Search creators in this campaign…
                </div>
                <button className="cm-btn">Filter</button>
                <button className="cm-btn">Sort: Status</button>
              </div>
              <div className="cm-table">
                <div className="cm-row head">
                  <span className="cm-check" />
                  <span>Creator</span>
                  <span>Deliverables</span>
                  <span>Status</span>
                  <span style={{ textAlign: "right" }}>Payout</span>
                  <span />
                </div>
                {[
                  { on: true, name: "Mara Linde", handle: "@maralinde · IG", bg: "linear-gradient(135deg,#eeecff,#8564ff)", tags: ["2 posts", "1 reel"], status: "paid", label: "Paid", pay: "€2,400" },
                  { on: true, name: "Jonas Becker", handle: "@jonasthrift · IG", bg: "linear-gradient(135deg,#e0f8f2,#06c7a9)", tags: ["1 reel"], status: "live", label: "Live", pay: "€1,200" },
                  { on: true, name: "Anika Roth", handle: "@anikaroth_ · IG", bg: "linear-gradient(135deg,#fdf4c0,#efcc01)", tags: ["3 stories", "1 post"], status: "live", label: "Live", pay: "€3,600" },
                  { on: false, name: "Lea Vogel", handle: "@lea.vogel · TT", bg: "linear-gradient(135deg,#ffecf0,#f9476c)", tags: ["1 TikTok"], status: "negotiating", label: "Negotiating", pay: "€900" },
                  { on: false, name: "Sofia Kraus", handle: "@sofiakraus · IG", bg: "linear-gradient(135deg,#e0f8f2,#299d88)", tags: ["Draft brief"], status: "draft", label: "Draft", pay: "—" },
                ].map((r, i) => (
                  <div key={i} className="cm-row">
                    <span className={`cm-check ${r.on ? "on" : ""}`} />
                    <div className="cm-creator">
                      <div className="cm-av" style={{ background: r.bg }} />
                      <div><div className="cm-nm">{r.name}</div><div className="cm-hd">{r.handle}</div></div>
                    </div>
                    <div className="cm-deliv">{r.tags.map((t, j) => <span key={j} className="cm-tag">{t}</span>)}</div>
                    <span className={`cm-status ${r.status}`}><span className="dot" />{r.label}</span>
                    <span className="cm-pay">{r.pay}</span>
                    <span className="cm-more">⋯</span>
                  </div>
                ))}
              </div>
              <div className="cm-footer">
                <span>3 selected · <span className="tot">€7,200 ready to pay</span></span>
                <span>1–5 of 19</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — testimonial cards */}
      <section className="how" id="how">
        <div className="container">
          <div className="how-head">
            <div>
              <span className="section-eyebrow"><span className="dot" />How it works</span>
              <h2 className="section-title">Four steps. <span className="accent">In their words.</span></h2>
            </div>
            <p className="section-sub">From AI search to wired payout, every step lives inside IMAI. Here&apos;s what it actually feels like — straight from the people running it this week.</p>
          </div>
          <div className="how-grid">
            {[
              {
                num: "01 · SEARCH",
                quote: "I described my creator in a sentence. AI did the 40 filters.",
                name: "Mara Linde",
                role: "Brand · Estée Lauder",
                face: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
              },
              {
                num: "02 · VET",
                quote: "I scanned 200 audiences in 12 minutes. Skipped half of them.",
                name: "Jonas Becker",
                role: "Agency · WPP",
                face: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
              },
              {
                num: "03 · ACTIVATE",
                quote: "Brief, contract, payout — one screen, three currencies, twenty minutes.",
                name: "Anika Roth",
                role: "Influencer Lead · Coca-Cola",
                face: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
              },
              {
                num: "04 · MEASURE",
                quote: "By Friday I knew which creator drove what GMV. Finally.",
                name: "Sofia Kraus",
                role: "B2B SaaS · Playtika",
                face: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&h=160&fit=crop&crop=faces&auto=format&q=80",
              },
            ].map((s) => (
              <div key={s.num} className="step">
                <div className="step-top">
                  <div className="num">{s.num}</div>
                  <span className="step-face" style={{ backgroundImage: `url('${s.face}')` }} />
                </div>
                <blockquote className="step-quote">
                  <span className="oq">&ldquo;</span>{s.quote}<span className="cq">&rdquo;</span>
                </blockquote>
                <div className="step-attr">
                  <div className="step-name">{s.name}</div>
                  <div className="step-role">{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="personas" id="for">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="section-eyebrow"><span className="dot" />Built for every growth team</span>
            <h2 className="section-title" style={{ margin: "18px auto 12px" }}>One platform. <span className="accent">Every team.</span></h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Whether you ship campaigns weekly in-house, run a roster of brand clients at an agency, or report up to a CMO at a global enterprise — IMAI fits the workflow you already have.
            </p>
          </div>
          <div className="personas-grid">
            {[
              { face: PERSONA_FACES.inhouse, tag: "In-house · Brand", title: ["Influencer", "marketers"], body: "Run end-to-end campaigns without three browser tabs. Search, vet, brief, sign, pay, and report — all from the same screen.", items: ["AI Match by audience overlap", "Reusable brief & contract templates", "Live EMV + GMV per creator"] },
              { face: PERSONA_FACES.agency, tag: "Agency", title: ["Influencer", "agencies"], body: "Manage a roster of brand clients in workspaces. Whitelabel reports, billable creator unlocks, and a shared roster of vetted talent across clients.", items: ["Multi-workspace + client roles", "Whitelabel exports & PDFs", "Roster sharing across clients"] },
              { face: PERSONA_FACES.b2b, tag: "B2B · SaaS", title: ["B2B marketing", "teams"], body: "B2B creator marketing isn't TikTok dances — it's LinkedIn carousels and YouTube long-form. IMAI's graph covers technical and trade creators most tools ignore.", items: ["LinkedIn + YouTube graph included", "Salesforce + HubSpot sync", "Pipeline attribution"] },
              { face: PERSONA_FACES.enterprise, tag: "Enterprise", title: ["Enterprise", "ops & finance"], body: "SSO, SOC 2, custom data residency, and a single procurement contract that replaces 4–6 SaaS line items. Finance gets clean payouts, ops gets one vendor.", items: ["SSO · SAML · SCIM provisioning", "SOC 2 Type II · GDPR", "Bring-your-own-data API"] },
            ].map((p, i) => (
              <div key={i} className="persona">
                <div className="persona-top">
                  <span className="face" style={{ backgroundImage: `url('${p.face}')` }} />
                  <span className="role-tag">{p.tag}</span>
                </div>
                <h4>{p.title[0]}<br />{p.title[1]}</h4>
                <p>{p.body}</p>
                <ul>
                  {p.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="compare" id="compare">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="section-eyebrow"><span className="dot" />How IMAI compares</span>
            <h2 className="section-title" style={{ margin: "18px auto 12px" }}>IMAI vs. <span className="accent">the rest.</span></h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Other tools cover one part of the workflow. IMAI is the only platform that covers every step — from finding the right creator to wiring their payment.
            </p>
          </div>
          <div className="compare-wrap">
            <table className="vs-table">
              <thead>
                <tr>
                  <th />
                  <th className="us">IMAI <span className="badge-pop">★ One platform</span></th>
                  <th>Modash</th>
                  <th>Upfluence</th>
                  <th>GRIN</th>
                  <th>CreatorIQ</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Creators in database", meta: "Total influencers indexed", us: "400M+", row: ["250M", "7M", "37M", "22M"] },
                  { f: "AI natural-language search", meta: "Search by intent, not filters", us: <span className="yes">✓</span>, row: [<span key="0" className="no">✕</span>, <span key="1" className="partial">Filters only</span>, <span key="2" className="no">✕</span>, <span key="3" className="partial">Beta</span>] },
                  { f: "Audience demographics", meta: "Age · gender · geo · interests", us: <span className="yes">✓</span>, row: [<span key="0" className="yes">✓</span>, <span key="1" className="yes">✓</span>, <span key="2" className="partial">Limited</span>, <span key="3" className="yes">✓</span>] },
                  { f: "Fake follower & brand safety", meta: "Audience authenticity score", us: <span className="yes">✓</span>, row: [<span key="0" className="yes">✓</span>, <span key="1" className="partial">Limited</span>, <span key="2" className="partial">Limited</span>, <span key="3" className="yes">✓</span>] },
                  { f: "Campaign management", meta: "Brief · outreach · contracts", us: <span className="yes">✓</span>, row: [<span key="0" className="no">✕</span>, <span key="1" className="yes">✓</span>, <span key="2" className="yes">✓</span>, <span key="3" className="yes">✓</span>] },
                  { f: "Creator payouts in-platform", meta: "Pay in local currency", us: "190 currencies", row: [<span key="0" className="no">✕</span>, "20 currencies", "USD only", <span key="3" className="partial">Via partner</span>] },
                  { f: "ROI tracking", meta: "EMV · GMV · CAC · UTMs", us: <span className="yes">✓</span>, row: [<span key="0" className="partial">EMV only</span>, <span key="1" className="yes">✓</span>, <span key="2" className="yes">✓</span>, <span key="3" className="yes">✓</span>] },
                  { f: "Starting price", meta: "Entry plan, monthly", us: "$175/mo", row: ["$199/mo", "Custom", "$2,500/mo", "Custom"] },
                  { f: "SOC 2 Type II", meta: "Enterprise-grade security", us: <span className="yes">✓</span>, row: [<span key="0" className="yes">✓</span>, <span key="1" className="yes">✓</span>, <span key="2" className="yes">✓</span>, <span key="3" className="yes">✓</span>] },
                ].map((r, i) => (
                  <tr key={i}>
                    <td className="feat">{r.f} <span className="meta">{r.meta}</span></td>
                    <td className="us">{r.us}</td>
                    {r.row.map((cell, j) => <td key={j}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", marginTop: 18, fontFamily: "var(--font-jetbrains), monospace", fontSize: 12, color: "var(--ink-soft)" }}>
            Last updated · public pricing &amp; product pages · May 2026
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <span className="section-eyebrow"><span className="dot" />Pricing</span>
            <h2 className="section-title" style={{ margin: "18px auto 12px" }}>Plans that <span className="accent">scale with you.</span></h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Every plan includes the full 412M+ creator database. You only pay for seats, searches, and campaigns.
            </p>
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
              <Link href="/register" className="btn btn-ink">Start free trial</Link>
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
              <div className="amt"><span className="n" style={{ fontSize: 42 }}>Custom</span></div>
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
              <Link href="/register" className="btn btn-ink">Talk to sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="container">
          <div>
            <span className="section-eyebrow"><span className="dot" />FAQ</span>
            <h2 className="section-title">Questions &amp; <span className="accent">answers.</span></h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q} <span className="pl">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <div>
          <h2>Stop guessing.<br />Start <span className="lime">paying creators</span> who work.</h2>
        </div>
        <div>
          <p>Join 1,000+ brands using IMAI to find creators worth paying for — and pay them well.</p>
          <div className="cta-row">
            <Link href="/register" className="btn btn-lime">Start free trial</Link>
            <Link href="/register" className="btn btn-ink">Book a demo →</Link>
          </div>
          <div className="joined">
            <div className="stack">
              {FACES.map((url, i) => (
                <span key={i} style={{ backgroundImage: `url('${url}')` }} />
              ))}
            </div>
            <div className="text">
              <b>Mara, Jonas, Anika &amp; 1,023</b><br />
              more marketers chose IMAI this month.
            </div>
          </div>
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

type Chip = string | { name: string; ai?: boolean; on?: boolean };

function SearchChipSection({ label, chips }: { label: string; chips: Chip[] }) {
  return (
    <div className="vs-section">
      <div className="vs-label">{label}</div>
      <div className="vs-chips">
        {chips.map((c, i) => {
          const isObj = typeof c === "object";
          const name = isObj ? c.name : c;
          const ai = isObj && c.ai;
          const on = isObj && c.on;
          return (
            <span key={i} className={`vs-chip ${ai ? "ai" : ""} ${on ? "ai-on" : ""}`}>
              <span className="ic" />
              {name}
              {ai && <span className="sp">✦</span>}
              <span className="chev">▾</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
