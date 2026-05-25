import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { chapters } from "../data/chapters";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

type Tab = "learn" | "quiz" | "order" | "decide";

export default function HistoryPage() {
  const chapter = chapters[0];

  const [tab, setTab] = useState<Tab>("learn");
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [xp, setXp] = useState(0);

  const score = useMemo(() => {
    return chapter.questions.reduce((acc, q, i) => {
      return answers[i] === q.correct ? acc + 1 : acc;
    }, 0);
  }, [answers, chapter.questions]);

  const quizPassed = score >= 7;

  const orderUnlocked = quizPassed;
  const decideUnlocked = quizPassed;

  const currentQ = chapter.questions[quizIndex];

  const addXP = (amount: number) => {
    setXp((p) => p + amount);
  };

  return (
    <main className="min-h-screen bg-background text-white p-6 pb-24">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-black">{chapter.title}</h1>
        <p className="text-white/60 text-sm">{chapter.date}</p>
        <p className="text-pink-400 font-bold mt-2">XP: {xp}</p>
      </div>

      {/* TAB BUTTONS */}
      <div className="flex gap-2 mb-6">
        {["learn", "quiz", "order", "decide"].map((t) => {
          const disabled =
            (t === "quiz" && tab === "learn") ||
            (t === "order" && !quizPassed) ||
            (t === "decide" && !orderUnlocked);

          return (
            <button
              key={t}
              disabled={disabled}
              onClick={() => setTab(t as Tab)}
              className={`px-4 py-2 rounded-full text-sm font-bold ${
                tab === t
                  ? "text-white"
                  : "text-white/50 bg-white/10"
              }`}
              style={
                tab === t
                  ? { background: "oklch(0.72 0.18 350)" }
                  : {}
              }
            >
              {t.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* LEARN */}
      {tab === "learn" && (
        <div className="space-y-4">
          <h2 className="text-xl font-black text-pink-300">
            Key Context
          </h2>

          <p className="text-white/70 leading-relaxed">
            {chapter.description}
          </p>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 uppercase mb-2">
              Key Figure
            </p>
            <p className="font-bold">{chapter.keyFigure}</p>
          </div>

          <p className="text-sm text-white/60 leading-relaxed">
            France in 1789 was collapsing under financial strain, food shortages,
            political paralysis, and growing public anger. The monarchy was losing
            legitimacy faster than it could respond.
          </p>
        </div>
      )}

      {/* QUIZ */}
      {tab === "quiz" && (
        <div>
          {quizIndex >= chapter.questions.length ? (
            <div>
              <h2 className="text-xl font-black mb-2">Quiz Complete</h2>
              <p className="text-white/70 mb-4">
                Score: {score} / {chapter.questions.length}
              </p>

              {score >= 7 ? (
                <button
                  onClick={() => {
                    addXP(50);
                    setTab("order");
                  }}
                  className="w-full py-3 rounded-full font-bold"
                  style={{ background: "oklch(0.72 0.18 350)" }}
                >
                  Continue to Order →
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizIndex(0);
                    setAnswers({});
                  }}
                  className="w-full py-3 rounded-full font-bold bg-white/10"
                >
                  Retry Quiz
                </button>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-black mb-3">
                Question {quizIndex + 1}
              </h2>

              <p className="mb-4 text-white/70">
                {currentQ.text}
              </p>

              <div className="space-y-2">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (answers[quizIndex] === undefined) {
                        setAnswers((p) => ({ ...p, [quizIndex]: i }));
                      }
                    }}
                    className="w-full p-3 rounded-xl text-left bg-white/5 border border-white/10"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {answers[quizIndex] !== undefined && (
                <button
                  onClick={() => setQuizIndex((p) => p + 1)}
                  className="mt-4 w-full py-3 rounded-full font-bold"
                  style={{ background: "oklch(0.72 0.18 350)" }}
                >
                  Next →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ORDER */}
      {tab === "order" && (
        <div>
          <h2 className="text-xl font-black mb-4">Order Events</h2>

          <div className="space-y-3">
            {chapter.orderingEvents.map((e) => (
              <div
                key={e.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10"
              >
                {e.text}
              </div>
            ))}
          </div>

          {orderUnlocked && (
            <button
              onClick={() => {
                addXP(50);
                setTab("decide");
              }}
              className="mt-4 w-full py-3 rounded-full font-bold"
              style={{ background: "oklch(0.72 0.18 350)" }}
            >
              Continue to Decision →
            </button>
          )}
        </div>
      )}

      {/* DECIDE */}
      {tab === "decide" && (
        <div>
          <h2 className="text-xl font-black mb-3">
            Final Decision Unlocked
          </h2>

          <p className="text-white/70">
            You can now return to the swipe decision mode.
          </p>

          <button
            className="mt-4 w-full py-3 rounded-full font-bold"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Enter Decision Mode →
          </button>
        </div>
      )}
    </main>
  );
}
