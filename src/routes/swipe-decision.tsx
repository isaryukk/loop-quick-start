import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";

export const Route = createFileRoute("/swipe-decision")({
  component: SwipeDecisionPage,
  head: () => ({
    meta: [{ title: "CivicLoop — Decision Point" }],
  }),
});

type Outcome = "left" | "right" | null;
type Stage = "decision" | "outcome" | "history";

const SWIPE_THRESHOLD = 90;

function SwipeDecisionPage() {
  const navigate = useNavigate();
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [stage, setStage] = useState<Stage>("decision");
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setDragX(clientX - startXRef.current);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragX < -SWIPE_THRESHOLD) {
      setOutcome("left");
      setDragX(0);
      setStage("outcome");
    } else if (dragX > SWIPE_THRESHOLD) {
      setOutcome("right");
      setDragX(0);
      setStage("outcome");
    } else {
      setDragX(0);
    }
  };

  const rotation = Math.min(Math.max(dragX / 14, -22), 22);
  const leftOpacity = dragX < 0 ? Math.min(Math.abs(dragX) / 90, 0.7) : 0;
  const rightOpacity = dragX > 0 ? Math.min(dragX / 90, 0.7) : 0;

  // ── WHAT ACTUALLY HAPPENED ──────────────────────────────────────────────────
  if (stage === "history") {
    return (
      <main className="relative flex min-h-screen flex-col bg-background px-6 pt-12 pb-8 text-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.18 60) 0%, transparent 70%)",
          }}
        />
        <div className="relative flex flex-1 flex-col">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            FRANCE · 1789
          </p>
          <h1 className="mb-6 text-2xl font-bold leading-tight">
            What Actually Happened
          </h1>

          <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Louis XVI did neither decisively. He convened the
              Estates-General — a political assembly not called since 1614 —
              hoping to solve the crisis through debate.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Instead, it unleashed the full force of Revolution. The Third
              Estate broke away and declared itself a National Assembly. The
              king tried to dismiss them. The people stormed the Bastille.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Within months Louis had lost his throne. By January 1793 —
              his head.
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Historical Lesson
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              "Decisive leadership in crisis matters. Indecision is its own
              kind of decision — often the worst one."
            </p>
          </div>

          <button
            onClick={() => navigate({ to: "/history" })}
            className="mt-auto w-full rounded-full py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Continue Learning →
          </button>
        </div>
      </main>
    );
  }

  // ── OUTCOME SCREEN ──────────────────────────────────────────────────────────
  if (stage === "outcome") {
    const isLeft = outcome === "left";
    return (
      <main className="relative flex min-h-screen flex-col bg-background px-6 pt-12 pb-8 text-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background: isLeft
              ? "radial-gradient(circle, rgba(239,68,68,0.6) 0%, transparent 70%)"
              : "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
          }}
        />

        <div className="relative flex flex-1 flex-col">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            FRANCE · 1789
          </p>

          {/* Choice banner */}
          <div
            className={`mb-5 rounded-2xl border p-4 ${
              isLeft
                ? "border-red-500/30 bg-red-500/10"
                : "border-[oklch(0.72_0.18_350)/0.3] bg-[oklch(0.72_0.18_350)/0.1]"
            }`}
          >
            <p
              className={`text-sm font-semibold ${isLeft ? "text-red-400" : ""}`}
              style={isLeft ? {} : { color: "oklch(0.78 0.18 350)" }}
            >
              You chose: {isLeft ? "Raise Taxes" : "Subsidise Grain"}
            </p>
          </div>

          {/* Outcome text */}
          <h2 className="mb-3 text-base font-bold text-foreground">
            {isLeft
              ? "The tax increase sparked fury across France."
              : "Grain subsidies temporarily calmed the markets."}
          </h2>
          <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
            {isLeft
              ? "Merchants and peasants refused to pay. Riots spread through every arrondissement. Within weeks the Bastille was stormed. The Revolution had begun — and there was no turning back."
              : "Bread prices fell slightly and street riots eased. But the royal treasury — already bankrupt from funding the American Revolution — collapsed within months. The Revolution was delayed but not stopped."}
          </p>
          <p className="mb-5 text-xs leading-relaxed text-muted-foreground italic">
            {isLeft
              ? "Historical note: This mirrors what Louis XVI actually did — delay and taxation — which directly accelerated the Revolution."
              : "Historical note: Some historians argue early grain subsidies could have bought Louis XVI more time — but France was already too broken financially to survive."}
          </p>

          {/* Public reaction */}
          <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Public Reaction
            </p>
            <div className="flex flex-wrap gap-2">
              {isLeft ? (
                <>
                  <span className="rounded-full border border-red-500/25 bg-red-500/20 px-3 py-1 text-xs text-red-400">
                    Peasants: FURIOUS
                  </span>
                  <span className="rounded-full border border-red-500/25 bg-red-500/20 px-3 py-1 text-xs text-red-400">
                    Merchants: FURIOUS
                  </span>
                  <span className="rounded-full border border-green-500/25 bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    Aristocracy: RELIEVED
                  </span>
                </>
              ) : (
                <>
                  <span className="rounded-full border border-green-500/25 bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    Peasants: RELIEVED
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-muted-foreground">
                    Merchants: NEUTRAL
                  </span>
                  <span className="rounded-full border border-red-500/25 bg-red-500/20 px-3 py-1 text-xs text-red-400">
                    Aristocracy: ANGRY
                  </span>
                </>
              )}
            </div>
          </div>

          {/* XP */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Decision XP</span>
            <span
              className="text-xl font-bold"
              style={{ color: "oklch(0.78 0.18 350)" }}
            >
              +20 XP
            </span>
          </div>

          <button
            onClick={() => setStage("history")}
            className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            See what history says →
          </button>
        </div>
      </main>
    );
  }

  // ── DECISION CARD (main swipe screen) ──────────────────────────────────────
  return (
    <main
      className="relative flex min-h-screen select-none flex-col items-center justify-center bg-background px-6 py-12 text-foreground"
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
    >
      {/* Atmospheric amber glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 60) 0%, transparent 70%)",
        }}
      />

      <p className="relative mb-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        FRANCE · 1789
      </p>

      {/* Swipe direction hints */}
      <div className="relative flex w-full max-w-sm justify-between px-1 mb-3">
        <div
          className="flex items-center gap-1.5 transition-opacity duration-150"
          style={{ opacity: dragX < -20 ? 1 : 0.35 }}
        >
          <span className="text-base text-red-400">←</span>
          <span className="text-xs font-medium text-red-400">Raise Taxes</span>
        </div>
        <div
          className="flex items-center gap-1.5 transition-opacity duration-150"
          style={{
            opacity: dragX > 20 ? 1 : 0.35,
            color: "oklch(0.78 0.18 350)",
          }}
        >
          <span className="text-xs font-medium">Subsidise Grain</span>
          <span className="text-base">→</span>
        </div>
      </div>

      {/* Draggable decision card */}
      <div
        className="relative w-full max-w-sm cursor-grab rounded-2xl border border-white/20 p-6 active:cursor-grabbing"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          transform: `rotate(${rotation}deg) translateX(${dragX * 0.25}px)`,
          transition: isDragging ? "none" : "transform 0.35s ease",
          boxShadow:
            dragX < 0
              ? `inset 6px 0 28px rgba(239,68,68,${leftOpacity})`
              : dragX > 0
              ? `inset -6px 0 28px oklch(0.72 0.18 350 / ${rightOpacity})`
              : "none",
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          handleDragStart(e.clientX);
        }}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <h2 className="mb-3 text-xl font-bold leading-tight text-foreground">
          Bread prices are exploding across Paris.
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          It is 1789. Harvests have failed two years in a row. The price of
          bread has tripled. Thousands of Parisians are starving and riots are
          spreading through the city. As an advisor to King Louis XVI — you
          must act immediately.
        </p>
        <hr className="mb-5 border-white/10" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-red-400">←</span>
            <span className="text-xs font-medium text-red-400">
              Raise Taxes
            </span>
          </div>
          <div
            className="flex items-center gap-2"
            style={{ color: "oklch(0.78 0.18 350)" }}
          >
            <span className="text-xs font-medium">Subsidise Grain</span>
            <span>→</span>
          </div>
        </div>
      </div>

      <p className="relative mt-5 text-xs text-muted-foreground">
        Drag the card left or right to decide
      </p>

      <button
        onClick={() => navigate({ to: "/history" })}
        className="relative mt-8 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to History
      </button>
    </main>
  );
}
