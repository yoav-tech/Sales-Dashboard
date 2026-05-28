"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OnboardingNav } from "../Stepper";
import "./personalize.css";

const ROLES = [
  "Brand · Marketing manager",
  "Brand · Head of growth",
  "Agency · Account lead",
  "Agency · Strategist",
  "PR & comms",
  "Founder · solo",
  "Creator ops",
  "Something else",
];

const TEAM_SIZES = ["Just me", "2–10", "11–50", "51–200", "200+"];

const GOALS = [
  "Find & vet creators",
  "Run a single campaign",
  "Set up always-on programs",
  "Audit an existing roster",
  "Report ROI to leadership",
  "Migrate from another tool",
];

const TINT_CYCLE = ["lavender", "mint", "pink", "yellow", "dark"] as const;
type Tint = (typeof TINT_CYCLE)[number];

type Workspace = {
  key: string;
  className: string;
  title: string;
  body: string;
  icon: React.ReactNode;
};

const WORKSPACES: Workspace[] = [
  {
    key: "influencer",
    className: "influencer",
    title: "Influencer Marketing",
    body: "Search, vet, brief, pay creators across 400M+ profiles.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    key: "pr",
    className: "pr",
    title: "PR & Media",
    body: "Journalists, podcasters, niche editors — outreach in one inbox.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l18-8v18l-18-8z" />
        <path d="M11 19c0 1-1 2-2 2s-2-1-2-2" />
      </svg>
    ),
  },
  {
    key: "ugc",
    className: "ugc",
    title: "UGC Video Ads",
    body: "Brief, source, license short-form ad creative from creators.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="14" height="14" rx="2" />
        <path d="m21 7-4 4 4 4z" />
      </svg>
    ),
  },
  {
    key: "llm",
    className: "llm",
    title: "LLM Visibility",
    body: "Track how your brand surfaces in ChatGPT, Perplexity, Gemini.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9 7.8 7.8M16.2 16.2l2.9 2.9M4.9 19.1 7.8 16.2M16.2 7.8l2.9-2.9" />
      </svg>
    ),
  },
  {
    key: "agents",
    className: "agents",
    title: "AI Agents",
    body: "Autonomous research, outreach, and reporting agents on your data.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M9 12h.01M15 12h.01M8 3v3M16 3v3" />
      </svg>
    ),
  },
];

export default function PersonalizePage() {
  const router = useRouter();
  const [role, setRole] = useState(0);
  const [teamSize, setTeamSize] = useState(1);
  const [goal, setGoal] = useState(0);
  const [workspaces, setWorkspaces] = useState<Record<string, Tint | null>>({
    influencer: "lavender",
  });

  const toggleWorkspace = (key: string, i: number) => {
    setWorkspaces((cur) => {
      const next = { ...cur };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = TINT_CYCLE[i % TINT_CYCLE.length];
      }
      return next;
    });
  };

  return (
    <div className="ob personalize-page">
      <OnboardingNav current="personalize" />

      <div className="container">
        <div className="heading">
          <span className="eyebrow"><span className="dot" />Step 2 of 4</span>
          <h1>Tell us about <span className="wrap">you.</span></h1>
          <p>Four quick taps and your workspace is set up. We use this to surface the right templates, dashboards, and creators on day one.</p>
        </div>

        <div className="panel">
          <div className="progress">
            <span className="lab">Onboarding · 50% complete</span>
            <div className="bar"><div style={{ width: "50%" }} /></div>
            <span className="lab">Step 2 / 4</span>
          </div>

          {/* Q1 */}
          <div className="q-group">
            <div className="q-num">01</div>
            <div className="q-label">What&apos;s your role?</div>
            <div className="q-sub">Helps us tune the dashboard density and which reports show up first.</div>
            <div className="chips">
              {ROLES.map((r, i) => (
                <span key={r} className={`chip-opt ${i === role ? "on" : ""}`} onClick={() => setRole(i)}>
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div className="q-group">
            <div className="q-num">02</div>
            <div className="q-label">How big is your team?</div>
            <div className="q-sub">Just for seat planning — you can change this any time.</div>
            <div className="chips">
              {TEAM_SIZES.map((t, i) => (
                <span key={t} className={`chip-opt ${i === teamSize ? "on" : ""}`} onClick={() => setTeamSize(i)}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div className="q-group">
            <div className="q-num">03</div>
            <div className="q-label">Which workspaces do you want enabled?</div>
            <div className="q-sub">
              Pick all that apply. <span className="opt">Influencer Marketing is on by default</span> · multi-select unlocks Enterprise.
            </div>
            <div className="workspace-grid">
              {WORKSPACES.map((w, i) => {
                const tint = workspaces[w.key];
                const on = !!tint;
                return (
                  <div
                    key={w.key}
                    className={`ws-tile ${w.className} ${on ? `on ${tint}` : ""}`}
                    onClick={() => toggleWorkspace(w.key, i)}
                  >
                    <div className="ws-head">
                      <span className="ws-ico">{w.icon}</span>
                      <span className="check" />
                    </div>
                    <h5>{w.title}</h5>
                    <p>{w.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q4 */}
          <div className="q-group">
            <div className="q-num">04</div>
            <div className="q-label">What&apos;s the first job to be done?</div>
            <div className="q-sub">We&apos;ll open this workflow when you land — and stash the others for later.</div>
            <div className="chips">
              {GOALS.map((g, i) => (
                <span key={g} className={`chip-opt ${i === goal ? "on" : ""}`} onClick={() => setGoal(i)}>
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div className="actions">
            <Link className="back-link" href="/register">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <div className="right-actions">
              <Link className="skip" href="/confirm">Skip for now</Link>
              <button className="cta-btn" onClick={() => router.push("/confirm")}>
                Continue to plan
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
