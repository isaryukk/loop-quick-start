import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Home, BookOpen, MessageSquare, User } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "CivicLoop — Profile" }] }),
});

function getLevel(xp: number): string {
  if (xp >= 2000) return "Strategist";
  if (xp >= 1000) return "Scholar";
  if (xp >= 500) return "Analyst";
  if (xp >= 200) return "Researcher";
  return "Observer";
}

function getNextLevel(xp: number) {
  if (xp < 200) return { name: "Researcher", xpNeeded: 200 };
  if (xp < 500) return { name: "Analyst", xpNeeded: 500 };
  if (xp < 1000) return { name: "Scholar", xpNeeded: 1000 };
  if (xp < 2000) return { name: "Strategist", xpNeeded: 2000 };
  return { name: "Max Level", xpNeeded: 2000 };
}

const badges = [
  { id: 1, emoji: "∞", label: "5-Day Loop", earned: true },
  { id: 2, emoji: "📰", label: "News Watcher", earned: true },
  { id: 3, emoji: "🏛️", label: "Historian", earned: false },
  { id: 4, emoji: "🤔", label: "Open-Minded", earned: false },
  { id: 5, emoji: "⭐", label: "Perfect Score", earned: false },
  { id: 6, emoji: "🌍", label: "Global Citizen", earned: false },
  { id: 7, emoji: "⚡", label: "Decision Maker", earned: false },
  { id: 8, emoji: "💬", label: "First Post", earned: false },
  { id: 9, emoji: "🔢", label: "Order Master", earned: false },
];

function ProfilePage() {
  const [xp, setXp] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    setXp(parseInt(localStorage.getItem("civicloop_xp") || "0"));
    setLoop(parseInt(localStorage.getItem("civicloop_streak") || "0"));
  }, []);

  const level = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const progressToNext = Math.min((xp / nextLevel.xpNeeded) * 100, 100);

  return (
    <main className="relative flex min-h-screen flex-col bg-background pb-24 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }}
      />

      <div className="relative px-6 pt-14">
        {/* Avatar */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 text-2xl font-black"
            style={{ background: "oklch(0.72 0.18 350 / 0.15)", borderColor: "oklch(0.72 0.18 350 / 0.5)", color: "oklch(0.78 0.18 350)" }}
          >
            AL
          </div>
          <h1 className="text-2xl font-black text-white">Alex</h1>
          <div className="mt-2">
            <span
              className="rounded-full border px-4 py-1 text-sm font-bold"
              style={{ color: "oklch(0.78 0.18 350)", background: "oklch(0.72 0.18 350 / 0.12)", borderColor: "oklch(0.72 0.18 350 / 0.35)" }}
            >
              {level}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          {[
            { label: "Total XP", value: xp.toLocaleString() },
            { label: "Day Loop", value: `∞ ${loop}` },
            { label: "Quizzes", value: String(loop) },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-white/15 bg-white/8 p-3 text-center">
              <p className="text-xl font-black text-white">{value}</p>
              <p className="text-xs font-bold text-white/60 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* XP progress */}
        <div className="mb-5 rounded-2xl border border-white/15 bg-white/8 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-bold text-white/70">Progress to {nextLevel.name}</span>
            <span className="text-sm font-bold" style={{ color: "oklch(0.78 0.18 350)" }}>
              {xp} / {nextLevel.xpNeeded} XP
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-white/10">
            <div
              className="h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressToNext}%`, background: "oklch(0.72 0.18 350)" }}
            />
          </div>
        </div>

        {/* XP guide */}
        <div className="mb-5 rounded-2xl border border-white/15 bg-white/8 p-4">
          <h2 className="mb-3 text-sm font-black uppercase tracking-widest text-white/60">How to earn XP</h2>
          {[
            { action: "Complete daily quiz", xp: "+50 XP" },
            { action: "Perfect quiz score", xp: "+25 XP bonus" },
            { action: "Complete chapter quiz", xp: "+30 XP" },
            { action: "Ordering quiz correct", xp: "+15 XP" },
            { action: "Vote in debate", xp: "+10 XP" },
            { action: "Post in debate", xp: "+15 XP" },
            { action: "Swipe decision", xp: "+20 XP" },
          ].map(({ action, xp: earn }) => (
            <div key={action} className="flex items-center justify-between py-2 border-b border-white/8 last:border-0">
              <span className="text-sm font-semibold text-white/70">{action}</span>
              <span className="text-sm font-black" style={{ color: "oklch(0.78 0.18 350)" }}>{earn}</span>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="mb-5">
          <h2 className="mb-3 text-sm font-black uppercase tracking-widest text-white/60">Badges</h2>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`flex flex-col items-center rounded-2xl border p-3 text-center ${badge.earned ? "border-white/20 bg-white/8" : "border-white/8 bg-white/3 opacity-40"}`}
              >
                <span className={`text-2xl font-black ${!badge.earned ? "grayscale" : ""}`} style={badge.emoji === "∞" ? { color: "oklch(0.78 0.18 350)" } : {}}>
                  {badge.emoji}
                </span>
                <span className="mt-1.5 text-xs font-bold leading-tight text-white/70">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level ladder */}
        <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
          <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white/60">Level Ladder</h2>
          {[
            { name: "Observer", xp: "0–199 XP" },
            { name: "Researcher", xp: "200–499 XP" },
            { name: "Analyst", xp: "500–999 XP" },
            { name: "Scholar", xp: "1,000–1,999 XP" },
            { name: "Strategist", xp: "2,000+ XP" },
          ].map(({ name, xp: xpRange }) => (
            <div key={name} className="flex items-center justify-between py-2.5 border-b border-white/8 last:border-0">
              <span
                className={`text-base ${name === level ? "font-black" : "font-semibold"}`}
                style={name === level ? { color: "oklch(0.78 0.18 350)" } : { color: "rgba(255,255,255,0.5)" }}
              >
                {name === level ? "→ " : ""}{name}
              </span>
              <span className="text-sm font-semibold text-white/40">{xpRange}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1"><Home className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Home</span></Link>
        <Link to="/history" className="flex flex-col items-center gap-1"><BookOpen className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">History</span></Link>
        <Link to="/debate" className="flex flex-col items-center gap-1"><MessageSquare className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Debate</span></Link>
        <Link to="/profile" className="flex flex-col items-center gap-1">
          <User className="h-5 w-5" style={{ color: "oklch(0.78 0.18 350)" }} />
          <span className="text-xs font-bold" style={{ color: "oklch(0.78 0.18 350)" }}>Profile</span>
        </Link>
      </nav>
    </main>
  );
}
