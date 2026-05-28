import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  MessageSquare,
  User,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
  head: () => ({
    meta: [{ title: "CivicLoop — Daily Quiz" }],
  }),
});

type Question = {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
};

/* ─────────────────────────────────────────────
   FALLBACK POOL — 20 questions, 5 rotate daily
   based on day of year so users always get
   something different each day even offline.
───────────────────────────────────────────── */
const FALLBACK_POOL: Question[] = [
  {
    text: "What does NATO stand for?",
    options: [
      "North American Trade Organisation",
      "North Atlantic Treaty Organisation",
      "National Armed Treaty Operations",
      "Northern Alliance Treaty Organisation",
    ],
    correctAnswer: 1,
    explanation:
      "NATO is a military alliance formed in 1949 between North American and European nations for collective defence. An attack on one member is considered an attack on all.",
    topic: "Politics",
  },
  {
    text: "Which country has the world's largest economy by nominal GDP?",
    options: ["China", "Japan", "USA", "Germany"],
    correctAnswer: 2,
    explanation:
      "The United States has the world's largest economy by nominal GDP at around $27 trillion. China is second by nominal GDP but first by purchasing power parity.",
    topic: "Economics",
  },
  {
    text: "What does GDP stand for?",
    options: [
      "Gross Domestic Product",
      "Global Development Programme",
      "Government Debt Protocol",
      "Gross Daily Production",
    ],
    correctAnswer: 0,
    explanation:
      "GDP measures the total monetary value of all goods and services produced in a country during a specific period. It is the most widely used measure of economic size.",
    topic: "Economics",
  },
  {
    text: "How many permanent members sit on the UN Security Council?",
    options: ["3", "5", "7", "10"],
    correctAnswer: 1,
    explanation:
      "Five countries hold permanent seats with veto power: the USA, UK, France, Russia, and China. They can block any substantive resolution.",
    topic: "Politics",
  },
  {
    text: "What is Brexit?",
    options: [
      "A French political party",
      "The UK leaving the European Union",
      "A German economic policy",
      "A NATO military operation",
    ],
    correctAnswer: 1,
    explanation:
      "Brexit refers to the UK's withdrawal from the European Union following the 2016 referendum, in which 52% voted to leave.",
    topic: "Politics",
  },
  {
    text: "Which organisation sets global interest rate benchmarks and acts as a 'central bank for central banks'?",
    options: [
      "The World Bank",
      "The IMF",
      "The Bank for International Settlements",
      "The WTO",
    ],
    correctAnswer: 2,
    explanation:
      "The Bank for International Settlements (BIS), based in Basel, Switzerland, fosters cooperation among central banks and is often called the central bank for central banks.",
    topic: "Economics",
  },
  {
    text: "The 'Two-State Solution' refers to a proposed resolution to which conflict?",
    options: [
      "The India-Pakistan dispute over Kashmir",
      "The Israeli-Palestinian conflict",
      "The Cyprus division between Greek and Turkish communities",
      "The North and South Korea division",
    ],
    correctAnswer: 1,
    explanation:
      "The Two-State Solution proposes an independent Palestinian state alongside Israel, with borders broadly based on pre-1967 lines, as a resolution to the Israeli-Palestinian conflict.",
    topic: "Politics",
  },
  {
    text: "What does the term 'quantitative easing' refer to?",
    options: [
      "Cutting government spending to reduce debt",
      "A central bank creating money to buy assets and stimulate the economy",
      "Reducing import tariffs to ease trade",
      "Lowering VAT rates to increase consumer spending",
    ],
    correctAnswer: 1,
    explanation:
      "Quantitative easing (QE) is when a central bank creates new money electronically and uses it to buy government bonds or other assets, injecting money into the economy to stimulate growth.",
    topic: "Economics",
  },
  {
    text: "Which country is the world's largest producer of oil as of recent years?",
    options: ["Saudi Arabia", "Russia", "USA", "Iraq"],
    correctAnswer: 2,
    explanation:
      "The United States became the world's largest oil producer following the shale revolution of the 2010s, surpassing Saudi Arabia and Russia.",
    topic: "Economics",
  },
  {
    text: "The Magna Carta, signed in 1215, established which key principle?",
    options: [
      "That the church had authority over the king",
      "That the king was subject to the rule of law",
      "That Parliament had the power to tax",
      "That citizens had the right to vote",
    ],
    correctAnswer: 1,
    explanation:
      "Magna Carta established that even the king was subject to the law and could not act arbitrarily against his subjects — a foundation of constitutional government and individual rights.",
    topic: "History",
  },
  {
    text: "What is the primary purpose of the International Monetary Fund (IMF)?",
    options: [
      "To fund infrastructure projects in developing nations",
      "To promote international trade by reducing tariffs",
      "To provide financial stability, promote growth, and lend to countries in economic crisis",
      "To enforce international sanctions against rogue states",
    ],
    correctAnswer: 2,
    explanation:
      "The IMF monitors the global economy, provides policy advice, and offers financial assistance to member countries experiencing balance-of-payments crises or economic instability.",
    topic: "Economics",
  },
  {
    text: "Which event triggered the start of World War One in 1914?",
    options: [
      "Germany's invasion of Belgium",
      "The assassination of Archduke Franz Ferdinand of Austria",
      "The sinking of the Lusitania",
      "Russia's mobilisation of troops along the German border",
    ],
    correctAnswer: 1,
    explanation:
      "The assassination of Archduke Franz Ferdinand in Sarajevo on 28 June 1914 triggered a chain of alliances and ultimatums that rapidly escalated into a world war.",
    topic: "History",
  },
  {
    text: "What does the WTO primarily regulate?",
    options: [
      "International labour standards and workers' rights",
      "Global environmental agreements and carbon targets",
      "International trade rules between nations",
      "Foreign aid and development funding",
    ],
    correctAnswer: 2,
    explanation:
      "The World Trade Organisation (WTO) provides the framework for international trade rules, resolves trade disputes between member states, and negotiates trade agreements.",
    topic: "Economics",
  },
  {
    text: "Which country is the largest by total land area?",
    options: ["Canada", "China", "USA", "Russia"],
    correctAnswer: 3,
    explanation:
      "Russia is the world's largest country by land area at approximately 17.1 million square kilometres — nearly twice the size of the second-largest country, Canada.",
    topic: "Politics",
  },
  {
    text: "What was the Cold War primarily a conflict between?",
    options: [
      "The USA and China over trade dominance",
      "Western democratic nations and Eastern communist nations, led by the USA and USSR",
      "European colonial powers over control of Africa",
      "NATO and the Middle East over oil supply",
    ],
    correctAnswer: 1,
    explanation:
      "The Cold War (1947–1991) was a geopolitical and ideological struggle between the USA-led capitalist West and the USSR-led communist East, fought through proxy wars, arms races, and political competition rather than direct military conflict.",
    topic: "History",
  },
  {
    text: "What does 'inflation' measure in economics?",
    options: [
      "The rate at which a country's economy grows each year",
      "The general rise in prices over time, reducing purchasing power",
      "The gap between rich and poor within a country",
      "The total value of a country's exports minus its imports",
    ],
    correctAnswer: 1,
    explanation:
      "Inflation measures how much prices for goods and services rise over time. When inflation is high, each unit of currency buys fewer goods, effectively reducing purchasing power.",
    topic: "Economics",
  },
  {
    text: "Which international agreement aims to limit global warming to 1.5°C above pre-industrial levels?",
    options: [
      "The Kyoto Protocol",
      "The Montreal Protocol",
      "The Paris Agreement",
      "The Rio Declaration",
    ],
    correctAnswer: 2,
    explanation:
      "The Paris Agreement, adopted in 2015, commits signatory nations to limiting global temperature rise to well below 2°C and pursuing efforts to limit it to 1.5°C above pre-industrial levels.",
    topic: "Politics",
  },
  {
    text: "What is the 'balance of trade'?",
    options: [
      "The difference between a country's exports and imports",
      "The ratio of a country's national debt to its GDP",
      "The equality between a government's tax revenue and spending",
      "The share of global trade controlled by major economies",
    ],
    correctAnswer: 0,
    explanation:
      "The balance of trade is the difference between a country's exports and imports. A surplus means more is exported than imported; a deficit means the reverse.",
    topic: "Economics",
  },
  {
    text: "The Marshall Plan (1948) was a US programme to do what?",
    options: [
      "Rebuild Japan after World War Two",
      "Fund the development of nuclear weapons",
      "Rebuild Western European economies after World War Two",
      "Establish NATO as a military alliance",
    ],
    correctAnswer: 2,
    explanation:
      "The Marshall Plan provided over $13 billion (equivalent to over $150 billion today) to rebuild Western European economies devastated by World War Two, helping prevent the spread of communism by addressing poverty and instability.",
    topic: "History",
  },
  {
    text: "Which body is the supreme legislative authority of the European Union?",
    options: [
      "The European Commission",
      "The European Council",
      "The European Court of Justice",
      "The European Parliament",
    ],
    correctAnswer: 3,
    explanation:
      "The European Parliament is the only directly elected EU institution and shares legislative power with the Council of the EU. It represents EU citizens and passes EU laws, budgets, and international agreements.",
    topic: "Politics",
  },
];

