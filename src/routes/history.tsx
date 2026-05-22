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
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[oklch(0.14_0.015_60)] text-foreground">
      <ParchmentBackdrop />
      <ParisSilhouette />
      <HistoricArtifacts />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col px-6 pt-12 pb-32">
        {/* Header */}
        <header className="mb-10 flex items-center gap-3">
          <button className="rounded-full border border-[oklch(0.76_0.13_78/0.25)] p-2 text-[oklch(0.85_0.08_78)] transition hover:bg-[oklch(0.76_0.13_78/0.08)]" aria-label="Back">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-[oklch(0.7_0.06_70)]">History Mode · Chapter II</p>
            <h1 className="mt-1 font-serif text-2xl leading-tight text-[oklch(0.92_0.05_75)]" style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}>
              The French Revolution
            </h1>
          </div>
        </header>

        {/* Intro */}
        <p className="mb-12 max-w-sm font-serif text-sm italic leading-relaxed text-[oklch(0.72_0.04_70)]">
          "It was the best of times, it was the worst of times…"
          <span className="ml-2 text-[10px] not-italic uppercase tracking-widest text-[oklch(0.55_0.04_70)]">— Dickens</span>
        </p>

        {/* Timeline */}
        <ol className="relative space-y-8">
          {/* Vertical line */}
          <div className="absolute left-7 top-3 bottom-3 w-px bg-gradient-to-b from-[oklch(0.76_0.13_78/0.6)] via-[oklch(0.76_0.13_78/0.25)] to-[oklch(0.4_0.02_70/0.2)]" />

          {CHAPTERS.map((c) => (
            <ChapterNode key={c.id} chapter={c} />
          ))}
        </ol>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-6 pb-6 pt-8">
        <div className="pointer-events-none absolute inset-x-0 -top-8 bottom-0 bg-gradient-to-t from-[oklch(0.12_0.015_60)] via-[oklch(0.12_0.015_60/0.85)] to-transparent" />
        <button className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[oklch(0.82_0.13_78)] to-[oklch(0.66_0.14_70)] px-6 py-4 font-serif text-base font-medium text-[oklch(0.15_0.02_60)] shadow-[0_10px_40px_-10px_oklch(0.76_0.13_78/0.7),inset_0_1px_0_oklch(1_0_0/0.4)] transition hover:brightness-110">
          <span className="tracking-wide">Continue Journey</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
        <p className="relative mt-3 text-center font-serif text-[11px] uppercase tracking-[0.3em] text-[oklch(0.6_0.04_70)]">
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
    <li className="relative flex items-start gap-5 pl-0">
      {/* Node */}
      <div className="relative z-10 flex-shrink-0">
        {isActive && (
          <>
            <span className="absolute inset-0 -m-2 animate-[glow-pulse_2.4s_ease-in-out_infinite] rounded-full bg-[oklch(0.76_0.13_78/0.35)] blur-xl" />
            <span className="absolute inset-0 animate-[ring-pulse_2.4s_ease-out_infinite] rounded-full border-2 border-[oklch(0.82_0.13_78)]" />
          </>
        )}
        <div
          className={[
            "relative flex h-14 w-14 items-center justify-center rounded-full border transition",
            isCompleted &&
              "border-[oklch(0.76_0.13_78)] bg-gradient-to-b from-[oklch(0.82_0.13_78)] to-[oklch(0.6_0.14_70)] text-[oklch(0.15_0.02_60)] shadow-[0_4px_20px_-4px_oklch(0.76_0.13_78/0.5)]",
            isActive &&
              "border-[oklch(0.82_0.13_78)] bg-[oklch(0.2_0.03_60)] text-[oklch(0.88_0.1_78)] shadow-[0_0_30px_oklch(0.76_0.13_78/0.6),inset_0_0_20px_oklch(0.76_0.13_78/0.15)]",
            isLocked && "border-[oklch(0.35_0.01_60)] bg-[oklch(0.18_0.01_60)] text-[oklch(0.5_0.02_70)]",
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
        {/* Chapter number badge */}
        <span className="absolute -bottom-1 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full border border-[oklch(0.3_0.02_60)] bg-[oklch(0.12_0.015_60)] font-serif text-[10px] text-[oklch(0.8_0.08_75)]">
          {chapter.id}
        </span>
      </div>

      {/* Card */}
      <div
        className={[
          "flex-1 rounded-2xl border px-4 py-3 backdrop-blur-sm transition",
          isActive
            ? "border-[oklch(0.76_0.13_78/0.4)] bg-[oklch(0.2_0.03_60/0.6)] shadow-[0_8px_30px_-12px_oklch(0.76_0.13_78/0.4)]"
            : isCompleted
              ? "border-[oklch(0.4_0.04_70/0.4)] bg-[oklch(0.18_0.02_60/0.5)]"
              : "border-[oklch(0.25_0.01_60/0.5)] bg-[oklch(0.15_0.01_60/0.4)] opacity-70",
        ].join(" ")}
      >
        <div className="flex items-baseline justify-between gap-2">
          <h3
            className={[
              "font-serif text-base leading-tight",
              isActive ? "text-[oklch(0.92_0.06_78)]" : isCompleted ? "text-[oklch(0.85_0.05_75)]" : "text-[oklch(0.6_0.03_70)]",
            ].join(" ")}
            style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
          >
            {chapter.title}
          </h3>
          <span className="flex-shrink-0 font-serif text-[10px] uppercase tracking-[0.2em] text-[oklch(0.55_0.04_70)]">
            {chapter.year}
          </span>
        </div>
        <p className={["mt-1.5 font-serif text-xs leading-relaxed", isLocked ? "text-[oklch(0.45_0.02_70)]" : "text-[oklch(0.7_0.04_70)]"].join(" ")}>
          {chapter.blurb}
        </p>
        {isActive && (
          <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[oklch(0.82_0.13_78)]">
            <span className="h-1 w-1 animate-pulse rounded-full bg-[oklch(0.82_0.13_78)]" />
            In Progress
          </div>
        )}
      </div>
    </li>
  );
}

function ParchmentBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.16_0.02_60)] via-[oklch(0.13_0.015_60)] to-[oklch(0.09_0.01_50)]" />
      {/* Parchment grain via SVG noise */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.12] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.95  0 0 0 0 0.78  0 0 0 0 0.45  0 0 0 0.7 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      {/* Warm spotlight */}
      <div className="absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.76_0.13_78/0.18),transparent_60%)] blur-2xl" />
    </>
  );
}

function ParisSilhouette() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40vh] w-full opacity-30"
      viewBox="0 0 800 300"
      preserveAspectRatio="xMidYEnd slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="cityFade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.08 0.01 50)" stopOpacity="0" />
          <stop offset="100%" stopColor="oklch(0.05 0.01 40)" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Bastille fortress (left) */}
      <g fill="oklch(0.08 0.01 50)">
        <rect x="40" y="160" width="140" height="140" />
        <rect x="30" y="140" width="30" height="160" />
        <rect x="80" y="130" width="30" height="170" />
        <rect x="130" y="135" width="30" height="165" />
        <rect x="170" y="145" width="25" height="155" />
        {/* Crenellations */}
        {[40, 60, 80, 100, 120, 140, 160].map((x) => (
          <rect key={x} x={x} y="155" width="10" height="8" />
        ))}
      </g>
      {/* Rooftops middle */}
      <polygon points="200,300 200,200 220,180 250,200 250,170 290,170 290,200 330,200 330,160 360,140 390,160 390,200 430,200 430,180 460,180 460,200 800,200 800,300" fill="oklch(0.08 0.01 50)" />
      {/* Notre Dame-ish spires */}
      <g fill="oklch(0.08 0.01 50)">
        <rect x="500" y="120" width="40" height="80" />
        <rect x="550" y="120" width="40" height="80" />
        <polygon points="600,160 615,90 630,160" />
        <rect x="610" y="80" width="10" height="20" />
      </g>
      <rect x="640" y="180" width="160" height="120" fill="oklch(0.08 0.01 50)" />
      {/* Chimneys */}
      <g fill="oklch(0.08 0.01 50)">
        <rect x="280" y="150" width="6" height="20" />
        <rect x="350" y="120" width="6" height="22" />
        <rect x="680" y="160" width="6" height="20" />
      </g>
      <rect width="100%" height="300" fill="url(#cityFade)" />
    </svg>
  );
}

function HistoricArtifacts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top-right: fleur-de-lis */}
      <svg className="absolute -right-6 top-20 h-40 w-40 opacity-[0.06]" viewBox="0 0 100 100" fill="oklch(0.82 0.13 78)" aria-hidden>
        <path d="M50 5 C45 25 30 30 30 45 C30 55 40 60 50 55 C60 60 70 55 70 45 C70 30 55 25 50 5 Z M50 55 L50 90 M30 70 Q50 80 70 70 M25 95 L75 95" stroke="oklch(0.82 0.13 78)" strokeWidth="2" fill="none" />
      </svg>

      {/* Mid-left: quill feather */}
      <svg className="absolute -left-4 top-1/3 h-56 w-32 rotate-[-25deg] opacity-[0.07]" viewBox="0 0 100 200" aria-hidden>
        <path d="M50 10 C30 40 25 80 30 130 C32 160 40 180 50 190 C60 180 68 160 70 130 C75 80 70 40 50 10 Z" fill="oklch(0.78 0.1 75)" />
        <line x1="50" y1="10" x2="50" y2="190" stroke="oklch(0.4 0.04 70)" strokeWidth="1" />
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1="50" y1={20 + i * 8} x2={25 + Math.sin(i) * 4} y2={30 + i * 8} stroke="oklch(0.4 0.04 70)" strokeWidth="0.6" />
        ))}
      </svg>

      {/* Bottom-right: liberty torch */}
      <svg className="absolute right-6 bottom-40 h-48 w-24 opacity-[0.08]" viewBox="0 0 60 140" aria-hidden>
        <path d="M30 5 Q20 20 22 35 Q15 28 18 42 Q25 35 30 50 Q35 35 42 42 Q45 28 38 35 Q40 20 30 5 Z" fill="oklch(0.82 0.13 78)" />
        <rect x="26" y="50" width="8" height="6" fill="oklch(0.6 0.08 70)" />
        <rect x="24" y="56" width="12" height="70" fill="oklch(0.5 0.05 70)" />
        <rect x="20" y="124" width="20" height="6" fill="oklch(0.5 0.05 70)" />
      </svg>

      {/* Floating embers */}
      {[...Array(14)].map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[oklch(0.82_0.13_78)]"
          style={{
            left: `${(i * 37) % 100}%`,
            bottom: `${(i * 23) % 80}%`,
            opacity: 0.25 + ((i * 7) % 5) / 10,
            animation: `ember-rise ${8 + (i % 6)}s ease-in ${i * 0.5}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
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
      @keyframes ember-rise {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        20% { opacity: 0.7; }
        100% { transform: translateY(-120px) translateX(20px); opacity: 0; }
      }
    `}</style>
  );
}
