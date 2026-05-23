import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quiz")({
  component: QuizScreen,
});

const QUESTION = {
  topic: "World News",
  question: "Which country recently withdrew from the Paris Climate Agreement?",
  answers: [
    "Germany",
    "United States",
    "Brazil",
    "Australia",
  ],
  correctIndex: 1,
  explanation:
    "The United States formally withdrew from the Paris Climate Agreement, citing concerns over economic impact and energy policy.",
};

function QuizScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center">
      <div className="w-full max-w-md flex flex-col px-6 pt-12 pb-8">
        {/* Top bar: progress + streak */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all"
                style={{ width: "40%" }}
              />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              2/5
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400/30" />
            <span>4 day loop</span>
          </div>
        </div>

        {/* Topic tag */}
        <div className="mb-4">
          <span className="inline-block text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
            {QUESTION.topic}
          </span>
        </div>

        {/* Question */}
        <h1 className="text-2xl font-bold leading-tight mb-8">
          {QUESTION.question}
        </h1>

        {/* Answers */}
        <div className="flex flex-col gap-3 mb-6">
          {QUESTION.answers.map((answer, i) => {
            const isCorrect = i === QUESTION.correctIndex;
            const isSelected = selected === i;

            let stateClass =
              "border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.99]";
            if (answered) {
              if (isCorrect) {
                stateClass =
                  "border-emerald-500/60 bg-emerald-500/15 text-emerald-100 shadow-[0_0_24px_-4px_rgba(16,185,129,0.5)]";
              } else if (isSelected) {
                stateClass =
                  "border-red-500/60 bg-red-500/15 text-red-100";
              } else {
                stateClass = "border-white/5 bg-white/[0.02] text-muted-foreground";
              }
            }

            return (
              <button
                key={i}
                disabled={answered}
                onClick={() => setSelected(i)}
                className={cn(
                  "w-full text-left px-5 py-4 rounded-2xl border text-base font-medium transition-all",
                  stateClass,
                )}
              >
                {answer}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-1.5">
              {selected === QUESTION.correctIndex ? "Correct" : "Not quite"}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {QUESTION.explanation}
            </p>
          </div>
        )}

        {/* Spacer + Next */}
        <div className="mt-auto pt-6">
          <button
            disabled={!answered}
            onClick={() => setSelected(null)}
            className={cn(
              "w-full py-4 rounded-2xl text-base font-semibold transition-all",
              answered
                ? "bg-gold text-gold-foreground hover:opacity-90 active:scale-[0.99]"
                : "bg-white/5 text-muted-foreground cursor-not-allowed",
            )}
          >
            Next Question →
          </button>
        </div>
      </div>
    </div>
  );
}
