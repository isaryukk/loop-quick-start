import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Share2, ArrowRight, Target, TrendingUp, Trophy, Home, BookOpen, MessageSquare, User } from "lucide-react";
import { supabaseRest } from "../lib/supabase";

export const Route = createFileRoute("/quiz-results")({
  component: QuizResultsScreen,
  head: () => ({
    meta: [
      { title: "Quiz Results - CivicLoop" },
      { name: "description", content: "See your quiz results and daily streak." },
    ],
  }),
});

function CircularProgress({
  score,
  total,
  size = 180,
  strokeWidth = 10,
}: {
  score: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = total > 0 ? score / total : 0;
  const dashOffset = circumference * (1 - percentage);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="oklch(0.72 0.18 350)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: "stroke-dashoffset 1.2s ease-out",
            filter: "drop-shadow(0 0 8px oklch(0.72 0.18 350 / 0.5))",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black tracking-tight text-white">
          {score}
          <span className="text-3xl text-white/40"> / {total}</span>
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

function Confetti({ show }: { show: boolean }) {
  if (!show) return null;
  const pieces = [
    { delay: 0, left: 10, color: "oklch(0.72 0.18 350)" },
    { delay: 0.2, left: 25, color: "oklch(0.65 0.15 140)" },
    { delay: 0.4, left: 40, color: "oklch(0.7 0.12 220)" },
    { delay: 0.1, left: 55, color: "oklch(0.72 0.18 350)" },
    { delay: 0.3, left: 70, color: "oklch(0.65 0.15 140)" },
    { delay: 0.5, left: 85, color: "oklch(0.7 0.12 220)" },
    { delay: 0.15, left: 15, color: "oklch(0.7 0.12 220)" },
    { delay: 0.35, left: 35, color: "oklch(0.72 0.18 350)" },
    { delay: 0.55, left: 60, color: "oklch(0.65 0.15 140)" },
    { delay: 0.25, left: 80, color: "oklch(0.72 0.18 350)" },
    { delay: 0.45, left: 5, color: "oklch(0.65 0.15 140)" },
    { delay: 0.6, left: 90, color: "oklch(0.7 0.12 220)" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => <ConfettiPiece key={i} {...p} />)}
    </div>
  );
}

function StatPill({
  icon: Icon, label, value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 flex-1">
      <Icon className="w-4 h-4 mb-0.5" style={{ color: "oklch(0.78 0.18 350)" }} />
      <span className="text-lg font-black text-white">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">{label}</span>
    </div>
  );
}

function QuizResultsScreen() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xpEarned, setXpEarned] = useState(50);
  const [copied, setCopied] = useState(false);
  const TOTAL = 5;

  useEffect(() => {
    let live = true;

    async function loadResults() {
      const localScore = parseInt(localStorage.getItem("civicloop_last_score") || "0");
      const localStreak = parseInt(localStorage.getItem("civicloop_streak") || "0");

      if (live) {
        setScore(localScore);
        setStreak(localStreak);
        setXpEarned(50 + (localScore === TOTAL ? 25 : 0));
      }

      try {
        const userId = await supabaseRest.currentUserId();
        if (!userId) return;

        const statsResult = await supabaseRest.getStats(userId);
        const remoteStats = statsResult.data?.[0];
        if (!remoteStats || !live) return;

        localStorage.setItem("civicloop_xp", String(remoteStats.xp));
        localStorage.setItem("civicloop_streak", String(remoteStats.streak));
        setStreak(remoteStats.streak);
      } catch {
        // Local results are already shown, so no action is needed.
      }
    }

    loadResults();
    return () => {
      live = false;
    };
  }, []);

  const pct = Math.round((score / TOTAL) * 100);
  const isPerfect = score === TOTAL;

  const handleShare = async () => {
    const emoji = isPerfect ? "🏆" : score >= 3 ? "⭐" : "📚";
    const text =
      `${emoji} I scored ${score}/${TOTAL} on today's CivicLoop quiz!\n` +
      `🔥 ${streak} day streak\n\n` +
      `Building my political literacy one day at a time.\n` +
      `#CivicLoop #PoliticalLiteracy`;

    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // User cancelled share, no action needed.
    }
  };

  return (
    <div className="min-h-screen bg-background text-white flex justify-center relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }}
      />

      <Confetti show={isPerfect} />

      <style>{`
        @keyframes confetti-fall {
          0%   { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
        }
        @keyframes xp-pop {
          0%   { opacity: 0; transform: translateY(12px); }
          60%  { opacity: 1; transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="w-full max-w-md flex flex-col items-center px-6 pt-14 pb-32 relative z-10">
        <div className="mb-4">
          <CircularProgress score={score} total={TOTAL} size={180} strokeWidth={10} />
        </div>

        <div className="mb-2" style={{ animation: "xp-pop 0.7s ease-out 0.3s both" }}>
          <span className="text-xl font-black" style={{ color: "oklch(0.78 0.18 350)" }}>
            +{xpEarned} XP
          </span>
        </div>

        <div className="mb-6 text-center">
          <p className="text-3xl font-black tracking-tight">
            🔥 {streak} Day {streak === 1 ? "Loop" : "Loop!"}
          </p>
          <p className="text-sm text-white/50 font-bold mt-1">
            {isPerfect
              ? "Perfect score - you're on fire! 🔥"
              : score >= 3
              ? "Great work - keep the loop going."
              : "Keep learning - every day counts."}
          </p>
        </div>

        <div className="flex gap-3 w-full mb-8">
          <StatPill icon={Target} label="Accuracy" value={`${pct}%`} />
          <StatPill icon={TrendingUp} label="Streak" value={`${streak}d`} />
          <StatPill icon={Trophy} label="Score" value={`${score}/${TOTAL}`} />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-white/20 bg-white/8 text-base font-black transition-all hover:bg-white/12 active:scale-[0.99]"
          >
            <Share2 className="w-4 h-4" />
            {copied ? "Copied to clipboard! ✓" : "Share Results"}
          </button>

          <button
            onClick={() => navigate({ to: "/debate" })}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-black text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            See Today's Debate
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate({ to: "/home" })}
            className="w-full py-3 rounded-2xl text-sm font-black text-white/50 hover:text-white/70 transition-colors"
          >
            Back Home
          </button>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1">
          <Home className="h-5 w-5 text-white/50" />
          <span className="text-xs font-medium text-white/50">Home</span>
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
    </div>
  );
}

