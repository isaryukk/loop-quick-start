import { createFileRoute } from "@tanstack/react-router";
import { Share2, ArrowRight, Target, TrendingUp, Trophy } from "lucide-react";

export const Route = createFileRoute("/quiz-results")({
  component: QuizResultsScreen,
  head: () => ({
    meta: [
      { title: "Quiz Results — CivicLoop" },
      { name: "description", content: "See your quiz results and daily streak." },
    ],
  }),
});

function CircularProgress({
  score,
  total,
  size = 200,
  strokeWidth = 10,
}: {
  score: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = score / total;
  const dashOffset = circumference * (1 - percentage);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--gold)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: "stroke-dashoffset 1.2s ease-out",
            filter: "drop-shadow(0 0 8px oklch(0.76 0.13 78 / 0.5))",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold tracking-tight">
          {score} <span className="text-muted-foreground text-3xl">/ {total}</span>
        </span>
      </div>
    </div>
  );
}

function ConfettiPiece({ delay, left, color }: { delay: number; left: number; color: string }) {
  return (
    <div
      className="absolute top-0 w-1.5 h-1.5 rounded-sm opacity-0"
      style={{
        left: `${left}%`,
        backgroundColor: color,
        animation: `confetti-fall 2.5s ease-out ${delay}s forwards`,
      }}
    />
  );
}

function Confetti() {
  const pieces = [
    { delay: 0, left: 10, color: "oklch(0.76 0.13 78)" },
    { delay: 0.2, left: 25, color: "oklch(0.65 0.15 140)" },
    { delay: 0.4, left: 40, color: "oklch(0.7 0.12 220)" },
    { delay: 0.1, left: 55, color: "oklch(0.76 0.13 78)" },
    { delay: 0.3, left: 70, color: "oklch(0.65 0.15 140)" },
    { delay: 0.5, left: 85, color: "oklch(0.7 0.12 220)" },
    { delay: 0.15, left: 15, color: "oklch(0.7 0.12 220)" },
    { delay: 0.35, left: 35, color: "oklch(0.76 0.13 78)" },
    { delay: 0.55, left: 60, color: "oklch(0.65 0.15 140)" },
    { delay: 0.25, left: 80, color: "oklch(0.76 0.13 78)" },
    { delay: 0.45, left: 5, color: "oklch(0.65 0.15 140)" },
    { delay: 0.6, left: 90, color: "oklch(0.7 0.12 220)" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <ConfettiPiece key={i} {...p} />
      ))}
    </div>
  );
}

function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 flex-1">
      <Icon className="w-4 h-4 text-gold mb-0.5" />
      <span className="text-lg font-bold">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}

function QuizResultsScreen() {
  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
        }}
      />

      <Confetti />

      <style>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }
        @keyframes xp-pop {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          60% {
            opacity: 1;
            transform: translateY(-4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="w-full max-w-md flex flex-col items-center px-6 pt-14 pb-8 relative z-10">
        {/* Circular score */}
        <div className="mb-6">
          <CircularProgress score={4} total={5} size={180} strokeWidth={10} />
        </div>

        {/* XP */}
        <div
          className="mb-4"
          style={{ animation: "xp-pop 0.7s ease-out 0.3s both" }}
        >
          <span className="text-xl font-bold text-gold">+50 XP</span>
        </div>

        {/* Streak */}
        <div className="mb-8 text-center">
          <p className="text-3xl font-bold tracking-tight">
            <span className="mr-1">🔥</span>5 Day Streak!
          </p>
          <p className="text-sm text-muted-foreground mt-1">Keep it going — you're on fire.</p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 w-full mb-10">
          <StatPill icon={Target} label="Accuracy" value="80%" />
          <StatPill icon={TrendingUp} label="Best Streak" value="7" />
          <StatPill icon={Trophy} label="Rank" value="#142" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full mt-auto">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/20 bg-transparent text-sm font-semibold transition-colors hover:bg-white/5 active:scale-[0.99]"
          >
            <Share2 className="w-4 h-4" />
            Share Results
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gold text-gold-foreground text-sm font-semibold transition-opacity hover:opacity-90 active:scale-[0.99]"
          >
            See Today's Debate
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
