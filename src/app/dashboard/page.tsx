import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="dash-placeholder">
      <div className="box">
        <span className="eyebrow">Trial active</span>
        <h1>
          Welcome to your <span className="wrap">workspace.</span>
        </h1>
        <p>
          The full app dashboard isn&apos;t wired up yet. This is a placeholder so the onboarding flow completes cleanly.
          The real workspace will live here once the design is finalised.
        </p>
        <Link href="/" className="back">← Back to landing</Link>
      </div>
    </main>
  );
}
