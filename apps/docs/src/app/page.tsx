export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/howlflow/icon.svg"
        alt="HowlFlow logo"
        width={96}
        height={96}
        className="mb-6"
      />
      <h1 className="text-5xl font-bold text-wolf-blue mb-4 tracking-tight">
        HowlFlow
      </h1>
      <p className="text-xl text-text-secondary mb-12 text-center max-w-xl">
        Your wolf-themed ADHD daily companion. Block your time, focus your hunt,
        dump your thoughts, celebrate your wins.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full mb-16">
        <FeatureCard
          title="Schedule Blocks"
          description="Structure your day with ADHD-friendly time blocks. Routine, focus, breaks — all on your terms."
        />
        <FeatureCard
          title="Focus Hunt Timer"
          description="Lock in with a distraction-free timer. Track your focus sessions and build momentum."
        />
        <FeatureCard
          title="Brain Dump"
          description="Unload your thoughts instantly. No friction, no judgement — just flow."
        />
        <FeatureCard
          title="Pack Report"
          description="Celebrate every win. Streaks, stats, and encouragement — because you deserve it."
        />
      </div>

      <div className="flex gap-4 text-sm text-text-secondary">
        <a href="/howlflow/privacy" className="hover:text-wolf-blue underline">
          Privacy Policy
        </a>
        <span>|</span>
        <a href="/howlflow/terms" className="hover:text-wolf-blue underline">
          Terms of Service
        </a>
      </div>

      <p className="mt-8 text-text-secondary text-sm">
        Coming soon to the App Store.
      </p>
      <p className="mt-2 text-text-secondary text-xs opacity-60">
        &copy; {new Date().getFullYear()} MrDemonWolf, Inc.
      </p>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-bg-card rounded-xl p-6 border border-wolf-blue/20">
      <h3 className="text-lg font-semibold text-wolf-blue mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  );
}
