import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";

// ─────────────────────────────────────────────
// CHAPTER DATA (EXPANDED SYSTEM)
// ─────────────────────────────────────────────

const chapters = [
  {
    id: 1,
    title: "Crisis of the Old Regime",
    date: "1788–1789",
    keyFigure: "King Louis XVI",
    isUnlocked: true,
    isCompleted: false,

    description:
      "France enters financial collapse after years of war and failed harvests.",

    learnPoints: [
      "France was bankrupt after funding the American Revolution",
      "Bread prices tripled across major cities",
      "Two consecutive harvest failures caused famine",
      "The Estates system created deep inequality",
      "Louis XVI lacked political authority and reform ability",
    ],

    questions: [
      { text: "What triggered France’s financial crisis?", options: ["War debts", "Trade boom", "Gold discovery"], correct: 0, explanation: "War debts from the American Revolution drained the treasury." },
      { text: "What happened to bread prices?", options: ["Fell", "Tripled", "Stayed stable"], correct: 1, explanation: "Bread prices tripled due to shortages." },
      // (add more to reach 10 per chapter in your dataset)
    ],

    orderingEvents: [
      { id: 1, text: "Financial crisis deepens" },
      { id: 2, text: "Failed harvests hit France" },
      { id: 3, text: "Bread prices triple" },
      { id: 4, text: "Public unrest grows" },
      { id: 5, text: "Estates-General called" },
    ],

    swipeScenario: {
      date: "1789",
      situation: "Bread prices are exploding across Paris.",
      context:
        "You advise King Louis XVI during a national crisis. People are starving and riots are forming.",
      leftChoice: "Raise Taxes",
      rightChoice: "Subsidise Grain",

      leftOutcome: {
        title: "Taxation increases unrest",
        text: "Riots spread across Paris as peasants refuse to pay more taxes.",
        historical:
          "This mirrors real policy failures that accelerated the Revolution.",
        reactions: [
          { label: "Peasants: Furious", color: "red" },
          { label: "Merchants: Angry", color: "red" },
          { label: "Aristocracy: Calm", color: "green" },
        ],
      },

      rightOutcome: {
        title: "Short-term relief",
        text: "Food prices stabilise briefly but the treasury collapses.",
        historical:
          "Even reforms failed due to deep structural financial crisis.",
        reactions: [
          { label: "Peasants: Relieved", color: "green" },
          { label: "Merchants: Neutral", color: "gray" },
          { label: "Aristocracy: Worried", color: "red" },
        ],
      },
    },
  },
];

// ─────────────────────────────────────────────
// SWIPE CARD COMPONENT
// ─────────────────────────────────────────────

function SwipeCard({ scenario }: any) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [outcome, setOutcome] = useState<"left" | "right" | null>(null);
  const [stage, setStage] = useState<"card" | "outcome" | "history">("card");

  const startX = useRef(0);
  const THRESHOLD = 80;

  const rotation = Math.min(Math.max(dragX / 14, -22), 22);

  const handleStart = (x: number) => {
    setIsDragging(true);
    startX.current = x;
  };

  const handleMove = (x: number) => {
    if (!isDragging) return;
    setDragX(x - startX.current);
  };

  const handleEnd = () => {
    setIsDragging(false);

    if (dragX < -THRESHOLD) {
      setOutcome("left");
      setStage("outcome");
    } else if (dragX > THRESHOLD) {
      setOutcome("right");
      setStage("outcome");
    }

    setDragX(0);
  };

  if (stage === "outcome") {
    const o = outcome === "left" ? scenario.leftOutcome : scenario.rightOutcome;

    return (
      <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
        <h3 className="text-white font-bold mb-2">{o.title}</h3>
        <p className="text-white/70 text-sm mb-3">{o.text}</p>

        <button
          onClick={() => setStage("history")}
          className="w-full rounded-full py-3 text-white font-bold"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          See history →
        </button>
      </div>
    );
  }

  if (stage === "history") {
    const o = outcome === "left" ? scenario.leftOutcome : scenario.rightOutcome;

    return (
      <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
        <p className="text-white/70 text-sm">{o.historical}</p>

        <button
          onClick={() => setStage("card")}
          className="mt-4 w-full rounded-full py-3 text-white font-bold"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-white/20 p-5 cursor-grab select-none"
      style={{
        transform: `rotate(${rotation}deg) translateX(${dragX * 0.2}px)`,
        background: "rgba(255,255,255,0.05)",
      }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <h3 className="text-white font-bold mb-2">{scenario.situation}</h3>
      <p className="text-white/70 text-sm mb-3">{scenario.context}</p>

      <div className="flex justify-between text-sm text-white/60">
        <span>← {scenario.leftChoice}</span>
        <span>{scenario.rightChoice} →</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState("learn");

  const [xp, setXp] = useState(0);

  const [progress, setProgress] = useState<Record<number, any>>({});

  const chapter = chapters.find((c) => c.id === selectedId)!;

  const currentProgress = progress[selectedId!] || {
    quizPassed: false,
    orderDone: false,
    decideDone: false,
  };

  const score = 7; // placeholder (you already have quiz system)

  const unlockOrder = currentProgress.quizPassed;
  const unlockDecide = currentProgress.orderDone;

  return (
    <main className="min-h-screen bg-background text-white p-6">

      {/* XP */}
      <div className="mb-4 text-sm text-white/60">
        XP: {xp}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {["learn", "quiz", "order", "decide"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="px-4 py-2 rounded-full text-sm"
            style={{
              background:
                activeTab === t ? "oklch(0.72 0.18 350)" : "rgba(255,255,255,0.05)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* LEARN */}
      {activeTab === "learn" && (
        <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
          <h2 className="text-xl font-bold mb-2">{chapter.title}</h2>
          <p className="text-white/70 mb-3">{chapter.description}</p>

          {chapter.learnPoints.map((p, i) => (
            <p key={i} className="text-sm text-white/60">
              • {p}
            </p>
          ))}
        </div>
      )}

      {/* QUIZ */}
      {activeTab === "quiz" && (
        <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
          <p>Quiz system already exists — plug your logic here</p>

          <button
            onClick={() =>
              setProgress((prev) => ({
                ...prev,
                [selectedId!]: { ...currentProgress, quizPassed: score >= 7 },
              }))
            }
            className="mt-4 w-full rounded-full py-3"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Submit Quiz (mock)
          </button>
        </div>
      )}

      {/* ORDER */}
      {activeTab === "order" && (
        <div className="p-5 bg-white/5 rounded-2xl">
          <p>Order section (5+ events already defined in data)</p>

          <button
            disabled={!unlockOrder}
            onClick={() =>
              setProgress((prev) => ({
                ...prev,
                [selectedId!]: { ...currentProgress, orderDone: true },
              }))
            }
            className="mt-4 w-full rounded-full py-3"
            style={{ background: unlockOrder ? "oklch(0.72 0.18 350)" : "#333" }}
          >
            Complete Order
          </button>
        </div>
      )}

      {/* DECIDE */}
      {activeTab === "decide" && (
        <div>
          {!unlockDecide ? (
            <p className="text-white/50">Unlock after Order</p>
          ) : (
            <SwipeCard scenario={chapter.swipeScenario} />
          )}
        </div>
      )}
    </main>
  );
}
