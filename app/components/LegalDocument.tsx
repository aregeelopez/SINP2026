import Link from "next/link";

interface LegalDocumentProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 18,
        fontWeight: 800,
        color: "var(--text-dark)",
        marginTop: 32,
        marginBottom: 12,
      }}
    >
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: 16 }}>{children}</p>;
}

export function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul style={{ marginBottom: 16, paddingLeft: 20, listStyleType: "disc" }}>
      {children}
    </ul>
  );
}

export function Li({ children }: { children: React.ReactNode }) {
  return <li style={{ marginBottom: 8 }}>{children}</li>;
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        marginTop: 40,
        paddingTop: 20,
        borderTop: "1px solid var(--border)",
        fontSize: 13,
        color: "var(--text-soft)",
        fontStyle: "italic",
      }}
    >
      {children}
    </p>
  );
}

export default function LegalDocument({ title, lastUpdated, children }: LegalDocumentProps) {
  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 96px" }}>
        <Link
          href="/"
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--accent)",
            textDecoration: "none",
          }}
        >
          ← Back to SINP
        </Link>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "var(--text-dark)",
            marginTop: 24,
            marginBottom: 4,
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-soft)", marginBottom: 40 }}>
          Last updated: {lastUpdated}
        </p>

        <div
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: "var(--text-mid)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