/* ─────────────────────────────────────────────
   DAILY ROTATION
   Uses day-of-year as a seed to pick 5 different
   questions each day from the 20-question pool.
───────────────────────────────────────────── */
function getDailyFallback(): Question[] {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (now.getTime() - start.getTime()) / 86400000
  );
  const poolSize = FALLBACK_POOL.length;
  const selected: Question[] = [];
  for (let i = 0; i < 5; i++) {
    selected.push(FALLBACK_POOL[(dayOfYear * 5 + i) % poolSize]);
  }
  return selected;
}

const TODAY = new Date().toDateString();
const CACHE_KEY = `civicloop_quiz_${TODAY}`;

async function loadQuestions(): Promise<Question[]> {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length >= 5) {
        return parsed;
      }
    }
  } catch {}

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("Add VITE_GEMINI_API_KEY to your environment variables");
    return getDailyFallback();
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Generate exactly 5 multiple choice quiz questions about:
- world politics
- economics
- international relations
- current affairs
- history

Return ONLY valid JSON:

[
  {
    "text":"Question?",
    "options":["A","B","C","D"],
    "correctAnswer":0,
    "explanation":"Explain why the answer is correct with relevant context.",
    "topic":"Politics"
  }
]

Rules:
- No markdown
- No backticks
- Exactly 5 questions
- Different topics
- Educational but concise
- Suitable for ages 18–28
`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
          },
        }),
      }
    );

    if (!res.ok) return getDailyFallback();

    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const clean = raw.replace(/```json\s*/gi, "").replace(/```/gi, "").trim();
    const questions: Question[] = JSON.parse(clean);

    const valid = questions.filter(
      (q) =>
        q &&
        typeof q.text === "string" &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        typeof q.correctAnswer === "number"
    );

    if (valid.length < 5) return getDailyFallback();

    localStorage.setItem(CACHE_KEY, JSON.stringify(valid));

    // Clear old days' caches
    Object.keys(localStorage)
      .filter((k) => k.startsWith("civicloop_quiz_") && k !== CACHE_KEY)
      .forEach((k) => localStorage.removeItem(k));

    return valid.slice(0, 5);
  } catch {
    return getDailyFallback();
  }
}

/* ─────────────────────────────────────────────
   LOADING SCREEN
───────────────────────────────────────────── */
function LoadingScreen() {
  const [i, setI] = useState(0);
  const msgs = [
    "Reading today's news...",
    "Picking your 5 questions...",
    "Almost ready...",
  ];

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % msgs.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
        }}
      />
      <div className="relative text-center">
        <Loader2
          className="mx-auto mb-5 h-12 w-12 animate-spin"
          style={{ color: "oklch(0.78 0.18 350)" }}
        />
        <h2 className="mb-2 text-3xl font-black text-white">
          Building today's quiz
        </h2>
        <p className="text-lg font-bold text-white/70">{msgs[i]}</p>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────
   QUIZ PAGE
───────────────────────────────────────────── */
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
    const completed = localStorage.getItem("civicloop_completed_quiz");
    const savedScore = parseInt(
      localStorage.getItem("civicloop_last_score") || "0"
    );

    loadQuestions().then((qs) => {
      if (!live) return;
      setQuestions(qs);
      if (completed === TODAY) {
        setFinalScore(savedScore);
        setDone(true);
      }
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

      localStorage.setItem(
        "civicloop_xp",
        String(parseInt(localStorage.getItem("civicloop_xp") || "0") + xp)
      );
      localStorage.setItem(
        "civicloop_streak",
        String(
          parseInt(localStorage.getItem("civicloop_streak") || "0") + 1
        )
      );
      localStorage.setItem("civicloop_completed_quiz", TODAY);
      localStorage.setItem("civicloop_last_score", String(score));

      setFinalScore(score);
      setDone(true);
    } else {
      setCurrentQ((n) => n + 1);
      setSelected(null);
    }
  };

  if (loading) return <LoadingScreen />;
  if (!q && !done) return null;

  /* ── RESULTS ── */
  if (done) {
    const xp = 50 + (finalScore === questions.length ? 25 : 0);
    const loop = parseInt(localStorage.getItem("civicloop_streak") || "1");

    return (
      <main className="relative min-h-screen overflow-y-auto bg-background px-6 pt-12 pb-32 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
          }}
        />

        <div className="relative mb-6 text-center">
          <div className="mb-4 text-7xl">
            {finalScore === 5 ? "🏆" : finalScore >= 3 ? "⭐" : "📚"}
          </div>
          <h1 className="mb-2 text-7xl font-black text-white">
            {finalScore} / {questions.length}
          </h1>
          <p className="text-xl font-black text-white/75">
            {finalScore === questions.length
              ? "Perfect score!"
              : finalScore >= 3
              ? "Well done!"
              : "Keep learning!"}
          </p>
        </div>

        <div className="relative mb-5 rounded-3xl border border-white/20 bg-white/8 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-base font-bold text-white/80">XP earned</span>
            <span
              className="text-2xl font-black"
              style={{ color: "oklch(0.78 0.18 350)" }}
            >
              +{xp} XP
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-white/80">Daily Loop</span>
            <span className="text-base font-black text-white">
              ∞ {loop} {loop === 1 ? "day" : "days"}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate({ to: "/home" })}
          className="mb-6 w-full rounded-full py-4 text-base font-black text-white"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          Back Home
        </button>

        <div className="relative">
          <button
            onClick={() => setShowReview((v) => !v)}
            className="mb-3 flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/8 px-5 py-4 text-base font-black text-white"
          >
            Review Answers
            {showReview ? (
              <ChevronUp className="h-5 w-5 text-white/60" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/60" />
            )}
          </button>

          {showReview && (
            <div className="flex flex-col gap-4">
              {questions.map((question, qi) => {
                const userAns = answers[qi];
                const correct = userAns === question.correctAnswer;
                return (
                  <div
                    key={qi}
                    className={`rounded-3xl border p-5 ${
                      correct
                        ? "border-green-500/30 bg-green-500/8"
                        : "border-red-500/30 bg-red-500/8"
                    }`}
                  >
                    <div className="mb-3 flex items-start gap-2">
                      <span className="text-lg">{correct ? "✓" : "✗"}</span>
                      <p className="text-lg font-black leading-tight text-white">
                        {question.text}
                      </p>
                    </div>
                    <div className="mb-3 flex flex-col gap-2">
                      {question.options.map((opt, oi) => {
                        let cls = "rounded-xl px-3 py-2 text-sm font-bold ";
                        if (oi === question.correctAnswer) {
                          cls +=
                            "border border-green-500/30 bg-green-500/20 text-green-300";
                        } else if (oi === userAns && !correct) {
                          cls +=
                            "border border-red-500/30 bg-red-500/20 text-red-300";
                        } else {
                          cls += "text-white/40";
                        }
                        return (
                          <div key={oi} className={cls}>
                            {oi === question.correctAnswer
                              ? "✓ "
                              : oi === userAns && !correct
                              ? "✗ "
                              : ""}
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-sm font-semibold leading-relaxed text-white/85">
                      {question.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
          <Link to="/home" className="flex flex-col items-center gap-1">
            <Home className="h-5 w-5 text-white/50" />
            <span className="text-xs font-medium text-white/50">Home</span>
          </Link>
          <Link to="/history" className="flex flex-col items-center gap-1">
            <BookOpen className="h-5 w-5 text-white/50" />
            <span className="text-xs font-medium text-white/50">History</span>
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

  /* ── QUIZ SCREEN ── */
  return (
    <main className="relative min-h-screen overflow-y-auto bg-background px-6 pt-12 pb-48 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
        }}
      />

      <div className="relative mb-6">
        <div className="mb-2 flex justify-between">
          <span className="text-base font-black text-white">
            Question {currentQ + 1} of {questions.length}
          </span>
          <span className="text-base font-black text-white/60">
            Score: {correctCount}
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-white/10">
          <div
            className="h-2.5 rounded-full transition-all"
            style={{
              width: `${((currentQ + 1) / questions.length) * 100}%`,
              background: "oklch(0.72 0.18 350)",
            }}
          />
        </div>
      </div>

      <span className="relative mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-black text-white">
        {q.topic}
      </span>

      <h2 className="relative mb-6 text-3xl font-black leading-tight text-white">
        {q.text}
      </h2>

      <div className="relative mb-4 flex flex-col gap-3">
        {q.options.map((opt, idx) => {
          let cls =
            "w-full rounded-2xl border px-5 py-4 text-left text-base font-black transition-all ";
          if (selected === null) {
            cls += "border-white/25 bg-white/8 text-white hover:bg-white/12";
          } else if (idx === q.correctAnswer) {
            cls += "border-green-500 bg-green-500/20 text-green-300";
          } else if (idx === selected) {
            cls += "border-red-500 bg-red-500/20 text-red-300";
          } else {
            cls += "border-white/10 bg-white/5 text-white/40 opacity-50";
          }
          return (
            <button key={idx} className={cls} onClick={() => pick(idx)}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="relative mb-4 rounded-3xl border border-white/20 bg-white/8 p-5">
          <p
            className="mb-2 text-xs font-black uppercase tracking-widest"
            style={{ color: "oklch(0.78 0.18 350)" }}
          >
            {selected === q.correctAnswer ? "✓ Correct" : "✗ Not Quite"}
          </p>
          <p className="text-base font-semibold leading-relaxed text-white">
            {q.explanation}
          </p>
        </div>
      )}

      {selected !== null && (
        <div className="fixed right-0 bottom-20 left-0 z-10 px-6">
          <button
            onClick={next}
            className="w-full rounded-full py-4 text-base font-black text-white shadow-lg"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            {currentQ + 1 >= questions.length
              ? "See My Results →"
              : "Next Question →"}
          </button>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1">
          <Home className="h-5 w-5 text-white/50" />
          <span className="text-xs font-medium text-white/50">Home</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center gap-1">
          <BookOpen className="h-5 w-5 text-white/50" />
          <span className="text-xs font-medium text-white/50">History</span>
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
