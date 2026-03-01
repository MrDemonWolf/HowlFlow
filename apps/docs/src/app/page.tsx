import Link from "next/link";
import Image from "next/image";

const FEATURES = [
  {
    icon: "📅",
    title: "Schedule Blocks",
    description:
      "12 wolf-themed daily blocks from Morning Howl to Moonlight Wind Down. Built for ADHD brains that thrive with structure.",
  },
  {
    icon: "🎯",
    title: "Focus Timer",
    description:
      "Pomodoro-style timer with work/break cycles. Visual progress ring and haptic feedback keep you locked in.",
  },
  {
    icon: "🧠",
    title: "Brain Dump",
    description:
      "Quick-capture thoughts before they disappear. No friction, no folders — just dump and go.",
  },
  {
    icon: "🏆",
    title: "Wins & Streaks",
    description:
      "XP system with wolf levels from Pup to Lone Wolf Legend. Grace days protect your streak when life happens.",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Open HowlFlow",
    description:
      "Your daily schedule generates automatically based on your wake-up time.",
  },
  {
    step: "2",
    title: "Work Through Blocks",
    description:
      "Check off subtasks, start focus timers, and dump thoughts as they come.",
  },
  {
    step: "3",
    title: "Watch Your Pack Grow",
    description:
      "Earn XP, level up your wolf rank, and build streaks that stick.",
  },
];

const SCREENSHOTS = [
  { label: "Schedule View", file: "schedule.png" },
  { label: "Focus Timer", file: "timer.png" },
  { label: "Brain Dump", file: "dump.png" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#091533] text-white">
      {/* NavBar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#091533]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="HowlFlow" width={32} height={32} />
            <span className="text-lg font-bold">
              Howl<span className="text-[#0FACED]">Flow</span>
            </span>
          </Link>
          <Link
            href="/docs"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20"
          >
            Docs
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pb-16 pt-24 text-center">
        <div className="relative mb-8">
          {/* Radial glow */}
          <div className="absolute inset-0 -m-6 rounded-3xl bg-[#0FACED]/20 blur-2xl" />
          <div className="relative rounded-[2rem] bg-gradient-to-br from-[#0F1F45] to-[#091533] p-6 shadow-2xl ring-1 ring-white/10">
            <Image
              src="/logo.svg"
              alt="HowlFlow logo"
              width={120}
              height={120}
            />
          </div>
        </div>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight">
          Howl<span className="text-[#0FACED]">Flow</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-slate-300">
          Your ADHD companion. Structured like a pack, built for your brain.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <span className="rounded-full bg-[#0FACED]/10 px-6 py-3 text-sm font-medium text-[#0FACED] ring-1 ring-[#0FACED]/30">
            Coming Soon to the App Store
          </span>
          <Link
            href="/docs"
            className="rounded-full bg-[#0FACED] px-6 py-3 text-sm font-semibold text-[#091533] transition-colors hover:bg-[#3bbfed]"
          >
            Read the Docs
          </Link>
        </div>
      </section>

      {/* Screenshots */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {SCREENSHOTS.map((s) => (
            <div
              key={s.label}
              className="flex aspect-[9/16] items-center justify-center rounded-2xl border-2 border-dashed border-[#1E3A6E] bg-[#0F1F45]/50"
            >
              {/* Replace with: <Image src={`/screenshots/${s.file}`} alt={s.label} fill className="object-cover rounded-2xl" /> */}
              <span className="text-sm text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Built for How Your Brain Works
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-[#1E3A6E] bg-[#0F1F45] p-6 transition-colors hover:border-[#0FACED]/40"
            >
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="mb-10 text-center text-3xl font-bold">How It Works</h2>
        <div className="flex flex-col gap-8">
          {STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0FACED] text-lg font-bold text-[#091533]">
                {s.step}
              </div>
              <div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="text-sm text-slate-300">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Designed for ADHD */}
      <section className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <h2 className="mb-4 text-3xl font-bold">Designed for ADHD</h2>
        <p className="mx-auto max-w-xl text-slate-300">
          No overwhelming options. No complex setup. Just open the app and
          follow the blocks. Every feature is designed with ADHD teens in mind —
          from the visual timers to the grace-day streak system that doesn&apos;t
          punish you for being human.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1E3A6E] px-6 py-8 text-center text-sm text-slate-400">
        <div className="flex justify-center gap-6">
          <Link href="/docs" className="hover:text-white">
            Documentation
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms of Service
          </Link>
        </div>
        <p className="mt-4">
          &copy; {new Date().getFullYear()} MrDemonWolf. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
