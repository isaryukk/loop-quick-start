import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame,
  ArrowRight,
  ChevronRight,
  Home as HomeIcon,
  BookOpen,
  MessagesSquare,
  User,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomeScreen,
  head: () => ({
    meta: [
      { title: "Home — CivicLoop" },
      {
        name: "description",
        content:
          "Your daily CivicLoop dashboard — today's quiz, streaks, and ongoing history courses.",
      },
    ],
  }),
});

const PINK = "oklch(0.72 0.18 350)";
const TOPICS = ["Ukraine", "Climate", "UK Politics"];

function HomeScreen() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground flex justify-center">
      {/* Signature radial gradient blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${PINK} 0%, transparent 70%)`,
        }}
      />

      <div className="relative w-full max-w-md flex flex-col px-5 pt-6 pb-28">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: PINK }}
            />
            <span className="text-base font-black tracking-tight">
              CivicLoop
            </span>
          </div>
          <Link
            to="/profile"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 text-xs font-bold hover:bg-white/10 transition-colors"
            style={{ color: PINK }}
          >
            AM
          </Link>
        </header>

        {/* Streak banner */}
        <section className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3.5 mb-6">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/20 shrink-0 text-xl"
              style={{ color: PINK }}
            >
              <Flame className="w-5 h-5" style={{ color: PINK }} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-bold leading-tight"
                style={{ color: PINK }}
              >
                🔥 12 Day Streak — Keep it alive!
              </p>
              <p className="text-[11px] font-medium text-foreground/70 mt-0.5">
                Quiz resets in 6h 22m
              </p>
            </div>
          </div>
        </section>

        {/* Today's Quiz card */}
        <section className="rounded-3xl border border-white/20 bg-white/5 p-5 mb-8">
          <h2 className="text-xl font-black tracking-tight">Today's Quiz</h2>
          <p className="text-xs font-medium text-foreground/70 mt-1 mb-4">
            5 questions · 3 minutes
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {TOPICS.map((t) => (
              <span
                key={t}
                className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15"
              >
                {t}
              </span>
            ))}
          </div>

          <Link
            to="/quiz"
            className="flex items-center justify-center gap-2 w-full rounded-full px-5 py-3.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            style={{ background: PINK }}
          >
            Start Today's Quiz
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Continue Learning */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/80 mb-3">
            Continue Learning
          </h3>

          <Link
            to="/history"
            className="block rounded-2xl border border-white/20 bg-white/5 p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <p className="text-base font-black leading-tight">
                  The French Revolution
                </p>
                <p className="text-[11px] font-medium text-foreground/70 mt-1">
                  Next: Storming the Bastille
                </p>
              </div>
              <BookOpen
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: PINK }}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: "40%", background: PINK }}
                />
              </div>
              <span className="text-[11px] font-bold tabular-nums">40%</span>
            </div>

            <div
              className="flex items-center justify-end gap-1 mt-3 text-xs font-bold"
              style={{ color: PINK }}
            >
              Continue
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </section>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background border-t border-white/10 px-2 py-2 flex items-center justify-around z-10">
        <NavItem icon={HomeIcon} label="Home" active to="/home" />
        <NavItem icon={BookOpen} label="History" to="/history" />
        <NavItem icon={MessagesSquare} label="Debate" to="/home" />
        <NavItem icon={User} label="Profile" to="/profile" />
      </nav>
    </main>
  );
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  to,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  active?: boolean;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-1 flex-1 py-1.5 rounded-xl transition-colors"
      style={active ? { color: PINK } : { color: "var(--foreground)", opacity: 0.7 }}
    >
      <Icon className="w-[18px] h-[18px]" />
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {label}
      </span>
    </Link>
  );
}
