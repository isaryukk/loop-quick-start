import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Home, BookOpen, MessageSquare, User, Loader2, ChevronDown, ChevronUp,
} from "lucide-react";

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

const FALLBACK_POOL: Question[] = [
  { text: "What does NATO stand for?", options: ["North American Trade Organisation", "North Atlantic Treaty Organisation", "National Armed Treaty Operations", "Northern Alliance Treaty Organisation"], correctAnswer: 1, explanation: "NATO is a military alliance formed in 1949 for collective defence. An attack on one member is treated as an attack on all.", topic: "Politics" },
  { text: "Which country has the world's largest economy by nominal GDP?", options: ["China", "Japan", "USA", "Germany"], correctAnswer: 2, explanation: "The United States leads with roughly $27 trillion in nominal GDP. China is second by nominal GDP but first by purchasing power parity.", topic: "Economics" },
  { text: "What does GDP stand for?", options: ["Gross Domestic Product", "Global Development Programme", "Government Debt Protocol", "Gross Daily Production"], correctAnswer: 0, explanation: "GDP measures the total monetary value of all goods and services produced in a country over a given period — the most widely used measure of economic size.", topic: "Economics" },
  { text: "How many permanent members sit on the UN Security Council?", options: ["3", "5", "7", "10"], correctAnswer: 1, explanation: "Five countries — the USA, UK, France, Russia, and China — hold permanent seats with veto power over any substantive resolution.", topic: "Politics" },
  { text: "What is Brexit?", options: ["A French political party", "The UK leaving the European Union", "A German economic policy", "A NATO military operation"], correctAnswer: 1, explanation: "Brexit is the UK's withdrawal from the EU following the 2016 referendum in which 52% voted to leave.", topic: "Politics" },
  { text: "What does 'quantitative easing' mean?", options: ["Cutting government spending to reduce debt", "A central bank creating money to buy assets and stimulate the economy", "Reducing import tariffs to ease trade", "Lowering VAT to boost consumer spending"], correctAnswer: 1, explanation: "QE is when a central bank creates new money electronically to buy government bonds or other assets, injecting liquidity into the economy.", topic: "Economics" },
  { text: "The 'Two-State Solution' refers to which conflict?", options: ["India-Pakistan over Kashmir", "The Israeli-Palestinian conflict", "The Cyprus division", "North and South Korea"], correctAnswer: 1, explanation: "The Two-State Solution proposes an independent Palestinian state alongside Israel, broadly based on pre-1967 borders.", topic: "Politics" },
  { text: "Which country is the world's largest oil producer?", options: ["Saudi Arabia", "Russia", "USA", "Iraq"], correctAnswer: 2, explanation: "The United States became the world's largest oil producer following the shale revolution, surpassing both Saudi Arabia and Russia.", topic: "Economics" },
  { text: "The Magna Carta (1215) established which key principle?", options: ["The church had authority over the king", "The king was subject to the rule of law", "Parliament had the power to tax", "Citizens had the right to vote"], correctAnswer: 1, explanation: "Magna Carta established that even the king was bound by the law — a foundational principle of constitutional government still referenced today.", topic: "History" },
  { text: "What is the primary purpose of the IMF?", options: ["Fund infrastructure in developing nations", "Promote trade by reducing tariffs", "Provide financial stability and lend to countries in economic crisis", "Enforce international sanctions"], correctAnswer: 2, explanation: "The IMF monitors the global economy, offers policy advice, and provides financial assistance to member countries experiencing economic instability.", topic: "Economics" },
  { text: "Which event triggered World War One?", options: ["Germany's invasion of Belgium", "The assassination of Archduke Franz Ferdinand", "The sinking of the Lusitania", "Russia's mobilisation on the German border"], correctAnswer: 1, explanation: "The assassination of Archduke Franz Ferdinand in Sarajevo on 28 June 1914 set off a chain of alliances and ultimatums that rapidly became a world war.", topic: "History" },
  { text: "What does the WTO primarily regulate?", options: ["International labour standards", "Global environmental agreements", "International trade rules between nations", "Foreign aid and development"], correctAnswer: 2, explanation: "The World Trade Organisation sets the framework for international trade rules and resolves disputes between member states.", topic: "Economics" },
  { text: "Which country is the largest by land area?", options: ["Canada", "China", "USA", "Russia"], correctAnswer: 3, explanation: "Russia covers approximately 17.1 million square kilometres — nearly twice the size of second-place Canada.", topic: "Politics" },
  { text: "What was the Cold War primarily a conflict between?", options: ["USA and China over trade", "Western democracies and Eastern communist nations led by the USA and USSR", "European colonial powers over Africa", "NATO and the Middle East over oil"], correctAnswer: 1, explanation: "The Cold War (1947–1991) was a geopolitical and ideological struggle between the USA-led capitalist West and the USSR-led communist East.", topic: "History" },
  { text: "What does 'inflation' measure?", options: ["The rate a country's economy grows", "The general rise in prices over time, reducing purchasing power", "The gap between rich and poor", "The value of exports minus imports"], correctAnswer: 1, explanation: "Inflation measures how much prices rise over time. Higher inflation means each unit of currency buys fewer goods, reducing purchasing power.", topic: "Economics" },
  { text: "Which agreement targets limiting global warming to 1.5°C?", options: ["The Kyoto Protocol", "The Montreal Protocol", "The Paris Agreement", "The Rio Declaration"], correctAnswer: 2, explanation: "The Paris Agreement (2015) commits signatories to limiting warming to well below 2°C and pursuing efforts to keep it to 1.5°C above pre-industrial levels.", topic: "Politics" },
  { text: "What is the 'balance of trade'?", options: ["The difference between a country's exports and imports", "The ratio of national debt to GDP", "The equality between tax revenue and spending", "The share of global trade by major economies"], correctAnswer: 0, explanation: "The balance of trade is exports minus imports. A surplus means more is exported than imported; a deficit means the reverse.", topic: "Economics" },
  { text: "The Marshall Plan (1948) was a US programme to do what?", options: ["Rebuild Japan after World War Two", "Fund nuclear weapons development", "Rebuild Western European economies after World War Two", "Establish NATO"], correctAnswer: 2, explanation: "The Marshall Plan gave over $13 billion to rebuild war-devastated Western European economies, helping prevent the spread of communism through economic stability.", topic: "History" },
  { text: "Which is the only directly elected EU institution?", options: ["The European Commission", "The European Council", "The European Court of Justice", "The European Parliament"], correctAnswer: 3, explanation: "The European Parliament is the only directly elected EU institution. It shares legislative power with the Council and represents EU citizens.", topic: "Politics" },
  { text: "What is the G7?", options: ["A UN Security Council sub-committee", "A forum of the world's seven largest advanced economies", "A group of seven nuclear-armed states", "A NATO planning committee"], correctAnswer: 1, explanation: "The G7 is an informal forum of the world's seven largest advanced economies — the USA, UK, Canada, France, Germany, Italy, and Japan — plus the EU.", topic: "Politics" },
  { text: "What does OPEC stand for?", options: ["Organisation of Petroleum Exporting Countries", "Oil Production and Export Council", "Organisation for Pacific Economic Cooperation", "Oil Price and Energy Commission"], correctAnswer: 0, explanation: "OPEC coordinates petroleum production and pricing policies among its member countries to manage global oil supply and prices.", topic: "Economics" },
  { text: "What is a constitutional monarchy?", options: ["A monarchy with unlimited power", "A system where the monarch's powers are limited by a constitution or parliament", "A republic with a ceremonial president", "A monarchy selected by popular vote"], correctAnswer: 1, explanation: "In a constitutional monarchy, the monarch's powers are defined and limited by a constitution or established laws — as in the UK, where the monarch reigns but parliament governs.", topic: "Politics" },
  { text: "What is hyperinflation?", options: ["Inflation above 3% per year", "Extremely rapid inflation that destroys the value of a currency", "Inflation caused specifically by oil price rises", "A temporary spike in food prices"], correctAnswer: 1, explanation: "Hyperinflation is when prices rise so rapidly that a currency loses most of its value. Zimbabwe in 2008 and Weimar Germany in 1923 are famous examples.", topic: "Economics" },
  { text: "What is China's Belt and Road Initiative?", options: ["A domestic high-speed rail project", "A military alliance with Central Asian nations", "A global infrastructure investment strategy to expand Chinese trade networks", "A trade deal between China and the EU"], correctAnswer: 2, explanation: "The Belt and Road Initiative is China's global infrastructure programme financing roads, ports, and railways across Asia, Africa, and Europe to expand trade and diplomatic influence.", topic: "Politics" },
  { text: "What was Article 50 used for?", options: ["Authorising UK military action abroad", "The UK formally notifying the EU of its intention to leave", "Suspending EU membership during financial crisis", "Creating the Eurozone single currency"], correctAnswer: 1, explanation: "Article 50 allows a member state to notify the EU of its intention to withdraw. The UK triggered it in March 2017, beginning the Brexit process.", topic: "Politics" },
  { text: "What is the Nuclear Non-Proliferation Treaty?", options: ["A ban on all nuclear weapons globally", "An agreement limiting the spread of nuclear weapons while allowing civilian nuclear power", "A treaty between the USA and Russia to reduce warheads", "A UN resolution prohibiting nuclear testing"], correctAnswer: 1, explanation: "The NPT (1968) aims to prevent the spread of nuclear weapons beyond the five recognised nuclear states and enable civilian nuclear energy.", topic: "Politics" },
  { text: "What is the ECHR?", options: ["The EU's economic policy committee", "The European Convention on Human Rights, enforced by the Strasbourg court", "A UK trade standards body", "The European Central Human Resources agency"], correctAnswer: 1, explanation: "The ECHR is a treaty of the Council of Europe protecting fundamental rights. The UK remains bound by it despite Brexit.", topic: "Politics" },
  { text: "What is a trade deficit?", options: ["When a country owes more than it earns from investments", "When a country imports more than it exports", "When government spending exceeds tax revenue", "When inflation exceeds economic growth"], correctAnswer: 1, explanation: "A trade deficit occurs when a country imports more than it exports. The USA consistently runs a large trade deficit; Germany typically runs a surplus.", topic: "Economics" },
  { text: "Which country first gave women the right to vote?", options: ["UK", "USA", "Australia", "New Zealand"], correctAnswer: 3, explanation: "New Zealand granted women the right to vote in 1893 — first in the world. The UK followed partially in 1918, the USA in 1920, and France not until 1944.", topic: "History" },
  { text: "What triggered the 2008 global financial crisis?", options: ["A collapse in oil prices caused by OPEC overproduction", "The collapse of the US subprime mortgage market spreading through global financial institutions", "China's sudden withdrawal from global trade agreements", "A series of sovereign debt defaults in Southern Europe"], correctAnswer: 1, explanation: "The 2008 crisis began in US subprime mortgages bundled into complex financial products sold globally. When housing prices fell and defaults surged, the interconnected system collapsed.", topic: "Economics" },
];

