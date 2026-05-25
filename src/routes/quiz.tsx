import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";

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

const fallbackQuestions: Question[] = [
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
      "NATO is a military alliance formed in 1949 between North American and European nations for collective defence.",
    topic: "Politics",
  },
];

const TODAY = new Date().toDateString();
const CACHE_KEY = `civicloop_daily_questions_${TODAY}`;

async function generateDailyQuestions(): Promise<Question[]> {
  // ✅ safe browser check (prevents crashes if ever run outside browser)
  const isBrowser = typeof window !== "undefined";

  const cached = isBrowser ? localStorage.getItem(CACHE_KEY) : null;

  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {}
  }

  // ✅ FIXED: correct Vite env usage
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("Missing Gemini API key");
    return fallbackQuestions;
  }

  const prompt = `
Generate exactly 5 factual multiple-choice current affairs quiz questions based on major world events from the past 7 days.

Return ONLY valid JSON in this format:

[
  {
    "text": "Question?",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "Explanation",
    "topic": "Politics"
  }
]

Topics:
Politics, Economics, World News, International Relations, Science and Tech, Environment.

No markdown. No backticks. No extra text.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    console.error("Gemini request failed");
    return fallbackQuestions;
  }

  const data = await response.json();

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  const clean = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let questions: Question[];

  try {
    questions = JSON.parse(clean);
  } catch (err) {
    console.error("Failed to parse Gemini response:", clean);
    return fallbackQuestions;
  }

  if (!Array.isArray(questions)) {
    return fallbackQuestions;
  }

  if (isBrowser) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(questions));
  }

  return questions;
}

function QuizPage() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    generateDailyQuestions()
      .then((qs) => {
        setQuestions(qs);
        setLoading(false);
      })
      .catch(() => {
        setQuestions(fallbackQuestions);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="mb-4 text-4xl">🌍</div>
          <p className="text-sm text-muted-foreground">
            Scanning today’s headlines...
          </p>
        </div>
      </main>
    );
  }

  const question = questions[currentQ];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);

    if (idx === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      const finalScore =
        selected === question.correctAnswer ? score + 1 : score;

      const xpEarned = 50 + (finalScore === questions.length ? 25 : 0);

      const currentXp = parseInt(
        localStorage.getItem("civicloop_xp") || "0"
      );

      const currentStreak = parseInt(
        localStorage.getItem("civicloop_streak") || "0"
      );

      localStorage.setItem("civicloop_xp", String(currentXp + xpEarned));
      localStorage.setItem("civicloop_streak", String(currentStreak + 1));
      localStorage.setItem(
        "civicloop_last_quiz",
        new Date().toDateString()
      );

      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  };

  if (finished) {
    const finalScore = score;
    const xpEarned =
      50 + (finalScore === questions.length ? 25 : 0);

    const newStreak = parseInt(
      localStorage.getItem("civicloop_streak") || "1"
    );

    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
        <div className="text-center">
          <div className="mb-4 text-6xl">
            {finalScore === 5 ? "🏆" : finalScore >= 3 ? "⭐" : "📚"}
          </div>

          <h1 className="mb-1 text-5xl font-bold">
            {finalScore} / 5
          </h1>

          <p className="mb-8 text-muted-foreground">
            {finalScore === 5
              ? "Perfect score! Outstanding."
              : finalScore >= 3
              ? "Well done — keep it up."
              : "Keep learning — you'll get there."}
          </p>

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
            <div className="flex justify-between">
              <span>XP earned</span>
              <span className="font-bold">+{xpEarned} XP</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Streak</span>
              <span>🔥 {newStreak} days</span>
            </div>
          </div>

          <button
            onClick={() => navigate({ to: "/home" })}
            className="w-full rounded-full py-3.5 text-sm font-semibold text-white"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 pt-12 pb-8">
      <h2>{question.text}</h2>
    </main>
  );
}
