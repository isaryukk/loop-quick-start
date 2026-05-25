import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  CheckCircle,
  Lock,
  ArrowLeftRight,
  Home,
  BookOpen,
  User,
  MessageSquare,
  RotateCcw,
} from "lucide-react";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
  head: () => ({ meta: [{ title: "CivicLoop — French Revolution" }] }),
});

// ── DATA ────────────────────────────────────────────────────────────────────

const chapters = [
  {
    id: 1,
    title: "Causes of the Revolution",
    keyFigure: "King Louis XVI",
    date: "1788–1789",
    description:
      "By 1789 France was bankrupt from funding the American Revolution, bread prices had tripled after two failed harvests, and the gap between aristocracy and peasants had never been wider. Louis XVI had no solution — and no credibility left to find one.",
    isUnlocked: true,
    isCompleted: true,
    questions: [
      {
        text: "What was the primary cause of France's bankruptcy before the Revolution?",
        options: [
          "Expensive wars including the American Revolution",
          "A devastating plague",
          "A foreign invasion",
          "A royal spending scandal",
        ],
        correct: 0,
        explanation:
          "France spent enormous sums funding the American Revolution against Britain, leaving the treasury empty.",
      },
    ],
    orderingEvents: [
      { id: 1, text: "France goes bankrupt funding the American Revolution", correctPosition: 0 },
      { id: 2, text: "Two failed harvests triple bread prices", correctPosition: 1 },
      { id: 3, text: "Louis XVI calls the Estates-General", correctPosition: 2 },
      { id: 4, text: "Third Estate declares itself National Assembly", correctPosition: 3 },
    ],
    swipeScenario: {
      date: "FRANCE · 1789",
      situation: "Bread prices are exploding across Paris.",
      context:
        "It is 1789. Harvests have failed. Bread prices have tripled. Thousands are starving.",
      leftChoice: "Raise Taxes",
      rightChoice: "Subsidise Grain",
      leftOutcome: {
        title: "You chose: Raise Taxes",
        text: "Riots intensified and the Bastille was stormed.",
        reactions: [{ label: "Peasants: FURIOUS", color: "red" }],
        historical: "This mirrors what actually happened.",
      },
      rightOutcome: {
        title: "You chose: Subsidise Grain",
        text: "Riots eased temporarily but finances collapsed.",
        reactions: [{ label: "Peasants: RELIEVED", color: "green" }],
        historical: "Some historians argue this could have delayed collapse.",
      },
    },
  },
];

// ── ORDERING QUIZ ───────────────────────────────────────────────────────────

type OrderEvent = { id: number; text: string; correctPosition: number };

