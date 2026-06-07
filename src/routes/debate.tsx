import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Home, BookOpen, MessageSquare, User,
  ThumbsUp, ThumbsDown, Send, Loader2,
} from "lucide-react";

export const Route = createFileRoute("/debate")({
  component: DebatePage,
  head: () => ({ meta: [{ title: "CivicLoop — Debate" }] }),
});

type DebateData = {
  id: string;
  topic: string;
  context: string;
  sideA: { label: string; description: string; fallbackArgs: string[] };
  sideB: { label: string; description: string; fallbackArgs: string[] };
  baseVotesA: number;
  baseVotesB: number;
};

type AIArgs = { forArgs: string[]; againstArgs: string[] };

const FALLBACK_DEBATES: DebateData[] = [
  {
    id: "ai-regulation",
    topic: "Should governments regulate artificial intelligence?",
    context: "AI systems are making decisions in healthcare, criminal justice, hiring, and content moderation. Some argue unchecked AI poses serious societal risks. Others say regulation will crush innovation.",
    sideA: {
      label: "Yes — regulate AI",
      description: "AI poses risks too serious to leave unmanaged. Governments must set guardrails to protect citizens.",
      fallbackArgs: [
        "AI systems have already caused documented harm — facial recognition misidentifying innocent people, hiring algorithms discriminating against women, and credit models penalising minorities.",
        "The EU's AI Act demonstrates meaningful regulation is achievable without banning innovation. Risk-tiered approaches allow light regulation for low-risk systems while applying strict standards where lives are at stake.",
        "Without democratic accountability, AI companies self-regulate based on profit, not public good. We regulate cars, pharmaceuticals, and aviation — AI decisions can be just as consequential.",
      ],
    },
    sideB: {
      label: "No — let it develop",
      description: "Heavy regulation stifles innovation and puts democracies behind authoritarian states who won't self-regulate.",
      fallbackArgs: [
        "China and Russia won't regulate their AI. If Western democracies overregulate, they hand authoritarian states a decisive strategic advantage in the most important technology race of the century.",
        "Regulators consistently lag 10–15 years behind technology. Rules written today govern yesterday's AI while tomorrow's systems operate in a vacuum.",
        "Compliance costs primarily benefit Big Tech incumbents who can afford legal teams, systematically disadvantaging startups and driving researchers to less restrictive jurisdictions.",
      ],
    },
    baseVotesA: 1847,
    baseVotesB: 1203,
  },
  {
    id: "social-media-democracy",
    topic: "Is social media doing more harm than good to democracy?",
    context: "Social media has transformed political communication, enabling both mass organisation and mass misinformation. Studies show correlations between usage and political polarisation, anxiety, and institutional distrust.",
    sideA: {
      label: "Yes — net harm",
      description: "Algorithmic amplification of outrage and misinformation ecosystems are degrading democratic discourse.",
      fallbackArgs: [
        "The Facebook Files revealed Instagram knew it was harming teenage girls' mental health for years and prioritised engagement anyway — platform profit over democratic health is the defining pattern.",
        "Research across 33 countries finds higher social media use correlates with lower institutional trust, greater polarisation, and higher susceptibility to misinformation.",
        "Foreign actors weaponise social media's algorithmic amplification to interfere in democratic elections. Russia's 2016 operation reached 126 million Americans on Facebook alone.",
      ],
    },
    sideB: {
      label: "No — net benefit",
      description: "Social media gives voice to the previously voiceless. MeToo, BLM, and the Arab Spring wouldn't exist without it.",
      fallbackArgs: [
        "#BlackLivesMatter went global because of Twitter. MeToo started on social media. LGBTQ+ youth in conservative communities found community online. To call this net harm ignores entire liberation movements.",
        "Legacy media was also partisan and capable of manufacturing consent. Social media lets citizens challenge elite narratives in real time.",
        "The Arab Spring, Iran's Green Movement, and Belarus protest coordination all depended on social media. For millions under authoritarian governments, these platforms are essential.",
      ],
    },
    baseVotesA: 2103,
    baseVotesB: 986,
  },
  {
    id: "universal-basic-income",
    topic: "Should the UK introduce a Universal Basic Income?",
    context: "UBI — a regular, unconditional payment to every citizen — has been trialled in Finland, Kenya, and parts of the US. Advocates say it tackles poverty and prepares for automation. Critics say it's unaffordable and kills work incentives.",
    sideA: {
      label: "Yes — introduce UBI",
      description: "A guaranteed income floor would end destitution, support unpaid caregivers, and prepare society for an automated economy.",
      fallbackArgs: [
        "Finland's 2017–2018 UBI trial found recipients reported significantly higher wellbeing and mental health improvements — with no reduction in employment.",
        "Automation is already eliminating routine jobs across logistics, manufacturing, and services. A basic income provides a transition floor while workers retrain.",
        "UBI would formally recognise unpaid work — caring for children, elderly relatives, volunteering — that contributes enormously to society but receives no economic recognition.",
      ],
    },
    sideB: {
      label: "No — it's unworkable",
      description: "UBI at a meaningful level is fiscally impossible and would create damaging work disincentives.",
      fallbackArgs: [
        "A UBI of £1,000 per month for every UK adult would cost approximately £600 billion annually — roughly the entire current government budget.",
        "Evidence from cash transfer programmes consistently shows some recipients reduce working hours, which would reduce productivity and tax revenues simultaneously.",
        "UBI's universality is its greatest flaw — it gives the same payment to billionaires as to those in genuine need. Targeted welfare is far more efficient per pound spent.",
      ],
    },
    baseVotesA: 1542,
    baseVotesB: 1876,
  },
];

