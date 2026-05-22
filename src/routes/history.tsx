import { createFileRoute } from "@tanstack/react-router";
import { Check, Lock, Crown, Flame, Swords, Scroll, Landmark, ArrowRight, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "The French Revolution — CivicLoop" },
      { name: "description", content: "Journey through the French Revolution in 5 chapters." },
    ],
  }),
  component: HistoryModeScreen,
});

type Status = "completed" | "active" | "locked";

const CHAPTERS: {
  id: number;
  title: string;
  year: string;
  status: Status;
  icon: React.ComponentType<{ className?: string }>;
  blurb: string;
}[] = [
  { id: 1, title: "Causes of Revolution", year: "1774–1789", status: "completed", icon: Scroll, blurb: "Debt, famine, and the cracks beneath the Ancien Régime." },
  { id: 2, title: "Storming the Bastille", year: "14 July 1789", status: "active", icon: Flame, blurb: "The fortress falls. A symbol shatters. The crowd becomes history." },
  { id: 3, title: "Reign of Terror", year: "1793–1794", status: "locked", icon: Swords, blurb: "Virtue and the guillotine. Robespierre's shadow." },
  { id: 4, title: "Napoleon's Rise", year: "1799–1804", status: "locked", icon: Crown, blurb: "From Corsican officer to Emperor of the French." },
  { id: 5, title: "Legacy", year: "1815 →", status: "locked", icon: Landmark, blurb: "How 1789 still shapes the modern world." },
];

function HistoryModeScreen() {
  const activeIndex = CHAPTERS.findIndex((c) => c.status === "active");
  const active = CHAPTERS[activeIndex];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground flex justify-center">
      <div className="relative z-10 w-full max-w-md flex flex-col px-5 pt-12 pb-32">
        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <button className="rounded-full border border-white/30 p-2 text-white transition hover:bg-white/10" aria-label="Back">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">History Mode · Chapter II</p>
            <h1 className="mt-1 text-2xl font-black leading-tight text-white">
              The French Revolution
            </h1>
          </div>
        </header>

        {/* Intro */}
        <p className="mb-10 max-w-sm text-sm italic font-medium leading-relaxed text-white/90">
          "It was the best of times, it was the worst of times…"
          <span className="ml-2 text-[10px] not-italic font-bold uppercase tracking-widest text-white/70">— Dickens</span>
        </p>

        {/* Horizontal Timeline */}
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 mb-4">Timeline</p>
          <div className="relative overflow-x-auto pb-4 -mx-5 px-5">
            <div className="relative flex items-start gap-6 min-w-max">
              {/* horizontal connector line */}
              <div className="absolute left-5 right-5 top-7 h-0.5 bg-white/30" />

              {CHAPTERS.map((c) => (
                <ChapterNode key={c.id} chapter={c} />
              ))}
            </div>
          </div>
        </div>

        {/* Active chapter details */}
        {active && (
          <div className="rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]">
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/85">
                Now Reading · Chapter {active.id}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                {active.year}
              </span>
            </div>
            <h2 className="text-xl font-black text-white leading-tight">{active.title}</h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-white/95">{active.blurb}</p>
            <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              In Progress
            </div>
          </div>
        )}

        {/* Chapter list with dates */}
        <div className="mt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 mb-3">All Chapters</p>
          <ul className="flex flex-col gap-2">
            {CHAPTERS.map((c) => {
              const isCompleted = c.status === "completed";
              const isActive = c.status === "active";
              const isLocked = c.status === "locked";
              return (
                <li
                  key={c.id}
                  className={[
                    "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                    isActive
                      ? "border-white/50 bg-white/15"
                      : isCompleted
                        ? "border-white/25 bg-white/8"
                        : "border-white/15 bg-white/5 opacity-80",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-black shrink-0",
                      isCompleted ? "bg-white text-[oklch(0.55_0.2_0)]" : isLocked ? "bg-white/20 text-white/70" : "bg-white text-[oklch(0.55_0.2_0)]",
                    ].join(" ")}
                  >
                    {isCompleted ? <Check className="h-4 w-4" strokeWidth={3} /> : isLocked ? <Lock className="h-3.5 w-3.5" /> : c.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{c.title}</p>
                    <p className="text-[11px] font-semibold text-white/80">{c.year}</p>
                  </div>
                  {isActive && (
                    <span className="text-[9px] font-black uppercase tracking-wider text-white bg-white/20 px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-5 pb-6 pt-8">
        <div className="pointer-events-none absolute inset-x-0 -top-8 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent" />
        <button className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-base font-black text-[oklch(0.55_0.2_0)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition hover:brightness-105">
          <span className="tracking-wide">Continue Journey</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
        <p className="relative mt-3 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-white/85">
          Chapter II · Storming the Bastille
        </p>
      </div>

      <Keyframes />
    </div>
  );
}

function ChapterNode({ chapter }: { chapter: (typeof CHAPTERS)[number] }) {
  const Icon = chapter.icon;
  const isCompleted = chapter.status === "completed";
  const isActive = chapter.status === "active";
  const isLocked = chapter.status === "locked";

  return (
    <div className="relative z-10 flex flex-col items-center w-20 shrink-0">
      <div className="relative">
        {isActive && (
          <>
            <span className="absolute inset-0 -m-2 animate-[glow-pulse_2.4s_ease-in-out_infinite] rounded-full bg-white/40 blur-xl" />
            <span className="absolute inset-0 animate-[ring-pulse_2.4s_ease-out_infinite] rounded-full border-2 border-white" />
          </>
        )}
        <div
          className={[
            "relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition",
            isCompleted && "border-white bg-white text-[oklch(0.55_0.2_0)] shadow-[0_4px_20px_-4px_rgba(255,255,255,0.5)]",
            isActive && "border-white bg-white/95 text-[oklch(0.55_0.2_0)] shadow-[0_0_30px_rgba(255,255,255,0.6)]",
            isLocked && "border-white/30 bg-white/10 text-white/60",
          ].filter(Boolean).join(" ")}
        >
          {isCompleted ? (
            <Check className="h-6 w-6" strokeWidth={3} />
          ) : isLocked ? (
            <Lock className="h-5 w-5" />
          ) : (
            <Icon className="h-6 w-6" />
          )}
        </div>
        <span className="absolute -bottom-1 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full border border-white/40 bg-background text-[10px] font-black text-white">
          {chapter.id}
        </span>
      </div>
      <p className={["mt-3 text-[11px] font-bold leading-tight text-center", isLocked ? "text-white/60" : "text-white"].join(" ")}>
        {chapter.title}
      </p>
      <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/75 text-center">
        {chapter.year}
      </p>
    </div>
  );
}

function Keyframes() {
  return (
    <style>{`
      @keyframes glow-pulse {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.15); }
      }
      @keyframes ring-pulse {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(1.8); opacity: 0; }
      }
    `}</style>
  );
}