function OrderingQuiz({
  events,
  onComplete,
}: {
  events: OrderEvent[];
  onComplete: () => void;
}) {
  const [available, setAvailable] = useState<OrderEvent[]>(() =>
    [...events].sort(() => Math.random() - 0.5)
  );
  const [sequence, setSequence] = useState<(OrderEvent | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const addToSequence = (event: OrderEvent) => {
    const nextSlot = sequence.findIndex((s) => s === null);
    if (nextSlot === -1) return;
    const newSeq = [...sequence];
    newSeq[nextSlot] = event;
    setSequence(newSeq);
    setAvailable((prev) => prev.filter((e) => e.id !== event.id));
  };

  const removeFromSequence = (index: number) => {
    const event = sequence[index];
    if (!event) return;
    const newSeq = [...sequence];
    newSeq[index] = null;
    setSequence(newSeq);
    setAvailable((prev) => [...prev, event]);
  };

  const checkOrder = () => {
    const correct = sequence.every(
      (e, i) => e !== null && e.correctPosition === i
    );
    setIsCorrect(correct);
    setChecked(true);
  };

  const reset = () => {
    setAvailable([...events].sort(() => Math.random() - 0.5));
    setSequence([null, null, null, null]);
    setChecked(false);
    setIsCorrect(false);
  };

  const allFilled = sequence.every((s) => s !== null);

  return (
    <div>
      <h3 className="text-lg font-black text-white mb-2">
        Put events in the correct order
      </h3>

      {available.map((event) => (
        <button
          key={event.id}
          onClick={() => addToSequence(event)}
          className="rounded-xl border border-white/20 bg-white/8 px-3 py-2 text-sm font-semibold text-white"
        >
          {event.text}
        </button>
      ))}

      <div className="flex flex-col gap-2 mt-4">
        {sequence.map((slot, i) => (
          <div key={i} className="border p-3 rounded-xl">
            <span className="font-bold">{i + 1}</span>
            {slot ? (
              <span>{slot.text}</span>
            ) : (
              <span className="text-white/30">Empty</span>
            )}
          </div>
        ))}
      </div>

      {allFilled && (
        <button onClick={checkOrder} className="mt-4 w-full bg-pink-500 py-2 rounded-full">
          Check
        </button>
      )}

      {checked && (
        <button onClick={reset} className="mt-2 w-full border py-2 rounded-full">
          Try Again
        </button>
      )}
    </div>
  );
}

// ── SWIPE CARD ──────────────────────────────────────────────────────────────

function SwipeCard({
  scenario,
}: {
  scenario: typeof chapters[0]["swipeScenario"];
}) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [outcome, setOutcome] = useState<"left" | "right" | null>(null);
  const [stage, setStage] = useState<"card" | "outcome" | "history">("card");

  const startX = { current: 0 };
  const THRESHOLD = 80;

  const handleStart = (x: number) => {
    setIsDragging(true);
    startX.current = x;
  };

  const handleMove = (x: number) => {
    if (isDragging) setDragX(x - startX.current);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (dragX < -THRESHOLD) {
      setOutcome("left");
      setStage("outcome");
    } else if (dragX > THRESHOLD) {
      setOutcome("right");
      setStage("outcome");
    }
    setDragX(0);
  };

  if (stage === "outcome") {
    const o =
      outcome === "left" ? scenario.leftOutcome : scenario.rightOutcome;

    return (
      <div className="p-4 border rounded-xl">
        <h3>{o.title}</h3>
        <p>{o.text}</p>
        <button onClick={() => setStage("history")}>
          See history
        </button>
      </div>
    );
  }

  if (stage === "history") {
    return (
      <div className="p-4 border rounded-xl">
        <p>
          {outcome === "left"
            ? scenario.leftOutcome.historical
            : scenario.rightOutcome.historical}
        </p>
        <button onClick={() => setStage("card")}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      className="p-5 border rounded-xl"
    >
      <h3>{scenario.situation}</h3>
      <p>{scenario.context}</p>
      <p>← {scenario.leftChoice} | {scenario.rightChoice} →</p>
    </div>
  );
}

// ── MAIN PAGE ───────────────────────────────────────────────────────────────

function HistoryPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<
    "learn" | "quiz" | "order" | "decide"
  >("learn");

  const selectedChapter = chapters.find((c) => c.id === selectedId);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-black mb-4">
        French Revolution
      </h1>

      <div className="flex gap-2 mb-4">
        {chapters.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className="border px-3 py-2 rounded"
          >
            {c.title}
          </button>
        ))}
      </div>

      {selectedChapter && (
        <div>
          <div className="flex gap-2 mb-4">
            {["learn", "quiz", "order", "decide"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t as any)}
                className="border px-3 py-1 rounded"
              >
                {t}
              </button>
            ))}
          </div>

          {activeTab === "learn" && (
            <p>{selectedChapter.description}</p>
          )}

          {activeTab === "order" && (
            <OrderingQuiz
              events={selectedChapter.orderingEvents}
              onComplete={() => {}}
            />
          )}

          {activeTab === "decide" && (
            <SwipeCard scenario={selectedChapter.swipeScenario} />
          )}
        </div>
      )}
    </main>
  );
}