const TODAY = new Date().toDateString();
const DEBATE_CACHE_KEY = `civicloop_debate_topic_${TODAY}`;

async function loadDailyDebate(): Promise<DebateData> {
  try {
    const cached = localStorage.getItem(DEBATE_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.topic && parsed.sideA && parsed.sideB) return parsed;
    }
  } catch {}

  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("civicloop_debate_topic_") && k !== DEBATE_CACHE_KEY)
      .forEach((k) => localStorage.removeItem(k));
  } catch {}

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return FALLBACK_DEBATES[dayOfYear % FALLBACK_DEBATES.length];
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Generate a fresh, timely debate motion about a current political, economic, or social issue for educated 18-28 year olds in the UK/globally.\n\nReturn ONLY valid JSON (no markdown):\n{"id":"kebab-case-id","topic":"Should X?","context":"2-3 sentences of balanced background.","sideA":{"label":"Yes — label","description":"One sentence case for.","fallbackArgs":["arg1","arg2","arg3"]},"sideB":{"label":"No — label","description":"One sentence case against.","fallbackArgs":["arg1","arg2","arg3"]},"baseVotesA":1200,"baseVotesB":900}\n\nGood topics: climate policy, immigration, housing, tax, healthcare, education, tech regulation, nuclear energy, drug policy, electoral reform.` }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 1000 },
        }),
      }
    );
    if (!res.ok) throw new Error("error");
    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const clean = raw.replace(/```json\s*/gi, "").replace(/```/gi, "").trim();
    const debate: DebateData = JSON.parse(clean);
    if (debate.topic && debate.sideA?.fallbackArgs?.length >= 3 && debate.sideB?.fallbackArgs?.length >= 3) {
      try { localStorage.setItem(DEBATE_CACHE_KEY, JSON.stringify(debate)); } catch {}
      return debate;
    }
    throw new Error("invalid");
  } catch {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return FALLBACK_DEBATES[dayOfYear % FALLBACK_DEBATES.length];
  }
}

async function loadAIArguments(topic: string, debateId: string, fallback: AIArgs): Promise<AIArgs> {
  const cacheKey = `civicloop_debate_args_${debateId}_${TODAY}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch {}
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return fallback;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `For the debate: "${topic}"\n\nWrite exactly 3 arguments FOR and 3 AGAINST. Each 1-2 sentences, evidence-based.\n\nReturn ONLY valid JSON:\n{"forArgs":["arg1","arg2","arg3"],"againstArgs":["arg1","arg2","arg3"]}` }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 600 },
        }),
      }
    );
    if (!res.ok) return fallback;
    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const clean = raw.replace(/```json\s*/gi, "").replace(/```/gi, "").trim();
    const result: AIArgs = JSON.parse(clean);
    if (result.forArgs?.length === 3 && result.againstArgs?.length === 3) {
      try { localStorage.setItem(cacheKey, JSON.stringify(result)); } catch {}
      return result;
    }
    return fallback;
  } catch { return fallback; }
}

