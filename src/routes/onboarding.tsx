import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
  head: () => ({ meta: [{ title: "Welcome to CivicLoop" }] }),
});

const AVATARS = [
  "🦁","🐯","🦊","🐺","🦅","🦉","🐉","🌙",
  "⚡","🔥","🌊","🌿","💎","🏆","🎯","🧠",
  "📚","⚔️","🗺️","🌍","🎓","🔬","🖊️","🦋",
];

const FOCUS_SUGGESTIONS = [
  "#UKPolitics","#GlobalEconomics","#FrenchRevolution",
  "#ClimatePolicy","#USPolitics","#InternationalLaw",
  "#HistoryNerd","#CurrentAffairs",
];

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("📚");
  const [focusTag, setFocusTag] = useState("#CurrentAffairs");
  const [customFocus, setCustomFocus] = useState("");

  const canProceedStep0 = username.trim().length >= 2;

  const finish = () => {
    const tag = customFocus.trim()
      ? customFocus.trim().startsWith("#") ? customFocus.trim() : "#" + customFocus.trim()
      : focusTag;
    const profile = { username: username.trim() || "Scholar", avatar, focusTag: tag, friends: [] };
    try {
      localStorage.setItem("civicloop_profile", JSON.stringify(profile));
      localStorage.setItem("civicloop_onboarded", "true");
    } catch {}
    navigate({ to: "/home" });
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-background text-white overflow-hidden">
      <div aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />

      <div className="relative flex flex-col flex-1 px-6 pt-14 pb-10 max-w-md mx-auto w-full">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-10">
          {[0,1,2].map((i) => (
            <div key={i} className="rounded-full transition-all duration-500"
              style={{ width: i === step ? 24 : 8, height: 8,
                background: i <= step ? "oklch(0.72 0.18 350)" : "rgba(255,255,255,0.15)" }} />
          ))}
        </div>

        {/* Step 0 — Username */}
        {step === 0 && (
          <div className="flex flex-col flex-1">
            <div className="mb-8">
              <p className="text-5xl mb-5">∞</p>
              <h1 className="text-4xl font-black text-white mb-3 leading-tight">Welcome to<br />CivicLoop</h1>
              <p className="text-white/80 font-bold text-base leading-relaxed">
                Build your political literacy one day at a time. Daily quizzes, history deep-dives, and live debates — all in under 5 minutes.
              </p>
            </div>
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-2">Choose a username</p>
              <input
                className="w-full rounded-2xl border border-white/20 bg-white/8 px-4 py-4 text-white text-base font-black outline-none placeholder-white/30"
                style={{ caretColor: "oklch(0.78 0.18 350)" }}
                placeholder="e.g. PolicyNerd, GlobalThinker…"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canProceedStep0 && setStep(1)}
                maxLength={20} autoFocus />
              {username.length > 0 && username.trim().length < 2 && (
                <p className="text-white/50 font-bold text-xs mt-1.5">At least 2 characters needed.</p>
              )}
            </div>
            <div className="mt-auto">
              <button onClick={() => setStep(1)} disabled={!canProceedStep0}
                className="w-full py-4 rounded-full font-black text-white text-base disabled:opacity-30"
                style={{ background: "oklch(0.72 0.18 350)" }}>Next →</button>
            </div>
          </div>
        )}

        {/* Step 1 — Avatar */}
        {step === 1 && (
          <div className="flex flex-col flex-1">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">Pick your avatar</h2>
              <p className="text-white/75 font-bold text-sm">You can change this any time from your profile.</p>
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl border-2"
                style={{ background: "oklch(0.72 0.18 350 / 0.2)", borderColor: "oklch(0.72 0.18 350)" }}>
                {avatar}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 mb-8">
              {AVATARS.map((a) => (
                <button key={a} onClick={() => setAvatar(a)}
                  className="aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all"
                  style={{
                    background: avatar === a ? "oklch(0.72 0.18 350)" : "rgba(255,255,255,0.08)",
                    border: avatar === a ? "2px solid oklch(0.72 0.18 350)" : "2px solid transparent",
                    transform: avatar === a ? "scale(1.1)" : "scale(1)",
                  }}>{a}</button>
              ))}
            </div>
            <div className="mt-auto flex gap-3">
              <button onClick={() => setStep(0)} className="px-6 py-4 rounded-full font-black text-white/60 bg-white/8 text-sm">← Back</button>
              <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-full font-black text-white text-base"
                style={{ background: "oklch(0.72 0.18 350)" }}>Next →</button>
            </div>
          </div>
        )}

        {/* Step 2 — Focus + Finish */}
        {step === 2 && (
          <div className="flex flex-col flex-1">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">What are you interested in?</h2>
              <p className="text-white/75 font-bold text-sm">Sets your focus tag on your profile. Pick one or write your own.</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {FOCUS_SUGGESTIONS.map((tag) => (
                <button key={tag} onClick={() => { setFocusTag(tag); setCustomFocus(""); }}
                  className="rounded-full px-3 py-2 text-sm font-black transition-all"
                  style={focusTag === tag && !customFocus
                    ? { background: "oklch(0.72 0.18 350)", color: "white" }
                    : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)" }}>
                  {tag}
                </button>
              ))}
            </div>
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-2">Or write your own</p>
              <input
                className="w-full rounded-2xl border border-white/20 bg-white/8 px-4 py-3.5 text-white text-sm font-bold outline-none placeholder-white/30"
                style={{ caretColor: "oklch(0.78 0.18 350)" }}
                placeholder="#YourFocus"
                value={customFocus}
                onChange={(e) => {
                  setCustomFocus(e.target.value);
                  const val = e.target.value.trim();
                  if (val) setFocusTag(val.startsWith("#") ? val : "#" + val);
                }}
                maxLength={25} />
            </div>
            {/* Preview */}
            <div className="rounded-3xl border border-white/20 bg-white/8 p-4 mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-white/50 mb-3">Your profile preview</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: "oklch(0.72 0.18 350 / 0.2)" }}>{avatar}</div>
                <div>
                  <p className="font-black text-white text-base">{username || "Scholar"}</p>
                  <p className="font-black text-sm" style={{ color: "oklch(0.78 0.18 350)" }}>
                    {customFocus.trim() ? (customFocus.trim().startsWith("#") ? customFocus.trim() : "#" + customFocus.trim()) : focusTag}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-auto flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-4 rounded-full font-black text-white/60 bg-white/8 text-sm">← Back</button>
              <button onClick={finish} className="flex-1 py-4 rounded-full font-black text-white text-base"
                style={{ background: "oklch(0.72 0.18 350)" }}>Start Learning →</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
