import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback, useEffect, useRef } from "react";
import { Home, BookOpen, MessageSquare, User } from "lucide-react";
import { chapters, type Chapter, type Question } from "../data/chapter";

type TabType = "learn" | "quiz" | "order" | "decide";

const TAB_EMOJI: Record<TabType, string> = {
  learn: "📖", quiz: "❓", order: "🔢", decide: "⚖️",
};

/* ── Persistence helpers ── */
function loadCompletedTabs(): Record<number, Set<TabType>> {
  try {
    const raw = localStorage.getItem("civicloop_history_completed");
    if (!raw) return {};
    const parsed: Record<string, string[]> = JSON.parse(raw);
    const result: Record<number, Set<TabType>> = {};
    Object.entries(parsed).forEach(([k, v]) => {
      result[parseInt(k)] = new Set(v as TabType[]);
    });
    return result;
  } catch { return {}; }
}

function saveCompletedTabs(tabs: Record<number, Set<TabType>>) {
  try {
    const serialized: Record<number, string[]> = {};
    Object.entries(tabs).forEach(([k, v]) => { serialized[parseInt(k)] = Array.from(v); });
    localStorage.setItem("civicloop_history_completed", JSON.stringify(serialized));
  } catch {}
}

function loadNumber(key: string, fallback = 0): number {
  try { return parseInt(localStorage.getItem(key) || String(fallback)); } catch { return fallback; }
}

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

function getBulletSummary(core: string[]): string[] {
  return core.map((para) => {
    const first = para.split(".")[0].trim();
    return (first.length > 130 ? first.substring(0, 130) + "…" : first) + ".";
  });
}

/* ── Daily quiz helpers ── */
function getTodayKey() { return new Date().toISOString().slice(0, 10); }

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

function isQuizDoneToday(chapterId: number): boolean {
  try { return localStorage.getItem(`history_quiz_done_ch${chapterId}_${getTodayKey()}`) === "done"; } catch { return false; }
}

function markQuizDoneToday(chapterId: number) {
  try { localStorage.setItem(`history_quiz_done_ch${chapterId}_${getTodayKey()}`, "done"); } catch {}
}

/* ══════════════════════════════════════════════
   SWIPE CARD
══════════════════════════════════════════════ */
function SwipeCard({ chapter, onComplete }: { chapter: Chapter; onComplete: () => void }) {
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
      <div className="rounded-3xl border border-white/20 bg-white/8 p-5">
        <p className="text-white/60 text-xs font-black mb-1 uppercase tracking-widest">
          {outcome === "left" ? scenario.leftChoice : scenario.rightChoice}
        </p>
        <h3 className="font-black text-lg mb-2 text-white">{chosen.title}</h3>
        <p className="text-white/85 font-bold mb-4 leading-relaxed">{chosen.text}</p>
        <div className="flex gap-2 flex-wrap mb-5">
          {chosen.reactions.map((r, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-xs font-black text-white"
              style={{ background: r.color === "red" ? "oklch(0.55 0.22 25)" : r.color === "green" ? "oklch(0.55 0.18 145)" : "oklch(0.35 0 0)" }}>
              {r.label}
            </span>
          ))}
        </div>
        <button onClick={() => setStage("history")} className="w-full py-4 rounded-full font-black text-white"
          style={{ background: "oklch(0.72 0.18 350)" }}>
          See What Actually Happened →
        </button>
      </div>
    );
  }

  if (stage === "history") {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/8 p-5">
        <p className="text-white/60 text-xs font-black mb-1 uppercase tracking-widest">Historical Reality</p>
        <h3 className="font-black text-lg mb-2 text-white">{chosen?.title}</h3>
        <p className="text-white/85 font-bold mb-6 leading-relaxed">{chosen?.historical}</p>
        <button onClick={onComplete} className="w-full py-4 rounded-full font-black text-white"
          style={{ background: "oklch(0.72 0.18 350)" }}>
          Complete Chapter ✓
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between text-sm font-black mb-3 px-1">
        <span style={{ opacity: dragX < -THRESHOLD / 2 ? 1 : 0.3 }}>← {scenario.leftChoice}</span>
        <span style={{ opacity: dragX > THRESHOLD / 2 ? 1 : 0.3 }}>{scenario.rightChoice} →</span>
      </div>
      <div
        className="rounded-3xl border border-white/20 bg-white/8 p-5 cursor-grab active:cursor-grabbing select-none"
        style={{ transform: `rotate(${rotation}deg) translateX(${dragX * 0.12}px)`, transition: isDragging ? "none" : "transform 0.3s ease" }}
        onMouseDown={(e) => handleStart(e.clientX)} onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd} onMouseLeave={() => isDragging && handleEnd()}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)} onTouchEnd={handleEnd}
      >
        <p className="text-white/60 text-xs font-bold mb-1">{scenario.date}</p>
        <h3 className="font-black text-lg mb-2 text-white">{scenario.situation}</h3>
        <p className="text-white/85 font-bold mb-4 leading-relaxed">{scenario.context}</p>
        <p className="text-center text-white/60 text-sm font-bold">← Swipe left or right to decide →</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ORDERING GAME — touch + mouse
