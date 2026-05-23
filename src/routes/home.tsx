import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame,
  ArrowRight,
  ChevronRight,
  Home,
  BookOpen,
  MessagesSquare,
  User,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomeScreen,
  head: () => ({
    meta: [
      { title: "Home — CivicLoop" },
      { name: "description", content: "Your daily CivicLoop dashboard — quiz, streaks, and history courses." },
    ],
  }),
});

const TOPICS = ["Ukraine", "Climate", "UK Politics"];

function HomeScreen() {
  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center">
      <div className="w-full max-w-md flex flex-col px-5 pt-6 pb-28">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-base font-black tracking-tight text-white">CivicLoop</span>
          </div>
          <Link
            to="/profile"
            className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 pl-1 pr-3 py-1 hover:bg-white/10 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-[11px] font-bold text-gold">
              AM
            </div>
            <span className="text-[11px] font-bold text-white">Analyst Lv.4</span>
          </Link>
        </div>

        {/* Streak / Loop banner */}
        <div
          className="relative overflow-hidden rounded-2xl border border-amber-300/30 px-4 py-3.5 mb-6"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.16 60 / 0.25), oklch(0.7 0.18 30 / 0.18))",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-400/20 border border-amber-300/40 shrink-0">
              <Flame className="w-5 h-5 text-amber-300 fill-amber-400/40" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-white leading-tight">
                12 Day loop — Keep it alive!
              </p>
              <p className="text-[11px] font-semibold text-white/85 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                Quiz resets in 6h 22m
              </p>
            </div>
          </div>
        </div>

        {/* Today's Quiz card */}
        <div className="rounded-3xl bg-white/8 border border-white/15 p-5 mb-8 shadow-lg">
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="text-xl font-black tracking-tight text-white">Today's Quiz</h2>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold">New</span>
          </div>
          <p className="text-xs font-semibold text-white/85 mb-4">
            5 questions · ~3 minutes
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {TOPICS.map((t) => (
              <span
                key={t}
                className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white"
              >
                {t}
              </span>
            ))}
          </div>

          <Link
            to="/quiz"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-gold text-gold-foreground font-black text-sm py-3.5 hover:opacity-90 transition-opacity"
          >
            Start Today's Quiz
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-[11px] font-semibold text-white/80 text-center mt-3">
            432 people have completed today's quiz
          </p>
        </div>

        {/* Continue Learning */}
        <div className="mb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
            Continue Learning
          </h3>

          <Link
            to="/history"
            className="block rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <p className="text-base font-black text-white leading-tight">
                  The French Revolution
                </p>
                <p className="text-[11px] font-semibold text-white/85 mt-1">
                  Next: Storming the Bastille
                </p>
              </div>
              <BookOpen className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full"
                  style={{ width: "40%" }}
                />
              </div>
              <span className="text-[11px] font-bold tabular-nums text-white">40%</span>
            </div>

            <div className="flex items-center justify-end gap-1 mt-3 text-xs font-bold text-gold">
              Continue
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background/95 backdrop-blur border-t border-white/10 px-2 py-2 flex items-center justify-around">
        <NavItem icon={Home} label="Home" active to="/home" />
        <NavItem icon={BookOpen} label="History" to="/history" />
        <NavItem icon={MessagesSquare} label="Debate" to="/home" />
        <NavItem icon={User} label="Profile" to="/profile" />
      </nav>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  to,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  to: string;
}) {
  return (
    <Link
      to={to}
      className={[
        "flex flex-col items-center gap-1 flex-1 py-1.5 rounded-xl transition-colors",
        active ? "text-gold" : "text-white/70 hover:text-white",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-center w-9 h-7 rounded-full transition-colors",
          active ? "bg-gold/15" : "",
        ].join(" ")}
      >
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </Link>
  );
}
