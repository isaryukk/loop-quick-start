import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Home, BookOpen, MessageSquare, User, Loader2, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
  head: () => ({ meta: [{ title: "CivicLoop — Daily Quiz" }] }),
});

type Question = {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
};

const FALLBACK: Question[] = [
  { text: "What does NATO stand for?", options: ["North American Trade Organisation", "North Atlantic Treaty Organisation", "National Armed Treaty Operations", "Northern Alliance Treaty Organisation"], correctAnswer: 1, explanation: "NATO is a military alliance formed in 1949 between North American and European nations for collective defence. It is a mutual defence pact — an attack on one member is considered an attack on all.", topic: "Politics" },
  { text: "Which country has the world's largest economy by GDP?", options: ["China", "Japan", "USA", "Germany"], correctAnswer: 2, explanation: "The United States has the world's largest economy by nominal GDP at around $27 trillion. China is second. The US has held the top spot since surpassing the UK in the late 1800s.", topic: "Economics" },
  { text: "What does GDP stand for?", options: ["Gross Domestic Product", "Global Development Programme", "Government Debt Protocol", "Gross Daily Production"], correctAnswer: 0, explanation: "GDP (Gross Domestic Product) measures the total monetary value of all goods and services produced in a country in a given period. It is the most widely used measure of a country's economic size.", topic: "Economics" },
  { text: "How many permanent members sit on the UN Security Council?", options: ["3", "5", "7", "10"], correctAnswer: 1, explanation: "Five countries hold permanent seats with veto power: USA, UK, France, Russia, and China. These were the main Allied powers that won World War II. Any one of them can block a resolution.", topic: "Politics" },
  { text: "What is Brexit?", options: ["A French political party", "The UK leaving the European Union", "A German economic policy", "A NATO military operation"], correctAnswer: 1, explanation: "Brexit (British Exit) refers to the UK's withdrawal from the European Union, which became official on 31 January 2020 following a 2016 referendum where 52% voted to leave.", topic: "Politics" },
];

const TODAY = new Date().toDateString();
const CACHE_KEY = `civicloop_quiz_${TODAY}`;

async function loadQuestions(): Promise<Question[]> {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length >= 5) return parsed;
    }
  } catch {}

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Add VITE_GEMINI_API_KEY to Cloudflare environment variables then redeploy");
    return FALLBACK;
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Generate exactly 5 multiple choice quiz questions about world politics, economics, international relations, and current affairs. Cover different topics.

Return ONLY a valid JSON array with no backticks and no explanation:
[{"text":"Question?","options":["A","B","C","D"],"correctAnswer":0,"explanation":"Clear explanation of why the answer is correct and relevant context.","topic":"Politics"}]

