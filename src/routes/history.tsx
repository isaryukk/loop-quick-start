// ─────────────────────────────────────────────────────────────────────────────
// SWIPE DECISION COMPONENT (MULTI-SCENARIO VERSION)
// ─────────────────────────────────────────────────────────────────────────────

function SwipeCard({ scenarios }: { scenarios: typeof chapters[0]["swipeScenarios"] }) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [outcome, setOutcome] = useState<"left" | "right" | null>(null);
  const [stage, setStage] = useState<"card" | "outcome" | "history">("card");

  const scenario = scenarios[index];
  const startX = { current: 0 };
  const THRESHOLD = 80;

  const rotation = Math.min(Math.max(dragX / 14, -22), 22);
  const leftTint = dragX < 0 ? Math.min(Math.abs(dragX) / 80, 0.7) : 0;
  const rightTint = dragX > 0 ? Math.min(dragX / 80, 0.7) : 0;

  const handleStart = (x: number) => { setIsDragging(true); startX.current = x; };
  const handleMove = (x: number) => { if (isDragging) setDragX(x - startX.current); };

  const handleEnd = () => {
    setIsDragging(false);
    if (dragX < -THRESHOLD) { setOutcome("left"); setStage("outcome"); }
    else if (dragX > THRESHOLD) { setOutcome("right"); setStage("outcome"); }
    else setDragX(0);
  };

  const next = () => {
    setDragX(0);
    setOutcome(null);
    setStage("card");
    setIndex((i) => Math.min(i + 1, scenarios.length - 1));
  };

  if (stage === "history") {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
          What Actually Happened
        </p>
        <p className="text-base font-semibold leading-relaxed text-white/80">
          {outcome === "left"
            ? scenario.leftOutcome.historical
            : scenario.rightOutcome.historical}
        </p>
        <button
          onClick={() => setStage("card")}
          className="mt-4 w-full rounded-full border border-white/20 py-2.5 text-sm font-bold text-white/70 hover:bg-white/8"
        >
          Back to decision ↺
        </button>
      </div>
    );
  }

  if (stage === "outcome") {
    const o = outcome === "left" ? scenario.leftOutcome : scenario.rightOutcome;

    return (
      <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
        <div className={`rounded-xl border p-3 mb-4 ${
          outcome === "left"
            ? "border-red-500/30 bg-red-500/10"
            : "border-[oklch(0.72_0.18_350)/0.3] bg-[oklch(0.72_0.18_350)/0.1]"
        }`}>
          <p className="text-sm font-bold text-white">{o.title}</p>
        </div>

        <p className="text-base font-semibold leading-relaxed text-white mb-4">
          {o.text}
        </p>

        <button
          onClick={() => setStage("history")}
          className="w-full rounded-full py-3 text-sm font-bold text-white"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          See what history says →
        </button>

        <button
          onClick={next}
          className="mt-3 w-full rounded-full border border-white/20 py-3 text-sm font-bold text-white/70"
        >
          Next scenario →
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
        Scenario {index + 1} / {scenarios.length}
      </p>

      <div
        className="rounded-2xl border border-white/20 p-5 cursor-grab active:cursor-grabbing select-none"
        style={{
          background: "rgba(255,255,255,0.06)",
          transform: `rotate(${rotation}deg) translateX(${dragX * 0.2}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease",
          boxShadow:
            dragX < 0
              ? `inset 5px 0 24px rgba(239,68,68,${leftTint})`
              : dragX > 0
              ? `inset -5px 0 24px oklch(0.72 0.18 350 / ${rightTint})`
              : "none",
        }}
        onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX); }}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <h3 className="text-lg font-black text-white mb-2">{scenario.situation}</h3>

        <p className="text-sm font-semibold leading-relaxed text-white/70 mb-4">
          {scenario.context}
        </p>

        <div className="flex justify-between text-xs font-bold">
          <span className="text-red-400">← {scenario.leftChoice}</span>
          <span style={{ color: "oklch(0.78 0.18 350)" }}>
            {scenario.rightChoice} →
          </span>
        </div>
      </div>

      <p className="text-center text-xs text-white/40 mt-2">
        Swipe to decide
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

function HistoryPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("learn");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizIndex, setQuizIndex] = useState(0);

  const selectedChapter = chapters.find((c) => c.id === selectedId);

  const quizQuestions = selectedChapter
    ? selectedChapter.questions.slice(0, 10)
    : [];

  const score = Object.values(quizAnswers).filter((a, i) => a === quizQuestions[i]?.correct).length;
  const passed = score >= 7;

  const currentQ = quizQuestions[quizIndex];

  return (
    <main className="relative flex min-h-screen flex-col bg-background pb-24 text-foreground">

      {/* HEADER */}
      <div className="px-6 pt-14 pb-4">
        <h1 className="text-3xl font-black text-white">The French Revolution</h1>
        <p className="text-sm text-white/50">Interactive learning timeline</p>
      </div>

      {/* TIMELINE */}
      <div className="px-6 overflow-x-auto">
        <div className="flex gap-4">
          {chapters.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className="min-w-[160px] rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer"
            >
              <p className="text-xs text-white/50">{c.date}</p>
              <p className="text-sm font-bold text-white">{c.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 mt-6">

        {!selectedChapter ? (
          <p className="text-white/50">Select a chapter</p>
        ) : (
          <>
            {/* TABS */}
            <div className="flex gap-2 mb-4">
              {(["learn", "quiz", "order", "decide"] as TabType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setActiveTab(t); setQuizIndex(0); setQuizAnswers({}); }}
                  className="px-4 py-2 rounded-full text-sm font-bold"
                  style={activeTab === t ? { background: "oklch(0.72 0.18 350)", color: "white" } : {}}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* LEARN (ENHANCED) */}
            {activeTab === "learn" && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <h2 className="text-2xl font-black text-white mb-2">
                  {selectedChapter.title}
                </h2>

                <p className="text-white/60 font-semibold mb-3">
                  {selectedChapter.date}
                </p>

                <p className="text-white/80 font-semibold leading-relaxed mb-4">
                  {selectedChapter.description}
                </p>

                <div className="space-y-3 text-white/70 text-sm">
                  <p><b className="text-white">Key Figure:</b> {selectedChapter.keyFigure}</p>
                  <p><b className="text-white">Why it matters:</b> This event shaped political authority, public unrest, and revolutionary ideology across Europe.</p>
                  <p><b className="text-white">Impact:</b> Long-term structural change in governance and rights systems.</p>
                </div>
              </div>
            )}

            {/* QUIZ (7 REQUIRED) */}
            {activeTab === "quiz" && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

                {quizIndex >= quizQuestions.length ? (
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-white">
                      Score: {score}/10
                    </h2>

                    <p className="text-white/60 mt-2">
                      {passed ? "Passed (7+ required)" : "Try again (need 7/10)"}
                    </p>

                    <button
                      onClick={() => { setQuizIndex(0); setQuizAnswers({}); }}
                      className="mt-4 w-full py-3 rounded-full font-bold text-white"
                      style={{ background: "oklch(0.72 0.18 350)" }}
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-white/60 text-sm mb-2">
                      Question {quizIndex + 1}/10 • Score {score}
                    </p>

                    <h3 className="text-lg font-black text-white mb-4">
                      {currentQ.text}
                    </h3>

                    {currentQ.options.map((o, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (quizAnswers[quizIndex] === undefined) {
                            setQuizAnswers((p) => ({ ...p, [quizIndex]: i }));
                          }
                        }}
                        className="w-full mb-2 rounded-xl border border-white/10 bg-white/5 p-3 text-left text-white"
                      >
                        {o}
                      </button>
                    ))}

                    {quizAnswers[quizIndex] !== undefined && (
                      <button
                        onClick={() => setQuizIndex((i) => i + 1)}
                        className="w-full mt-3 py-3 rounded-full text-white font-bold"
                        style={{ background: "oklch(0.72 0.18 350)" }}
                      >
                        Next →
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            {/* ORDER + DECIDE (UPDATED HOOKS) */}
            {activeTab === "order" && (
              <OrderingQuiz events={selectedChapter.orderingEvents.slice(0, 5)} />
            )}

            {activeTab === "decide" && (
              <SwipeCard scenarios={selectedChapter.swipeScenarios.slice(0, 5)} />
            )}
          </>
        )}
      </div>
    </main>
  );
}
