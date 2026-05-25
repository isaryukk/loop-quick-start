import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Home, BookOpen, MessageSquare, User, Lock, CheckCircle } from "lucide-react";

/* ─────────────────────────────────────────────
   EXPECTED CHAPTER STRUCTURE (YOU MUST HAVE THIS)
───────────────────────────────────────────── */

type Chapter = {
  id: number;
  title: string;
  date: string;
  keyFigure: string;
  isUnlocked: boolean;

  learnContent: string;

  questions: {
    text: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];

  orderingEvents: { text: string }[];

  swipeScenarios: {
    situation: string;
    context: string;
    leftChoice: string;
    rightChoice: string;
    leftOutcome: {
      title: string;
      text: string;
      historical: string;
    };
    rightOutcome: {
      title: string;
      text: string;
      historical: string;
    };
  }[];
};

/* ───────────────────────────────────────────── */

type TabType = "learn" | "quiz" | "order" | "decide";

type Progress = {
  learnDone: boolean;
  quizScore: number;
  quizPassed: boolean;
  orderDone: boolean;
  decideDone: boolean;
  xp: number;
};

/* ───────────────────────── SWIPE CARD ───────────────────────── */

function SwipeCard({
  scenarios,
  onComplete,
}: {
  scenarios: Chapter["swipeScenarios"];
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [stage, setStage] = useState<"card" | "outcome" | "history">("card");
  const [outcome, setOutcome] = useState<"left" | "right" | null>(null);

  const THRESHOLD = 80;
  const scenario = scenarios[index];

  const handleEnd = () => {
    if (dragX < -THRESHOLD) {
      setOutcome("left");
      setStage("outcome");
    } else if (dragX > THRESHOLD) {
      setOutcome("right");
      setStage("outcome");
    }
    setDragX(0);
  };

  const next = () => {
    if (index + 1 >= scenarios.length) {
      onComplete();
      return;
    }
    setIndex(index + 1);
    setStage("card");
  };

  if (!scenario) return null;

  if (stage === "outcome") {
    const o = outcome === "left" ? scenario.leftOutcome : scenario.rightOutcome;

    return (
      <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
        <h3 className="text-white font-black mb-2">{o.title}</h3>
        <p className="text-white/80 mb-4">{o.text}</p>

        <button
          onClick={() => setStage("history")}
          className="w-full rounded-full py-3 font-bold text-white"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          See History →
        </button>
      </div>
    );
  }

  if (stage === "history") {
    const o = outcome === "left" ? scenario.leftOutcome : scenario.rightOutcome;

    return (
      <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
        <p className="text-white/80 mb-4">{o.historical}</p>

        <button
          onClick={next}
          className="w-full rounded-full py-3 font-bold text-white"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          Next Decision →
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-white/20 bg-white/10 p-5"
      onMouseDown={(e) => setStartX(e.clientX)}
      onMouseMove={(e) => setDragX(e.clientX - startX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <h3 className="text-white font-black mb-2">{scenario.situation}</h3>
      <p className="text-white/70 mb-4">{scenario.context}</p>

      <div className="flex justify-between text-xs text-white/50">
        <span>← {scenario.leftChoice}</span>
        <span>{scenario.rightChoice} →</span>
      </div>
    </div>
  );
}

/* ───────────────────────── ORDERING ───────────────────────── */

function OrderingQuiz({
  events,
  onComplete,
}: {
  events: Chapter["orderingEvents"];
  onComplete: () => void;
}) {
  const [order, setOrder] = useState(events);

  const swap = (i: number, j: number) => {
    const copy = [...order];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setOrder(copy);
  };

  return (
    <div>
      <p className="text-white/60 mb-3">Reorder the events</p>

      {order.map((e, i) => (
        <div
          key={i}
          className="p-3 mb-2 rounded-xl border border-white/10 bg-white/10 text-white cursor-pointer"
          onClick={() => i > 0 && swap(i, i - 1)}
        >
          {e.text}
        </div>
      ))}

      <button
        onClick={onComplete}
        className="w-full mt-3 rounded-full py-3 font-bold text-white"
        style={{ background: "oklch(0.72 0.18 350)" }}
      >
        Submit Order
      </button>
    </div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function HistoryPage({ chapters }: { chapters: Chapter[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("learn");
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [progress, setProgress] = useState<Record<number, Progress>>({});

  const selected = chapters.find((c) => c.id === selectedId);

  const getProgress = (id: number): Progress =>
    progress[id] || {
      learnDone: false,
      quizScore: 0,
      quizPassed: false,
      orderDone: false,
      decideDone: false,
      xp: 0,
    };

  const updateProgress = (id: number, patch: Partial<Progress>) => {
    setProgress((p) => ({
      ...p,
      [id]: { ...getProgress(id), ...patch },
    }));
  };

  const quizScore = selected
    ? Object.values(answers).filter(
        (a, i) => a === selected.questions[i]?.correct
      ).length
    : 0;

  return (
    <main className="min-h-screen bg-black text-white pb-24">

      {/* HEADER */}
      <div className="p-6">
        <h1 className="text-3xl font-black">The French Revolution</h1>
      </div>

      {/* TIMELINE */}
      <div className="flex gap-3 overflow-x-auto px-6">
        {chapters.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className="px-4 py-2 rounded-xl border border-white/10"
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {!selected ? (
          <p className="text-white/50">Select a chapter</p>
        ) : (
          <>
            {/* TABS */}
            <div className="flex gap-2 mb-4">
              {(["learn", "quiz", "order", "decide"] as TabType[]).map(
                (t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className="px-4 py-2 rounded-full"
                    style={
                      activeTab === t
                        ? { background: "oklch(0.72 0.18 350)" }
                        : { background: "#222" }
                    }
                  >
                    {t}
                  </button>
                )
              )}
            </div>

            {/* LEARN */}
            {activeTab === "learn" && (
              <div className="p-5 rounded-xl bg-white/10">
                <p className="whitespace-pre-line text-white/80">
                  {selected.learnContent}
                </p>

                <button
                  className="mt-4 w-full rounded-full py-3 font-bold"
                  style={{ background: "oklch(0.72 0.18 350)" }}
                  onClick={() => {
                    updateProgress(selected.id, {
                      learnDone: true,
                      xp: getProgress(selected.id).xp + 10,
                    });
                    setActiveTab("quiz");
                  }}
                >
                  Start Quiz →
                </button>
              </div>
            )}

            {/* QUIZ */}
            {activeTab === "quiz" && selected && (
              <div>
                <h3 className="mb-3">
                  {selected.questions[quizIndex]?.text}
                </h3>

                {selected.questions[quizIndex]?.options.map(
                  (opt, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setAnswers((a) => ({
                          ...a,
                          [quizIndex]: i,
                        }))
                      }
                      className="block w-full p-3 mb-2 rounded-xl bg-white/10"
                    >
                      {opt}
                    </button>
                  )
                )}

                <button
                  onClick={() => {
                    if (quizScore >= 7) {
                      updateProgress(selected.id, {
                        quizPassed: true,
                        quizScore,
                        xp:
                          getProgress(selected.id).xp + 20,
                      });
                      setActiveTab("order");
                    }
                  }}
                  className="mt-4 w-full rounded-full py-3 font-bold"
                  style={{ background: "oklch(0.72 0.18 350)" }}
                >
                  Continue (Need 7+)
                </button>
              </div>
            )}

            {/* ORDER */}
            {activeTab === "order" && (
              <OrderingQuiz
                events={selected.orderingEvents}
                onComplete={() => {
                  updateProgress(selected.id, {
                    orderDone: true,
                    xp:
                      getProgress(selected.id).xp + 15,
                  });
                  setActiveTab("decide");
                }}
              />
            )}

            {/* DECIDE */}
            {activeTab === "decide" && (
              <SwipeCard
                scenarios={selected.swipeScenarios}
                onComplete={() => {
                  updateProgress(selected.id, {
                    decideDone: true,
                    xp:
                      getProgress(selected.id).xp + 25,
                  });
                }}
              />
            )}
          </>
        )}
      </div>

      {/* NAV */}
      <nav className="fixed bottom-0 w-full flex justify-around p-4 border-t border-white/10 bg-black">
        <Link to="/home">Home</Link>
        <Link to="/history" style={{ color: "#ff4fd8" }}>
          History
        </Link>
        <Link to="/debate">Debate</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </main>
  );
}
