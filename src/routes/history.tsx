import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle, Lock, ChevronRight, ArrowLeftRight, Home, BookOpen, User } from "lucide-react";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
  head: () => ({
    meta: [{ title: "CivicLoop — French Revolution" }],
  }),
});

const chapters = [
  {
    id: 1,
    title: "Causes of the Revolution",
    keyFigure: "King Louis XVI",
    description:
      "By 1789, France was bankrupt from wars, bread prices had tripled, and ordinary people starved while the royal court lived lavishly at Versailles. King Louis XVI had no solution.",
    isUnlocked: true,
    isCompleted: true,
    quizQuestion: "What was the main cause of the French Revolution?",
    options: [
      "A foreign invasion",
      "Economic crisis and food shortages",
      "A deadly plague",
      "A royal assassination",
    ],
    correctAnswer: 1,
    explanation:
      "France was bankrupt and food prices had collapsed while the aristocracy lived in luxury at Versailles.",
  },
  {
    id: 2,
    title: "Storming the Bastille",
    keyFigure: "The Parisian Mob",
    description:
      "On 14 July 1789, thousands of Parisians stormed the Bastille prison — a hated symbol of royal tyranny. This single act of defiance became the defining spark of the Revolution.",
    isUnlocked: true,
    isCompleted: false,
    quizQuestion: "What did the Bastille represent to French citizens?",
    options: [
      "A food storage facility",
      "A royal palace",
      "A symbol of royal oppression",
      "A parliament building",
    ],
    correctAnswer: 2,
    explanation:
      "The Bastille was a fortress-prison used to hold political prisoners — storming it symbolised overthrowing royal tyranny.",
  },
  {
    id: 3,
    title: "Reign of Terror",
    keyFigure: "Robespierre",
    description:
      "Under Robespierre, the Revolution turned on itself. Thousands were guillotined as enemies of the Republic — including King Louis XVI and Marie Antoinette.",
    isUnlocked: false,
    isCompleted: false,
    quizQuestion: "Approximately how many people were executed during the Reign of Terror?",
    options: ["Around 100", "Around 500", "Around 17,000", "Around 1 million"],
    correctAnswer: 2,
    explanation:
      "Historians estimate around 17,000 were officially executed and up to 40,000 died in total during this brutal period.",
  },
  {
    id: 4,
    title: "Napoleon Takes Power",
    keyFigure: "Napoleon Bonaparte",
    description:
      "A brilliant young general named Napoleon Bonaparte exploited the chaos to seize power in 1799 — crowning himself Emperor and reshaping Europe forever.",
    isUnlocked: false,
    isCompleted: false,
    quizQuestion: "How did Napoleon come to power?",
    options: [
      "He was elected democratically",
      "He was born into royalty",
      "He seized power in a military coup",
      "He won a public vote",
    ],
    correctAnswer: 2,
    explanation:
      "Napoleon staged a coup called 18 Brumaire in November 1799, overthrowing the Directory and appointing himself First Consul.",
  },
];

function HistoryPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [quizActive, setQuizActive] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleChapterTap = (id: number, isUnlocked: boolean) => {
    if (!isUnlocked) return;
    if (expanded === id) {
      setExpanded(null);
      setQuizActive(null);
      setSelected(null);
    } else {
      setExpanded(id);
      setQuizActive(null);
      setSelected(null);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-background pb-24 text-foreground">
      {/* Amber atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 60) 0%, transparent 70%)",
        }}
      />

      <div className="relative px-6 pt-14 pb-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          History Mode
        </p>
        <h1 className="text-2xl font-bold">The French Revolution</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          4 chapters · 1789–1799
        </p>
      </div>

      <div className="relative flex flex-col px-6">
        {chapters.map((chapter, index) => (
          <div key={chapter.id}>
            {/* Decision Point card between chapters 1 and 2 */}
            {index === 1 && (
              <Link
                to="/swipe-decision"
                className="mb-3 flex items-center gap-3 rounded-2xl border p-4 transition-colors"
                style={{
                  background: "oklch(0.72 0.18 350 / 0.08)",
                  borderColor: "oklch(0.72 0.18 350 / 0.25)",
                }}
              >
                <span className="text-xl">⚡</span>
                <div className="flex-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.78 0.18 350)" }}
                  >
                    Decision Point: The Bread Crisis
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Swipe to decide history
                  </p>
                </div>
                <ArrowLeftRight
                  className="h-4 w-4 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.18 350)" }}
                />
              </Link>
            )}

            {/* Chapter row with timeline dot */}
            <div className="mb-3 flex gap-3">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
                    chapter.isCompleted
                      ? "border-[oklch(0.72_0.18_350)/0.4] bg-[oklch(0.72_0.18_350)/0.15]"
                      : chapter.isUnlocked
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  {chapter.isCompleted ? (
                    <CheckCircle
                      className="h-4 w-4"
                      style={{ color: "oklch(0.78 0.18 350)" }}
                    />
                  ) : chapter.isUnlocked ? (
                    <span className="text-xs font-bold text-foreground">
                      {chapter.id}
                    </span>
                  ) : (
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                {index < chapters.length - 1 && (
                  <div className="my-1 w-px flex-1 bg-white/10" />
                )}
              </div>

              {/* Chapter card */}
              <div
                className={`mb-1 flex-1 cursor-pointer rounded-2xl border p-4 transition-all ${
                  !chapter.isUnlocked ? "opacity-50" : ""
                } ${
                  chapter.isUnlocked && !chapter.isCompleted
                    ? "border-[oklch(0.72_0.18_350)/0.3] bg-white/8 ring-1 ring-[oklch(0.72_0.18_350)/0.15]"
                    : "border-white/10 bg-white/5"
                }`}
                onClick={() => handleChapterTap(chapter.id, chapter.isUnlocked)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {chapter.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {chapter.keyFigure}
                    </p>
                  </div>
                  {chapter.isUnlocked && (
                    <ChevronRight
                      className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform ${
                        expanded === chapter.id ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Expanded content */}
                {expanded === chapter.id && (
                  <div className="mt-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {chapter.description}
                    </p>

                    {quizActive === chapter.id ? (
                      <div className="mt-4">
                        <p className="mb-3 text-sm font-semibold text-foreground">
                          {chapter.quizQuestion}
                        </p>
                        <div className="flex flex-col gap-2">
                          {chapter.options.map((opt, idx) => {
                            let cls =
                              "w-full rounded-full border px-4 py-2.5 text-left text-xs font-medium transition-all ";
                            if (selected === null) {
                              cls +=
                                "border-white/20 bg-white/5 text-foreground hover:bg-white/10";
                            } else if (idx === chapter.correctAnswer) {
                              cls +=
                                "border-green-500 bg-green-500/20 text-green-400";
                            } else if (idx === selected) {
                              cls +=
                                "border-red-500 bg-red-500/20 text-red-400";
                            } else {
                              cls +=
                                "border-white/10 bg-white/5 text-muted-foreground opacity-40";
                            }
                            return (
                              <button
                                key={idx}
                                className={cls}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (selected === null) setSelected(idx);
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {selected !== null && (
                          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                            {chapter.explanation}
                          </p>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuizActive(chapter.id);
                        }}
                        className="mt-4 w-full rounded-full py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "oklch(0.72 0.18 350)" }}
                      >
                        Start Chapter Quiz
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1">
          <Home className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Home</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center gap-1">
          <BookOpen
            className="h-5 w-5"
            style={{ color: "oklch(0.78 0.18 350)" }}
          />
          <span
            className="text-[10px] font-medium"
            style={{ color: "oklch(0.78 0.18 350)" }}
          >
            History
          </span>
        </Link>
        <Link to="/swipe-decision" className="flex flex-col items-center gap-1">
          <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Decide</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1">
          <User className="h-5 w-5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Profile</span>
        </Link>
      </nav>
    </main>
  );
}
