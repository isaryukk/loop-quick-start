import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Home, BookOpen, MessageSquare, User, ThumbsUp, ThumbsDown, Send } from "lucide-react";

export const Route = createFileRoute("/debate")({
  component: DebatePage,
  head: () => ({ meta: [{ title: "CivicLoop — Debate" }] }),
});

// ── DEBATE DATA ──────────────────────────────────────────────────────────────

const debates = [
  {
    id: 1,
    topic: "Should governments regulate artificial intelligence?",
    context: "AI systems are making decisions in healthcare, criminal justice, hiring, and content moderation. Some argue unchecked AI poses serious societal risks. Others say regulation will crush innovation.",
    sideA: { label: "Yes — regulate AI", description: "AI poses risks too serious to leave unmanaged. Democratic governments must set guardrails to protect citizens.", color: "pink" },
    sideB: { label: "No — let it develop", description: "Heavy regulation stifles innovation and puts democracies behind authoritarian states who won't self-regulate.", color: "blue" },
    baseVotesA: 1847,
    baseVotesB: 1203,
    communityPosts: [
      { id: 1, author: "PolicyStudent", side: "A", time: "2h ago", text: "Without regulation, who holds AI companies accountable when their systems discriminate in hiring or wrongly flag someone as a criminal? We regulate cars, planes, and drugs — AI decisions can be just as consequential.", likes: 47, liked: false },
      { id: 2, author: "TechFuturist", side: "B", time: "3h ago", text: "China and Russia won't regulate. If the West overregulates, we hand them a massive strategic advantage in the most important technology race of our lifetime. Principles matter less if autocracies win.", likes: 38, liked: false },
      { id: 3, author: "EthicsProf", side: "A", time: "4h ago", text: "The EU's AI Act shows you can regulate meaningfully without banning innovation. Risk-tiered regulation — light touch for low-risk, strict for high-stakes systems — is a mature middle ground.", likes: 62, liked: false },
      { id: 4, author: "StartupFounder", side: "B", time: "5h ago", text: "I've spoken to dozens of EU founders who've had to move to the US because compliance costs make certain AI applications impossible for small teams. Regulation benefits Big Tech incumbents who can afford lawyers.", likes: 29, liked: false },
      { id: 5, author: "DigitalRights", side: "A", time: "6h ago", text: "Facial recognition used by police in the UK has an 80% error rate on dark-skinned women per academic studies. This isn't a hypothetical risk — it's happening now and destroying lives. We need rules.", likes: 84, liked: false },
      { id: 6, author: "Libertarian_UK", side: "B", time: "7h ago", text: "History shows that regulators consistently lag 10–15 years behind technology. By the time they understand what they're regulating, the technology has moved on. We'd be regulating yesterday's AI.", likes: 31, liked: false },
      { id: 7, author: "PublicSector", side: "A", time: "8h ago", text: "Governments are already using AI for welfare benefit decisions that affect millions of vulnerable people. The idea that this space should remain unregulated — that algorithms deciding your benefits need no oversight — is extraordinary.", likes: 55, liked: false },
      { id: 8, author: "VCInvestor", side: "B", time: "9h ago", text: "I'd support a light liability framework — companies pay when AI causes harm. But prescriptive regulation on how AI is built will drive the best researchers and companies to less regulated jurisdictions.", likes: 24, liked: false },
    ],
  },
  {
    id: 2,
    topic: "Is social media doing more harm than good to democracy?",
    context: "Social media has transformed political communication, enabling both mass organisation and mass misinformation. Studies show correlations between social media use and political polarisation, anxiety, and distrust in institutions.",
    sideA: { label: "Yes — net harm", description: "Algorithmic amplification of outrage, misinformation ecosystems, and foreign interference are degrading democratic discourse.", color: "pink" },
    sideB: { label: "No — net benefit", description: "Social media gives voice to those previously shut out of public debate. The Arab Spring, MeToo, and BLM wouldn't have happened without it.", color: "blue" },
    baseVotesA: 2103,
    baseVotesB: 986,
    communityPosts: [
      { id: 1, author: "MediaResearcher", side: "A", time: "1h ago", text: "The Facebook Files showed internally that Instagram knew it was harming teenage girls' mental health and did nothing for years because engagement mattered more than wellbeing. This is a democratic crisis as much as a health one.", likes: 71, liked: false },
      { id: 2, author: "ActivistVoice", side: "B", time: "2h ago", text: "#BlackLivesMatter went global because of Twitter. MeToo started on social media. LGBTQ+ youth in conservative communities found each other and found support through these platforms. To call this net harm ignores entire movements.", likes: 89, liked: false },
      { id: 3, author: "PoliticsSoc", side: "A", time: "3h ago", text: "Research across 33 countries finds that higher social media use correlates with lower trust in government, higher political polarisation, and greater susceptibility to misinformation. These aren't fringe findings — they're mainstream academic consensus.", likes: 44, liked: false },
      { id: 4, author: "JournalistUK", side: "B", time: "4h ago", text: "Legacy media that social media supposedly replaced was also partisan, also capable of manufacturing consent, also prone to moral panics. At least social media lets citizens challenge narratives in real time.", likes: 36, liked: false },
    ],
  },
];

