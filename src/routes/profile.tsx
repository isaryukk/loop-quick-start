import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Home, BookOpen, MessageSquare, User } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "CivicLoop — Profile" }] }),
});

const AVATARS = [
  "🦁", "🐯", "🦊", "🐺", "🦅", "🦉", "🐉", "🌙",
  "⚡", "🔥", "🌊", "🌿", "💎", "🏆", "🎯", "🧠",
  "📚", "⚔️", "🗺️", "🌍", "🎓", "🔬", "🖊️", "🦋",
];

const RANK_LABELS: Record<string, string> = {
  beginner: "Novice Scholar",
  intermediate: "Analyst",
  advanced: "Historian",
};

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

type ProfileData = {
  username: string;
  avatar: string;
  focusTag: string;
  friends: string[];
};

function loadProfile(): ProfileData {
  try {
    const raw = localStorage.getItem("civicloop_profile");
    if (raw) return JSON.parse(raw);
  } catch { /* ok */ }
  return { username: "Scholar", avatar: "📚", focusTag: "#FrenchRevolution", friends: [] };
}

function saveProfile(data: ProfileData) {
  try { localStorage.setItem("civicloop_profile", JSON.stringify(data)); } catch { /* ok */ }
}

function loadStats() {
  try {
    return {
      xp: parseInt(localStorage.getItem("civicloop_xp") || "0"),
      streak: parseInt(localStorage.getItem("civicloop_streak") || "0"),
    };
  } catch {
    return { xp: 0, streak: 0 };
  }
}

/* ── Build a 28-day calendar grid ── */
function buildCalendar() {
  let history: string[] = [];
  try {
    history = JSON.parse(localStorage.getItem("civicloop_quiz_history") || "[]");
    // Also include today if quiz was completed today
    const today = new Date().toDateString();
    if (localStorage.getItem("civicloop_completed_quiz") === today && !history.includes(today)) {
      history.push(today);
    }
  } catch { /* ok */ }

  const today = new Date();
  const days: { dateStr: string; completed: boolean; isToday: boolean; dayOfWeek: number }[] = [];

  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toDateString();
    days.push({
      dateStr,
      completed: history.includes(dateStr),
      isToday: i === 0,
      dayOfWeek: d.getDay(), // 0=Sun
    });
  }
  return days;
}

/* ── Streak Calendar Component ── */
function StreakCalendar() {
  const [days, setDays] = useState(() => buildCalendar());

  useEffect(() => {
    setDays(buildCalendar());
  }, []);

  // Find the day of week of the first day to add offset
  const firstDayOfWeek = days[0].dayOfWeek === 0 ? 6 : days[0].dayOfWeek - 1; // Mon=0

  // Pad the start so the grid aligns to Monday
  const padded = [
    ...Array(firstDayOfWeek).fill(null),
    ...days,
  ];

  const completedCount = days.filter((d) => d.completed).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-white/40 text-xs font-black uppercase tracking-widest">
          28-Day Streak Calendar
        </p>
        <span className="text-xs font-black text-white/50">
          {completedCount}/28 days
        </span>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map((d, i) => (
          <div key={i} className="text-center text-white/25 text-xs font-bold">{d}</div>
        ))}
      </div>

      {/* Calendar squares */}
      <div className="grid grid-cols-7 gap-1">
        {padded.map((day, i) =>
          day === null ? (
            <div key={`pad-${i}`} />
          ) : (
            <div
              key={day.dateStr}
              className="aspect-square rounded-md transition-all"
              style={{
                background: day.completed
                  ? "oklch(0.72 0.18 350)"
                  : "rgba(255,255,255,0.06)",
                border: day.isToday
                  ? "1.5px solid oklch(0.78 0.18 350)"
                  : "1.5px solid transparent",
                boxShadow: day.completed
                  ? "0 0 6px oklch(0.72 0.18 350 / 0.4)"
                  : "none",
              }}
              title={`${day.dateStr}${day.completed ? " ✓" : ""}`}
            />
          )
        )}
      </div>

      <p className="text-white/25 text-xs font-bold mt-2 text-right">
        {completedCount === 0
          ? "Start your first quiz to fill the calendar"
          : completedCount === 28
          ? "🔥 Perfect month!"
          : `${28 - completedCount} days to a perfect month`}
      </p>
    </div>
  );
}

