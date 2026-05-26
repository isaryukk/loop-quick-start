import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   src/routes/profile.tsx
   Profile page — username, avatar, focus hashtag,
   friends list. All persisted in localStorage.
───────────────────────────────────────────── */

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
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

type ProfileData = {
  username: string;
  avatar: string;
  focusTag: string;
  friends: string[];
};

function loadProfile(): ProfileData {
  try {
    const raw = localStorage.getItem("userProfile");
    if (raw) return JSON.parse(raw);
  } catch { /* ok */ }
  return { username: "Scholar", avatar: "📚", focusTag: "#FrenchRevolution", friends: [] };
}

function saveProfile(data: ProfileData) {
  try { localStorage.setItem("userProfile", JSON.stringify(data)); } catch { /* ok */ }
}

function loadStats() {
  try {
    return {
      xp: parseInt(localStorage.getItem("xp") || "0"),
      chaptersCompleted: parseInt(localStorage.getItem("chaptersCompleted") || "0"),
      streak: parseInt(localStorage.getItem("streak") || "0"),
    };
  } catch {
    return { xp: 0, chaptersCompleted: 0, streak: 0 };
  }
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(loadProfile);
  const [stats] = useState(loadStats);
  const [editing, setEditing] = useState<"username" | "focus" | "avatar" | null>(null);
  const [draftUsername, setDraftUsername] = useState(profile.username);
  const [draftFocus, setDraftFocus] = useState(profile.focusTag);
  const [friendInput, setFriendInput] = useState("");
  const [friendError, setFriendError] = useState("");

  // Persist whenever profile changes
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
    setProfile((p) => ({ ...p, friends: p.friends.filter((f) => f !== name) }));
  };

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">

      <h1 className="text-2xl font-bold mb-1">Profile</h1>
      <p className="text-white/50 text-sm mb-6">Customise your identity and track your progress.</p>

      {/* ── Avatar + Username card ── */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-4">
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          <button
            onClick={() => setEditing(editing === "avatar" ? null : "avatar")}
            className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl hover:bg-white/15 transition-all border border-white/10"
            title="Change avatar"
          >
            {profile.avatar}
          </button>

          {/* Name + rank */}
          <div className="flex-1">
            {editing === "username" ? (
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-white/10 rounded-xl px-3 py-1.5 text-white text-sm border border-white/20 outline-none focus:border-pink-400"
                  value={draftUsername}
                  onChange={(e) => setDraftUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveUsername()}
                  maxLength={20}
                  autoFocus
                />
                <button onClick={saveUsername} className="px-3 py-1.5 rounded-xl bg-pink-500 text-white text-sm font-bold">Save</button>
                <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-sm">✕</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{profile.username}</h2>
                <button
                  onClick={() => { setDraftUsername(profile.username); setEditing("username"); }}
                  className="text-white/30 hover:text-white/60 text-sm"
                  title="Edit username"
                >
                  ✏️
                </button>
              </div>
            )}
            <p className="text-white/40 text-sm mt-0.5">{RANK_LABELS[difficulty]}</p>
          </div>
        </div>

        {/* Avatar picker */}
        {editing === "avatar" && (
          <div>
            <p className="text-white/40 text-xs mb-2 uppercase tracking-widest">Choose an avatar</p>
            <div className="grid grid-cols-8 gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  onClick={() => selectAvatar(a)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl transition-all ${
                    profile.avatar === a ? "bg-pink-500" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Focus hashtag ── */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-4">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Current Focus</p>
        {editing === "focus" ? (
          <div className="flex gap-2">
            <input
              className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-white text-sm border border-white/20 outline-none focus:border-pink-400"
              value={draftFocus}
              onChange={(e) => setDraftFocus(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveFocus()}
              maxLength={30}
              placeholder="#WhatYoureStudying"
              autoFocus
            />
            <button onClick={saveFocus} className="px-3 py-2 rounded-xl bg-pink-500 text-white text-sm font-bold">Save</button>
            <button onClick={() => setEditing(null)} className="px-3 py-2 rounded-xl bg-white/10 text-white text-sm">✕</button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-pink-400 font-bold text-lg">{profile.focusTag}</span>
            <button
              onClick={() => { setDraftFocus(profile.focusTag); setEditing("focus"); }}
              className="text-white/30 hover:text-white/60 text-sm px-2 py-1 rounded-lg hover:bg-white/10 transition-all"
            >
              Edit ✏️
            </button>
          </div>
        )}
      </div>

      {/* ── Stats ── */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-4">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Your Stats</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-black">{stats.xp}</p>
            <p className="text-white/40 text-xs mt-0.5">Total XP</p>
          </div>
          <div>
            <p className="text-2xl font-black">{stats.chaptersCompleted}</p>
            <p className="text-white/40 text-xs mt-0.5">Chapters Done</p>
          </div>
          <div>
            <p className="text-2xl font-black">{stats.streak}</p>
            <p className="text-white/40 text-xs mt-0.5">Day Streak</p>
          </div>
        </div>

        {/* Tier progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/40 mb-1">
            <span>{RANK_LABELS[difficulty]}</span>
            <span>{stats.xp} XP</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-pink-500 transition-all duration-700"
              style={{
                width: `${
                  difficulty === "advanced"
                    ? 100
                    : difficulty === "intermediate"
                    ? Math.min(((stats.xp - 300) / 500) * 100, 100)
                    : Math.min((stats.xp / 300) * 100, 100)
                }%`,
              }}
            />
          </div>
          {difficulty !== "advanced" && (
            <p className="text-white/30 text-xs mt-1">
              {difficulty === "beginner" ? `${300 - stats.xp} XP to Analyst` : `${800 - stats.xp} XP to Historian`}
            </p>
          )}
        </div>
      </div>

      {/* ── Friends ── */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-4">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Friends</p>

        {/* Add friend input */}
        <div className="flex gap-2 mb-3">
          <input
            className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-white text-sm border border-white/20 outline-none focus:border-pink-400"
            placeholder="Add by username..."
            value={friendInput}
            onChange={(e) => { setFriendInput(e.target.value); setFriendError(""); }}
            onKeyDown={(e) => e.key === "Enter" && addFriend()}
            maxLength={20}
          />
          <button onClick={addFriend} className="px-4 py-2 rounded-xl bg-pink-500 text-white text-sm font-bold">
            Add
          </button>
        </div>
        {friendError && <p className="text-white/40 text-xs mb-2">{friendError}</p>}

        {profile.friends.length === 0 ? (
          <p className="text-white/25 text-sm text-center py-4">
            No friends added yet — type a username above.
          </p>
        ) : (
          <div className="space-y-2">
            {profile.friends.map((name) => (
              <div key={name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">
                    👤
                  </div>
                  <span className="text-white/80 text-sm font-medium">{name}</span>
                </div>
                <button
                  onClick={() => removeFriend(name)}
                  className="text-white/20 hover:text-white/50 text-xs px-2 py-1 rounded-lg hover:bg-white/10 transition-all"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Coming soon ── */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 opacity-60">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Coming Soon</p>
        <div className="space-y-1.5 text-sm text-white/50">
          <p>📊 Accuracy breakdown by topic (Politics, Economics, Military...)</p>
          <p>🏅 Seasonal rankings and debate ELO</p>
          <p>📈 Adaptive difficulty — questions matched to your weak areas</p>
          <p>🔥 Streak rewards and XP multipliers</p>
        </div>
      </div>

    </main>
  );
}
