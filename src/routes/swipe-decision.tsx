import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { chapters } from "../data/chapters";

export const Route = createFileRoute("/swipe-decision")({
  component: SwipeDecisionPage,
});

function SwipeDecisionPage() {
  const navigate = useNavigate();

  const chapter = chapters[0];

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [stage, setStage] = useState<"card" | "outcome" | "history">("card");
  const [outcome, setOutcome] = useState<"left" | "right" | null>(null);

  const startX = useRef(0);
  const THRESHOLD = 90;

  const handleStart = (x: number) => {
    setIsDragging(true);
    startX.current = x;
  };

  const handleMove = (x: number) => {
    if (!isDragging) return;
    setDragX(x - startX.current);
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

  const rotation = Math.max(-22, Math.min(22, dragX / 14));

  const o =
    outcome === "left"
      ? chapter.swipeScenario.leftOutcome
      : chapter.swipeScenario.rightOutcome;

  if (stage === "history") {
    return (
      <main className="min-h-screen bg-background p-6 text-white">
        <h1 className="text-2xl font-black mb-4">What Actually Happened</h1>
        <p className="text-white/70 leading-relaxed">
          {o.historical}
        </p>

        <button
          onClick={() => setStage("card")}
          className="mt-6 w-full rounded-full py-3 font-bold"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          Try Again
        </button>
      </main>
    );
  }

  if (stage === "outcome") {
    return (
      <main className="min-h-screen bg-background p-6 text-white">
        <h2 className="text-xl font-black mb-2">{o.title}</h2>
        <p className="text-white/70 mb-4">{o.text}</p>

        <button
          onClick={() => setStage("history")}
          className="w-full rounded-full py-3 font-bold"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          See History →
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-6 text-white">
      <h1 className="text-xl font-black mb-6">
        {chapter.swipeScenario.situation}
      </h1>

      <div
        className="p-6 rounded-2xl border border-white/20 bg-white/5"
        style={{
          transform: `translateX(${dragX * 0.2}px) rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "0.3s",
        }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
      >
        <p className="text-white/70 mb-4">{chapter.swipeScenario.context}</p>

        <div className="flex justify-between text-sm">
          <span className="text-red-400">{chapter.swipeScenario.leftChoice}</span>
          <span style={{ color: "oklch(0.78 0.18 350)" }}>
            {chapter.swipeScenario.rightChoice}
          </span>
        </div>
      </div>
    </main>
  );
}