/* ── Main Page ── */
function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(loadProfile);
  const [stats] = useState(loadStats);
  const [editing, setEditing] = useState<"username" | "focus" | "avatar" | null>(null);
  const [draftUsername, setDraftUsername] = useState(profile.username);
  const [draftFocus, setDraftFocus] = useState(profile.focusTag);
  const [friendInput, setFriendInput] = useState("");
  const [friendError, setFriendError] = useState("");

  useEffect(() => { saveProfile(profile); }, [profile]);

  const difficulty =
    stats.xp >= 800 ? "advanced" : stats.xp >= 300 ? "intermediate" : "beginner";

  const saveUsername = () => {
    const trimmed = draftUsername.trim();
    if (trimmed.length < 2) return;
    setProfile((p) => ({ ...p, username: trimmed }));
    setEditing(null);
  };

  const saveFocus = () => {
    let tag = draftFocus.trim();
    if (!tag.startsWith("#")) tag = "#" + tag;
    setProfile((p) => ({ ...p, focusTag: tag }));
    setEditing(null);
  };

  const selectAvatar = (a: string) => {
    setProfile((p) => ({ ...p, avatar: a }));
    setEditing(null);
  };

  const addFriend = () => {
    const trimmed = friendInput.trim();
    if (!trimmed) return;
    if (trimmed.toLowerCase() === profile.username.toLowerCase()) {
      setFriendError("That's you!");
      return;
    }
    if (profile.friends.includes(trimmed)) {
      setFriendError("Already added.");
      return;
    }
    setProfile((p) => ({ ...p, friends: [...p.friends, trimmed] }));
    setFriendInput("");
    setFriendError("");
  };

  const removeFriend = (name: string) => {
    setProfile((p) => ({
      ...p,
      friends: p.friends.filter((f) => f !== name),
    }));
  };

  const xpToNext =
    difficulty === "beginner"
      ? 300 - stats.xp
      : difficulty === "intermediate"
      ? 800 - stats.xp
      : 0;
  const xpProgress =
    difficulty === "advanced"
      ? 100
      : difficulty === "intermediate"
      ? Math.min(((stats.xp - 300) / 500) * 100, 100)
      : Math.min((stats.xp / 300) * 100, 100);

  return (
    <main className="relative min-h-screen overflow-y-auto bg-background px-6 pt-10 pb-32 text-white">

      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }}
      />

      {/* Header */}
      <div className="relative mb-6">
        <h1 className="text-3xl font-black">Profile</h1>
        <p className="text-white/60 font-bold">Your identity and progress</p>
      </div>

      {/* ── Avatar + Username ── */}
      <div className="relative rounded-3xl border border-white/20 bg-white/8 p-5 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setEditing(editing === "avatar" ? null : "avatar")}
            className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl border border-white/15 transition-all hover:bg-white/15"
            title="Tap to change avatar"
          >
            {profile.avatar}
          </button>

          <div className="flex-1 min-w-0">
            {editing === "username" ? (
              <div className="flex gap-2">
                <input
                  className="flex-1 min-w-0 bg-white/10 rounded-xl px-3 py-2 text-white text-sm font-bold border border-white/20 outline-none"
                  style={{ caretColor: "oklch(0.78 0.18 350)" }}
                  value={draftUsername}
                  onChange={(e) => setDraftUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveUsername()}
                  maxLength={20}
                  autoFocus
                />
                <button
                  onClick={saveUsername}
                  className="px-3 py-2 rounded-xl font-black text-white text-sm shrink-0"
                  style={{ background: "oklch(0.72 0.18 350)" }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="px-3 py-2 rounded-xl bg-white/10 text-white text-sm font-black shrink-0"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black truncate">{profile.username}</h2>
                <button
                  onClick={() => { setDraftUsername(profile.username); setEditing("username"); }}
                  className="text-white/30 hover:text-white/60 text-base shrink-0"
                  title="Edit username"
                >
                  ✏️
                </button>
              </div>
            )}
            <p className="text-white/50 font-bold text-sm mt-0.5">
              {RANK_LABELS[difficulty]}
            </p>
          </div>
        </div>

        {editing === "avatar" && (
          <div>
            <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-3">
              Choose your avatar
            </p>
            <div className="grid grid-cols-8 gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => selectAvatar(a)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all"
                  style={{
                    background:
                      profile.avatar === a
                        ? "oklch(0.72 0.18 350)"
                        : "rgba(255,255,255,0.08)",
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Focus hashtag ── */}
      <div className="relative rounded-3xl border border-white/20 bg-white/8 p-5 mb-4">
        <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-3">
          Current Focus
        </p>
        {editing === "focus" ? (
          <div className="flex gap-2">
            <input
              className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-white text-sm font-bold border border-white/20 outline-none"
              style={{ caretColor: "oklch(0.78 0.18 350)" }}
              value={draftFocus}
              onChange={(e) => setDraftFocus(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveFocus()}
              maxLength={30}
              placeholder="#WhatYoureStudying"
              autoFocus
            />
            <button
              onClick={saveFocus}
              className="px-3 py-2 rounded-xl font-black text-white text-sm shrink-0"
              style={{ background: "oklch(0.72 0.18 350)" }}
            >
              Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-3 py-2 rounded-xl bg-white/10 text-white text-sm font-black shrink-0"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="font-black text-lg" style={{ color: "oklch(0.78 0.18 350)" }}>
              {profile.focusTag}
            </span>
            <button
              onClick={() => { setDraftFocus(profile.focusTag); setEditing("focus"); }}
              className="text-white/30 hover:text-white/60 text-sm font-black px-2 py-1 rounded-lg hover:bg-white/10 transition-all"
            >
              Edit ✏️
            </button>
          </div>
        )}
      </div>

      {/* ── Streak Calendar ── */}
      <div className="relative rounded-3xl border border-white/20 bg-white/8 p-5 mb-4">
        <StreakCalendar />
      </div>

      {/* ── Stats ── */}
      <div className="relative rounded-3xl border border-white/20 bg-white/8 p-5 mb-4">
        <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-4">
          Your Stats
        </p>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
            <p className="text-3xl font-black">{stats.xp}</p>
            <p className="text-white/40 font-bold text-xs mt-1">Total XP</p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
            <p className="text-3xl font-black">∞ {stats.streak}</p>
            <p className="text-white/40 font-bold text-xs mt-1">
              {stats.streak === 1 ? "Day" : "Days"} Streak
            </p>
          </div>
        </div>

        <div className="flex justify-between text-xs font-black text-white/50 mb-1.5">
          <span>{RANK_LABELS[difficulty]}</span>
          <span>{stats.xp} XP</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-white/10 mb-2">
          <div
            className="h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${xpProgress}%`, background: "oklch(0.72 0.18 350)" }}
          />
        </div>
        {difficulty !== "advanced" ? (
          <p className="text-white/30 text-xs font-bold">
            {xpToNext} XP to {difficulty === "beginner" ? "Analyst" : "Historian"}
          </p>
        ) : (
          <p className="text-white/30 text-xs font-bold">Maximum tier reached 🏆</p>
        )}
      </div>

      {/* ── Friends ── */}
      <div className="relative rounded-3xl border border-white/20 bg-white/8 p-5 mb-4">
        <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-4">
          Friends
        </p>

        <div className="flex gap-2 mb-3">
          <input
            className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold border border-white/20 outline-none"
            style={{ caretColor: "oklch(0.78 0.18 350)" }}
            placeholder="Add by username..."
            value={friendInput}
            onChange={(e) => { setFriendInput(e.target.value); setFriendError(""); }}
            onKeyDown={(e) => e.key === "Enter" && addFriend()}
            maxLength={20}
          />
          <button
            onClick={addFriend}
            className="px-5 py-3 rounded-xl font-black text-white text-sm shrink-0"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Add
          </button>
        </div>

        {friendError && (
          <p className="text-white/40 font-bold text-xs mb-3">{friendError}</p>
        )}

        {profile.friends.length === 0 ? (
          <p className="text-white/25 font-bold text-sm text-center py-5">
            No friends added yet — type a username above.
          </p>
        ) : (
          <div className="space-y-2">
            {profile.friends.map((name) => (
              <div
                key={name}
                className="flex items-center justify-between py-3 border-b border-white/8 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-base">
                    👤
                  </div>
                  <span className="text-white font-black text-sm">{name}</span>
                </div>
                <button
                  onClick={() => removeFriend(name)}
                  className="text-white/25 hover:text-white/60 text-xs font-black px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Coming soon ── */}
      <div className="relative rounded-3xl border border-white/10 bg-white/5 p-5 opacity-50 mb-4">
        <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-3">
          Coming Soon
        </p>
        <div className="space-y-2 text-sm text-white/50 font-semibold">
          <p>📊 Accuracy breakdown by topic — Politics, Economics, Military</p>
          <p>🏅 Seasonal rankings and debate ELO score</p>
          <p>📈 Adaptive difficulty — harder questions in your weak areas</p>
          <p>🔥 Streak rewards and daily XP multipliers</p>
          <p>👥 Friend activity feed and head-to-head quiz challenges</p>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-white/10 bg-background pb-6 pt-3">
        <Link to="/home" className="flex flex-col items-center gap-1">
          <Home className="h-5 w-5 text-white/50" />
          <span className="text-xs font-medium text-white/50">Home</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center gap-1">
          <BookOpen className="h-5 w-5 text-white/50" />
          <span className="text-xs font-medium text-white/50">History</span>
        </Link>
        <Link to="/debate" className="flex flex-col items-center gap-1">
          <MessageSquare className="h-5 w-5 text-white/50" />
          <span className="text-xs font-medium text-white/50">Debate</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center gap-1">
          <User className="h-5 w-5 text-white" />
          <span className="text-xs font-medium text-white">Profile</span>
        </Link>
      </nav>
    </main>
  );
}
