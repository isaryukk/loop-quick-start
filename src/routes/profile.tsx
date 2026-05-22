import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  Award,
  Medal,
  Star,
  Zap,
  Lock,
  Flame,
  TrendingUp,
  ClipboardCheck,
  CalendarDays,
  ChevronRight,
  Settings,
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfileScreen,
  head: () => ({
    meta: [
      { title: "Profile — CivicLoop" },
      { name: "description", content: "Your CivicLoop profile, stats, and achievements." },
    ],
  }),
});

/* ─── Data ─── */
const STATS = [
  { label: "Total XP", value: "2,340", icon: TrendingUp },
  { label: "Current Streak", value: "12 days", icon: Flame },
  { label: "Quizzes Done", value: "47", icon: ClipboardCheck },
];

const EARNED_BADGES = [
  { name: "Historian", icon: Award, color: "text-gold", bg: "bg-gold/10 border-gold/20" },
  { name: "5-Day Streak", icon: Flame, color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20" },
  { name: "Political Observer", icon: Star, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  { name: "Open-Minded", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
];

const LOCKED_BADGES = [
  { name: "Weekly Warrior", icon: Medal },
  { name: "Century Club", icon: Award },
  { name: "Debate Champion", icon: Star },
];

const ACTIVITY = [
  { topic: "World News", score: "4 / 5", date: "May 22, 2026" },
  { topic: "History", score: "5 / 5", date: "May 21, 2026" },
  { topic: "Economics", score: "3 / 5", date: "May 20, 2026" },
];

/* ─── Sub-components ─── */
function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/5 border border-white/10 px-3 py-4 flex-1 min-w-0">
      <Icon className="w-5 h-5 text-gold mb-0.5" />
      <span className="text-base font-bold tracking-tight">{value}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-white text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function BadgeCard({
  name,
  icon: Icon,
  color,
  bg,
  locked = false,
}: {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  bg?: string;
  locked?: boolean;
}) {
  return (
    <div
      className={[
        "flex flex-col items-center gap-2 rounded-xl border px-3 py-4 min-w-[72px] flex-1",
        locked
          ? "bg-white/[0.03] border-white/5 text-muted-foreground/40"
          : `${bg} ${color}`,
      ].join(" ")}
    >
      {locked ? (
        <Lock className="w-6 h-6" />
      ) : (
        <Icon className="w-6 h-6" />
      )}
      <span
        className={[
          "text-[11px] font-bold text-center leading-tight",
          locked ? "text-white/60" : "text-white",
        ].join(" ")}
      >
        {name}
      </span>
    </div>
  );
}

function ActivityRow({
  topic,
  score,
  date,
}: {
  topic: string;
  score: string;
  date: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 shrink-0">
        <ClipboardCheck className="w-4 h-4 text-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate text-white">{topic} Quiz</p>
        <p className="text-xs font-semibold text-white/85 flex items-center gap-1 mt-0.5">
          <CalendarDays className="w-3 h-3" />
          {date}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gold">{score}</p>
        <ChevronRight className="w-4 h-4 text-muted-foreground/40 ml-auto mt-0.5" />
      </div>
    </div>
  );
}

/* ─── Main Screen ─── */
function ProfileScreen() {
  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center">
      <div className="w-full max-w-md flex flex-col px-5 pt-6 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-bold text-white hover:opacity-80 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            type="button"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center text-2xl font-bold text-gold">
              AM
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-background border border-white/10 flex items-center justify-center">
              <Award className="w-3.5 h-3.5 text-gold" />
            </div>
          </div>
          <h1 className="text-xl font-black tracking-tight text-white">Alex M.</h1>
          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-gold/10 border border-gold/20 px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-xs font-semibold text-gold">Level 4 — Analyst</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 mb-8">
          {STATS.map((s) => (
            <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} />
          ))}
        </div>

        {/* Badges Section */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
            Badges
          </h2>
          <div className="flex flex-wrap gap-2">
            {EARNED_BADGES.map((b) => (
              <BadgeCard key={b.name} name={b.name} icon={b.icon} color={b.color} bg={b.bg} />
            ))}
            {LOCKED_BADGES.map((b) => (
              <BadgeCard key={b.name} name={b.name} icon={b.icon} locked />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
            Recent Activity
          </h2>
          <div className="flex flex-col gap-2">
            {ACTIVITY.map((a) => (
              <ActivityRow key={`${a.topic}-${a.date}`} topic={a.topic} score={a.score} date={a.date} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
