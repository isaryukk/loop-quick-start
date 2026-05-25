import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

type TabType = "learn" | "quiz" | "order" | "decide";

type SwipeScenario = {
  situation: string;
  context: string;
  leftChoice: string;
  rightChoice: string;
  leftOutcome: any;
  rightOutcome: any;
  date: string;
};

type Chapter = {
  id: number;
  title: string;
  date: string;
  keyFigure: string;
  isUnlocked: boolean;
  isCompleted: boolean;

  learn: string[];

  questions: {
    text: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];

  orderingEvents: {
    id: string;
    text: string;
    correctOrder: number;
  }[];

  swipeScenarios: SwipeScenario[];
};

/* ─────────────────────────────────────────────
   CHAPTER DATA (EXPANDED)
───────────────────────────────────────────── */

const chapters: Chapter[] = [
  {
    id: 1,
    title: "The Crisis Begins",
    date: "1788–1789",
    keyFigure: "Louis XVI",
    isUnlocked: true,
    isCompleted: false,

    learn: [
      "By 1788, France was effectively bankrupt after decades of war spending, including costly support for the American Revolution.",
      "Two consecutive harvest failures caused bread prices to triple — bread made up ~80% of working-class diets.",
      "The French taxation system was deeply unequal: the Third Estate paid almost all taxes while nobles and clergy were largely exempt.",
      "Public anger shifted from frustration to political consciousness — people began questioning the legitimacy of the monarchy itself.",
      "Louis XVI was widely seen as indecisive, which weakened royal authority at a critical moment."
    ],

    questions: Array.from({ length: 10 }).map((_, i) => ({
      text: `Sample question ${i + 1} about crisis causes?`,
      options: ["A", "B", "C", "D"],
      correct: 0,
      explanation: "Explanation placeholder."
    })),

    orderingEvents: Array.from({ length: 5 }).map((_, i) => ({
      id: `e${i}`,
      text: `Key event ${i + 1}`,
      correctOrder: i
    })),

    swipeScenarios: Array.from({ length: 5 }).map((_, i) => ({
      situation: `Crisis decision ${i + 1}`,
      context: "Economic pressure is rising.",
      leftChoice: "Raise taxes",
      rightChoice: "Reform system",
      leftOutcome: { text: "Unrest increases" },
      rightOutcome: { text: "Slow reform begins" },
      date: "1789"
    }))
  },

  {
    id: 2,
    title: "Estates-General",
    date: "1789",
    keyFigure: "Louis XVI",

    isUnlocked: false,
    isCompleted: false,

    learn: [
      "The Estates-General was called for the first time since 1614 — showing how severe the crisis had become.",
      "It consisted of three estates: clergy, nobility, and the Third Estate (everyone else).",
      "The Third Estate represented ~98% of the population but had the same voting power as the other two combined.",
      "Disputes over voting structure triggered political deadlock almost immediately.",
      "This moment marked the transition from economic crisis to full political revolution."
    ],

    questions: [],
    orderingEvents: [],
    swipeScenarios: []
  }
];

/* ─────────────────────────────────────────────
   SWIPE CARD
───────────────────────────────────────────── */

function SwipeCard({ scenario }: { scenario: SwipeScenario }) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [stage, setStage] = useState<"card" | "outcome" | "history">("card");
  const [outcome, setOutcome] = useState<"left" | "right" | null>(null);

  const startX = useState({ current: 0 })[0];

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

    if (dragX > THRESHOLD) {
      setOutcome("right");
      setStage("outcome");
    } else if (dragX < -THRESHOLD) {
      setOutcome("left");
      setStage("outcome");
    }

    setDragX(0);
  };

  if (stage === "outcome") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 animate-pulse">
        <h3 className="text-white font-bold mb-2">Outcome</h3>
        <p className="text-white/70">
          {outcome === "left"
            ? scenario.leftOutcome.text
            : scenario.rightOutcome.text}
        </p>

        <button
          onClick={() => setStage("history")}
          className="mt-4 w-full rounded-full py-2 font-bold text-white"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          Continue →
        </button>
      </div>
    );
  }

  if (stage === "history") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 animate-in fade-in">
        <h3 className="text-white font-bold mb-2">Historical Outcome</h3>
        <p className="text-white/70">
          This decision mirrors real tensions that escalated the French Revolution.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-white/20 p-5 bg-white/5"
      style={{
        transform: `rotate(${rotation}deg) translateX(${dragX * 0.2}px)`
      }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
    >
      <h3 className="text-white font-bold mb-2">{scenario.situation}</h3>
      <p className="text-white/70 mb-4">{scenario.context}</p>

      <div className="flex justify-between text-sm text-white/60">
        <span>{scenario.leftChoice}</span>
        <span>{scenario.rightChoice}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<TabType>("learn");
  const [xp, setXp] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const chapter = chapters.find((c) => c.id === selectedId)!;

  const unlockOrder = quizScore >= 7;
  const unlockDecide = xp >= 50;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-black mb-2">French Revolution</h1>
      <p className="text-white/60 mb-6">Progressive history game</p>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        {(["learn", "quiz", "order", "decide"] as TabType[]).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="px-4 py-2 rounded-full text-sm font-bold"
            style={{
              background:
                activeTab === t ? "oklch(0.72 0.18 350)" : "rgba(255,255,255,0.1)"
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* LEARN */}
      {activeTab === "learn" && (
        <div className="space-y-4">
          {chapter.learn.map((p, i) => (
            <p key={i} className="text-white/70 leading-relaxed">
              {p}
            </p>
          ))}
          <button
            onClick={() => setActiveTab("quiz")}
            className="mt-4 w-full rounded-full py-3 font-bold text-white"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Start Quiz →
          </button>
        </div>
      )}

      {/* QUIZ */}
      {activeTab === "quiz" && (
        <div>
          <p className="mb-4">Quiz Score: {quizScore}</p>
          <button
            onClick={() => setQuizScore((s) => Math.min(10, s + 1))}
            className="w-full py-3 rounded-full bg-white/10 mb-2"
          >
            Answer Correct (+1)
          </button>

          {quizScore >= 7 && (
            <button
              onClick={() => setActiveTab("order")}
              className="w-full py-3 rounded-full"
              style={{ background: "oklch(0.72 0.18 350)" }}
            >
              Unlock Order →
            </button>
          )}
        </div>
      )}

      {/* ORDER */}
      {activeTab === "order" && unlockOrder && (
        <div>
          <p className="mb-4">Ordering unlocked</p>
          <button
            onClick={() => {
              setXp((x) => x + 50);
              setActiveTab("decide");
            }}
            className="w-full py-3 rounded-full"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Complete Order →
          </button>
        </div>
      )}

      {/* DECIDE */}
      {activeTab === "decide" && unlockDecide && (
        <div>
          <SwipeCard scenario={chapter.swipeScenarios[0]} />
        </div>
      )}

    </main>
  );
}