function DebatePage() {
  const [debateIndex, setDebateIndex] = useState(0);
  const [userVote, setUserVote] = useState<"A" | "B" | null>(null);
  const [posts, setPosts] = useState(debates[0].communityPosts);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [newPost, setNewPost] = useState("");
  const [postSide, setPostSide] = useState<"A" | "B">("A");
  const [showPostForm, setShowPostForm] = useState(false);
  const [votesA, setVotesA] = useState(debates[0].baseVotesA);
  const [votesB, setVotesB] = useState(debates[0].baseVotesB);
  const [hasPosted, setHasPosted] = useState(false);
  const postRef = useRef<HTMLDivElement>(null);

  const debate = debates[debateIndex];

  useEffect(() => {
    const saved = localStorage.getItem(`civicloop_vote_${debate.id}`);
    if (saved) setUserVote(saved as "A" | "B");
    else setUserVote(null);
    setPosts(debate.communityPosts);
    setVotesA(debate.baseVotesA);
    setVotesB(debate.baseVotesB);
    setLikedPosts(new Set());
    setHasPosted(false);
    setShowPostForm(false);
    setNewPost("");
  }, [debateIndex]);

  const handleVote = (side: "A" | "B") => {
    if (userVote === side) return;
    if (userVote === "A") setVotesA((v) => v - 1);
    if (userVote === "B") setVotesB((v) => v - 1);
    if (side === "A") setVotesA((v) => v + 1);
    if (side === "B") setVotesB((v) => v + 1);
    setUserVote(side);
    localStorage.setItem(`civicloop_vote_${debate.id}`, side);
    const xp = parseInt(localStorage.getItem("civicloop_xp") || "0");
    localStorage.setItem("civicloop_xp", String(xp + 10));
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
    const post = {
      id: Date.now(),
      author: "You",
      side: postSide,
      time: "Just now",
      text: newPost.trim(),
      likes: 0,
      liked: false,
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost("");
    setShowPostForm(false);
    setHasPosted(true);
    const xp = parseInt(localStorage.getItem("civicloop_xp") || "0");
    localStorage.setItem("civicloop_xp", String(xp + 15));
    setTimeout(() => { postRef.current?.scrollIntoView({ behavior: "smooth" }); }, 100);
  };

  const total = votesA + votesB;
  const pctA = Math.round((votesA / total) * 100);
  const pctB = 100 - pctA;

  return (
    <main className="relative flex min-h-screen flex-col bg-background pb-24 text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }} />

      {/* Header */}
      <div className="relative px-6 pt-14 pb-4">
        <p className="mb-1 text-sm font-bold uppercase tracking-widest text-white/50">Today's Debate</p>
        <h1 className="text-2xl font-black text-white leading-tight">{debate.topic}</h1>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-white/60">{debate.context}</p>
      </div>

      {/* Debate switcher */}
      {debates.length > 1 && (
        <div className="px-6 mb-2 flex gap-2">
          {debates.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setDebateIndex(i)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${debateIndex === i ? "text-white" : "bg-white/8 text-white/50"}`}
              style={debateIndex === i ? { background: "oklch(0.72 0.18 350)" } : {}}
            >
              Topic {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="relative flex flex-col gap-4 px-6">
        {/* Vote bar */}
        <div className="rounded-2xl border border-white/15 bg-white/8 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-white">{pctA}% agree</span>
            <span className="text-sm font-bold text-white/50">{(total).toLocaleString()} votes</span>
            <span className="text-sm font-bold text-white">{pctB}% disagree</span>
          </div>
          <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden mb-4">
            <div
              className="h-3 rounded-full transition-all duration-700"
              style={{ width: `${pctA}%`, background: "oklch(0.72 0.18 350)" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleVote("A")}
              className={`rounded-2xl border py-3.5 px-3 text-sm font-bold transition-all text-left ${
                userVote === "A"
                  ? "border-[oklch(0.72_0.18_350)] text-white"
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
              style={userVote === "A" ? { background: "oklch(0.72 0.18 350 / 0.2)" } : {}}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <ThumbsUp className="h-3.5 w-3.5" style={userVote === "A" ? { color: "oklch(0.78 0.18 350)" } : {}} />
                <span className="text-xs font-black uppercase tracking-wide" style={userVote === "A" ? { color: "oklch(0.78 0.18 350)" } : {}}>
                  {userVote === "A" ? "✓ Your vote" : "Vote for"}
                </span>
              </div>
              {debate.sideA.label}
            </button>
            <button
              onClick={() => handleVote("B")}
              className={`rounded-2xl border py-3.5 px-3 text-sm font-bold transition-all text-left ${
                userVote === "B"
                  ? "border-blue-400 text-white"
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
              }`}
              style={userVote === "B" ? { background: "rgba(96, 165, 250, 0.15)" } : {}}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <ThumbsDown className="h-3.5 w-3.5" style={userVote === "B" ? { color: "rgb(147 197 253)" } : {}} />
                <span className="text-xs font-black uppercase tracking-wide" style={userVote === "B" ? { color: "rgb(147 197 253)" } : {}}>
                  {userVote === "B" ? "✓ Your vote" : "Vote for"}
                </span>
              </div>
              {debate.sideB.label}
            </button>
          </div>
          {userVote && (
            <p className="mt-3 text-center text-xs font-semibold text-white/50">
              +10 XP earned · You can change your vote anytime
            </p>
          )}
        </div>

        {/* Side descriptions */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border p-3" style={{ borderColor: "oklch(0.72 0.18 350 / 0.3)", background: "oklch(0.72 0.18 350 / 0.08)" }}>
            <p className="text-xs font-black uppercase tracking-wide mb-1" style={{ color: "oklch(0.78 0.18 350)" }}>The case for</p>
            <p className="text-xs font-semibold leading-relaxed text-white/80">{debate.sideA.description}</p>
          </div>
          <div className="rounded-2xl border border-blue-500/25 bg-blue-500/8 p-3">
            <p className="text-xs font-black uppercase tracking-wide text-blue-300 mb-1">The case against</p>
            <p className="text-xs font-semibold leading-relaxed text-white/80">{debate.sideB.description}</p>
          </div>
        </div>

        {/* Community posts */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-black text-white">Community Views</h2>
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "oklch(0.72 0.18 350)" }}
            >
              <Send className="h-3 w-3" />
              Share your view
            </button>
          </div>

          {/* Post form */}
          {showPostForm && (
            <div className="rounded-2xl border border-white/15 bg-white/8 p-4 mb-4">
              <p className="text-sm font-bold text-white mb-3">Share your perspective</p>
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setPostSide("A")}
                  className={`flex-1 rounded-full py-2 text-xs font-bold transition-all ${postSide === "A" ? "text-white" : "bg-white/8 text-white/50"}`}
                  style={postSide === "A" ? { background: "oklch(0.72 0.18 350)" } : {}}
                >
                  {debate.sideA.label}
                </button>
                <button
                  onClick={() => setPostSide("B")}
                  className={`flex-1 rounded-full py-2 text-xs font-bold transition-all ${postSide === "B" ? "bg-blue-500 text-white" : "bg-white/8 text-white/50"}`}
                >
                  {debate.sideB.label}
                </button>
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your reasoning (minimum 10 characters)..."
                className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm font-semibold text-white placeholder-white/30 resize-none focus:outline-none focus:border-white/30"
                rows={3}
                maxLength={300}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-semibold text-white/40">{newPost.length}/300</span>
                <div className="flex gap-2">
                  <button onClick={() => setShowPostForm(false)} className="rounded-full px-3 py-1.5 text-xs font-bold text-white/50 hover:text-white">
                    Cancel
                  </button>
                  <button
                    onClick={handlePost}
                    disabled={newPost.trim().length < 10}
                    className="rounded-full px-4 py-1.5 text-xs font-bold text-white transition-opacity disabled:opacity-40"
                    style={{ background: "oklch(0.72 0.18 350)" }}
                  >
                    Post · +15 XP
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Posts list */}
          <div className="flex flex-col gap-3" ref={postRef}>
            {posts.map((post) => (
              <div
                key={post.id}
                className={`rounded-2xl border p-4 ${
                  post.author === "You"
                    ? "border-[oklch(0.72_0.18_350)/0.4] bg-[oklch(0.72_0.18_350)/0.08]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-black"
                      style={
                        post.author === "You"
                          ? { background: "oklch(0.72 0.18 350 / 0.3)", color: "oklch(0.78 0.18 350)" }
                          : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }
                      }
                    >
                      {post.author[0]}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white">{post.author}</span>
                      {post.author === "You" && (
                        <span className="ml-1.5 text-xs font-bold" style={{ color: "oklch(0.78 0.18 350)" }}>· You</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        post.side === "A"
                          ? "bg-[oklch(0.72_0.18_350)/0.2] text-[oklch(0.78_0.18_350)]"
                          : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {post.side === "A" ? "FOR" : "AGAINST"}
                    </span>
                    <span className="text-xs font-semibold text-white/40">{post.time}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold leading-relaxed text-white/85 mb-3">{post.text}</p>
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${likedPosts.has(post.id) ? "" : "text-white/40 hover:text-white/70"}`}
                  style={likedPosts.has(post.id) ? { color: "oklch(0.78 0.18 350)" } : {}}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  {post.likes}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1"><Home className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Home</span></Link>
        <Link to="/history" className="flex flex-col items-center gap-1"><BookOpen className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">History</span></Link>
        <Link to="/debate" className="flex flex-col items-center gap-1"><MessageSquare className="h-5 w-5" style={{ color: "oklch(0.78 0.18 350)" }} /><span className="text-xs font-bold" style={{ color: "oklch(0.78 0.18 350)" }}>Debate</span></Link>
        <Link to="/profile" className="flex flex-col items-center gap-1"><User className="h-5 w-5 text-white/50" /><span className="text-xs font-medium text-white/50">Profile</span></Link>
      </nav>
    </main>
  );
}
