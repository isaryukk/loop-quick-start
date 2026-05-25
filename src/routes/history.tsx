import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { chapters } from "../data/chapter";

type TabType = "learn" | "quiz" | "order" | "decide";

function getDifficulty(xp: number) {
  if (xp < 300) return "beginner";
  if (xp < 800) return "intermediate";
  return "advanced";
}

function checkAnswer(selected: number, correct: number) {
  return selected === correct;
}

/* ─────────────────────────────────────────────
   SWIPE CARD
───────────────────────────────────────────── */

function SwipeCard({ scenario }: any) {
  const [dragX, setDragX] = useState(0);
  const [stage, setStage] = useState<"card" | "outcome" | "history">("card");
  const [outcome, setOutcome] = useState<"left" | "right" | null>(null);

  const startX = useState({ current: 0 })[0];
  const THRESHOLD = 80;

  const rotation = Math.min(Math.max(dragX / 14, -22), 22);

  const handleStart = (x: number) => {
    startX.current = x;
  };

  const handleMove = (x: number) => {
    setDragX(x - startX.current);
  };

  const handleEnd = () => {
    if (dragX > THRESHOLD) setOutcome("right");
    else if (dragX < -THRESHOLD) setOutcome("left");
    setStage("outcome");
    setDragX(0);
  };

  if (stage === "outcome") {
    return (
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h3 className="font-bold mb-2">Outcome</h3>
        <p className="text-white/70">
          {outcome === "left"
            ? scenario.leftOutcome.text
            : scenario.rightOutcome.text}
        </p>

        <button
          onClick={() => setStage("history")}
          className="mt-3 px-4 py-2 rounded-full bg-white/10"
        >
          Continue
        </button>
      </div>
    );
  }

  if (stage === "history") {
    return (
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h3 className="font-bold mb-2">Historical Insight</h3>
        <p className="text-white/70">
          {scenario.leftOutcome.historical}
        </p>
      </div>
    );
  }

  return (
    <div
      className="p-4 rounded-xl bg-white/5 border border-white/10"
      style={{ transform: `rotate(${rotation}deg)` }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
    >
      <h3 className="font-bold mb-2">{scenario.situation}</h3>
      <p className="text-white/70 mb-3">{scenario.context}</p>

      <div className="flex justify-between text-sm text-white/60">
        <span>{scenario.leftChoice}</span>
        <span>{scenario.rightChoice}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN ROUTE
───────────────────────────────────────────── */

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("learn");
  const [xp, setXp] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);

  const chapter = chapters[chapterIndex];
  const level = getDifficulty(xp);

  /* ─────────────── LEARN SYSTEM ─────────────── */

  const learnContent =
    level === "beginner"
      ? chapter.learn.core
      : level === "intermediate"
      ? [...chapter.learn.core, ...chapter.learn.key]
      : [
          ...chapter.learn.core,
          ...chapter.learn.key,
          ...chapter.learn.analysis,
          ...chapter.learn.stretch,
        ];

  return (
    <main className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-2">
        French Revolution Learning Path
      </h1>

      <p className="text-white/50 mb-4">
        Chapter {chapter.id}: {chapter.title}
      </p>

      {/* CHAPTER SELECTOR (ALL 7 CHAPTERS) */}
      <div className="flex gap-2 flex-wrap mb-6">
        {chapters.map((c, i) => (
          <button
            key={c.id}
            onClick={() => {
              setChapterIndex(i);
              setActiveTab("learn");
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              i === chapterIndex ? "bg-pink-500" : "bg-white/10"
            }`}
          >
            {c.id}
          </button>
        ))}
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        {(["learn", "quiz", "decide"] as TabType[]).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-full ${
              activeTab === t ? "bg-pink-500" : "bg-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ───────── LEARN ───────── */}
      {activeTab === "learn" && (
        <div className="space-y-3">
          {learnContent.map((text, i) => (
            <p key={i} className="text-white/70 leading-relaxed">
              {text}
            </p>
          ))}

          <div className="mt-6 text-white/40 text-sm">
            XP: {xp} | Difficulty: {level}
          </div>
        </div>
      )}

      {/* ───────── QUIZ ───────── */}
      {activeTab === "quiz" && (
        <div>
          <p className="mb-4 text-white/70">
            Score: {quizScore}
          </p>

          {chapter.questions.map((q, i) => (
            <div key={i} className="mb-6">
              <p className="mb-2 font-semibold">{q.text}</p>

              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (checkAnswer(idx, q.correct)) {
                      setQuizScore((s) => s + 1);
                      setXp((x) => x + 10);
                    } else {
                      setXp((x) => x + 2);
                    }
                  }}
                  className="block w-full mb-2 p-2 rounded bg-white/10"
                >
                  {opt}
                </button>
              ))}

              <p className="text-white/40 text-sm mt-2">
                {q.explanation}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ───────── SWIPE ───────── */}
      {activeTab === "decide" && chapter.swipeScenario && (
        <SwipeCard scenario={chapter.swipeScenario} />
      )}
    </main>
  );
}
