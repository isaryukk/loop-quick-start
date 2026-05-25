bash

cat > /mnt/user-data/outputs/quiz.tsx << 'EOF'
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Home, BookOpen, MessageSquare, User, Loader2 } from "lucide-react";

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
  { text: "What does NATO stand for?", options: ["North American Trade Organisation", "North Atlantic Treaty Organisation", "National Armed Treaty Operations", "Northern Alliance Treaty Organisation"], correctAnswer: 1, explanation: "NATO is a military alliance formed in 1949 between North American and European nations for collective defence.", topic: "Politics" },
  { text: "Which country has the world's largest economy by GDP?", options: ["China", "Japan", "USA", "Germany"], correctAnswer: 2, explanation: "The United States has the world's largest economy by nominal GDP.", topic: "Economics" },
  { text: "What does GDP stand for?", options: ["Gross Domestic Product", "Global Development Programme", "Government Debt Protocol", "Gross Daily Production"], correctAnswer: 0, explanation: "GDP measures the total monetary value of all goods and services produced in a country.", topic: "Economics" },
  { text: "How many permanent members sit on the UN Security Council?", options: ["3", "5", "7", "10"], correctAnswer: 1, explanation: "Five permanent members hold veto power: USA, UK, France, Russia, and China.", topic: "Politics" },
  { text: "What is Brexit?", options: ["A French political party", "The UK's departure from the European Union", "A German economic policy", "A NATO military operation"], correctAnswer: 1, explanation: "Brexit refers to the UK's withdrawal from the European Union, which became official on 31 January 2020.", topic: "Politics" },
];

const TODAY = new Date().toDateString();
const CACHE_KEY = `civicloop_quiz_${TODAY}`;

async function loadQuestions(): Promise<Question[]> {
  // Return cached questions if we already generated today's
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length >= 5) return parsed;
    }
  } catch {}

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return FALLBACK;

  try {
    const prompt = `Generate exactly 5 multiple choice quiz questions about world politics, economics, international relations, and current affairs. Mix the topics — do not repeat the same theme.

Return ONLY a valid JSON array. No explanation, no backticks, just the array:
[
  {
    "text": "Question?",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "Short factual explanation.",
    "topic": "Politics"
  }
]

Topic options: Politics, Economics, World News, International Relations, History.
correctAnswer is the zero-based index of the correct option.
Be factual, unbiased, and educational. Suitable for 18-28 year olds.`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
        }),
      }
    );

    if (!res.ok) return FALLBACK;

    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const clean = raw.replace(/```json\s*/gi, "").replace(/```/gi, "").trim();
    const questions: Question[] = JSON.parse(clean);

    if (!Array.isArray(questions) || questions.length < 5) return FALLBACK;

    localStorage.setItem(CACHE_KEY, JSON.stringify(questions));

    // Remove old cached days to save space
    Object.keys(localStorage)
      .filter((k) => k.startsWith("civicloop_quiz_") && k !== CACHE_KEY)
      .forEach((k) => localStorage.removeItem(k));

    return questions;
  } catch {
    return FALLBACK;
  }
}

function LoadingScreen() {
  const [i, setI] = useState(0);
  const msgs = ["Reading today's news...", "Picking your 5 questions...", "Almost ready..."];
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % msgs.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />
      <div className="relative text-center">
        <Loader2 className="mx-auto mb-5 h-12 w-12 animate-spin" style={{ color: "oklch(0.78 0.18 350)" }} />
        <h2 className="text-2xl font-black text-white mb-2">Building today's quiz</h2>
        <p className="text-base font-semibold text-white/60">{msgs[i]}</p>
      </div>
    </main>
  );
}

