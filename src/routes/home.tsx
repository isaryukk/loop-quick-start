import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { BookOpen, User, Home, ChevronRight, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
  head: () => ({ meta: [{ title: "CivicLoop — Home" }] }),
});

function getLevel(xp: number): string {
  if (xp >= 2000) return "Strategist";
  if (xp >= 1000) return "Scholar";
  if (xp >= 500) return "Analyst";
  if (xp >= 200) return "Researcher";
  return "Observer";
}

function HomePage() {
  const [xp, setXp] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    setXp(parseInt(localStorage.getItem("civicloop_xp") || "0"));
    setLoop(parseInt(localStorage.getItem("civicloop_streak") || "0"));
  }, []);

  const level = getLevel(xp);

  return (
    <main className="relative flex min-h-screen flex-col bg-background pb-24 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }}
      />

      {/* Top bar */}
      <header className="relative flex items-center justify-between px-6 pt-14 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.18_350)]" />
          <span className="text-base font-bold tracking-tight text-white">CivicLoop</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-white">{xp} XP</span>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full border-2"
            style={{ background: "oklch(0.72 0.18 350 / 0.15)", borderColor: "oklch(0.72 0.18 350 / 0.5)" }}
          >
            <span className="text-sm font-bold" style={{ color: "oklch(0.78 0.18 350)" }}>AL</span>
          </div>
        </div>
      </header>

      <div className="relative flex flex-col gap-4 px-6">
        {/* Loop banner */}
        <div className="flex items-center justify-between rounded-2xl bg-white/8 border border-white/15 px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold" style={{ color: "oklch(0.78 0.18 350)" }}>∞</span>
            <div>
              <p className="text-base font-bold text-white">{loop} Day Loop — Keep it alive!</p>
              <p className="text-sm font-medium text-white/60">Quiz resets in 6h 22m</p>
            </div>
          </div>
          <span
            className="rounded-full border px-3 py-1 text-xs font-bold"
            style={{ color: "oklch(0.78 0.18 350)", background: "oklch(0.72 0.18 350 / 0.12)", borderColor: "oklch(0.72 0.18 350 / 0.35)" }}
          >
            {level}
          </span>
        </div>

        {/* Today's Quiz */}
        <div className="rounded-2xl bg-white/8 border border-white/15 p-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Today's Quiz</h2>
              <p className="text-sm font-medium text-white/60 mt-0.5">5 questions · ~3 minutes</p>
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/70">432 done</span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {["Ukraine", "Climate", "UK Politics"].map((topic) => (
              <span key={topic} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-white/80">{topic}</span>
            ))}
          </div>
          <Link
            to="/quiz"
            className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Start Today's Quiz →
          </Link>
        </div>

        {/* Today's Debate teaser */}
        <Link
          to="/debate"
          className="flex items-center gap-3 rounded-2xl border p-4 transition-colors"
          style={{ background: "oklch(0.72 0.18 350 / 0.06)", borderColor: "oklch(0.72 0.18 350 / 0.25)" }}
        >
          <MessageSquare className="h-6 w-6 flex-shrink-0" style={{ color: "oklch(0.78 0.18 350)" }} />
          <div className="flex-1">
            <p className="text-base font-bold text-white">Today's Debate</p>
            <p className="text-sm font-medium text-white/60">Should governments regulate AI? Vote + share your view</p>
          </div>
          <ChevronRight className="h-5 w-5 flex-shrink-0 text-white/40" />
        </Link>

        {/* Continue Learning */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-white/50">Continue Learning</h3>
          <Link
            to="/history"
            className="flex items-center justify-between rounded-2xl bg-white/8 border border-white/15 p-4 transition-colors hover:bg-white/12"
          >
            <div className="flex-1">
              <p className="text-base font-bold text-white">The French Revolution</p>
              <p className="text-sm font-medium text-white/60 mt-0.5">7 chapters · Quiz · Order · Decide</p>
              <div className="mt-2.5 h-2 w-full rounded-full bg-white/10">
                <div className="h-2 rounded-full" style={{ width: "14%", background: "oklch(0.72 0.18 350)" }} />
              </div>
            </div>
            <ChevronRight className="ml-4 h-5 w-5 flex-shrink-0 text-white/40" />
          </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1">
          <Home className="h-5 w-5" style={{ color: "oklch(0.78 0.18 350)" }} />
          <span className="text-xs font-bold" style={{ color: "oklch(0.78 0.18 350)" }}>Home</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center gap-1">
          <BookOpen className="h-5 w-5 text-white/50" />
          <span className="text-xs font-medium text-white/50">History</span>
        </Link>
        <Link to="/debate" className="flex flex-col items-center gap-1">
          <MessageSquare className="h-5 w-5 text-white/50" />
          <span className="text-xs font-medium text-white/50">Debate</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1">
          <User className="h-5 w-5 text-white/50" />
          <span className="text-xs font-medium text-white/50">Profile</span>
        </Link>
      </nav>
    </main>
  );
}
