"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OnboardingNav } from "../Stepper";
import "./setup.css";

type Creator = { nm: string; hd: string; reach: string; er: string; m: number; bg: string };
type Vertical = { v: string; q: string; res: Creator[] };
type Location = { v: string; mult: number; count: number };
type Audience = { v: string };
type ER = { v: string; mult: number };

const VERTICALS: Vertical[] = [
  {
    v: "Beauty",
    q: "beauty creators",
    res: [
      { nm: "Aria Wild", hd: "@ariawild", reach: "187K", er: "5.4%", m: 97, bg: "linear-gradient(135deg,#ffecf0,#f9476c)" },
      { nm: "Rosa Mora", hd: "@rosamora", reach: "112K", er: "4.8%", m: 93, bg: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
      { nm: "Mini Maskincare", hd: "@minimaskincare", reach: "94K", er: "6.1%", m: 89, bg: "linear-gradient(135deg,#e0f8f2,#06c7a9)" },
    ],
  },
  {
    v: "Fitness",
    q: "fitness creators",
    res: [
      { nm: "Hadley Fit", hd: "@hadleyfit", reach: "241K", er: "5.8%", m: 96, bg: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
      { nm: "Run With JP", hd: "@runwith.jp", reach: "128K", er: "4.9%", m: 92, bg: "linear-gradient(135deg,#e0f8f2,#06c7a9)" },
      { nm: "Maeli Strong", hd: "@maeli", reach: "88K", er: "6.3%", m: 90, bg: "linear-gradient(135deg,#eeecff,#8564ff)" },
    ],
  },
  {
    v: "Fashion",
    q: "fashion creators",
    res: [
      { nm: "Mara Linde", hd: "@maralinde", reach: "128K", er: "5.2%", m: 98, bg: "linear-gradient(135deg,#eeecff,#8564ff)" },
      { nm: "Anika Roth", hd: "@anikaroth_", reach: "311K", er: "3.8%", m: 91, bg: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
      { nm: "Jonas Becker", hd: "@jonasthrift", reach: "84K", er: "4.7%", m: 88, bg: "linear-gradient(135deg,#ffecf0,#f9476c)" },
    ],
  },
  {
    v: "Food",
    q: "food creators",
    res: [
      { nm: "Cribs & Cooks", hd: "@cribsncooks", reach: "201K", er: "5.9%", m: 95, bg: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
      { nm: "Salt & Slice", hd: "@saltslice", reach: "132K", er: "4.4%", m: 91, bg: "linear-gradient(135deg,#e0f8f2,#06c7a9)" },
      { nm: "Pantry Picks", hd: "@pantrypicks", reach: "78K", er: "7.2%", m: 88, bg: "linear-gradient(135deg,#ffecf0,#c94865)" },
    ],
  },
];

const LOCATIONS: Location[] = [
  { v: "LA", mult: 1.0, count: 2418 },
  { v: "NYC", mult: 1.15, count: 2780 },
  { v: "London", mult: 0.82, count: 1985 },
  { v: "Berlin", mult: 0.6, count: 1450 },
  { v: "Tokyo", mult: 0.45, count: 1090 },
  { v: "Global", mult: 5.4, count: 13050 },
];

const AUDIENCES: Audience[] = [
  { v: "80%+ female, 25–34" },
  { v: "60%+ male, 18–24" },
  { v: "Gen-Z, mixed" },
  { v: "Millennials, mixed" },
  { v: "Parents, 30–45" },
];

const ERS: ER[] = [
  { v: "2%", mult: 1.4 },
  { v: "3%", mult: 1.0 },
  { v: "4%", mult: 0.68 },
  { v: "5%", mult: 0.42 },
  { v: "7%", mult: 0.21 },
];

type TaskKey = "saveSearch" | "buildList" | "scheduleReport";

export default function SetupPage() {
  const [verticalI, setVerticalI] = useState(0);
  const [locationI, setLocationI] = useState(0);
  const [audienceI, setAudienceI] = useState(0);
  const [erI, setErI] = useState(1);

  const [results, setResults] = useState<Creator[]>(VERTICALS[0].res);
  const [resultsLocation, setResultsLocation] = useState("LA");
  const [resultsKey, setResultsKey] = useState(0);

  const [count, setCount] = useState(2418);
  const [refineOpen, setRefineOpen] = useState(false);
  const [resultsFade, setResultsFade] = useState(false);

  const [done, setDone] = useState<Record<TaskKey, boolean>>({
    saveSearch: false,
    buildList: false,
    scheduleReport: false,
  });

  const verticalData = VERTICALS[verticalI];
  const locationData = LOCATIONS[locationI];
  const audienceData = AUDIENCES[audienceI];
  const erData = ERS[erI];

  // Ticker
  useEffect(() => {
    const i = setInterval(() => {
      setCount((c) => c + (Math.random() > 0.5 ? 1 : -1));
    }, 2200);
    return () => clearInterval(i);
  }, []);

  const apply = () => {
    setResultsFade(true);
    setTimeout(() => {
      setResults(verticalData.res);
      setResultsLocation(locationData.v);
      setResultsKey((k) => k + 1);
      setCount(Math.round(locationData.count * erData.mult));
      setResultsFade(false);
    }, 220);
    setRefineOpen(false);
  };

  const reset = () => {
    setVerticalI(0);
    setLocationI(0);
    setAudienceI(0);
    setErI(1);
  };

  const doneCount = Object.values(done).filter(Boolean).length;
  const fillPct = (doneCount / 3) * 100;

  const toggleTask = (k: TaskKey) => setDone((d) => ({ ...d, [k]: !d[k] }));

  return (
    <div className="ob setup-page">
      <OnboardingNav current="setup" />

      <div className="container">
        <div className="heading">
          <span className="eyebrow"><span className="dot" />Step 4 of 4 · Your workspace is live</span>
          <h1>We already started <span className="wrap">working.</span></h1>
          <p>
            Based on what you told us, your first AI search is ready. <b>{count.toLocaleString()} creators</b> matched — review them now, or finish setup on the right.
          </p>
        </div>

        <div className="main-grid">
          {/* Hero search widget */}
          <div className="search-widget">
            <div className="sw-head">
              <span className="sw-lab"><span className="d" />AI Search · pre-filled from your answers</span>
              <span className="sw-pill">Live</span>
            </div>

            <div className="q-input">
              <span className="gt">›</span>
              <span>
                Find <span className="em">{verticalData.q}</span> in <span className="em">{locationData.v}</span> with{" "}
                <span className="em">80%+ female audience</span> aged <span className="em">25–34</span> and engagement{" "}
                <span className="em">above 3%</span>.<span className="cursor" />
              </span>
            </div>
            <div className="q-meta">
              <span>Top matches</span>
              <span>·</span>
              <span className="count">{count.toLocaleString()} creators</span>
              <span>·</span>
              <span>refreshed 2s ago</span>
            </div>

            <div
              className="results"
              key={resultsKey}
              style={resultsFade ? { opacity: 0, transform: "translateY(4px)" } : undefined}
            >
              {results.map((r, i) => (
                <div key={i} className="res-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="av" style={{ background: r.bg }} />
                  <div>
                    <div className="nm">{r.nm}</div>
                    <div className="hd">{r.hd} · IG · {resultsLocation}</div>
                  </div>
                  <div className="stats">
                    <div className="stat"><div className="v">{r.reach}</div><div className="l">Reach</div></div>
                    <div className="stat"><div className="v">{r.er}</div><div className="l">ER</div></div>
                  </div>
                  <span className="match">{r.m}%</span>
                </div>
              ))}
            </div>

            <div className="sw-cta-row">
              <Link className="primary" href="/dashboard">
                See all {count.toLocaleString()} matches
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <button className="ghost" onClick={() => setRefineOpen((o) => !o)}>
                {refineOpen ? "Close" : "Refine query"}
              </button>
            </div>

            <div className={`refine-panel ${refineOpen ? "open" : ""}`} aria-hidden={!refineOpen}>
              <div className="refine-head">
                <span className="lab">Refine your search · click any field to cycle options</span>
                <button className="close" onClick={() => setRefineOpen(false)} aria-label="Close refine panel">×</button>
              </div>
              <div className="refine-grid">
                <button className="refine-fld" onClick={() => setVerticalI((i) => (i + 1) % VERTICALS.length)}>
                  <div className="l">Vertical</div>
                  <div className="v"><span>{verticalData.v}</span><span className="chev">▾</span></div>
                </button>
                <button className="refine-fld" onClick={() => setLocationI((i) => (i + 1) % LOCATIONS.length)}>
                  <div className="l">Location</div>
                  <div className="v"><span>{locationData.v}</span><span className="chev">▾</span></div>
                </button>
                <button className="refine-fld" onClick={() => setAudienceI((i) => (i + 1) % AUDIENCES.length)}>
                  <div className="l">Audience</div>
                  <div className="v"><span>{audienceData.v}</span><span className="chev">▾</span></div>
                </button>
                <button className="refine-fld" onClick={() => setErI((i) => (i + 1) % ERS.length)}>
                  <div className="l">Min engagement</div>
                  <div className="v"><span>{erData.v}</span><span className="chev">▾</span></div>
                </button>
              </div>
              <div className="refine-actions">
                <button className="apply" onClick={apply}>Apply &amp; re-search</button>
                <button className="reset" onClick={reset}>Reset</button>
              </div>
            </div>
          </div>

          {/* Side checklist */}
          <div className="side">
            <div className="panel-head">
              <h3>Make this search yours</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="progress-bar"><div style={{ width: `${fillPct}%` }} /></div>
                <span className="progress"><b>{doneCount}</b>/3</span>
              </div>
            </div>

            <div className={`task-card purple ${done.saveSearch ? "done" : ""}`} onClick={() => toggleTask("saveSearch")}>
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <div className="body">
                <div className="nm">Save this search</div>
                <div className="sub">Re-run it weekly. We&apos;ll surface new creators that match your prompt.</div>
                <div className="time">1-click · stays in your sidebar</div>
              </div>
              <span className="check" />
            </div>

            <div className={`task-card pink ${done.buildList ? "done" : ""}`} onClick={() => toggleTask("buildList")}>
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
              </span>
              <div className="body">
                <div className="nm">Build your first list</div>
                <div className="sub">Group shortlisted creators into a roster you can brief and outreach in bulk.</div>
                <div className="time">Optional · ~1 min</div>
              </div>
              <span className="check" />
            </div>

            <div className={`task-card yellow ${done.scheduleReport ? "done" : ""}`} onClick={() => toggleTask("scheduleReport")}>
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m7 14 4-4 4 4 5-6" />
                </svg>
              </span>
              <div className="body">
                <div className="nm">Schedule a weekly report</div>
                <div className="sub">Audience, ER, and ROI digest in your inbox every Monday — share with your team.</div>
                <div className="time">Optional · skip ok</div>
              </div>
              <span className="check" />
            </div>

            <div className="skip-link">
              Skip everything — <Link href="/dashboard">go straight to the dashboard →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