function getDailyFallback(): Question[] {
  const daysSinceEpoch = Math.floor(Date.now() / 86400000);
  const poolCopy = [...FALLBACK_POOL];
  let seed = daysSinceEpoch * 1664525 + 1013904223;
  for (let i = poolCopy.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [poolCopy[i], poolCopy[j]] = [poolCopy[j], poolCopy[i]];
  }
  return poolCopy.slice(0, 5);
}

const TODAY = new Date().toDateString();
const CACHE_KEY = `civicloop_quiz_${TODAY}`;

function recordCompletionInHistory() {
  try {
    const history: string[] = JSON.parse(localStorage.getItem("civicloop_quiz_history") || "[]");
    if (!history.includes(TODAY)) {
      history.push(TODAY);
      localStorage.setItem("civicloop_quiz_history", JSON.stringify(history));
    }
  } catch {}
}

function getThisWeekKey(): string {
  const d = new Date();
  const s = new Date(d);
  s.setDate(d.getDate() - d.getDay());
  return `civicloop_loop_frozen_${s.toDateString()}`;
}

function isLoopFrozenThisWeek(): boolean {
  try { return localStorage.getItem(getThisWeekKey()) === "frozen"; } catch { return false; }
}

async function loadQuestions(): Promise<Question[]> {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length >= 5) return parsed;
    }
  } catch {}

  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("civicloop_quiz_") && k !== CACHE_KEY)
      .forEach((k) => localStorage.removeItem(k));
  } catch {}

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return getDailyFallback();

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Generate exactly 5 multiple choice quiz questions about world politics, economics, international relations, current affairs, or history.\n\nReturn ONLY valid JSON (no markdown):\n[{"text":"Question?","options":["A","B","C","D"],"correctAnswer":0,"explanation":"Why correct.","topic":"Politics"}]\n\nRules: 5 questions, different topics, educational, ages 18-28.` }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 1500 },
        }),
      }
    );
    if (!res.ok) return getDailyFallback();
    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const clean = raw.replace(/```json\s*/gi, "").replace(/```/gi, "").trim();
    const questions: Question[] = JSON.parse(clean);
    const valid = questions.filter(
      (q) => q && typeof q.text === "string" && Array.isArray(q.options) &&
        q.options.length === 4 && typeof q.correctAnswer === "number"
    );
    if (valid.length < 5) return getDailyFallback();
    localStorage.setItem(CACHE_KEY, JSON.stringify(valid.slice(0, 5)));
    return valid.slice(0, 5);
  } catch {
    return getDailyFallback();
  }
}

function LoadingScreen() {
  const [i, setI] = useState(0);
  const msgs = ["Reading today's news…", "Picking your 5 questions…", "Almost ready…"];
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % msgs.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />
      <div className="relative text-center">
        <Loader2 className="mx-auto mb-5 h-12 w-12 animate-spin" style={{ color: "oklch(0.78 0.18 350)" }} />
        <h2 className="mb-2 text-3xl font-black text-white">Building today's quiz</h2>
        <p className="text-lg font-bold text-white/80">{msgs[i]}</p>
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
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [savedScore, setSavedScore] = useState(0);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    let live = true;
    const completed = localStorage.getItem("civicloop_completed_quiz");
    const score = parseInt(localStorage.getItem("civicloop_last_score") || "0");
    loadQuestions().then((qs) => {
      if (!live) return;
      setQuestions(qs);
      if (completed === TODAY) { setSavedScore(score); setAlreadyDone(true); }
      setLoading(false);
    });
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
      const score = correctCount;
      const xp = 50 + (score === questions.length ? 25 : 0);
      localStorage.setItem("civicloop_xp", String(parseInt(localStorage.getItem("civicloop_xp") || "0") + xp));
      const currentStreak = parseInt(localStorage.getItem("civicloop_streak") || "0");
      const lastCompleted = localStorage.getItem("civicloop_completed_quiz");
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      let newStreak: number;
      if (!lastCompleted || currentStreak === 0) { newStreak = 1; }
      else if (lastCompleted === yesterday.toDateString()) { newStreak = currentStreak + 1; }
      else if (lastCompleted === TODAY) { newStreak = currentStreak; }
      else { newStreak = isLoopFrozenThisWeek() ? currentStreak : 1; }
      localStorage.setItem("civicloop_streak", String(newStreak));
      localStorage.setItem("civicloop_completed_quiz", TODAY);
      localStorage.setItem("civicloop_last_score", String(score));
      recordCompletionInHistory();
      navigate({ to: "/quiz-results" });
    } else {
      setCurrentQ((n) => n + 1);
      setSelected(null);
    }
  };

  if (loading) return <LoadingScreen />;

  if (alreadyDone) {
    const loop = parseInt(localStorage.getItem("civicloop_streak") || "0");
    const xp = 50 + (savedScore === 5 ? 25 : 0);
    return (
      <main className="relative min-h-screen overflow-y-auto bg-background px-6 pt-12 pb-32 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />
        <div className="relative mb-6 text-center">
          <div className="mb-4 text-7xl">{savedScore === 5 ? "🏆" : savedScore >= 3 ? "⭐" : "📚"}</div>
          <h1 className="mb-2 text-7xl font-black text-white">{savedScore} / 5</h1>
          <p className="text-xl font-black text-white/85">{savedScore === 5 ? "Perfect score!" : savedScore >= 3 ? "Well done!" : "Keep learning!"}</p>
        </div>
        <div className="relative mb-5 rounded-3xl border border-white/20 bg-white/8 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-base font-bold text-white/85">XP earned today</span>
            <span className="text-2xl font-black" style={{ color: "oklch(0.78 0.18 350)" }}>+{xp} XP</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-white/85">Daily Loop</span>
            <span className="text-base font-black text-white">∞ {loop} {loop === 1 ? "day" : "days"}</span>
          </div>
        </div>
        <p className="text-center text-white/60 font-bold text-sm mb-6">You've completed today's quiz. New questions at midnight! 🔥</p>
        <button onClick={() => navigate({ to: "/home" })} className="mb-4 w-full rounded-full py-4 text-base font-black text-white" style={{ background: "oklch(0.72 0.18 350)" }}>Back Home</button>
        {questions.length > 0 && (
          <div>
            <button onClick={() => setShowReview((v) => !v)} className="mb-3 flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/8 px-5 py-4 text-base font-black text-white">
              Review Answers
              {showReview ? <ChevronUp className="h-5 w-5 text-white/60" /> : <ChevronDown className="h-5 w-5 text-white/60" />}
            </button>
            {showReview && (
              <div className="flex flex-col gap-4">
                {questions.map((question, qi) => (
                  <div key={qi} className="rounded-3xl border border-white/15 bg-white/5 p-5">
                    <p className="text-base font-black text-white mb-3">{question.text}</p>
                    <div className="flex flex-col gap-2 mb-3">
                      {question.options.map((opt, oi) => (
                        <div key={oi} className={`rounded-xl px-3 py-2 text-sm font-bold ${oi === question.correctAnswer ? "border border-green-500/30 bg-green-500/20 text-green-300" : "text-white/50"}`}>
                          {oi === question.correctAnswer ? "✓ " : ""}{opt}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-bold leading-relaxed text-white/80">{question.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
          <Link to="/home" className="flex flex-col items-center gap-1"><Home className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Home</span></Link>
          <Link to="/history" className="flex flex-col items-center gap-1"><BookOpen className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">History</span></Link>
          <Link to="/debate" className="flex flex-col items-center gap-1"><MessageSquare className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Debate</span></Link>
          <Link to="/profile" className="flex flex-col items-center gap-1"><User className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Profile</span></Link>
        </nav>
      </main>
    );
  }

  if (!q) return null;

  return (
    <main className="relative min-h-screen overflow-y-auto bg-background px-6 pt-12 pb-48 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />
      <div className="relative mb-6">
        <div className="mb-2 flex justify-between">
          <span className="text-base font-black text-white">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-base font-black text-white/70">Score: {correctCount}</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-white/10">
          <div className="h-2.5 rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, background: "oklch(0.72 0.18 350)" }} />
        </div>
      </div>
      <span className="relative mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-black text-white">{q.topic}</span>
      <h2 className="relative mb-6 text-3xl font-black leading-tight text-white">{q.text}</h2>
      <div className="relative mb-4 flex flex-col gap-3">
        {q.options.map((opt, idx) => {
          let cls = "w-full rounded-2xl border px-5 py-4 text-left text-base font-black transition-all ";
          if (selected === null) cls += "border-white/25 bg-white/8 text-white hover:bg-white/12";
          else if (idx === q.correctAnswer) cls += "border-green-500 bg-green-500/20 text-green-300";
          else if (idx === selected) cls += "border-red-500 bg-red-500/20 text-red-300";
          else cls += "border-white/10 bg-white/5 text-white/40 opacity-50";
          return <button key={idx} className={cls} onClick={() => pick(idx)}>{opt}</button>;
        })}
      </div>
      {selected !== null && (
        <div className="relative mb-4 rounded-3xl border border-white/20 bg-white/8 p-5">
          <p className="mb-2 text-xs font-black uppercase tracking-widest" style={{ color: "oklch(0.78 0.18 350)" }}>
            {selected === q.correctAnswer ? "✓ Correct" : "✗ Not Quite"}
          </p>
          <p className="text-base font-bold leading-relaxed text-white/90">{q.explanation}</p>
        </div>
      )}
      {selected !== null && (
        <div className="fixed right-0 bottom-20 left-0 z-10 px-6">
          <button onClick={next} className="w-full rounded-full py-4 text-base font-black text-white shadow-lg" style={{ background: "oklch(0.72 0.18 350)" }}>
            {currentQ + 1 >= questions.length ? "See My Results →" : "Next Question →"}
          </button>
        </div>
      )}
      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1"><Home className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Home</span></Link>
        <Link to="/history" className="flex flex-col items-center gap-1"><BookOpen className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">History</span></Link>
        <Link to="/debate" className="flex flex-col items-center gap-1"><MessageSquare className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Debate</span></Link>
        <Link to="/profile" className="flex flex-col items-center gap-1"><User className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Profile</span></Link>
      </nav>
    </main>
  );
}
