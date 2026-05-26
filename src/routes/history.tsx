import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { chapters, type Chapter, type Question } from "../data/chapter";

type TabType = "learn" | "quiz" | "order" | "decide";

/* ─────────────────────────────────────────────
   1. ADAPTIVE DIFFICULTY ENGINE
   XP < 300       → beginner   (core facts + core questions only)
   300 ≤ XP < 800 → intermediate (core + key)
   XP ≥ 800       → advanced   (all tiers)
───────────────────────────────────────────── */

function getDifficulty(xp: number, chaptersCompleted: number) {
  const score = xp + chaptersCompleted * 50;
  if (score < 300) return "beginner";
  if (score < 800) return "intermediate";
  return "advanced";
}

function getLearnContent(chapter: Chapter, difficulty: string): string[] {
  const { core, key, analysis, stretch } = chapter.learn;
  if (difficulty === "beginner") return core;
  if (difficulty === "intermediate") return [...core, ...key];
  return [...core, ...key, ...analysis, ...stretch];
}

function getFilteredQuestions(questions: Question[], difficulty: string): Question[] {
  if (difficulty === "beginner") return questions.filter((q) => q.tier === "core");
  if (difficulty === "intermediate") return questions.filter((q) => q.tier === "core" || q.tier === "key");
  return questions;
}

function difficultyLabel(d: string) {
  if (d === "beginner") return "Beginner";
  if (d === "intermediate") return "Intermediate";
  return "Advanced";
}

/* ─────────────────────────────────────────────
   2. XP ENGINE
   Correct answer: +10 (core) / +15 (key) / +20 (analysis) / +25 (stretch)
   Wrong answer:   +3 XP (still learning)
   Learn read:     +20 XP
   Order done:     +25 XP
   Decide done:    chapter.xpReward
───────────────────────────────────────────── */

function xpForCorrect(tier: Question["tier"]): number {
  if (tier === "core") return 10;
  if (tier === "key") return 15;
  if (tier === "analysis") return 20;
  return 25;
}

/* ─────────────────────────────────────────────
   SWIPE CARD (original logic, same UI)
───────────────────────────────────────────── */

