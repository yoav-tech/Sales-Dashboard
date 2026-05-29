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

const CHANNELS = [
  "Instagram",
  "TikTok",
  "YouTube",
  "X / Twitter",
  "LinkedIn",
  "All channels",
];

const CREATOR_TIERS = [
  "Nano · 1K–10K",
  "Micro · 10K–100K",
  "Mid · 100K–1M",
  "Macro · 1M+",
  "Celebrity",
  "A mix of everything",
];

const GOALS = [
  "Find & vet creators",
  "Run a single campaign",
  "Set up always-on programs",
  "Audit an existing roster",
  "Report ROI to leadership",
  "Migrate from another tool",
];

export default function PersonalizePage() {
  const router = useRouter();

  // single-select state (index)
  const [role, setRole] = useState(0);
  const [teamSize, setTeamSize] = useState(1);
  const [goal, setGoal] = useState(0);

  // multi-select state (Set of indices)
  const [channels, setChannels] = useState<Set<number>>(new Set([0, 1])); // IG + TT pre-selected
  const [tiers, setTiers] = useState<Set<number>>(new Set([1, 2])); // Micro + Mid pre-selected

  const toggleSet = (s: Set<number>, i: number, setter: (next: Set<number>) => void) => {
    const next = new Set(s);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setter(next);
  };

  return (
    <div className="ob personalize-page">
      <OnboardingNav current="personalize" />

      <div className="container">
        <div className="heading">
          <span className="eyebrow"><span className="dot" />Step 2 of 4</span>
          <h1>Tell us how <span className="wrap">you work.</span></h1>
          <p>Five quick taps and your workspace is set up. We use this to surface the right templates, dashboards, and creators on day one.</p>
        </div>

        <div className="panel">
          <div className="progress">
            <span className="lab">Onboarding · 50% complete</span>
            <div className="bar"><div style={{ width: "50%" }} /></div>
            <span className="lab">Step 2 / 4</span>
          </div>

          {/* Q1 Role */}
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

          {/* Q2 Team size */}
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

          {/* Q3 Channels (multi) */}
          <div className="q-group">
            <div className="q-num">03</div>
            <div className="q-label">Which channels are you focused on?</div>
            <div className="q-sub">Pick all that apply. We&apos;ll prioritize creator results from these platforms.</div>
            <div className="chips">
              {CHANNELS.map((c, i) => (
                <span
                  key={c}
                  className={`chip-opt ${channels.has(i) ? "on" : ""}`}
                  onClick={() => toggleSet(channels, i, setChannels)}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Q4 Creator tier (multi) */}
          <div className="q-group">
            <div className="q-num">04</div>
            <div className="q-label">What creator tier do you usually work with?</div>
            <div className="q-sub">We&apos;ll pre-filter discovery to the size of creators you actually book.</div>
            <div className="chips">
              {CREATOR_TIERS.map((t, i) => (
                <span
                  key={t}
                  className={`chip-opt ${tiers.has(i) ? "on" : ""}`}
                  onClick={() => toggleSet(tiers, i, setTiers)}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Q5 Primary goal */}
          <div className="q-group">
            <div className="q-num">05</div>
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