══════════════════════════════════════════════ */
function OrderingGame({ chapter, onComplete }: { chapter: Chapter; onComplete: () => void }) {
  const [items, setItems] = useState([...chapter.orderingEvents].sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [touchDragIndex, setTouchDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveItem = (from: number, to: number) => {
    if (from === to) return;
    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setItems(updated);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (touchDragIndex === null || !containerRef.current) return;
    const touch = e.touches[0];
    containerRef.current.querySelectorAll("[data-order-item]").forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (touch.clientY >= rect.top && touch.clientY <= rect.bottom) setHoverIndex(i);
    });
  };

  const handleTouchEnd = () => {
    if (touchDragIndex !== null && hoverIndex !== null && touchDragIndex !== hoverIndex) moveItem(touchDragIndex, hoverIndex);
    setTouchDragIndex(null); setHoverIndex(null);
  };

  if (checked && isCorrect) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/8 p-5 text-center">
        <div className="text-5xl mb-3">✅</div>
        <h3 className="font-black text-xl mb-2 text-white">Perfect Order!</h3>
        <p className="text-white/80 font-bold mb-6">You correctly placed all {items.length} events.</p>
        <button onClick={onComplete} className="w-full py-4 rounded-full font-black text-white" style={{ background: "oklch(0.72 0.18 350)" }}>
          Continue to Decide →
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-white/80 font-black mb-1">Put these events in chronological order.</p>
      <p className="text-white/60 font-bold text-sm mb-5">Drag to reorder — works on phone and desktop.</p>
      <div className="space-y-2 mb-5" ref={containerRef}>
        {items.map((item, i) => (
          <div key={item.id} data-order-item
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => { e.preventDefault(); setHoverIndex(i); }}
            onDragLeave={() => setHoverIndex(null)}
            onDrop={() => { if (dragIndex !== null && dragIndex !== i) moveItem(dragIndex, i); setDragIndex(null); setHoverIndex(null); }}
            onTouchStart={() => setTouchDragIndex(i)}
            onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
            className="flex items-center gap-3 p-4 rounded-2xl border cursor-grab active:cursor-grabbing select-none transition-all"
            style={{
              borderColor: checked && !isCorrect && item.correctIndex !== i ? "oklch(0.65 0.22 25)" : hoverIndex === i ? "oklch(0.72 0.18 350)" : "rgba(255,255,255,0.15)",
              background: touchDragIndex === i ? "rgba(255,255,255,0.15)" : hoverIndex === i ? "oklch(0.72 0.18 350 / 0.1)" : "rgba(255,255,255,0.06)",
            }}>
            <span className="text-white/40 text-sm w-5 shrink-0 text-center font-black">{i + 1}</span>
            <span className="text-white font-bold flex-1 leading-snug text-sm">{item.text}</span>
            <span className="text-white/30 text-lg shrink-0">⠿</span>
          </div>
        ))}
      </div>
      {checked && !isCorrect && <p className="text-white/70 font-bold text-sm mb-3 text-center">Not quite — red items are out of place.</p>}
      <button
        onClick={checked && !isCorrect ? () => { setChecked(false); setIsCorrect(null); } : () => { setIsCorrect(items.every((item, i) => item.correctIndex === i)); setChecked(true); }}
        className="w-full py-4 rounded-full font-black text-white" style={{ background: "oklch(0.72 0.18 350)" }}>
        {checked && !isCorrect ? "Try Again" : "Check Order"}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   QUIZ GAME
