import Link from "next/link";

export default function DashboardPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
        fontFamily: "var(--font-poppins), system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            background: "var(--ink)",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: 999,
            marginBottom: 20,
          }}
        >
          Trial active
        </span>
        <h1
          style={{
            fontSize: 48,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          Welcome to your{" "}
          <span
            style={{
              display: "inline-block",
              background: "var(--ink)",
              color: "#fff",
              padding: "0 12px 4px",
              borderRadius: 14,
              transform: "rotate(-1.5deg)",
            }}
          >
            workspace.
          </span>
        </h1>
        <p style={{ fontSize: 16, color: "var(--ink-muted)", lineHeight: 1.6, marginBottom: 28 }}>
          The full app dashboard isn&apos;t wired up yet. This is a placeholder so the onboarding flow completes cleanly.
          The real workspace will live here once the design is finalised.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 22px",
            background: "var(--accent)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            borderRadius: 12,
            border: "1.5px solid var(--ink)",
            boxShadow: "4px 4px 0 0 var(--ink)",
          }}
        >
          ← Back to landing
        </Link>
      </div>
    </main>
  );
}
