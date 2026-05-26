import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { chapters, type Chapter, type Question } from "../data/chapter";

type TabType = "learn" | "quiz" | "order" | "decide";

/* ─────────────────────────────────────────────
   ADAPTIVE DIFFICULTY ENGINE
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

function xpForCorrect(tier: Question["tier"]): number {
  if (tier === "core") return 10;
  if (tier === "key") return 15;
  if (tier === "analysis") return 20;
  return 25;
}

/* ─────────────────────────────────────────────
   DAILY QUIZ HELPERS
   - 5 questions per day, selected by date
   - Resets at midnight each day
───────────────────────────────────────────── */

function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function getDailyQuestions(allQuestions: Question[], chapterId: number): Question[] {
  const today = getTodayKey();
  // Simple deterministic seed from today's date + chapterId
  const seed = today.split("-").reduce((a, b) => a + parseInt(b), chapterId);
  const shuffled = [...allQuestions].sort((a, b) => {
    const hashA = (seed * (allQuestions.indexOf(a) + 1) * 31) % 97;
    const hashB = (seed * (allQuestions.indexOf(b) + 1) * 31) % 97;
    return hashA - hashB;
  });
  return shuffled.slice(0, Math.min(5, shuffled.length));
}

function getDailyStorageKey(chapterId: number) {
  return `dailyQuizDone-ch${chapterId}-${getTodayKey()}`;
}

