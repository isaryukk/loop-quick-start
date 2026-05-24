import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { BookOpen, User, Home, ChevronRight, ArrowLeftRight } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
  head: () => ({
    meta: [{ title: "CivicLoop — Home" }],
  }),
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
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setXp(parseInt(localStorage.getItem("civicloop_xp") || "0"));
    setStreak(parseInt(localStorage.getItem("civicloop_streak") || "0"));
  }, []);

  const level = getLevel(xp);

  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground pb-24">
      {/* Pink radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
        }}
      />

      {/* Top bar */}
      <header className="relative flex items-center justify-between px-6 pt-14 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[oklch(0.78_0.18_350)]" />
          <span className="text-sm font-semibold tracking-tight">CivicLoop</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-medium">{xp} XP</span>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full border"
            style={{
              background: "oklch(0.72 0.18 350 / 0.15)",
              borderColor: "oklch(0.72 0.18 350 / 0.35)",
            }}
          >
            <span className="text-xs font-bold" style={{ color: "oklch(0.78 0.18 350)" }}>
              AL
            </span>
          </div>
        </div>
      </header>

      <div className="relative flex flex-col gap-4 px-6">
        {/* Streak banner */}
        <div className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-sm font-semibold">
                {streak} Day Streak — Keep it alive!
              </p>
              <p className="text-xs text-muted-foreground">Quiz resets in 6h 22m</p>
            </div>
          </div>
          <span
            className="rounded-full border px-2 py-1 text-xs font-medium"
            style={{
              color: "oklch(0.78 0.18 350)",
              background: "oklch(0.72 0.18 350 / 0.1)",
              borderColor: "oklch(0.72 0.18 350 / 0.25)",
            }}
          >
            {level}
          </span>
        </div>

        {/* Today's Quiz card */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold">Today's Quiz</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                5 questions · ~3 minutes
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-muted-foreground">
              432 done today
            </span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {["Ukraine", "Climate", "UK Politics"].map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-muted-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
          <Link
            to="/quiz"
            className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Start Today's Quiz →
          </Link>
        </div>

        {/* Decision Point teaser */}
        <Link
          to="/swipe-decision"
          className="flex items-center gap-3 rounded-2xl border p-4 transition-colors"
          style={{
            background: "oklch(0.72 0.18 350 / 0.08)",
            borderColor: "oklch(0.72 0.18 350 / 0.25)",
          }}
        >
          <span className="text-2xl">⚡</span>
          <div className="flex-1">
            <p className="text-sm font-semibold">Decision Point</p>
            <p className="text-xs text-muted-foreground">
              Bread prices are exploding in Paris — what do you do?
            </p>
          </div>
          <ArrowLeftRight
            className="h-4 w-4 flex-shrink-0"
            style={{ color: "oklch(0.78 0.18 350)" }}
          />
        </Link>

        {/* Continue Learning */}
        <div>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Continue Learning
          </h3>
          <Link
            to="/history"
            className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-4 transition-colors hover:bg-white/8"
          >
            <div className="flex-1">
              <p className="text-sm font-semibold">The French Revolution</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Next: Storming the Bastille
              </p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: "40%", background: "oklch(0.72 0.18 350)" }}
                />
              </div>
            </div>
            <ChevronRight className="ml-4 h-4 w-4 flex-shrink-0 text-muted-foreground" />
          </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1">
          <Home className="h-5 w-5" style={{ color: "oklch(0.78 0.18 350)" }} />
          <span className="text-[10px] font-medium" style={{ color: "oklch(0.78 0.18 350)" }}>
            Home
          </span>
        </Link>
        <Link to="/history" className="flex flex-col items-center gap-1">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">History</span>
        </Link>
        <Link to="/swipe-decision" className="flex flex-col items-center gap-1">
          <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Decide</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1">
          <User className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Profile</span>
        </Link>
      </nav>
    </main>
  );
}
