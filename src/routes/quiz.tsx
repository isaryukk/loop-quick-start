import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
  head: () => ({
    meta: [{ title: "CivicLoop — Daily Quiz" }],
  }),
});

const questions = [
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
  {
    text: "Which country surpassed China to become the world's most populous nation?",
    options: ["China", "India", "USA", "Indonesia"],
    correctAnswer: 1,
    explanation:
      "India surpassed China in 2023, reaching over 1.4 billion people to become the world's most populous country.",
    topic: "World News",
  },
  {
    text: "Who is the current UN Secretary-General?",
    options: [
      "Ban Ki-moon",
      "Kofi Annan",
      "António Guterres",
      "Boutros Boutros-Ghali",
    ],
    correctAnswer: 2,
    explanation:
      "António Guterres of Portugal has served as UN Secretary-General since January 2017.",
    topic: "World News",
  },
  {
    text: "What is the official residence of the UK Prime Minister?",
    options: [
      "Buckingham Palace",
      "Windsor Castle",
      "10 Downing Street",
      "Chequers",
    ],
    correctAnswer: 2,
    explanation:
      "10 Downing Street in Westminster has been the official Prime Ministerial residence since 1735.",
    topic: "Politics",
  },
  {
    text: "Which treaty formally established the European Union?",
    options: [
      "Treaty of Paris",
      "Treaty of Rome",
      "The Maastricht Treaty",
      "Treaty of Lisbon",
    ],
    correctAnswer: 2,
    explanation:
      "The Maastricht Treaty signed in 1992 formally created the European Union, introducing EU citizenship and the single currency.",
    topic: "Politics",
  },
];

function QuizPage() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQ];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === question.correctAnswer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    const newScore = selected === question.correctAnswer ? score : score;
    if (currentQ + 1 >= questions.length) {
      const finalScore = selected === question.correctAnswer ? score + 1 : score;
      const xpEarned = 50 + (finalScore === questions.length ? 25 : 0);
      const currentXp = parseInt(localStorage.getItem("civicloop_xp") || "0");
      const currentStreak = parseInt(localStorage.getItem("civicloop_streak") || "0");
      localStorage.setItem("civicloop_xp", String(currentXp + xpEarned));
      localStorage.setItem("civicloop_streak", String(currentStreak + 1));
      localStorage.setItem("civicloop_last_quiz", new Date().toDateString());
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  };

  if (finished) {
    const finalScore = score;
    const xpEarned = 50 + (finalScore === questions.length ? 25 : 0);
    const newStreak = parseInt(localStorage.getItem("civicloop_streak") || "1");
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
          }}
        />
        <div className="relative w-full max-w-sm text-center">
          <div className="mb-4 text-6xl">
            {finalScore === 5 ? "🏆" : finalScore >= 3 ? "⭐" : "📚"}
          </div>
          <h1 className="mb-1 text-5xl font-bold">{finalScore} / 5</h1>
          <p className="mb-8 text-muted-foreground">
            {finalScore === 5
              ? "Perfect score! Outstanding."
              : finalScore >= 3
              ? "Well done — keep it up."
              : "Keep learning — you'll get there."}
          </p>

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">XP earned</span>
              <span
                className="text-xl font-bold"
                style={{ color: "oklch(0.78 0.18 350)" }}
              >
                +{xpEarned} XP
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Streak</span>
              <span className="text-sm font-semibold">
                🔥 {newStreak} {newStreak === 1 ? "day" : "days"}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate({ to: "/home" })}
            className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-background px-6 pt-12 pb-8 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
        }}
      />

      {/* Progress bar */}
      <div className="relative mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Question {currentQ + 1} of {questions.length}
          </span>
          <span className="text-xs text-muted-foreground">Score: {score}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/10">
          <div
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${(currentQ / questions.length) * 100}%`,
              background: "oklch(0.72 0.18 350)",
            }}
          />
        </div>
      </div>

      {/* Topic pill */}
      <span className="relative mb-4 inline-block self-start rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-muted-foreground">
        {question.topic}
      </span>

      {/* Question */}
      <h2 className="relative mb-6 text-xl font-bold leading-tight text-foreground">
        {question.text}
      </h2>

      {/* Answer options */}
      <div className="relative flex flex-1 flex-col gap-3">
        {question.options.map((option, idx) => {
          let className =
            "w-full rounded-full border px-5 py-3.5 text-left text-sm font-medium transition-all ";
          if (selected === null) {
            className +=
              "border-white/20 bg-white/5 text-foreground hover:bg-white/10";
          } else if (idx === question.correctAnswer) {
            className += "border-green-500 bg-green-500/20 text-green-400";
          } else if (idx === selected) {
            className += "border-red-500 bg-red-500/20 text-red-400";
          } else {
            className +=
              "border-white/10 bg-white/5 text-muted-foreground opacity-40";
          }
          return (
            <button
              key={idx}
              className={className}
              onClick={() => handleAnswer(idx)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {selected !== null && (
        <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {selected !== null && (
        <button
          onClick={handleNext}
          className="relative mt-4 w-full rounded-full py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          {currentQ + 1 >= questions.length ? "See Results" : "Next Question →"}
        </button>
      )}
    </main>
  );
}
