"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OnboardingNav } from "../Stepper";
import "./confirm.css";

type Cycle = "year" | "month";

const BASE = { month: 175, year: 1788 };

type AddonRow = {
  label: string;
  month: number | null;
  year: number | null;
  cls: string;
  icon: React.ReactNode;
};

const ADDON_META: Record<string, AddonRow> = {
  pr: {
    label: "PR & Media",
    month: 59,
    year: 590,
    cls: "pr",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l18-8v18l-18-8z" />
      </svg>
    ),
  },
  ugc: {
    label: "UGC Video Ads",
    month: 249,
    year: 2490,
    cls: "ugc",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="14" height="14" rx="2" />
        <path d="m21 7-4 4 4 4z" />
      </svg>
    ),
  },
  llm: {
    label: "LLM Visibility",
    month: 39,
    year: 390,
    cls: "llm",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9 7.8 7.8M16.2 16.2l2.9 2.9M4.9 19.1 7.8 16.2M16.2 7.8l2.9-2.9" />
      </svg>
    ),
  },
  agents: {
    label: "AI Agents",
    month: null,
    year: null,
    cls: "agents",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M9 12h.01M15 12h.01M8 3v3M16 3v3" />
      </svg>
    ),
  },
};

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

export default function ConfirmPage() {
  const router = useRouter();
  const [cycle, setCycle] = useState<Cycle>("year");
  const [method, setMethod] = useState<"card" | "bank">("card");
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [selection, setSelection] = useState<string[]>([]);

  // Read addons selection from /personalize via localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("imai_addons");
      if (!raw) return;
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        setSelection(arr.filter((k: string) => k !== "influencer"));
      }
    } catch {
      // ignore
    }
  }, []);

  const paid = selection.filter((k) => ADDON_META[k] && ADDON_META[k][cycle] != null);
  const hasAgents = selection.includes("agents");
  const addonsAmt = paid.reduce((s, k) => s + (ADDON_META[k][cycle] as number), 0);
  const total = BASE[cycle] + addonsAmt;
  const periodAbbrev = cycle === "year" ? "/yr" : "/mo";
  const periodFull = cycle === "year" ? "year" : "month";

  const applyCoupon = () => {
    if (coupon.trim()) setApplied(true);
  };

  return (
    <div className="ob confirm-page">
      <OnboardingNav current="confirm" />

      <div className="container">
        <div className="heading">
          <h1>Enter card details to activate your trial</h1>
          <p>Your trial is 100% free. Cancel anytime with one click.</p>
        </div>

        <div className="grid">
          {/* LEFT: Plan summary */}
          <div>
            <div className="panel">
              <div className="plan-head">
                <div className="lab">Starter plan</div>
                <h3>2 seats · in-house teams</h3>
                <div className="users"><b>Unlimited</b> discovery · 250 creator unlocks / month</div>
              </div>

              <div className="feat-list">
                <div className="feat-row">
                  <span className="ic pink">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                  </span>
                  <span className="nm">AI Influencer Search</span>
                  <span className="val">Unlimited</span>
                </div>
                <div className="feat-row">
                  <span className="ic purple">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></svg>
                  </span>
                  <span className="nm">Creator Discovery <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>· 400M+</span></span>
                  <span className="val">Unlimited</span>
                </div>
                <div className="feat-row">
                  <span className="ic teal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                  </span>
                  <span className="nm">Analyze creators</span>
                  <span className="val">50 / mo</span>
                </div>
                <div className="feat-row">
                  <span className="ic yellow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  </span>
                  <span className="nm">Email export</span>
                  <span className="val">250 / mo</span>
                </div>
                <div className="feat-row">
                  <span className="ic pink">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  </span>
                  <span className="nm">Creator database</span>
                  <span className="val">400M+</span>
                </div>
                <div className="feat-row">
                  <span className="ic teal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  </span>
                  <span className="nm">Priority support</span>
                  <span className="val check">✓</span>
                </div>
              </div>

              <a href="#" className="switch-plan">← Switch to a different plan</a>

              <div className="addons-included">
                <div className="ai-head"><span className="dot" />Active workspaces</div>
                <div>
                  {selection.length === 0 ? (
                    <div className="ai-empty">Influencer Marketing only.</div>
                  ) : (
                    selection.map((k) => {
                      const a = ADDON_META[k];
                      if (!a) return null;
                      const price = a[cycle] != null ? fmt(a[cycle] as number) + periodAbbrev : "Custom quote";
                      return (
                        <div key={k} className={`ai-row ${a.cls}`}>
                          <span className="ai-ic">{a.icon}</span>
                          <span className="ai-nm">{a.label}</span>
                          <span className="ai-pr">{price}</span>
                        </div>
                      );
                    })
                  )}
                </div>
                <Link className="edit-addons" href="/personalize">← Edit add-ons</Link>
              </div>
            </div>

            <div className="panel trust">
              <div className="row">
                <span className="ic2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </span>
                <div>
                  <div className="ttl">Money-back guarantee</div>
                  <div className="desc">Full refund within 15 days of purchase.</div>
                </div>
              </div>
              <div className="row">
                <span className="ic2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10" /><path d="M4.93 4.93l14.14 14.14" /></svg>
                </span>
                <div>
                  <div className="ttl">Cancel anytime</div>
                  <div className="desc">One-click cancellation, no strings attached.</div>
                </div>
              </div>
              <div className="row">
                <span className="ic2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </span>
                <div>
                  <div className="ttl">21/5 livechat support</div>
                  <div className="desc">Real humans Mon–Fri, 6am–5pm.</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Payment form */}
          <div>
            <div className="panel">
              {/* billing cycle */}
              <div className="pricing-tabs">
                <button className={`ptab ${cycle === "year" ? "on" : ""}`} onClick={() => setCycle("year")}>
                  <div className="top">
                    <div>
                      <div style={{ fontSize: 11, color: "var(--ink-muted)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                        Annual
                      </div>
                      <div className="amt"><span className="n">$1,788</span><span className="per">/year</span></div>
                    </div>
                    <span className="radio" />
                  </div>
                  <div className="meta"><span className="save">Save $312</span></div>
                </button>
                <button className={`ptab ${cycle === "month" ? "on" : ""}`} onClick={() => setCycle("month")}>
                  <div className="top">
                    <div>
                      <div style={{ fontSize: 11, color: "var(--ink-muted)", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                        Monthly
                      </div>
                      <div className="amt"><span className="n">$175</span><span className="per">/mo</span></div>
                    </div>
                    <span className="radio" />
                  </div>
                  <div className="meta">~15% more than annual</div>
                </button>
              </div>

              {/* method tabs */}
              <div className="method-row">
                <button className={`mtab ${method === "card" ? "on" : ""}`} onClick={() => setMethod("card")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                  Card
                </button>
                <button className={`mtab ${method === "bank" ? "on" : ""}`} onClick={() => setMethod("bank")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" /></svg>
                  Bank
                  <span className="badge">$5 back</span>
                </button>
              </div>

              {/* Link banner */}
              <div className="link-banner">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 11V9a7 7 0 0 0-14 0v2" /><rect x="3" y="11" width="18" height="11" rx="2" /></svg>
                <span><b>Secure, fast checkout with Link</b></span>
                <span className="chev">›</span>
              </div>

              <div className="field card-field">
                <label>Card number</label>
                <input className="fld" placeholder="1234 1234 1234 1234" style={{ paddingRight: 120 }} />
                <div className="brands">
                  <span className="brand link">link</span>
                  <span className="brand on">VISA</span>
                  <span className="brand">MC</span>
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Expiration date</label>
                  <input className="fld" placeholder="MM / YY" />
                </div>
                <div className="field">
                  <label>Security code</label>
                  <input className="fld" placeholder="CVC" />
                </div>
              </div>

              <div className="field">
                <label>Country</label>
                <select className="fld">
                  <option>United States</option>
                  <option>Israel</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="field">
                <label>Coupon code</label>
                <div className="coupon-row">
                  <input
                    className="fld"
                    placeholder="Add coupon code"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      if (applied) setApplied(false);
                    }}
                  />
                  <button className={`apply-btn ${applied ? "applied" : ""}`} onClick={applyCoupon} type="button">
                    {applied ? "✓ Applied" : "Apply"}
                  </button>
                </div>
              </div>

              {(paid.length > 0 || hasAgents) && (
                <div className="addons-summary visible">
                  <div className="as-head">Workspace add-ons</div>
                  <div className="as-row as-base">
                    <span className="as-nm">Base plan · 2 seats</span>
                    <span className="as-pr">{fmt(BASE[cycle])}{periodAbbrev}</span>
                  </div>
                  {paid.map((k) => {
                    const a = ADDON_META[k];
                    return (
                      <div key={k} className="as-row">
                        <span className="as-nm">{a.label}</span>
                        <span className="as-pr">+{fmt(a[cycle] as number)}{periodAbbrev}</span>
                      </div>
                    );
                  })}
                  {hasAgents && (
                    <div className="as-row custom">
                      <span className="as-nm">AI Agents</span>
                      <span className="as-pr">Talk to us</span>
                    </div>
                  )}
                </div>
              )}

              {hasAgents && (
                <div className="agents-banner visible">
                  <svg className="ab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                  <div>
                    <b>AI Agents quote pending.</b> Our team will follow up within 24h with custom pricing — not charged today.
                  </div>
                </div>
              )}

              <div className="total-row">
                <div className="ttl-lab">Total due today</div>
                <div className="ttl-amt"><span className="strike">{fmt(total)}</span>$0.00</div>
                <div className="ttl-meta">After your 7-day trial: <b>{fmt(total)} / {periodFull}</b></div>
              </div>

              <button className="cta-btn" onClick={() => router.push("/setup")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                Pay $0 and start your 7-day trial
              </button>

              <div className="trust-badges">
                <Image
                  src="/assets/trust-badges.png"
                  alt="G2 High Performer (EMEA & Summer 2024), Digital Awards 2022, Forbes Technology Council, Top 10 Software"
                  width={520}
                  height={56}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              <p className="below-cta">
                You won&apos;t be charged during your 7-day trial. End your subscription anytime with one click. By providing your card, you agree to our <a href="#">Terms</a>.
              </p>

              <div className="stripe-row">
                <span>256-bit SSL · PCI-DSS</span>
                <span className="stripe">
                  Powered by
                  <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" fill="#9a9a9a">
                    <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 9.05c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.36 9.4v9.74h-4.12V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.88zm-4.91.7c0 2.43-2.07 3.86-5.06 3.86a8.79 8.79 0 0 1-3.39-.71v-3.78c1.18.6 2.69 1.08 3.42 1.08.49 0 .85-.13.85-.54 0-1.06-4.34-.66-4.34-3.77 0-2.4 1.85-3.84 4.78-3.84 1.07 0 2.14.16 3.21.54v3.76c-.98-.55-2.23-.85-3.21-.85-.46 0-.76.13-.76.5 0 .99 4.5.52 4.5 3.76z" fillRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
