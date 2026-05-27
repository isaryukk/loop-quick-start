import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { Home, BookOpen, MessageSquare, User } from "lucide-react";
import { chapters, type Chapter, type Question } from "../data/chapter";

type TabType = "learn" | "quiz" | "order" | "decide";

/* ── Adaptive difficulty ── */
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

function xpForCorrect(tier: Question["tier"]): number {
  if (tier === "core") return 10;
  if (tier === "key") return 15;
  if (tier === "analysis") return 20;
  return 25;
}

/* ── Daily quiz — resets each calendar day ── */
function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDailyQuestions(allQuestions: Question[], chapterId: number): Question[] {
  if (allQuestions.length === 0) return [];
  const today = getTodayKey();
  const seed = today.split("-").reduce((acc, part) => acc * 31 + parseInt(part), chapterId * 97);
  const copy = [...allQuestions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.abs((seed * (i + 1) * 1664525 + 1013904223) % (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(5, copy.length));
}

function getDailyStorageKey(chapterId: number) {
  return `history_quiz_done_ch${chapterId}_${getTodayKey()}`;
}

function isQuizDoneToday(chapterId: number): boolean {
  try {
    return localStorage.getItem(getDailyStorageKey(chapterId)) === "done";
  } catch {
    return false;
  }
}

function markQuizDoneToday(chapterId: number) {
  try {
    localStorage.setItem(getDailyStorageKey(chapterId), "done");
  } catch { /* ok */ }
}

/* ══════════════════════════════════════════════
   SWIPE CARD
══════════════════════════════════════════════ */
function SwipeCard({
  chapter,
  onComplete,
}: {
  chapter: Chapter;
  onComplete: () => void;
}) {
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
    if (dir) {
      setOutcome(dir);
      setStage("outcome");
    }
    setDragX(0);
  };

  const chosen = outcome === "left" ? scenario.leftOutcome : scenario.rightOutcome;

  if (stage === "outcome" && chosen) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/8 p-5">
        <p className="text-white/40 text-xs mb-1 uppercase tracking-widest">
          {outcome === "left" ? scenario.leftChoice : scenario.rightChoice}
        </p>
        <h3 className="font-black text-lg mb-2">{chosen.title}</h3>
        <p className="text-white/70 mb-4 leading-relaxed">{chosen.text}</p>
        <div className="flex gap-2 flex-wrap mb-5">
          {chosen.reactions.map((r, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-black text-white"
              style={{
                background:
                  r.color === "red"
                    ? "oklch(0.55 0.22 25)"
                    : r.color === "green"
                    ? "oklch(0.55 0.18 145)"
                    : "oklch(0.35 0 0)",
              }}
            >
              {r.label}
            </span>
          ))}
        </div>
        <button
          onClick={() => setStage("history")}
          className="w-full py-4 rounded-full font-black text-white"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          See What Actually Happened →
        </button>
      </div>
    );
  }

  if (stage === "history") {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/8 p-5">
        <p className="text-white/40 text-xs mb-1 uppercase tracking-widest">
          Historical Reality
        </p>
        <h3 className="font-black text-lg mb-2">{chosen?.title}</h3>
        <p className="text-white/70 mb-6 leading-relaxed">{chosen?.historical}</p>
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-full font-black text-white"
          style={{ background: "oklch(0.72 0.18 350)" }}
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
      <div className="flex justify-between text-sm font-black mb-3 px-1">
        <span style={{ opacity: leftActive ? 1 : 0.3 }}>← {scenario.leftChoice}</span>
        <span style={{ opacity: rightActive ? 1 : 0.3 }}>{scenario.rightChoice} →</span>
      </div>
      <div
        className="rounded-3xl border border-white/20 bg-white/8 p-5 cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: `rotate(${rotation}deg) translateX(${dragX * 0.12}px)`,
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
        <h3 className="font-black text-lg mb-2">{scenario.situation}</h3>
        <p className="text-white/70 mb-4 leading-relaxed">{scenario.context}</p>
        <p className="text-center text-white/40 text-sm">← Swipe left or right to decide →</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ORDERING GAME
══════════════════════════════════════════════ */
function OrderingGame({
  chapter,
  onComplete,
}: {
  chapter: Chapter;
  onComplete: () => void;
}) {
  const [items, setItems] = useState(
    [...chapter.orderingEvents].sort(() => Math.random() - 0.5)
  );
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const checkOrder = () => {
    setIsCorrect(items.every((item, i) => item.correctIndex === i));
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
      <div className="rounded-3xl border border-white/20 bg-white/8 p-5 text-center">
        <div className="text-5xl mb-3">✅</div>
        <h3 className="font-black text-xl mb-2">Perfect Order!</h3>
        <p className="text-white/60 mb-6">You correctly placed all {items.length} events.</p>
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-full font-black text-white"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          Continue to Decide →
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-white/60 font-bold mb-1">Put these events in chronological order.</p>
      <p className="text-white/40 text-sm mb-5">Drag and drop to reorder, then tap Check Order.</p>
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
            className="flex items-center gap-3 p-4 rounded-2xl border cursor-grab select-none"
            style={{
              borderColor:
                checked && !isCorrect && item.correctIndex !== i
                  ? "oklch(0.65 0.22 25)"
                  : "rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <span className="text-white/30 text-sm w-5 shrink-0 text-center font-mono">
              {i + 1}
            </span>
            <span className="text-white flex-1 leading-snug font-semibold text-sm">
              {item.text}
            </span>
            <span className="text-white/20 text-lg shrink-0">⠿</span>
          </div>
        ))}
      </div>
      {checked && !isCorrect && (
        <p className="text-white/50 text-sm mb-3 text-center">
          Not quite — red-bordered items are out of place. Try again.
        </p>
      )}
      <button
        onClick={
          checked && !isCorrect
            ? () => {
                setChecked(false);
                setIsCorrect(null);
              }
            : checkOrder
        }
        className="w-full py-4 rounded-full font-black text-white"
        style={{ background: "oklch(0.72 0.18 350)" }}
      >
        {checked && !isCorrect ? "Try Again" : "Check Order"}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   QUIZ GAME
══════════════════════════════════════════════ */
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
  const progress = (state.currentIndex / questions.length) * 100;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (state.hasAnswered || !q) return;
      const correct = optionIndex === q.correct;
      onXpGain(correct ? xpForCorrect(q.tier) : 3);
      setState((prev) => ({
        ...prev,
        selectedOption: optionIndex,
        hasAnswered: true,
        correctCount: correct ? prev.correctCount + 1 : prev.correctCount,
      }));
    },
    [state.hasAnswered, q, onXpGain]
  );

  const handleNext = () => {
    const nextIndex = state.currentIndex + 1;
    if (nextIndex >= questions.length) {
      setState((prev) => ({ ...prev, isComplete: true }));
      onComplete(state.correctCount, questions.length);
    } else {
      setState((prev) => ({
        ...prev,
        currentIndex: nextIndex,
        selectedOption: null,
        hasAnswered: false,
      }));
    }
  };

  /* Results screen */
  if (state.isComplete) {
    const pct = Math.round((state.correctCount / questions.length) * 100);
    return (
      <div className="rounded-3xl border border-white/20 bg-white/8 p-5 text-center">
        <div className="text-5xl mb-3">
          {pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📚"}
        </div>
        <h3 className="font-black text-2xl mb-1">
          {state.correctCount} / {questions.length}
        </h3>
        <p className="text-white/60 font-bold mb-5">
          {pct >= 80 ? "Excellent work!" : pct >= 60 ? "Well done!" : "Keep learning!"}
        </p>
        <div className="w-full bg-white/10 rounded-full h-2.5 mb-2">
          <div
            className="h-2.5 rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background:
                pct >= 80
                  ? "oklch(0.55 0.18 145)"
                  : pct >= 60
                  ? "oklch(0.65 0.18 80)"
                  : "oklch(0.65 0.22 25)",
            }}
          />
        </div>
        <p className="text-white/40 text-sm mt-3">Order tab is now unlocked above ↑</p>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div>
      {/* Progress bar */}
      <div className="h-2.5 w-full rounded-full bg-white/10 mb-3">
        <div
          className="h-2.5 rounded-full transition-all"
          style={{ width: `${progress}%`, background: "oklch(0.72 0.18 350)" }}
        />
      </div>
      <div className="flex justify-between text-sm font-black text-white/60 mb-5">
        <span>
          Question {state.currentIndex + 1} of {questions.length}
        </span>
        <span className="capitalize">{q.tier} level</span>
      </div>

      {/* Question */}
      <h2 className="text-xl font-black leading-tight mb-6">{q.text}</h2>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-4">
        {q.options.map((opt, idx) => {
          const isSelected = state.selectedOption === idx;
          const isCorrectOption = idx === q.correct;
          const show = state.hasAnswered;
          let cls =
            "w-full rounded-2xl border px-5 py-4 text-left text-base font-black transition-all ";
          if (show) {
            if (isCorrectOption)
              cls += "border-green-500 bg-green-500/20 text-green-300";
            else if (isSelected)
              cls += "border-red-500 bg-red-500/20 text-red-300";
            else cls += "border-white/10 bg-white/5 text-white/40 opacity-50";
          } else if (isSelected) {
            cls += "border-white/50 bg-white/15 text-white";
          } else {
            cls += "border-white/25 bg-white/8 text-white hover:bg-white/12";
          }
          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation — shown after answering */}
      {state.hasAnswered && (
        <div className="rounded-3xl border border-white/20 bg-white/8 p-5 mb-4">
          <p
            className="text-xs font-black uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.78 0.18 350)" }}
          >
            {state.selectedOption === q.correct ? "✓ Correct" : "✗ Not Quite"}
          </p>
          <p className="text-base font-semibold leading-relaxed text-white">
            {q.explanation}
          </p>
        </div>
      )}

      {/* Continue button — fixed above nav */}
      {state.hasAnswered && (
        <div className="fixed right-0 bottom-20 left-0 z-10 px-6">
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-full font-black text-white shadow-lg"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            {state.currentIndex + 1 >= questions.length
              ? "See My Results →"
              : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN ROUTE
══════════════════════════════════════════════ */
export const Route = createFileRoute("/history")({
  component: HistoryPage,
  head: () => ({ meta: [{ title: "CivicLoop — History" }] }),
});

function HistoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("learn");
  const [xp, setXp] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [chaptersCompleted, setChaptersCompleted] = useState(0);
  const [completedTabs, setCompletedTabs] = useState<
    Record<number, Set<TabType>>
  >({});
  const [quizResults, setQuizResults] = useState<
    Record<number, { correct: number; total: number }>
  >({});

  const chapter = chapters[chapterIndex];
  const difficulty = getDifficulty(xp, chaptersCompleted);
  const allQuestions = getFilteredQuestions(chapter.questions, difficulty);
  const dailyQuestions = getDailyQuestions(allQuestions, chapter.id);

  /* Re-check daily completion whenever chapter changes */
  const [quizDoneToday, setQuizDoneToday] = useState(false);
  useEffect(() => {
    setQuizDoneToday(isQuizDoneToday(chapter.id));
  }, [chapter.id]);

  const learnContent = getLearnContent(chapter, difficulty);
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

  const handleLearnDone = () => {
    markDone("learn");
    addXp(20);
    setActiveTab("quiz");
  };

  const handleQuizDone = (correct: number, total: number) => {
    setQuizResults((prev) => ({ ...prev, [chapter.id]: { correct, total } }));
    markDone("quiz");
    markQuizDoneToday(chapter.id);
    setQuizDoneToday(true);
    addXp(correct / total >= 0.8 ? 30 : correct / total >= 0.6 ? 15 : 5);
  };

  const handleOrderDone = () => {
    markDone("order");
    addXp(25);
    setActiveTab("decide");
  };

  const handleDecideDone = () => {
    markDone("decide");
    addXp(chapter.xpReward);
    setChaptersCompleted((c) => c + 1);
  };

  const xpTarget = difficulty === "beginner" ? 300 : 800;
  const xpBase = difficulty === "beginner" ? 0 : 300;
  const xpProgress =
    difficulty === "advanced"
      ? 100
      : Math.min(((xp - xpBase) / (xpTarget - xpBase)) * 100, 100);

  const tabs: { id: TabType; label: string; locked: boolean }[] = [
    { id: "learn", label: "📖 Learn", locked: false },
    { id: "quiz", label: "❓ Quiz", locked: !quizUnlocked },
    { id: "order", label: "🔢 Order", locked: !orderUnlocked },
    { id: "decide", label: "⚖️ Decide", locked: !decideUnlocked },
  ];

  return (
    <main className="relative min-h-screen overflow-y-auto bg-background px-6 pt-10 pb-32 text-white">

      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="relative mb-2">
        <h1 className="text-3xl font-black">History Mode</h1>
        <p className="text-white/60 font-bold">The French Revolution</p>
        <p className="text-white/40 text-sm">
          7 chapters · 1788–1799 · Swipe timeline to explore
        </p>
      </div>

      {/* XP bar */}
      <div className="relative mb-5 mt-4">
        <div className="flex justify-between text-xs font-black text-white/50 mb-1.5">
          <span>{difficultyLabel(difficulty)} tier</span>
          <span>
            {xp} XP
            {difficulty !== "advanced" ? ` / ${xpTarget}` : " — max tier"}
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-white/10">
          <div
            className="h-2.5 rounded-full transition-all duration-700"
            style={{
              width: `${xpProgress}%`,
              background: "oklch(0.72 0.18 350)",
            }}
          />
        </div>
        <p className="text-white/30 text-xs mt-1">
          {difficulty === "beginner" && `${300 - xp} XP to unlock Intermediate content`}
          {difficulty === "intermediate" && `${800 - xp} XP to unlock Advanced content`}
          {difficulty === "advanced" && "All content tiers unlocked"}
        </p>
      </div>

      {/* Chapter selector */}
      <div className="relative flex gap-2 flex-wrap mb-5">
        {chapters.map((c, i) => {
          const unlocked = i === 0 || chaptersCompleted >= i;
          const done = completedTabs[c.id]?.has("decide");
          return (
            <button
              key={c.id}
              onClick={() => {
                if (unlocked) {
                  setChapterIndex(i);
                  setActiveTab("learn");
                }
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-black transition-all ${
                i === chapterIndex
                  ? "text-white"
                  : unlocked
                  ? "bg-white/10 text-white"
                  : "bg-white/5 text-white/25 cursor-not-allowed"
              }`}
              style={
                i === chapterIndex ? { background: "oklch(0.72 0.18 350)" } : {}
              }
            >
              {done ? "✓ " : !unlocked ? "🔒" : ""}
              {c.id}
            </button>
          );
        })}
      </div>

      {/* Chapter info card */}
      <div className="relative rounded-3xl border border-white/20 bg-white/8 p-4 mb-5">
        <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-1">
          {chapter.date} · {chapter.keyFigure}
        </p>
        <h2 className="text-xl font-black mb-1">{chapter.title}</h2>
        <p className="text-white/60 text-sm leading-relaxed">{chapter.description}</p>
      </div>

      {/* Tabs */}
      <div className="relative flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => !t.locked && setActiveTab(t.id)}
            className={`flex-1 py-2.5 rounded-full text-xs font-black transition-all ${
              activeTab === t.id
                ? "text-white"
                : t.locked
                ? "bg-white/5 text-white/20 cursor-not-allowed"
                : "bg-white/10 text-white"
            }`}
            style={
              activeTab === t.id ? { background: "oklch(0.72 0.18 350)" } : {}
            }
          >
            {doneTabs.has(t.id) ? "✓ " : t.locked ? "🔒 " : ""}
            {t.label}
          </button>
        ))}
      </div>

      {/* ══ LEARN ══ */}
      {activeTab === "learn" && (
        <div className="relative">
          <div className="flex justify-between items-center mb-5">
            <span
              className="text-xs font-black px-3 py-1.5 rounded-full text-white"
              style={{ background: "oklch(0.72 0.18 350)" }}
            >
              {difficultyLabel(difficulty)} content
            </span>
            <span className="text-white/40 text-xs font-bold">
              {learnContent.length} sections
            </span>
          </div>

          <div className="space-y-5 mb-8">
            {learnContent.map((text, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-white/85 leading-relaxed text-sm font-semibold">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-white/40 text-xs font-bold mb-4">
            XP: {xp} · Tier: {difficultyLabel(difficulty)}
          </div>

          {!doneTabs.has("learn") ? (
            <button
              onClick={handleLearnDone}
              className="w-full py-4 rounded-full font-black text-white"
              style={{ background: "oklch(0.72 0.18 350)" }}
            >
              Done Reading → Unlock Quiz (+20 XP)
            </button>
          ) : (
            <p className="text-center text-white/40 font-bold text-sm">
              ✓ Learn complete — Quiz tab is unlocked
            </p>
          )}
        </div>
      )}

      {/* ══ QUIZ ══ */}
      {activeTab === "quiz" && (
        <div className="relative">
          {!doneTabs.has("quiz") ? (
            <>
              <div className="flex justify-between items-center mb-5">
                <p className="text-white/60 font-bold text-sm">
                  {dailyQuestions.length} questions ·{" "}
                  <span style={{ color: "oklch(0.78 0.18 350)" }}>
                    {difficultyLabel(difficulty)}
                  </span>
                </p>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-white/60 font-black">
                  Daily Quiz
                </span>
              </div>
              <QuizGame
                key={`quiz-${chapter.id}-${getTodayKey()}`}
                questions={dailyQuestions}
                onComplete={handleQuizDone}
                onXpGain={addXp}
              />
              {/* Spacer so fixed continue button clears the content */}
              <div className="h-24" />
            </>
          ) : (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">✅</div>
              <p className="font-black text-xl mb-1">Today's Quiz Done</p>
              <p className="text-white/60 font-bold mb-1">
                {quizResults[chapter.id]?.correct}/
                {quizResults[chapter.id]?.total} correct
              </p>
              {quizDoneToday && (
                <p className="text-white/40 text-sm mb-6">
                  New questions available tomorrow.
                </p>
              )}
              <p className="text-white/50 font-bold">
                Head to{" "}
                <span className="text-white font-black">Order</span> tab to
                continue →
              </p>
            </div>
          )}
        </div>
      )}

      {/* ══ ORDER ══ */}
      {activeTab === "order" && (
        <div className="relative">
          {!doneTabs.has("order") ? (
            <OrderingGame
              key={`order-${chapter.id}`}
              chapter={chapter}
              onComplete={handleOrderDone}
            />
          ) : (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">✅</div>
              <p className="font-black text-xl mb-1">Ordering Complete</p>
              <p className="text-white/50 font-bold mt-1">
                Head to{" "}
                <span className="text-white font-black">Decide</span> →
              </p>
            </div>
          )}
        </div>
      )}

      {/* ══ DECIDE ══ */}
      {activeTab === "decide" && (
        <div className="relative">
          {!doneTabs.has("decide") ? (
            <SwipeCard
              key={`decide-${chapter.id}`}
              chapter={chapter}
              onComplete={handleDecideDone}
            />
          ) : (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">🏆</div>
              <p className="font-black text-xl mb-1">
                Chapter {chapter.id} Complete!
              </p>
              <p className="text-white/60 font-bold mb-6">
                +{chapter.xpReward} XP earned
              </p>
              {chapterIndex < chapters.length - 1 ? (
                <button
                  onClick={() => {
                    setChapterIndex(chapterIndex + 1);
                    setActiveTab("learn");
                  }}
                  className="px-8 py-4 rounded-full font-black text-white"
                  style={{ background: "oklch(0.72 0.18 350)" }}
                >
                  Next Chapter →
                </button>
              ) : (
                <p className="text-white/40 font-bold">
                  You've completed all 7 chapters! 🎉
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1">
          <Home className="h-5 w-5 text-white/50" />
          <span className="text-xs font-medium text-white/50">Home</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center gap-1">
          <BookOpen className="h-5 w-5 text-white" />
          <span className="text-xs font-medium text-white">History</span>
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
    </main>
  );
}