export default function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let live = true;
    loadQuestions().then((qs) => { if (live) { setQuestions(qs); setLoading(false); } });
    return () => { live = false; };
  }, []);

  const q = questions[currentQ];

  const pick = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctAnswer) setScore((s) => s + 1);
  };

  const next = () => {
    const correct = selected === q.correctAnswer;
    if (currentQ + 1 >= questions.length) {
      const final = correct ? score + 1 : score;
      const xp = 50 + (final === questions.length ? 25 : 0);
      localStorage.setItem("civicloop_xp", String(parseInt(localStorage.getItem("civicloop_xp") || "0") + xp));
      localStorage.setItem("civicloop_streak", String(parseInt(localStorage.getItem("civicloop_streak") || "0") + 1));
      setDone(true);
    } else {
      setCurrentQ((n) => n + 1);
      setSelected(null);
    }
  };

  if (loading) return <LoadingScreen />;

  if (done) {
    const xp = 50 + (score === questions.length ? 25 : 0);
    const loop = parseInt(localStorage.getItem("civicloop_streak") || "1");
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />
        <div className="relative w-full max-w-sm text-center">
          <div className="mb-4 text-6xl">{score === 5 ? "🏆" : score >= 3 ? "⭐" : "📚"}</div>
          <h1 className="mb-1 text-6xl font-black text-white">{score} / {questions.length}</h1>
          <p className="mb-8 text-base font-semibold text-white/70">{score === questions.length ? "Perfect score!" : score >= 3 ? "Well done!" : "Keep learning!"}</p>
          <div className="mb-6 rounded-2xl border border-white/15 bg-white/8 p-5 text-left">
            <div className="mb-3 flex justify-between">
              <span className="text-base font-semibold text-white/70">XP earned</span>
              <span className="text-2xl font-black" style={{ color: "oklch(0.78 0.18 350)" }}>+{xp} XP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-semibold text-white/70">Daily Loop</span>
              <span className="text-base font-bold text-white">∞ {loop} {loop === 1 ? "day" : "days"}</span>
            </div>
          </div>
          <button onClick={() => navigate({ to: "/home" })} className="w-full rounded-full py-4 text-base font-bold text-white" style={{ background: "oklch(0.72 0.18 350)" }}>
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  if (!q) return null;

  return (
    <main className="relative flex min-h-screen flex-col bg-background px-6 pt-12 pb-8 text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />

      <div className="relative mb-6">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-bold text-white">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-sm font-semibold text-white/60">Score: {score}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/10">
          <div className="h-2 rounded-full transition-all" style={{ width: `${(currentQ / questions.length) * 100}%`, background: "oklch(0.72 0.18 350)" }} />
        </div>
      </div>

      <span className="relative mb-4 inline-block self-start rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-white/80">{q.topic}</span>
      <h2 className="relative mb-6 text-2xl font-black leading-tight text-white">{q.text}</h2>

      <div className="relative flex flex-1 flex-col gap-3">
        {q.options.map((opt, idx) => {
          let cls = "w-full rounded-2xl border px-5 py-4 text-left text-base font-semibold transition-all ";
          if (selected === null) cls += "border-white/20 bg-white/8 text-white hover:bg-white/12";
          else if (idx === q.correctAnswer) cls += "border-green-500 bg-green-500/20 text-green-300 font-bold";
          else if (idx === selected) cls += "border-red-500 bg-red-500/20 text-red-300 font-bold";
          else cls += "border-white/10 bg-white/5 text-white/40 opacity-50";
          return <button key={idx} className={cls} onClick={() => pick(idx)}>{opt}</button>;
        })}
      </div>

      {selected !== null && (
        <div className="relative mt-4 rounded-2xl border border-white/15 bg-white/8 p-4">
          <p className="text-base font-semibold leading-relaxed text-white/80">{q.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <button onClick={next} className="relative mt-4 w-full rounded-full py-4 text-base font-bold text-white" style={{ background: "oklch(0.72 0.18 350)" }}>
          {currentQ + 1 >= questions.length ? "See Results" : "Next Question →"}
        </button>
      )}

      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1"><Home className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Home</span></Link>
        <Link to="/history" className="flex flex-col items-center gap-1"><BookOpen className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">History</span></Link>
        <Link to="/debate" className="flex flex-col items-center gap-1"><MessageSquare className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Debate</span></Link>
        <Link to="/profile" className="flex flex-col items-center gap-1"><User className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Profile</span></Link>
      </nav>
    </main>
  );
}
EOF
echo "done"