const COMMUNITY_POSTS: Record<string, { id: number; author: string; side: string; time: string; text: string; likes: number }[]> = {
  "ai-regulation": [
    { id: 1, author: "PolicyStudent", side: "A", time: "2h ago", text: "Without regulation, who holds AI companies accountable when systems discriminate in hiring? We regulate cars, planes, and drugs — AI can be just as consequential.", likes: 47 },
    { id: 2, author: "TechFuturist", side: "B", time: "3h ago", text: "China and Russia won't regulate. If the West overregulates, we hand them a massive strategic advantage in the most important technology race of our lifetime.", likes: 38 },
    { id: 3, author: "EthicsProf", side: "A", time: "4h ago", text: "The EU's AI Act shows you can regulate meaningfully without banning innovation. Risk-tiered regulation is a mature middle ground.", likes: 62 },
  ],
  "social-media-democracy": [
    { id: 1, author: "MediaResearcher", side: "A", time: "1h ago", text: "The Facebook Files showed Instagram knew it was harming teenage girls and did nothing for years. Platform profit over democratic health is the pattern.", likes: 71 },
    { id: 2, author: "ActivistVoice", side: "B", time: "2h ago", text: "#BlackLivesMatter went global because of Twitter. MeToo started on social media. To call this net harm ignores entire liberation movements.", likes: 89 },
  ],
  "universal-basic-income": [
    { id: 1, author: "EconGrad", side: "A", time: "3h ago", text: "Finland's trial showed UBI recipients had better mental health and didn't stop working. The evidence is more positive than critics admit.", likes: 44 },
    { id: 2, author: "FiscalRealist", side: "B", time: "4h ago", text: "£600 billion a year. That's what a meaningful UK UBI would cost. Where does that money come from without gutting public services?", likes: 57 },
  ],
};

const DEFAULT_POSTS = [
  { id: 1, author: "CivicThinker", side: "A", time: "1h ago", text: "The evidence on this is clearer than the debate suggests. We need to look at what the data actually shows rather than ideological priors.", likes: 34 },
  { id: 2, author: "PolicyWatcher", side: "B", time: "2h ago", text: "Every time this comes up, people ignore the practical implementation challenges. The theory sounds good; the reality is always messier.", likes: 28 },
];

