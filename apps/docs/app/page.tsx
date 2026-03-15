import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "1rem",
        backgroundColor: "#0A0E1A",
        color: "#F9FAFB",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: 700 }}>HowlFlow</h1>
      <p style={{ color: "#9CA3AF" }}>Your ADHD-friendly focus companion</p>
      <Link
        href="/docs"
        style={{
          marginTop: "1rem",
          padding: "0.75rem 2rem",
          backgroundColor: "#00D4FF",
          color: "#0A0E1A",
          borderRadius: "0.5rem",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Read the Docs
      </Link>
    </main>
  );
}