function SwipeCard({ chapter, onComplete }: { chapter: Chapter; onComplete: () => void }) {
  const scenario = chapter.swipeScenario;
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [stage, setStage] = useState<"card" | "outcome" | "history">("card");
  const [outcome, setOutcome] = useState<"left" | "right" | null>(null);
  const [startXRef] = useState({ current: 0 });
  const THRESHOLD = 80;

  const rotation = Math.min(Math.max(dragX / 14, -22), 22);

  const handleStart = (x: number) => {
    setIsDragging(true);
    startXRef.current = x;
  };
  const handleMove = (x: number) => {
    if (!isDragging) return;
    setDragX(x - startXRef.current);
  };
  const handleEnd = () => {
    setIsDragging(false);
    const dir = dragX > THRESHOLD ? "right" : dragX < -THRESHOLD ? "left" : null;
    if (dir) { setOutcome(dir); setStage("outcome"); }
    setDragX(0);
  };

  const chosen = outcome === "left" ? scenario.leftOutcome : scenario.rightOutcome;

  if (stage === "outcome" && chosen) {
    return (
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-white/40 text-xs mb-1 uppercase tracking-widest">
          {outcome === "left" ? scenario.leftChoice : scenario.rightChoice}
        </p>
        <h3 className="font-bold mb-2 text-lg">{chosen.title}</h3>
        <p className="text-white/70 mb-4">{chosen.text}</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {chosen.reactions.map((r, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background:
                  r.color === "red" ? "oklch(0.65 0.22 25)" :
                  r.color === "green" ? "oklch(0.65 0.18 145)" :
                  "oklch(0.6 0 0)",
                color: "white",
              }}
            >
              {r.label}
            </span>
          ))}
        </div>
        <button
          onClick={() => setStage("history")}
          className="mt-1 px-4 py-2 rounded-full bg-pink-500 text-white font-bold w-full"
        >
          See Historical Context →
        </button>
      </div>
    );
  }

  if (stage === "history") {
    return (
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-white/40 text-xs mb-1 uppercase tracking-widest">Historical Reality</p>
        <h3 className="font-bold mb-2 text-lg">{chosen?.title}</h3>
        <p className="text-white/70 mb-5">{chosen?.historical}</p>
        <button
          onClick={onComplete}
          className="w-full px-4 py-2 rounded-full bg-pink-500 text-white font-bold"
        >
          Complete Chapter ✓
        </button>
      </div>
    );
  }

  const leftActive = dragX < -THRESHOLD / 2;
  const rightActive = dragX > THRESHOLD / 2;

  return (
    <div>
      <div className="flex justify-between text-sm mb-3 px-1">
        <span className="font-bold transition-opacity" style={{ opacity: leftActive ? 1 : 0.3 }}>
          ← {scenario.leftChoice}
        </span>
        <span className="font-bold transition-opacity" style={{ opacity: rightActive ? 1 : 0.3 }}>
          {scenario.rightChoice} →
        </span>
      </div>
      <div
        className="p-4 rounded-xl bg-white/5 border border-white/10 cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: `rotate(${rotation}deg) translateX(${dragX * 0.15}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={() => isDragging && handleEnd()}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <p className="text-white/40 text-xs mb-1">{scenario.date}</p>
        <h3 className="font-bold mb-2">{scenario.situation}</h3>
        <p className="text-white/70 mb-3">{scenario.context}</p>
        <p className="text-center text-white/40 text-sm">← Swipe to decide →</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ORDERING GAME
───────────────────────────────────────────── */

function OrderingGame({ chapter, onComplete }: { chapter: Chapter; onComplete: () => void }) {
  const [items, setItems] = useState(
    [...chapter.orderingEvents].sort(() => Math.random() - 0.5)
  );
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const checkOrder = () => {
    const correct = items.every((item, i) => item.correctIndex === i);
    setIsCorrect(correct);
    setChecked(true);
  };

  const moveItem = (from: number, to: number) => {
    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setItems(updated);
  };

  if (checked && isCorrect) {
    return (
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-bold text-lg mb-2">Perfect Order!</h3>
        <p className="text-white/60 mb-5">You correctly sequenced all events.</p>
        <button onClick={onComplete} className="w-full px-4 py-2 rounded-full bg-pink-500 text-white font-bold">
          Continue to Decide →
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-white/50 text-sm mb-4">Drag to reorder into the correct chronological sequence.</p>
      <div className="space-y-2 mb-5">
        {items.map((item, i) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null && dragIndex !== i) moveItem(dragIndex, i);
              setDragIndex(null);
            }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border cursor-grab"
            style={{
              borderColor:
                checked && !isCorrect && item.correctIndex !== i
                  ? "oklch(0.65 0.22 25)"
                  : "rgba(255,255,255,0.1)",
            }}
          >
            <span className="text-white/30 text-sm w-5 text-center">{i + 1}</span>
            <span className="text-white/80 text-sm flex-1">{item.text}</span>
            <span className="text-white/20">⠿</span>
          </div>
        ))}
      </div>
      {checked && !isCorrect && (
        <p className="text-white/50 text-sm mb-3 text-center">Not quite — red items are out of order. Try again.</p>
      )}
      <button
        onClick={checked && !isCorrect ? () => setChecked(false) : checkOrder}
        className="w-full px-4 py-2 rounded-full bg-pink-500 text-white font-bold"
      >
        {checked && !isCorrect ? "Try Again" : "Check Order"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3. REAL MCQ QUIZ
───────────────────────────────────────────── */

type QuizState = {
  currentIndex: number;
  selectedOption: number | null;
  hasAnswered: boolean;
  correctCount: number;
  isComplete: boolean;
};

function QuizGame({
  questions,
  onComplete,
  onXpGain,
}: {
  questions: Question[];
  onComplete: (correct: number, total: number) => void;
  onXpGain: (amount: number) => void;
}) {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    selectedOption: null,
    hasAnswered: false,
    correctCount: 0,
    isComplete: false,
  });

  const q = questions[state.currentIndex];

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (state.hasAnswered) return;
      const isCorrect = optionIndex === q.correct;
      onXpGain(isCorrect ? xpForCorrect(q.tier) : 3);
      setState((prev) => ({
        ...prev,
        selectedOption: optionIndex,
        hasAnswered: true,
        correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
      }));
    },
    [state.hasAnswered, q, onXpGain]
  );

  const handleNext = () => {
    if (state.currentIndex + 1 >= questions.length) {
      setState((prev) => ({ ...prev, isComplete: true }));
      onComplete(state.correctCount, questions.length);
    } else {
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedOption: null,
        hasAnswered: false,
      }));
    }
  };

  if (state.isComplete) {
    const pct = Math.round((state.correctCount / questions.length) * 100);
    return (
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
        <div className="text-4xl mb-3">{pct >= 80 ? "🏆" : pct >= 60 ? "📈" : "💪"}</div>
        <h3 className="font-bold text-xl mb-1">Quiz Complete</h3>
        <p className="text-white/60 mb-4">{state.correctCount}/{questions.length} correct — {pct}% accuracy</p>
        <div className="w-full bg-white/10 rounded-full h-2 mb-2">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${pct}%`,
              background: pct >= 80 ? "oklch(0.65 0.18 145)" : pct >= 60 ? "oklch(0.75 0.18 80)" : "oklch(0.65 0.22 25)",
            }}
          />
        </div>
        <p className="text-white/40 text-sm mt-3">
          {pct >= 80 ? "Excellent — you've mastered this content." : "Keep going — more XP unlocks harder questions."}
        </p>
      </div>
    );
  }

  const progress = (state.currentIndex / questions.length) * 100;

  return (
    <div>
      {/* Progress bar */}
      <div className="w-full bg-white/10 rounded-full h-1.5 mb-4">
        <div className="h-1.5 rounded-full bg-pink-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between text-xs text-white/40 mb-4">
        <span>Question {state.currentIndex + 1} of {questions.length}</span>
        <span className="capitalize">{q.tier} level</span>
      </div>

      <p className="font-semibold mb-4 leading-snug">{q.text}</p>

      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          const isSelected = state.selectedOption === i;
          const isCorrectOption = i === q.correct;
          const show = state.hasAnswered;

          let border = "rgba(255,255,255,0.1)";
          let bg = "rgba(255,255,255,0.06)";

          if (show) {
            if (isCorrectOption) { bg = "rgba(80,200,100,0.15)"; border = "oklch(0.65 0.18 145)"; }
            else if (isSelected) { bg = "rgba(200,60,60,0.15)"; border = "oklch(0.65 0.22 25)"; }
          } else if (isSelected) {
            bg = "rgba(255,255,255,0.15)";
            border = "rgba(255,255,255,0.4)";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={state.hasAnswered}
              className="block w-full text-left p-3 rounded-xl border text-sm transition-all"
              style={{ background: bg, borderColor: border }}
            >
              <span className="text-white/30 mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {state.hasAnswered && (
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-4">
          <p className="text-xs text-white/40 mb-1">
            {state.selectedOption === q.correct ? "✓ Correct" : "✗ Incorrect"}
          </p>
          <p className="text-white/70 text-sm leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {state.hasAnswered && (
        <button onClick={handleNext} className="w-full px-4 py-2 rounded-full bg-pink-500 text-white font-bold">
          {state.currentIndex + 1 >= questions.length ? "See Results →" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export const Route = createFileRoute("/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("learn");
  const [xp, setXp] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [chaptersCompleted, setChaptersCompleted] = useState(0);

  // Track which tabs are done per chapter
  const [completedTabs, setCompletedTabs] = useState<Record<number, Set<TabType>>>({});
  const [quizResults, setQuizResults] = useState<Record<number, { correct: number; total: number }>>({});

  const chapter = chapters[chapterIndex];
  const difficulty = getDifficulty(xp, chaptersCompleted);
  const learnContent = getLearnContent(chapter, difficulty);
  const filteredQuestions = getFilteredQuestions(chapter.questions, difficulty);

  const doneTabs = completedTabs[chapter.id] ?? new Set<TabType>();
  const quizUnlocked = doneTabs.has("learn");
  const orderUnlocked = doneTabs.has("quiz");
  const decideUnlocked = doneTabs.has("order");

  const addXp = useCallback((n: number) => setXp((x) => x + n), []);

  const markDone = useCallback(
    (tab: TabType) => {
      setCompletedTabs((prev) => {
        const existing = prev[chapter.id] ?? new Set<TabType>();
        return { ...prev, [chapter.id]: new Set([...existing, tab]) };
      });
    },
    [chapter.id]
  );

  const handleLearnDone = () => { markDone("learn"); addXp(20); setActiveTab("quiz"); };

  const handleQuizDone = (correct: number, total: number) => {
    setQuizResults((prev) => ({ ...prev, [chapter.id]: { correct, total } }));
    markDone("quiz");
    const pct = correct / total;
    addXp(pct >= 0.8 ? 30 : pct >= 0.6 ? 15 : 5);
  };

  const handleOrderDone = () => { markDone("order"); addXp(25); setActiveTab("decide"); };

  const handleDecideDone = () => {
    markDone("decide");
    addXp(chapter.xpReward);
    setChaptersCompleted((c) => c + 1);
  };

  // XP bar calc
  const xpTarget = difficulty === "beginner" ? 300 : difficulty === "intermediate" ? 800 : 800;
  const xpBase = difficulty === "beginner" ? 0 : 300;
  const xpProgress = Math.min(((xp - xpBase) / (xpTarget - xpBase)) * 100, 100);

  const tabs: { id: TabType; label: string; locked: boolean }[] = [
    { id: "learn", label: "Learn", locked: false },
    { id: "quiz", label: "Quiz", locked: !quizUnlocked },
    { id: "order", label: "Order", locked: !orderUnlocked },
    { id: "decide", label: "Decide", locked: !decideUnlocked },
  ];

  return (
    <main className="min-h-screen p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-1">French Revolution Learning Path</h1>
      <p className="text-white/50 mb-2 text-sm">
        Chapter {chapter.id}: {chapter.title}
      </p>

      {/* XP + DIFFICULTY */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>{difficultyLabel(difficulty)} tier</span>
          <span>{xp} XP{difficulty !== "advanced" ? ` / ${xpTarget}` : " — max tier"}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-pink-500 transition-all duration-700"
            style={{ width: `${difficulty === "advanced" ? 100 : xpProgress}%` }}
          />
        </div>
        <p className="text-white/30 text-xs mt-1">
          {difficulty === "beginner" && `${300 - xp} XP to unlock Intermediate content`}
          {difficulty === "intermediate" && `${800 - xp} XP to unlock Advanced content`}
          {difficulty === "advanced" && "All content unlocked"}
        </p>
      </div>

      {/* CHAPTER SELECTOR */}
      <div className="flex gap-2 flex-wrap mb-6">
        {chapters.map((c, i) => {
          const unlocked = i === 0 || chaptersCompleted >= i;
          return (
            <button
              key={c.id}
              onClick={() => { if (unlocked) { setChapterIndex(i); setActiveTab("learn"); } }}
              className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${
                i === chapterIndex ? "bg-pink-500 text-white" : unlocked ? "bg-white/10 text-white" : "bg-white/5 text-white/25 cursor-not-allowed"
              }`}
            >
              {!unlocked ? "🔒" : (completedTabs[c.id]?.has("decide") ? "✓" : "")} {c.id}
            </button>
          );
        })}
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => !t.locked && setActiveTab(t.id)}
            className={`flex-1 px-3 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === t.id
                ? "bg-pink-500 text-white"
                : t.locked
                ? "bg-white/5 text-white/20 cursor-not-allowed"
                : "bg-white/10 text-white"
            }`}
          >
            {doneTabs.has(t.id) ? "✓ " : t.locked ? "🔒 " : ""}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── LEARN ── */}
      {activeTab === "learn" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-pink-500 text-white font-bold">
              {difficultyLabel(difficulty)} content
            </span>
            <span className="text-white/30 text-xs">{learnContent.length} facts</span>
          </div>
          <div className="space-y-3 mb-6">
            {learnContent.map((text, i) => (
              <p key={i} className="text-white/70 leading-relaxed">{text}</p>
            ))}
          </div>
          <div className="text-white/40 text-sm mb-4">XP: {xp} | Tier: {difficultyLabel(difficulty)}</div>
          {!doneTabs.has("learn") ? (
            <button onClick={handleLearnDone} className="w-full px-4 py-2 rounded-full bg-pink-500 text-white font-bold">
              I've read this → Start Quiz (+20 XP)
            </button>
          ) : (
            <p className="text-center text-white/30 text-sm">✓ Learn complete — head to the Quiz tab</p>
          )}
        </div>
      )}

      {/* ── QUIZ ── */}
      {activeTab === "quiz" && (
        <div>
          {!doneTabs.has("quiz") ? (
            <>
              <p className="text-white/50 text-sm mb-4">
                {filteredQuestions.length} questions at{" "}
                <span className="text-pink-400">{difficultyLabel(difficulty)}</span> difficulty
              </p>
              <QuizGame
                key={`quiz-${chapter.id}`}
                questions={filteredQuestions}
                onComplete={handleQuizDone}
                onXpGain={addXp}
              />
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold mb-1">Quiz Complete</p>
              <p className="text-white/50 text-sm">
                {quizResults[chapter.id]?.correct}/{quizResults[chapter.id]?.total} correct
              </p>
              <p className="text-white/30 text-sm mt-1">Head to the Order tab to continue.</p>
            </div>
          )}
        </div>
      )}

      {/* ── ORDER ── */}
      {activeTab === "order" && (
        <div>
          {!doneTabs.has("order") ? (
            <OrderingGame key={`order-${chapter.id}`} chapter={chapter} onComplete={handleOrderDone} />
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold mb-1">Ordering Complete</p>
              <p className="text-white/30 text-sm">Head to the Decide tab.</p>
            </div>
          )}
        </div>
      )}

      {/* ── DECIDE ── */}
      {activeTab === "decide" && (
        <div>
          {!doneTabs.has("decide") ? (
            <SwipeCard key={`decide-${chapter.id}`} chapter={chapter} onComplete={handleDecideDone} />
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🏆</div>
              <p className="font-bold mb-1">Chapter Complete!</p>
              <p className="text-white/50 text-sm">+{chapter.xpReward} XP earned</p>
              <p className="text-white/30 text-sm mt-1">Select the next chapter above.</p>
            </div>
          )}
        </div>
      )}

    </main>
  );
}
