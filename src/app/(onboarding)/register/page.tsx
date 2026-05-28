"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OnboardingNav } from "../Stepper";
import "./register.css";

type Review = {
  stars: number;
  lab: string;
  q: string;
  nm: string;
  role: string;
  av: string;
};

const REVIEWS: Review[] = [
  { stars: 5, lab: "From a Growth lead", q: "\"We replaced four tools and a shared spreadsheet in week one. The AI search alone is worth the seat.\"", nm: "Sofia Kraus", role: "Brand · DTC beauty", av: "linear-gradient(135deg,#e0f8f2,#06c7a9)" },
  { stars: 5, lab: "From a Brand Manager", q: "\"Finally a creator search that understands intent, not keywords. We brief 3x faster now.\"", nm: "Mara Linde", role: "Growth · Fashion", av: "linear-gradient(135deg,#eeecff,#8564ff)" },
  { stars: 5, lab: "From a Marketing Lead", q: "\"Closed 19 creator deals in our first month — none of them through cold email.\"", nm: "Jonas Becker", role: "Marketing · DTC fitness", av: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
  { stars: 5, lab: "From a Growth Lead", q: "\"Audience overlap reports paid for the seat in 48 hours. Wild ROI on a single feature.\"", nm: "Anika Roth", role: "Growth · D2C food", av: "linear-gradient(135deg,#ffecf0,#f9476c)" },
  { stars: 4, lab: "From an Ops Director", q: "\"The pipeline view is the only one our finance team actually trusts. Payouts just work.\"", nm: "Helena Witt", role: "Ops · Lifestyle brand", av: "linear-gradient(135deg,#e0f8f2,#299d88)" },
  { stars: 5, lab: "From a Brand Lead", q: "\"We use AI Search before every product launch now. Honestly a game-changer for vetting.\"", nm: "Lea Vogel", role: "Brand · Beauty", av: "linear-gradient(135deg,#fdf4c0,#f9476c)" },
  { stars: 5, lab: "From a Finance Lead", q: "\"Payouts in 38 currencies meant zero invoice ping-pong with the finance team. A miracle.\"", nm: "Theo Marchetti", role: "Finance · Travel", av: "linear-gradient(135deg,#eeecff,#6442dd)" },
  { stars: 5, lab: "From an Agency Director", q: "\"Onboarded our whole agency team in an afternoon. Replaced three SaaS subscriptions on day one.\"", nm: "Priya Shah", role: "Director · Creative agency", av: "linear-gradient(135deg,#e0f8f2,#06c7a9)" },
  { stars: 4, lab: "From a VP of Growth", q: "\"ROI dashboards I can actually screenshot straight into the CMO deck. Saves me a day a week.\"", nm: "Daniel Park", role: "VP Growth · B2B SaaS", av: "linear-gradient(135deg,#fdf4c0,#efcc01)" },
  { stars: 5, lab: "From an Influencer Lead", q: "\"Best creator outreach reply rate we've seen in six years of running campaigns.\"", nm: "Camille Roux", role: "Influencer Lead · Skincare", av: "linear-gradient(135deg,#ffecf0,#c94865)" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [swap, setSwap] = useState(false);

  useEffect(() => {
    const SWAP_MS = 5000;
    const interval = setInterval(() => {
      setSwap(true);
      setTimeout(() => {
        setReviewIdx((i) => (i + 1) % REVIEWS.length);
        setSwap(false);
      }, 320);
    }, SWAP_MS);
    return () => clearInterval(interval);
  }, []);

  const strength = (() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  })();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/personalize");
  };

  const r = REVIEWS[reviewIdx];

  return (
    <div className="ob register-page">
      <OnboardingNav current="register" />

      <div className="container">
        <div className="heading">
          <span className="eyebrow"><span className="dot" />Step 1 of 4</span>
          <h1>Create your <span className="wrap">account</span></h1>
          <p>60 seconds to set up. 7 days free. Cancel anytime — no card needed yet.</p>
        </div>

        <div className="grid">
          {/* LEFT: form */}
          <form className="panel" onSubmit={onSubmit}>
            <h2>Get started</h2>
            <p className="panel-sub">
              Already using IMAI?{" "}
              <Link href="/register" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "underline" }}>
                Sign in instead
              </Link>.
            </p>

            <div className="social-row">
              <button type="button" className="social" onClick={() => router.push("/personalize")}>
                <svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C40.9 36.7 44 30.9 44 24c0-1.2-.1-2.4-.4-3.5z"/></svg>
                Continue with Google
              </button>
            </div>

            <div className="divider">or sign up with email</div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <input className="fld" id="firstName" name="firstName" placeholder="Mara" />
              </div>
              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <input className="fld" id="lastName" name="lastName" placeholder="Linde" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Work email</label>
              <input className="fld" id="email" name="email" type="email" placeholder="mara@yourcompany.com" />
            </div>

            <div className="field">
              <label htmlFor="company">Company</label>
              <input className="fld" id="company" name="company" placeholder="Your brand or agency" />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="fld-pw-wrap">
                <input
                  className="fld"
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="At least 8 characters"
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPw(!showPw)}>
                  {showPw ? "HIDE" : "SHOW"}
                </button>
              </div>
              <div className="pw-strength">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`bar ${i < strength ? "on" : ""}`} />
                ))}
              </div>
              <p className="pw-hint">8+ characters · 1 number · 1 symbol</p>
            </div>

            <div className="check-row" onClick={() => setAgreed(!agreed)}>
              <span className={`check ${agreed ? "on" : ""}`} />
              <span>
                I agree to the <a href="#" onClick={(e) => e.stopPropagation()}>Terms of Service</a> and{" "}
                <a href="#" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>, and I&apos;d like product updates from IMAI.
              </span>
            </div>

            <button type="submit" className="cta-btn">
              Continue
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>

            <p className="signin-line">
              Already have an account? <a href="#">Sign in</a>
            </p>
          </form>

          {/* RIGHT: side bento */}
          <div className="side">
            <div className="tile lavender stat-tile">
              <div className="tile-lab"><span className="d" />Database</div>
              <div className="n"><span className="ac">400M+</span></div>
              <div className="lab">creators across IG · TikTok · YouTube · X — refreshed every 24h.</div>
            </div>

            <div className="tile dark">
              <div className="tile-lab"><span className="d" />What you get on day one</div>
              <ul className="perks">
                <li><span className="ic">✓</span><span><b>Unlimited</b> AI Influencer Search across the full graph.</span></li>
                <li><span className="ic">✓</span><span><b>250 creator unlocks</b> per month — vet audiences, ER, fakes.</span></li>
                <li><span className="ic">✓</span><span><b>50 deep analyses</b> + 250 email exports a month.</span></li>
                <li><span className="ic">✓</span><span><b>Priority support</b> from real humans, not a bot queue.</span></li>
              </ul>
            </div>

            <div className={`tile mint quote-tile ${swap ? "swap" : ""}`}>
              <div className="tile-lab"><span className="d" />{r.lab}</div>
              <div className="review">
                <div className="stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className={`s ${i < r.stars ? "" : "off"}`}>★</span>
                  ))}
                </div>
                <p>{r.q}</p>
                <div className="quote-author">
                  <div className="av" style={{ background: r.av }} />
                  <div>
                    <div className="nm">{r.nm}</div>
                    <div className="role">{r.role}</div>
                  </div>
                </div>
              </div>
              <div className="review-dots">
                {REVIEWS.map((_, i) => (
                  <span key={i} className={`rd ${i === reviewIdx ? "on" : ""}`} />
                ))}
              </div>
            </div>

            <div className="trust-mini">
              <span className="badge"><span className="dot" />SOC 2 Type II</span>
              <span className="badge"><span className="dot" />GDPR ready</span>
              <span className="badge"><span className="dot" />1,000+ brands</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
