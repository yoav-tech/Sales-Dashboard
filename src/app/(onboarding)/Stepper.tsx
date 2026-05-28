import Link from "next/link";

export type StepKey = "register" | "personalize" | "confirm" | "setup";

const STEPS: { key: StepKey; label: string; n: number }[] = [
  { key: "register", label: "Register", n: 1 },
  { key: "personalize", label: "Personalize", n: 2 },
  { key: "confirm", label: "Confirm", n: 3 },
  { key: "setup", label: "Setup", n: 4 },
];

function state(current: StepKey, key: StepKey) {
  const ci = STEPS.findIndex((s) => s.key === current);
  const ki = STEPS.findIndex((s) => s.key === key);
  if (ki < ci) return "done";
  if (ki === ci) return "active";
  return "upcoming";
}

export function OnboardingNav({ current }: { current: StepKey }) {
  return (
    <nav className="top">
      <div className="container inner">
        <Link className="logo" href="/">
          <span className="logo-mark" />
          <span className="name">
            <span>Influencer</span>
            <span>
              Marketing<span className="ai">.Ai</span>
            </span>
          </span>
        </Link>
        <div className="stepper">
          {STEPS.map((s, i) => {
            const st = state(current, s.key);
            return (
              <span key={s.key} style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
                <div className={`step ${st}`}>
                  <span className="circle">
                    {st === "done" ? null : <span className="num">{s.n}</span>}
                  </span>
                  <span className="label">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div className="line" />}
              </span>
            );
          })}
        </div>
        <a href="#" className="help">Need help?</a>
      </div>
    </nav>
  );
}