══════════════════════════════════════════════ */
type QuizState = { currentIndex: number; selectedOption: number | null; hasAnswered: boolean; correctCount: number; isComplete: boolean };

function QuizGame({ questions, onComplete, onXpGain }: { questions: Question[]; onComplete: (correct: number, total: number) => void; onXpGain: (amount: number) => void }) {
  const [state, setState] = useState<QuizState>({ currentIndex: 0, selectedOption: null, hasAnswered: false, correctCount: 0, isComplete: false });
  const q = questions[state.currentIndex];
  const progress = (state.currentIndex / questions.length) * 100;

  const handleSelect = useCallback((optionIndex: number) => {
    if (state.hasAnswered || !q) return;
    const correct = optionIndex === q.correct;
    onXpGain(correct ? xpForCorrect(q.tier) : 3);
    setState((prev) => ({ ...prev, selectedOption: optionIndex, hasAnswered: true, correctCount: correct ? prev.correctCount + 1 : prev.correctCount }));
  }, [state.hasAnswered, q, onXpGain]);

  const handleNext = () => {
    const nextIndex = state.currentIndex + 1;
    if (nextIndex >= questions.length) { setState((prev) => ({ ...prev, isComplete: true })); onComplete(state.correctCount, questions.length); }
    else setState((prev) => ({ ...prev, currentIndex: nextIndex, selectedOption: null, hasAnswered: false }));
  };

  if (state.isComplete) {
    const pct = Math.round((state.correctCount / questions.length) * 100);
    return (
      <div className="rounded-3xl border border-white/20 bg-white/8 p-5 text-center">
        <div className="text-5xl mb-3">{pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📚"}</div>
        <h3 className="font-black text-2xl mb-1 text-white">{state.correctCount} / {questions.length}</h3>
        <p className="text-white/80 font-bold mb-5">{pct >= 80 ? "Excellent!" : pct >= 60 ? "Well done!" : "Keep going!"}</p>
        <p className="text-white/60 font-bold text-sm">Order tab is now unlocked ↑</p>
      </div>
    );
  }
  if (!q) return null;

  return (
    <div>
      <div className="h-2.5 w-full rounded-full bg-white/10 mb-3">
        <div className="h-2.5 rounded-full transition-all" style={{ width: `${progress}%`, background: "oklch(0.72 0.18 350)" }} />
      </div>
      <div className="flex justify-between text-sm font-black text-white/70 mb-5">
        <span>Question {state.currentIndex + 1} of {questions.length}</span>
        <span className="capitalize">{q.tier} level</span>
      </div>
      <h2 className="text-xl font-black leading-tight mb-6 text-white">{q.text}</h2>
      <div className="flex flex-col gap-3 mb-4">
        {q.options.map((opt, idx) => {
          const show = state.hasAnswered;
          let cls = "w-full rounded-2xl border px-5 py-4 text-left text-base font-black transition-all ";
          if (show) {
            if (idx === q.correct) cls += "border-green-500 bg-green-500/20 text-green-300";
            else if (idx === state.selectedOption) cls += "border-red-500 bg-red-500/20 text-red-300";
            else cls += "border-white/10 bg-white/5 text-white/40 opacity-50";
          } else if (state.selectedOption === idx) cls += "border-white/50 bg-white/15 text-white";
          else cls += "border-white/25 bg-white/8 text-white hover:bg-white/12";
          return <button key={idx} className={cls} onClick={() => handleSelect(idx)}>{opt}</button>;
        })}
      </div>
      {state.hasAnswered && (
        <div className="rounded-3xl border border-white/20 bg-white/8 p-5 mb-4">
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "oklch(0.78 0.18 350)" }}>
            {state.selectedOption === q.correct ? "✓ Correct" : "✗ Not Quite"}
          </p>
          <p className="text-base font-bold leading-relaxed text-white/90">{q.explanation}</p>
        </div>
      )}
      {state.hasAnswered && (
        <div className="fixed right-0 bottom-20 left-0 z-10 px-6">
          <button onClick={handleNext} className="w-full py-4 rounded-full font-black text-white shadow-lg" style={{ background: "oklch(0.72 0.18 350)" }}>
            {state.currentIndex + 1 >= questions.length ? "See Results →" : "Next Question →"}
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
  /* ── All state now persists to localStorage ── */
  const [activeTab, setActiveTab] = useState<TabType>("learn");

  const [xp, setXp] = useState(() => loadNumber("civicloop_xp", 0));
  const [chapterIndex, setChapterIndex] = useState(() => loadNumber("civicloop_history_chapter", 0));
  const [chaptersCompleted, setChaptersCompleted] = useState(() => loadNumber("civicloop_history_chapters_done", 0));
  const [completedTabs, setCompletedTabs] = useState<Record<number, Set<TabType>>>(loadCompletedTabs);
  const [quizResults, setQuizResults] = useState<Record<number, { correct: number; total: number }>>({});
  const [quizDoneToday, setQuizDoneToday] = useState(false);

  /* ── Persist on change ── */
  useEffect(() => { localStorage.setItem("civicloop_xp", String(xp)); }, [xp]);
  useEffect(() => { localStorage.setItem("civicloop_history_chapter", String(chapterIndex)); }, [chapterIndex]);
  useEffect(() => { localStorage.setItem("civicloop_history_chapters_done", String(chaptersCompleted)); }, [chaptersCompleted]);
  useEffect(() => { saveCompletedTabs(completedTabs); }, [completedTabs]);

  const chapter = chapters[chapterIndex];
  const difficulty = getDifficulty(xp, chaptersCompleted);
  const allQuestions = getFilteredQuestions(chapter.questions, difficulty);
  const dailyQuestions = getDailyQuestions(allQuestions, chapter.id);
  const learnContent = getLearnContent(chapter, difficulty);
  const bulletSummary = getBulletSummary(chapter.learn.core);
  const doneTabs = completedTabs[chapter.id] ?? new Set<TabType>();
  const quizUnlocked = doneTabs.has("learn");
  const orderUnlocked = doneTabs.has("quiz");
  const decideUnlocked = doneTabs.has("order");

  useEffect(() => { setQuizDoneToday(isQuizDoneToday(chapter.id)); }, [chapter.id]);

  const addXp = useCallback((n: number) => setXp((x) => x + n), []);

  const markDone = useCallback((tab: TabType) => {
    setCompletedTabs((prev) => {
      const existing = prev[chapter.id] ?? new Set<TabType>();
      return { ...prev, [chapter.id]: new Set([...existing, tab]) };
    });
  }, [chapter.id]);

  const handleLearnDone = () => { markDone("learn"); addXp(20); setActiveTab("quiz"); };

  const handleQuizDone = (correct: number, total: number) => {
    setQuizResults((prev) => ({ ...prev, [chapter.id]: { correct, total } }));
    markDone("quiz");
    markQuizDoneToday(chapter.id);
    setQuizDoneToday(true);
    addXp(correct / total >= 0.8 ? 30 : correct / total >= 0.6 ? 15 : 5);
  };

  const handleOrderDone = () => { markDone("order"); addXp(25); setActiveTab("decide"); };

  const handleDecideDone = () => {
    markDone("decide");
    addXp(chapter.xpReward);
    setChaptersCompleted((c) => c + 1);
  };

  const xpTarget = difficulty === "beginner" ? 300 : 800;
  const xpBase = difficulty === "beginner" ? 0 : 300;
  const xpProgress = difficulty === "advanced" ? 100 : Math.min(((xp - xpBase) / (xpTarget - xpBase)) * 100, 100);

  const tabs: { id: TabType; locked: boolean }[] = [
    { id: "learn", locked: false },
    { id: "quiz", locked: !quizUnlocked },
    { id: "order", locked: !orderUnlocked },
    { id: "decide", locked: !decideUnlocked },
  ];

  const getTabLabel = (t: { id: TabType; locked: boolean }) => {
    if (doneTabs.has(t.id)) return `✓ ${t.id.charAt(0).toUpperCase() + t.id.slice(1)}`;
    if (t.locked) return `🔒 ${t.id.charAt(0).toUpperCase() + t.id.slice(1)}`;
    return `${TAB_EMOJI[t.id]} ${t.id.charAt(0).toUpperCase() + t.id.slice(1)}`;
  };

  return (
    <main className="relative min-h-screen overflow-y-auto bg-background px-6 pt-10 pb-32 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />

      <div className="relative mb-2">
        <h1 className="text-3xl font-black text-white">History Mode</h1>
        <p className="text-white/80 font-bold">The French Revolution</p>
        <p className="text-white/60 font-bold text-sm">7 chapters · 1788–1799</p>
      </div>

      <div className="relative mb-5 mt-4">
        <div className="flex justify-between text-xs font-black text-white/70 mb-1.5">
          <span>{difficultyLabel(difficulty)} tier</span>
          <span>{xp} XP{difficulty !== "advanced" ? ` / ${xpTarget}` : " — max tier"}</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-white/10">
          <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${xpProgress}%`, background: "oklch(0.72 0.18 350)" }} />
        </div>
        <p className="text-white/60 font-bold text-xs mt-1">
          {difficulty === "beginner" && `${300 - xp} XP to unlock Intermediate`}
          {difficulty === "intermediate" && `${800 - xp} XP to unlock Advanced`}
          {difficulty === "advanced" && "All content tiers unlocked"}
        </p>
      </div>

      {/* Chapter timeline */}
      <div className="relative mb-5 -mx-6 px-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {chapters.map((c, i) => {
            const unlocked = i === 0 || chaptersCompleted >= i;
            const done = completedTabs[c.id]?.has("decide");
            const active = i === chapterIndex;
            return (
              <button key={c.id}
                onClick={() => { if (unlocked) { setChapterIndex(i); setActiveTab("learn"); } }}
                className="flex-shrink-0 flex flex-col items-start rounded-2xl border p-3 transition-all text-left"
                style={{
                  minWidth: "120px",
                  background: active ? "oklch(0.72 0.18 350)" : unlocked ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                  borderColor: active ? "oklch(0.72 0.18 350)" : "rgba(255,255,255,0.15)",
                  cursor: unlocked ? "pointer" : "not-allowed",
                  opacity: unlocked ? 1 : 0.5,
                }}>
                <span className="text-xs font-black text-white/60 mb-1">{done ? "✓" : !unlocked ? "🔒" : `Ch ${c.id}`}</span>
                <p className={`text-xs font-black leading-snug ${active ? "text-white" : "text-white/80"}`}>{c.title}</p>
                <p className={`text-xs font-bold mt-0.5 ${active ? "text-white/80" : "text-white/50"}`}>{c.date}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative rounded-3xl border border-white/20 bg-white/8 p-4 mb-5">
        <p className="text-xs font-black text-white/60 uppercase tracking-widest mb-1">{chapter.date} · {chapter.keyFigure}</p>
        <h2 className="text-xl font-black mb-1 text-white">{chapter.title}</h2>
        <p className="text-white/80 font-bold text-sm leading-relaxed">{chapter.description}</p>
      </div>

      {/* Tabs */}
      <div className="relative flex gap-2 mb-6">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => !t.locked && setActiveTab(t.id)}
            className="flex-1 py-2.5 rounded-full text-xs font-black transition-all"
            style={activeTab === t.id
              ? { background: "oklch(0.72 0.18 350)", color: "white" }
              : t.locked
              ? { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", cursor: "not-allowed" }
              : { background: "rgba(255,255,255,0.1)", color: "white" }}>
            {getTabLabel(t)}
          </button>
        ))}
      </div>

      {/* ══ LEARN ══ */}
      {activeTab === "learn" && (
        <div className="relative">
          <div className="flex justify-between items-center mb-5">
            <span className="text-xs font-black px-3 py-1.5 rounded-full text-white" style={{ background: "oklch(0.72 0.18 350)" }}>{difficultyLabel(difficulty)} content</span>
            <span className="text-white/60 font-bold text-xs">{learnContent.length} sections</span>
          </div>
          <div className="space-y-5 mb-6">
            {learnContent.map((text, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-white/90 font-bold leading-relaxed text-sm">{text}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-4 mb-6">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "oklch(0.78 0.18 350)" }}>📌 Key Takeaways</p>
            <ul className="space-y-2">
              {bulletSummary.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 shrink-0 text-xs font-black" style={{ color: "oklch(0.78 0.18 350)" }}>•</span>
                  <p className="text-sm font-bold text-white/85 leading-snug">{point}</p>
                </li>
              ))}
            </ul>
          </div>
          {!doneTabs.has("learn") ? (
            <button onClick={handleLearnDone} className="w-full py-4 rounded-full font-black text-white" style={{ background: "oklch(0.72 0.18 350)" }}>
              Done Reading → Unlock Quiz (+20 XP)
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-center text-white/60 font-bold text-sm">✓ Learn complete</p>
              <button onClick={() => setActiveTab("quiz")} className="w-full py-3 rounded-full font-black text-white" style={{ background: "oklch(0.72 0.18 350)" }}>Go to Quiz →</button>
            </div>
          )}
        </div>
      )}

      {/* ══ QUIZ ══ */}
      {activeTab === "quiz" && (
        <div className="relative">
          {!doneTabs.has("quiz") ? (
            <>
              <div className="flex justify-between items-center mb-5">
                <p className="text-white/80 font-bold text-sm">{dailyQuestions.length} questions · <span style={{ color: "oklch(0.78 0.18 350)" }}>{difficultyLabel(difficulty)}</span></p>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-white/70 font-black">Daily Quiz</span>
              </div>
              <QuizGame key={`quiz-${chapter.id}-${getTodayKey()}`} questions={dailyQuestions} onComplete={handleQuizDone} onXpGain={addXp} />
              <div className="h-24" />
            </>
          ) : (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">✅</div>
              <p className="font-black text-xl mb-1 text-white">Today's Quiz Done</p>
              <p className="text-white/75 font-bold mb-1">{quizResults[chapter.id]?.correct}/{quizResults[chapter.id]?.total} correct</p>
              <p className="text-white/60 font-bold text-sm mb-6">New questions available tomorrow.</p>
              <button onClick={() => setActiveTab("order")} className="w-full py-4 rounded-full font-black text-white" style={{ background: "oklch(0.72 0.18 350)" }}>Continue to Order →</button>
            </div>
          )}
        </div>
      )}

      {/* ══ ORDER ══ */}
      {activeTab === "order" && (
        <div className="relative">
          {!doneTabs.has("order") ? (
            <OrderingGame key={`order-${chapter.id}`} chapter={chapter} onComplete={handleOrderDone} />
          ) : (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">✅</div>
              <p className="font-black text-xl mb-1 text-white">Ordering Complete</p>
              <p className="text-white/60 font-bold text-sm mb-6">Ready for the next challenge.</p>
              <button onClick={() => setActiveTab("decide")} className="w-full py-4 rounded-full font-black text-white" style={{ background: "oklch(0.72 0.18 350)" }}>Continue to Decide →</button>
            </div>
          )}
        </div>
      )}

      {/* ══ DECIDE ══ */}
      {activeTab === "decide" && (
        <div className="relative">
          {!doneTabs.has("decide") ? (
            <SwipeCard key={`decide-${chapter.id}`} chapter={chapter} onComplete={handleDecideDone} />
          ) : (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">🏆</div>
              <p className="font-black text-xl mb-1 text-white">Chapter {chapter.id} Complete!</p>
              <p className="text-white/75 font-bold mb-6">+{chapter.xpReward} XP earned</p>
              {chapterIndex < chapters.length - 1 ? (
                <button onClick={() => { setChapterIndex(chapterIndex + 1); setActiveTab("learn"); }}
                  className="px-8 py-4 rounded-full font-black text-white" style={{ background: "oklch(0.72 0.18 350)" }}>
                  Next Chapter →
                </button>
              ) : (
                <p className="text-white/60 font-bold">You've completed all 7 chapters! 🎉</p>
              )}
            </div>
          )}
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1"><Home className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Home</span></Link>
        <Link to="/history" className="flex flex-col items-center gap-1"><BookOpen className="h-5 w-5 text-white" /><span className="text-xs font-medium text-white">History</span></Link>
        <Link to="/debate" className="flex flex-col items-center gap-1"><MessageSquare className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Debate</span></Link>
        <Link to="/profile" className="flex flex-col items-center gap-1"><User className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Profile</span></Link>
      </nav>
    </main>
  );
}