/* ─────────────────────────────────────────────
   SWIPE CARD
───────────────────────────────────────────── */

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

  const handleStart = (x: number) => { setIsDragging(true); startXRef.current = x; };
  const handleMove = (x: number) => { if (!isDragging) return; setDragX(x - startXRef.current); };
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
        <h3 className="font-bold text-lg mb-2">{chosen.title}</h3>
        <p className="text-white/70 mb-4">{chosen.text}</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {chosen.reactions.map((r, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{
                background:
                  r.color === "red" ? "oklch(0.55 0.22 25)" :
                  r.color === "green" ? "oklch(0.55 0.18 145)" :
                  "oklch(0.45 0 0)",
              }}
            >
              {r.label}
            </span>
          ))}
        </div>
        <button onClick={() => setStage("history")} className="w-full px-4 py-2 rounded-full bg-pink-500 text-white font-bold">
          See Historical Context →
        </button>
      </div>
    );
  }

  if (stage === "history") {
    return (
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-white/40 text-xs mb-1 uppercase tracking-widest">What Actually Happened</p>
        <h3 className="font-bold text-lg mb-2">{chosen?.title}</h3>
        <p className="text-white/70 mb-6">{chosen?.historical}</p>
        <button onClick={onComplete} className="w-full px-4 py-2 rounded-full bg-pink-500 text-white font-bold">
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
        <span className="font-bold transition-opacity" style={{ opacity: leftActive ? 1 : 0.35 }}>
          ← {scenario.leftChoice}
        </span>
        <span className="font-bold transition-opacity" style={{ opacity: rightActive ? 1 : 0.35 }}>
          {scenario.rightChoice} →
        </span>
      </div>
      <div
        className="p-5 rounded-xl bg-white/5 border border-white/10 cursor-grab active:cursor-grabbing select-none"
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
        <h3 className="font-bold mb-2">{scenario.situation}</h3>
        <p className="text-white/70 mb-4">{scenario.context}</p>
        <p className="text-center text-white/40 text-sm mt-2">← Swipe to choose →</p>
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
      <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-bold text-lg mb-2">Perfect Order!</h3>
        <p className="text-white/60 mb-5">You correctly placed all {items.length} events.</p>
        <button onClick={onComplete} className="w-full px-4 py-3 rounded-full bg-pink-500 text-white font-bold">
          Continue to Decide →
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-white/50 text-sm mb-1">Put these events in the correct chronological order.</p>
      <p className="text-white/30 text-xs mb-4">Drag and drop to reorder, then press Check Order.</p>
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
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border cursor-grab select-none"
            style={{
              borderColor:
                checked && !isCorrect && item.correctIndex !== i
                  ? "oklch(0.65 0.22 25)"
                  : "rgba(255,255,255,0.1)",
            }}
          >
            <span className="text-white/30 text-sm w-5 shrink-0 text-center font-mono">{i + 1}</span>
            <span className="text-white/80 text-sm flex-1 leading-snug">{item.text}</span>
            <span className="text-white/20 text-lg shrink-0">⠿</span>
          </div>
        ))}
      </div>
      {checked && !isCorrect && (
        <p className="text-white/50 text-sm mb-3 text-center">
          Not quite — items with a red border are out of place. Try again.
        </p>
      )}
      <button
        onClick={checked && !isCorrect ? () => { setChecked(false); setIsCorrect(null); } : checkOrder}
        className="w-full px-4 py-3 rounded-full bg-pink-500 text-white font-bold"
      >
        {checked && !isCorrect ? "Try Again" : "Check Order"}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   REAL MCQ QUIZ
   - Shows one question at a time
   - Answer → colour feedback + explanation shown
   - Prominent Continue button at bottom
   - 5 daily questions, resets each new day
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
  const progress = (state.currentIndex / questions.length) * 100;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (state.hasAnswered) return;
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

  /* ── Results screen ── */
  if (state.isComplete) {
    const pct = Math.round((state.correctCount / questions.length) * 100);
    return (
      <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
        <div className="text-4xl mb-3">{pct >= 80 ? "🏆" : pct >= 60 ? "📈" : "💪"}</div>
        <h3 className="font-bold text-xl mb-1">Quiz Complete</h3>
        <p className="text-white/60 mb-4">
          {state.correctCount}/{questions.length} correct — {pct}% accuracy
        </p>
        <div className="w-full bg-white/10 rounded-full h-2.5 mb-2">
          <div
            className="h-2.5 rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: pct >= 80 ? "oklch(0.55 0.18 145)" : pct >= 60 ? "oklch(0.65 0.18 80)" : "oklch(0.65 0.22 25)",
            }}
          />
        </div>
        <p className="text-white/40 text-sm mt-3">
          {pct >= 80
            ? "Excellent — unlock the Order challenge above."
            : "Good effort — the Order tab is now unlocked above."}
        </p>
      </div>
    );
  }

  /* ── Question screen ── */
  return (
    <div className="flex flex-col">
      {/* Progress */}
      <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
        <div
          className="h-1.5 rounded-full bg-pink-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-white/40 mb-4">
        <span>Question {state.currentIndex + 1} of {questions.length}</span>
        <span className="capitalize">{q.tier} level</span>
      </div>

      {/* Question */}
      <p className="font-semibold text-base mb-5 leading-snug">{q.text}</p>

      {/* Options */}
      <div className="space-y-2 mb-5">
        {q.options.map((opt, i) => {
          const isSelected = state.selectedOption === i;
          const isCorrectOption = i === q.correct;
          const show = state.hasAnswered;

          let border = "rgba(255,255,255,0.12)";
          let bg = "rgba(255,255,255,0.06)";
          let opacity = 1;

          if (show) {
            if (isCorrectOption) {
              bg = "rgba(60,180,90,0.18)";
              border = "oklch(0.55 0.18 145)";
            } else if (isSelected) {
              bg = "rgba(200,60,60,0.18)";
              border = "oklch(0.65 0.22 25)";
            } else {
              opacity = 0.5;
            }
          } else if (isSelected) {
            bg = "rgba(255,255,255,0.14)";
            border = "rgba(255,255,255,0.5)";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={state.hasAnswered}
              className="block w-full text-left p-3 rounded-xl border text-sm transition-all"
              style={{ background: bg, borderColor: border, opacity }}
            >
              <span className="text-white/30 mr-2 font-mono">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation — shown after answering */}
      {state.hasAnswered && (
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-5">
          <p className="text-xs font-bold mb-1.5" style={{ color: state.selectedOption === q.correct ? "oklch(0.65 0.18 145)" : "oklch(0.65 0.22 25)" }}>
            {state.selectedOption === q.correct ? "✓ Correct" : "✗ Incorrect"}
          </p>
          <p className="text-white/70 text-sm leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {/* Continue button — always visible after answering, prominent at bottom */}
      {state.hasAnswered && (
        <button
          onClick={handleNext}
          className="w-full px-4 py-3 rounded-full bg-pink-500 text-white font-bold text-base sticky bottom-4"
        >
          {state.currentIndex + 1 >= questions.length ? "See Results →" : "Continue →"}
        </button>
      )}
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
  const [activeTab, setActiveTab] = useState<TabType>("learn");
  const [xp, setXp] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [chaptersCompleted, setChaptersCompleted] = useState(0);

  // Per-chapter completed tabs
  const [completedTabs, setCompletedTabs] = useState<Record<number, Set<TabType>>>({});
  const [quizResults, setQuizResults] = useState<Record<number, { correct: number; total: number }>>({});

  const chapter = chapters[chapterIndex];
  const difficulty = getDifficulty(xp, chaptersCompleted);
  const allQuestions = getFilteredQuestions(chapter.questions, difficulty);

  // Daily quiz: 5 questions selected by today's date
  const [dailyQuestions] = useState(() => getDailyQuestions(allQuestions, chapter.id));

  // Check if today's quiz is already done (persisted in localStorage)
  const [dailyDone, setDailyDone] = useState(() => {
    try { return localStorage.getItem(getDailyStorageKey(chapter.id)) === "done"; } catch { return false; }
  });

  // Recompute daily state when chapter changes
  useEffect(() => {
    try {
      setDailyDone(localStorage.getItem(getDailyStorageKey(chapter.id)) === "done");
    } catch { /* localStorage unavailable */ }
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
    // Mark daily quiz as complete for today
    try { localStorage.setItem(getDailyStorageKey(chapter.id), "done"); } catch { /* ok */ }
    setDailyDone(true);
    const pct = correct / total;
    addXp(pct >= 0.8 ? 30 : pct >= 0.6 ? 15 : 5);
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

  // XP bar
  const xpTarget = difficulty === "beginner" ? 300 : 800;
  const xpBase = difficulty === "beginner" ? 0 : 300;
  const xpProgress = difficulty === "advanced" ? 100 : Math.min(((xp - xpBase) / (xpTarget - xpBase)) * 100, 100);

  const tabs: { id: TabType; label: string; locked: boolean }[] = [
    { id: "learn", label: "Learn", locked: false },
    { id: "quiz", label: "Quiz", locked: !quizUnlocked },
    { id: "order", label: "Order", locked: !orderUnlocked },
    { id: "decide", label: "Decide", locked: !decideUnlocked },
  ];

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-1">French Revolution Learning Path</h1>
      <p className="text-white/50 mb-4 text-sm">Chapter {chapter.id}: {chapter.title}</p>

      {/* XP + Difficulty */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>{difficultyLabel(difficulty)} tier</span>
          <span>{xp} XP{difficulty !== "advanced" ? ` / ${xpTarget}` : " — max tier"}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="h-2 rounded-full bg-pink-500 transition-all duration-700" style={{ width: `${xpProgress}%` }} />
        </div>
        <p className="text-white/30 text-xs mt-1">
          {difficulty === "beginner" && `${300 - xp} XP to unlock Intermediate content`}
          {difficulty === "intermediate" && `${800 - xp} XP to unlock Advanced content`}
          {difficulty === "advanced" && "All content tiers unlocked"}
        </p>
      </div>

      {/* Chapter selector */}
      <div className="flex gap-2 flex-wrap mb-6">
        {chapters.map((c, i) => {
          const unlocked = i === 0 || chaptersCompleted >= i;
          const done = completedTabs[c.id]?.has("decide");
          return (
            <button
              key={c.id}
              onClick={() => {
                if (unlocked) { setChapterIndex(i); setActiveTab("learn"); }
              }}
              className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${
                i === chapterIndex
                  ? "bg-pink-500 text-white"
                  : unlocked
                  ? "bg-white/10 text-white"
                  : "bg-white/5 text-white/25 cursor-not-allowed"
              }`}
            >
              {done ? "✓ " : !unlocked ? "🔒 " : ""}{c.id}
            </button>
          );
        })}
      </div>

      {/* Tabs — locked sequentially until each one is complete */}
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => !t.locked && setActiveTab(t.id)}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${
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

      {/* ══ LEARN ══ */}
      {activeTab === "learn" && (
        <div>
          <div className="flex justify-between items-center mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-pink-500 text-white font-bold">
              {difficultyLabel(difficulty)} content
            </span>
            <span className="text-white/30 text-xs">{learnContent.length} sections</span>
          </div>

          {/* Rich paragraphs with spacing */}
          <div className="space-y-5 mb-8">
            {learnContent.map((text, i) => (
              <div key={i} className="border-l-2 border-white/10 pl-4">
                <p className="text-white/75 leading-relaxed text-sm">{text}</p>
              </div>
            ))}
          </div>

          <div className="text-white/40 text-xs mb-4">XP: {xp} | Tier: {difficultyLabel(difficulty)}</div>

          {!doneTabs.has("learn") ? (
            <button onClick={handleLearnDone} className="w-full px-4 py-3 rounded-full bg-pink-500 text-white font-bold">
              Done Reading → Start Quiz (+20 XP)
            </button>
          ) : (
            <p className="text-center text-white/30 text-sm">✓ Learn complete — head to the Quiz tab</p>
          )}
        </div>
      )}

      {/* ══ QUIZ ══ */}
      {activeTab === "quiz" && (
        <div>
          {!doneTabs.has("quiz") ? (
            <>
              {/* Daily quiz info banner */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-white/50 text-sm">
                  {dailyQuestions.length} questions ·{" "}
                  <span className="text-pink-400">{difficultyLabel(difficulty)}</span>
                </p>
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/50">
                  Daily Quiz
                </span>
              </div>
              <QuizGame
                key={`quiz-${chapter.id}-${getTodayKey()}`}
                questions={dailyQuestions}
                onComplete={handleQuizDone}
                onXpGain={addXp}
              />
            </>
          ) : (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold mb-1">Today's Quiz Complete</p>
              <p className="text-white/50 text-sm">
                {quizResults[chapter.id]?.correct}/{quizResults[chapter.id]?.total} correct
              </p>
              <p className="text-white/30 text-sm mt-1">
                Come back tomorrow for a fresh set of questions.
              </p>
              <p className="text-white/40 text-sm mt-4">
                Head to the <span className="text-white/60 font-bold">Order</span> tab to continue →
              </p>
            </div>
          )}
        </div>
      )}

      {/* ══ ORDER ══ */}
      {activeTab === "order" && (
        <div>
          {!doneTabs.has("order") ? (
            <OrderingGame key={`order-${chapter.id}`} chapter={chapter} onComplete={handleOrderDone} />
          ) : (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold mb-1">Ordering Complete</p>
              <p className="text-white/30 text-sm mt-1">
                Head to <span className="text-white/60 font-bold">Decide</span> →
              </p>
            </div>
          )}
        </div>
      )}

      {/* ══ DECIDE ══ */}
      {activeTab === "decide" && (
        <div>
          {!doneTabs.has("decide") ? (
            <SwipeCard key={`decide-${chapter.id}`} chapter={chapter} onComplete={handleDecideDone} />
          ) : (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🏆</div>
              <p className="font-bold mb-1">Chapter {chapter.id} Complete!</p>
              <p className="text-white/50 text-sm">+{chapter.xpReward} XP earned</p>
              {chapterIndex < chapters.length - 1 && (
                <button
                  onClick={() => { setChapterIndex(chapterIndex + 1); setActiveTab("learn"); }}
                  className="mt-5 px-6 py-2 rounded-full bg-pink-500 text-white font-bold"
                >
                  Next Chapter →
                </button>
              )}
              {chapterIndex === chapters.length - 1 && (
                <p className="text-white/30 text-sm mt-4">You've completed all chapters! 🎉</p>
              )}
            </div>
          )}
        </div>
      )}

    </main>
  );
}