Topic options: Politics, Economics, World News, International Relations, History.
correctAnswer is the zero-based index. Be factual, unbiased, and educational. Include context in explanations.` }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
        }),
      }
    );
    if (!res.ok) return FALLBACK;
    const data = await res.json();
    const raw: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const clean = raw.replace(/```json\s*/gi, "").replace(/```/gi, "").trim();
    const questions: Question[] = JSON.parse(clean);
    if (!Array.isArray(questions) || questions.length < 5) return FALLBACK;
    localStorage.setItem(CACHE_KEY, JSON.stringify(questions));
    Object.keys(localStorage).filter((k) => k.startsWith("civicloop_quiz_") && k !== CACHE_KEY).forEach((k) => localStorage.removeItem(k));
    return questions;
  } catch { return FALLBACK; }
}

function LoadingScreen() {
  const [i, setI] = useState(0);
  const msgs = ["Reading today's news...", "Picking your 5 questions...", "Almost ready..."];
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % msgs.length), 2200); return () => clearInterval(t); }, []);
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />
      <div className="relative text-center">
        <Loader2 className="mx-auto mb-5 h-12 w-12 animate-spin" style={{ color: "oklch(0.78 0.18 350)" }} />
        <h2 className="text-2xl font-black text-white mb-2">Building today's quiz</h2>
        <p className="text-lg font-semibold text-white/70">{msgs[i]}</p>
      </div>
    </main>
  );
}

function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    let live = true;
    loadQuestions().then((qs) => { if (live) { setQuestions(qs); setLoading(false); } });
    return () => { live = false; };
  }, []);

  const q = questions[currentQ];

  const pick = (idx: number) => {
    if (selected !== null || !q) return;
    setSelected(idx);
    setAnswers((prev) => [...prev, idx]);
    if (idx === q.correctAnswer) setCorrectCount((n) => n + 1);
  };

  const next = () => {
    if (selected === null || !q) return;
    const isLast = currentQ + 1 >= questions.length;
    if (isLast) {
      const score = selected === q.correctAnswer ? correctCount + 1 : correctCount;
      const xp = 50 + (score === questions.length ? 25 : 0);
      localStorage.setItem("civicloop_xp", String(parseInt(localStorage.getItem("civicloop_xp") || "0") + xp));
      localStorage.setItem("civicloop_streak", String(parseInt(localStorage.getItem("civicloop_streak") || "0") + 1));
      setFinalScore(score);
      setDone(true);
    } else {
      setCurrentQ((n) => n + 1);
      setSelected(null);
    }
  };

  const tryAgain = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setCorrectCount(0);
    setDone(false);
    setFinalScore(0);
    setShowReview(false);
  };

  if (loading) return <LoadingScreen />;

  // ── RESULTS SCREEN ─────────────────────────────────────────────────────────
  if (done) {
    const xp = 50 + (finalScore === questions.length ? 25 : 0);
    const loop = parseInt(localStorage.getItem("civicloop_streak") || "1");
    return (
      <main className="relative min-h-screen bg-background px-6 pt-12 pb-32 text-white overflow-y-auto">
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />
        <div className="relative text-center mb-6">
          <div className="mb-4 text-7xl">{finalScore === 5 ? "🏆" : finalScore >= 3 ? "⭐" : "📚"}</div>
          <h1 className="mb-1 text-7xl font-black text-white">{finalScore} / {questions.length}</h1>
          <p className="text-lg font-bold text-white/70">{finalScore === questions.length ? "Perfect score!" : finalScore >= 3 ? "Well done!" : "Keep learning!"}</p>
        </div>

        {/* Stats */}
        <div className="relative mb-4 rounded-2xl border border-white/20 bg-white/8 p-5">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-base font-bold text-white/80">XP earned</span>
            <span className="text-2xl font-black" style={{ color: "oklch(0.78 0.18 350)" }}>+{xp} XP</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-white/80">Daily Loop</span>
            <span className="text-base font-black text-white">∞ {loop} {loop === 1 ? "day" : "days"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="relative flex gap-3 mb-6">
          <button onClick={tryAgain} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 text-base font-bold text-white hover:bg-white/8">
            <RotateCcw className="h-4 w-4" /> Try Again
          </button>
          <button onClick={() => navigate({ to: "/home" })} className="flex-1 rounded-full py-3.5 text-base font-bold text-white" style={{ background: "oklch(0.72 0.18 350)" }}>
            Home
          </button>
        </div>

        {/* Review answers */}
        <div className="relative">
          <button onClick={() => setShowReview((v) => !v)} className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/8 px-5 py-4 text-base font-bold text-white mb-3">
            Review All Answers
            {showReview ? <ChevronUp className="h-5 w-5 text-white/60" /> : <ChevronDown className="h-5 w-5 text-white/60" />}
          </button>

          {showReview && (
            <div className="flex flex-col gap-4">
              {questions.map((question, qi) => {
                const userAns = answers[qi];
                const correct = userAns === question.correctAnswer;
                return (
                  <div key={qi} className={`rounded-2xl border p-4 ${correct ? "border-green-500/30 bg-green-500/8" : "border-red-500/30 bg-red-500/8"}`}>
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-lg">{correct ? "✓" : "✗"}</span>
                      <p className="text-base font-black text-white leading-tight">{question.text}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 mb-3">
                      {question.options.map((opt, oi) => {
                        let cls = "rounded-xl px-3 py-2 text-sm font-semibold ";
                        if (oi === question.correctAnswer) cls += "bg-green-500/20 text-green-300 border border-green-500/30";
                        else if (oi === userAns && !correct) cls += "bg-red-500/20 text-red-300 border border-red-500/30";
                        else cls += "text-white/40";
                        return <div key={oi} className={cls}>{oi === question.correctAnswer ? "✓ " : oi === userAns && !correct ? "✗ " : ""}{opt}</div>;
                      })}
                    </div>
                    <p className="text-sm font-semibold leading-relaxed text-white/80">{question.explanation}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
          <Link to="/home" className="flex flex-col items-center gap-1"><Home className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Home</span></Link>
          <Link to="/history" className="flex flex-col items-center gap-1"><BookOpen className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">History</span></Link>
          <Link to="/debate" className="flex flex-col items-center gap-1"><MessageSquare className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Debate</span></Link>
          <Link to="/profile" className="flex flex-col items-center gap-1"><User className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Profile</span></Link>
        </nav>
      </main>
    );
  }

  if (!q) return null;

  // ── QUIZ SCREEN ─────────────────────────────────────────────────────────────
  return (
    <main className="relative min-h-screen bg-background px-6 pt-12 pb-48 text-white overflow-y-auto">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />

      {/* Progress */}
      <div className="relative mb-6">
        <div className="mb-2 flex justify-between">
          <span className="text-base font-bold text-white">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-base font-bold text-white/60">Score: {correctCount}</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-white/10">
          <div className="h-2.5 rounded-full transition-all" style={{ width: `${(currentQ / questions.length) * 100}%`, background: "oklch(0.72 0.18 350)" }} />
        </div>
      </div>

      {/* Topic */}
      <span className="relative mb-4 inline-block self-start rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-bold text-white">
        {q.topic}
      </span>

      {/* Question */}
      <h2 className="relative mb-6 text-2xl font-black leading-tight text-white">{q.text}</h2>

      {/* Options */}
      <div className="relative flex flex-col gap-3 mb-4">
        {q.options.map((opt, idx) => {
          let cls = "w-full rounded-2xl border px-5 py-4 text-left text-base font-bold transition-all ";
          if (selected === null) cls += "border-white/25 bg-white/8 text-white hover:bg-white/12";
          else if (idx === q.correctAnswer) cls += "border-green-500 bg-green-500/20 text-green-300";
          else if (idx === selected) cls += "border-red-500 bg-red-500/20 text-red-300";
          else cls += "border-white/10 bg-white/5 text-white/40 opacity-50";
          return <button key={idx} className={cls} onClick={() => pick(idx)}>{opt}</button>;
        })}
      </div>

      {/* Explanation — shows after answering */}
      {selected !== null && (
        <div className="relative rounded-2xl border border-white/20 bg-white/8 p-4 mb-4">
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "oklch(0.78 0.18 350)" }}>
            {selected === q.correctAnswer ? "✓ Correct!" : "✗ Not quite"}
          </p>
          <p className="text-base font-semibold leading-relaxed text-white">{q.explanation}</p>
        </div>
      )}

      {/* Next button — fixed above nav so always visible */}
      {selected !== null && (
        <div className="fixed bottom-20 left-0 right-0 px-6 z-10">
          <button onClick={next} className="w-full rounded-full py-4 text-base font-black text-white shadow-lg" style={{ background: "oklch(0.72 0.18 350)" }}>
            {currentQ + 1 >= questions.length ? "See My Results →" : "Next Question →"}
          </button>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3 z-20">
        <Link to="/home" className="flex flex-col items-center gap-1"><Home className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Home</span></Link>
        <Link to="/history" className="flex flex-col items-center gap-1"><BookOpen className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">History</span></Link>
        <Link to="/debate" className="flex flex-col items-center gap-1"><MessageSquare className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Debate</span></Link>
        <Link to="/profile" className="flex flex-col items-center gap-1"><User className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Profile</span></Link>
      </nav>
    </main>
  );
}