function DebatePage() {
  const [debate, setDebate] = useState<DebateData | null>(null);
  const [loadingDebate, setLoadingDebate] = useState(true);
  const [aiArgs, setAiArgs] = useState<AIArgs | null>(null);
  const [loadingArgs, setLoadingArgs] = useState(true);
  const [userVote, setUserVote] = useState<"A" | "B" | null>(null);
  const [posts, setPosts] = useState(DEFAULT_POSTS);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [newPost, setNewPost] = useState("");
  const [postSide, setPostSide] = useState<"A" | "B">("A");
  const [showPostForm, setShowPostForm] = useState(false);
  const [votesA, setVotesA] = useState(0);
  const [votesB, setVotesB] = useState(0);
  const postRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadDailyDebate().then((d) => {
      setDebate(d);
      setVotesA(d.baseVotesA);
      setVotesB(d.baseVotesB);
      setPosts(COMMUNITY_POSTS[d.id] ?? DEFAULT_POSTS);
      const saved = localStorage.getItem(`civicloop_vote_${d.id}_${TODAY}`);
      if (saved) setUserVote(saved as "A" | "B");
      setLoadingDebate(false);
      const fallback: AIArgs = { forArgs: d.sideA.fallbackArgs, againstArgs: d.sideB.fallbackArgs };
      loadAIArguments(d.topic, d.id, fallback).then((args) => { setAiArgs(args); setLoadingArgs(false); });
    });
  }, []);

  if (loadingDebate || !debate) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-background text-white">
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin" style={{ color: "oklch(0.78 0.18 350)" }} />
          <p className="font-black text-white/80">Loading today's debate…</p>
        </div>
      </main>
    );
  }

  const total = votesA + votesB;
  const pctA = total > 0 ? Math.round((votesA / total) * 100) : 50;
  const pctB = 100 - pctA;
  const args = aiArgs ?? { forArgs: debate.sideA.fallbackArgs, againstArgs: debate.sideB.fallbackArgs };

  const handleVote = (side: "A" | "B") => {
    if (userVote === side) return;
    if (userVote === "A") setVotesA((v) => v - 1);
    if (userVote === "B") setVotesB((v) => v - 1);
    if (side === "A") setVotesA((v) => v + 1);
    if (side === "B") setVotesB((v) => v + 1);
    setUserVote(side);
    localStorage.setItem(`civicloop_vote_${debate.id}_${TODAY}`, side);
    localStorage.setItem("civicloop_xp", String(parseInt(localStorage.getItem("civicloop_xp") || "0") + 10));
  };

  const handleLike = (postId: number) => {
    if (likedPosts.has(postId)) {
      setLikedPosts((prev) => { const n = new Set(prev); n.delete(postId); return n; });
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, likes: p.likes - 1 } : p));
    } else {
      setLikedPosts((prev) => new Set(prev).add(postId));
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    }
  };

  const handlePost = () => {
    if (!newPost.trim() || newPost.trim().length < 10) return;
    setPosts((prev) => [{ id: Date.now(), author: "You", side: postSide, time: "Just now", text: newPost.trim(), likes: 0 }, ...prev]);
    setNewPost(""); setShowPostForm(false);
    localStorage.setItem("civicloop_xp", String(parseInt(localStorage.getItem("civicloop_xp") || "0") + 15));
    setTimeout(() => postRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-background pb-24 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />

      <div className="relative px-6 pt-14 pb-4">
        <p className="mb-1 text-xs font-black uppercase tracking-widest text-white/60">Today's Debate</p>
        <h1 className="text-2xl font-black text-white leading-tight">{debate.topic}</h1>
        <p className="mt-2 text-sm font-bold leading-relaxed text-white/80">{debate.context}</p>
      </div>

      <div className="relative flex flex-col gap-4 px-6">
        {loadingArgs ? (
          <div className="flex items-center justify-center gap-2 py-6">
            <Loader2 className="h-4 w-4 animate-spin" style={{ color: "oklch(0.78 0.18 350)" }} />
            <span className="text-sm font-bold text-white/60">Building the case…</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-3xl border p-5" style={{ borderColor: "oklch(0.72 0.18 350 / 0.3)", background: "oklch(0.72 0.18 350 / 0.08)" }}>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "oklch(0.78 0.18 350)" }}>✓ The Case For — {debate.sideA.label}</p>
              <ul className="space-y-2.5">
                {args.forArgs.map((arg, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-xs font-black" style={{ color: "oklch(0.78 0.18 350)" }}>{i + 1}.</span>
                    <p className="text-sm font-bold leading-relaxed text-white/90">{arg}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-blue-500/25 bg-blue-500/8 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-blue-300 mb-3">✗ The Case Against — {debate.sideB.label}</p>
              <ul className="space-y-2.5">
                {args.againstArgs.map((arg, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-xs font-black text-blue-300">{i + 1}.</span>
                    <p className="text-sm font-bold leading-relaxed text-white/90">{arg}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-white/20 bg-white/8 p-5">
          <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-3">Cast Your Vote</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-black text-white">{pctA}% for</span>
            <span className="text-xs font-bold text-white/60">{total.toLocaleString()} votes</span>
            <span className="text-sm font-black text-white">{pctB}% against</span>
          </div>
          <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden mb-4">
            <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${pctA}%`, background: "oklch(0.72 0.18 350)" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleVote("A")} className="rounded-2xl border py-4 px-3 text-sm font-black text-left transition-all"
              style={userVote === "A" ? { borderColor: "oklch(0.72 0.18 350)", background: "oklch(0.72 0.18 350 / 0.2)", color: "white" } : { borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.8)" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <ThumbsUp className="h-3.5 w-3.5" style={userVote === "A" ? { color: "oklch(0.78 0.18 350)" } : {}} />
                <span className="text-xs font-black uppercase tracking-wide" style={userVote === "A" ? { color: "oklch(0.78 0.18 350)" } : { color: "rgba(255,255,255,0.5)" }}>{userVote === "A" ? "✓ Your vote" : "I agree"}</span>
              </div>
              {debate.sideA.label}
            </button>
            <button onClick={() => handleVote("B")} className="rounded-2xl border py-4 px-3 text-sm font-black text-left transition-all"
              style={userVote === "B" ? { borderColor: "rgb(96 165 250)", background: "rgba(96,165,250,0.15)", color: "white" } : { borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.8)" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <ThumbsDown className="h-3.5 w-3.5" style={userVote === "B" ? { color: "rgb(147 197 253)" } : {}} />
                <span className="text-xs font-black uppercase tracking-wide" style={userVote === "B" ? { color: "rgb(147 197 253)" } : { color: "rgba(255,255,255,0.5)" }}>{userVote === "B" ? "✓ Your vote" : "I disagree"}</span>
              </div>
              {debate.sideB.label}
            </button>
          </div>
          {userVote && <p className="mt-3 text-center text-xs font-bold text-white/60">+10 XP earned · Change your vote any time</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-white">Community Views</h2>
            <button onClick={() => setShowPostForm(!showPostForm)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black text-white" style={{ background: "oklch(0.72 0.18 350)" }}>
              <Send className="h-3 w-3" />Share your view
            </button>
          </div>
          {showPostForm && (
            <div className="rounded-3xl border border-white/20 bg-white/8 p-4 mb-4">
              <p className="text-sm font-black text-white mb-3">Your perspective</p>
              <div className="flex gap-2 mb-3">
                <button onClick={() => setPostSide("A")} className="flex-1 rounded-full py-2 text-xs font-black transition-all"
                  style={postSide === "A" ? { background: "oklch(0.72 0.18 350)", color: "white" } : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}>For</button>
                <button onClick={() => setPostSide("B")} className="flex-1 rounded-full py-2 text-xs font-black transition-all"
                  style={postSide === "B" ? { background: "rgb(59 130 246)", color: "white" } : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}>Against</button>
              </div>
              <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Share your reasoning (min. 10 characters)…"
                className="w-full rounded-xl border border-white/20 bg-white/5 p-3 text-sm font-bold text-white placeholder-white/30 resize-none focus:outline-none focus:border-white/40"
                rows={3} maxLength={300} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-white/40">{newPost.length}/300</span>
                <div className="flex gap-2">
                  <button onClick={() => setShowPostForm(false)} className="rounded-full px-3 py-1.5 text-xs font-bold text-white/50">Cancel</button>
                  <button onClick={handlePost} disabled={newPost.trim().length < 10} className="rounded-full px-4 py-1.5 text-xs font-black text-white disabled:opacity-40" style={{ background: "oklch(0.72 0.18 350)" }}>Post · +15 XP</button>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3" ref={postRef}>
            {posts.map((post) => (
              <div key={post.id} className="rounded-2xl border p-4"
                style={post.author === "You" ? { borderColor: "oklch(0.72 0.18 350 / 0.4)", background: "oklch(0.72 0.18 350 / 0.08)" } : { borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-black"
                      style={post.author === "You" ? { background: "oklch(0.72 0.18 350 / 0.3)", color: "oklch(0.78 0.18 350)" } : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
                      {post.author[0]}
                    </div>
                    <span className="text-sm font-black text-white">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-black"
                      style={post.side === "A" ? { background: "oklch(0.72 0.18 350 / 0.2)", color: "oklch(0.78 0.18 350)" } : { background: "rgba(96,165,250,0.2)", color: "rgb(147 197 253)" }}>
                      {post.side === "A" ? "FOR" : "AGAINST"}
                    </span>
                    <span className="text-xs font-bold text-white/50">{post.time}</span>
                  </div>
                </div>
                <p className="text-sm font-bold leading-relaxed text-white/90 mb-3">{post.text}</p>
                <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 text-xs font-black transition-colors"
                  style={likedPosts.has(post.id) ? { color: "oklch(0.78 0.18 350)" } : { color: "rgba(255,255,255,0.4)" }}>
                  <ThumbsUp className="h-3.5 w-3.5" />{post.likes}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1"><Home className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Home</span></Link>
        <Link to="/history" className="flex flex-col items-center gap-1"><BookOpen className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">History</span></Link>
        <Link to="/debate" className="flex flex-col items-center gap-1"><MessageSquare className="h-5 w-5" style={{ color: "oklch(0.78 0.18 350)" }} /><span className="text-xs font-black" style={{ color: "oklch(0.78 0.18 350)" }}>Debate</span></Link>
        <Link to="/profile" className="flex flex-col items-center gap-1"><User className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Profile</span></Link>
      </nav>
    </main>
  );
}
