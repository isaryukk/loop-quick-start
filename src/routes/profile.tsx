import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Home, BookOpen, ArrowLeftRight, User } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [{ title: "CivicLoop — Profile" }],
  }),
});

function getLevel(xp: number): string {
  if (xp >= 2000) return "Strategist";
  if (xp >= 1000) return "Scholar";
  if (xp >= 500) return "Analyst";
  if (xp >= 200) return "Researcher";
  return "Observer";
}

function getNextLevel(xp: number): { name: string; xpNeeded: number } {
  if (xp < 200) return { name: "Researcher", xpNeeded: 200 };
  if (xp < 500) return { name: "Analyst", xpNeeded: 500 };
  if (xp < 1000) return { name: "Scholar", xpNeeded: 1000 };
  if (xp < 2000) return { name: "Strategist", xpNeeded: 2000 };
  return { name: "Max Level", xpNeeded: 2000 };
}

const badges = [
  { id: 1, emoji: "🔥", label: "5-Day Streak", earned: true },
  { id: 2, emoji: "📰", label: "News Watcher", earned: true },
  { id: 3, emoji: "🏛️", label: "Historian", earned: false },
  { id: 4, emoji: "🤔", label: "Open-Minded", earned: false },
  { id: 5, emoji: "⭐", label: "Perfect Score", earned: false },
  { id: 6, emoji: "🌍", label: "Global Citizen", earned: false },
];

function ProfilePage() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setXp(parseInt(localStorage.getItem("civicloop_xp") || "0"));
    setStreak(parseInt(localStorage.getItem("civicloop_streak") || "0"));
  }, []);

  const level = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const progressToNext = Math.min((xp / nextLevel.xpNeeded) * 100, 100);

  return (
    <main className="relative flex min-h-screen flex-col bg-background pb-24 text-foreground">
      {/* Pink radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
        }}
      />

      <div className="relative px-6 pt-14">
        {/* Avatar + name */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 text-2xl font-bold"
            style={{
              background: "oklch(0.72 0.18 350 / 0.15)",
              borderColor: "oklch(0.72 0.18 350 / 0.4)",
              color: "oklch(0.78 0.18 350)",
            }}
          >
            AL
          </div>
          <h1 className="text-xl font-bold">Alex</h1>
          <div className="mt-1 flex items-center gap-2">
            <span
              className="rounded-full border px-3 py-0.5 text-xs font-medium"
              style={{
                color: "oklch(0.78 0.18 350)",
                background: "oklch(0.72 0.18 350 / 0.1)",
                borderColor: "oklch(0.72 0.18 350 / 0.25)",
              }}
            >
              {level}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          {[
            { label: "Total XP", value: xp.toLocaleString() },
            { label: "Day Streak", value: `${streak} 🔥` },
            { label: "Quizzes", value: streak.toString() },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center"
            >
              <p className="text-lg font-bold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* XP progress bar */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Progress to {nextLevel.name}
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: "oklch(0.78 0.18 350)" }}
            >
              {xp} / {nextLevel.xpNeeded} XP
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/10">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${progressToNext}%`,
                background: "oklch(0.72 0.18 350)",
              }}
            />
          </div>
        </div>

        {/* Badges */}
        <div className="mb-6">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Badges
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`flex flex-col items-center rounded-2xl border p-3 text-center transition-all ${
                  badge.earned
                    ? "border-white/15 bg-white/8"
                    : "border-white/8 bg-white/3 opacity-40"
                }`}
              >
                <span className={`text-2xl ${!badge.earned ? "grayscale" : ""}`}>
                  {badge.emoji}
                </span>
                <span className="mt-1.5 text-[10px] leading-tight text-muted-foreground">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Levels reference */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Level Ladder
          </h2>
          {[
            { name: "Observer", xp: "0–199 XP" },
            { name: "Researcher", xp: "200–499 XP" },
            { name: "Analyst", xp: "500–999 XP" },
            { name: "Scholar", xp: "1,000–1,999 XP" },
            { name: "Strategist", xp: "2,000+ XP" },
          ].map(({ name, xp: xpRange }) => (
            <div
              key={name}
              className={`flex items-center justify-between py-2 ${
                name === level ? "font-semibold" : ""
              }`}
            >
              <span
                className="text-sm"
                style={
                  name === level
                    ? { color: "oklch(0.78 0.18 350)" }
                    : undefined
                }
              >
                {name === level ? "→ " : ""}{name}
              </span>
              <span className="text-xs text-muted-foreground">{xpRange}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1">
          <Home className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Home</span>
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
          <User className="h-5 w-5" style={{ color: "oklch(0.78 0.18 350)" }} />
          <span className="text-[10px] font-medium" style={{ color: "oklch(0.78 0.18 350)" }}>
            Profile
          </span>
        </Link>
      </nav>
    </main>
  );
}
