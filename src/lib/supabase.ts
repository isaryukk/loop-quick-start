const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const SESSION_KEY = "civicloop_supabase_session";

type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  user: { id: string };
};

type SupabaseResponse<T> = {
  data: T | null;
  error: { message: string } | null;
};

export type CivicProfile = {
  id: string;
  username: string;
  avatar: string;
  focus_tag: string;
  friends: string[];
};

export type UserStats = {
  user_id: string;
  xp: number;
  streak: number;
  last_quiz_date: string | null;
  quiz_history: string[];
};

function getSavedSession(): SupabaseSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session: SupabaseSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function getSupabaseSession(): Promise<SupabaseSession | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  const existing = getSavedSession();
  if (existing?.access_token && existing?.user?.id) return existing;

  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) return null;

  const session = await res.json();
  saveSession(session);
  return session;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<SupabaseResponse<T>> {
  const session = await getSupabaseSession();

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !session) {
    return { data: null, error: { message: "Supabase is not configured." } };
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    return { data: null, error: { message: await res.text() } };
  }

  if (res.status === 204) return { data: null, error: null };

  return { data: await res.json(), error: null };
}

export const supabaseRest = {
  async currentUserId() {
    const session = await getSupabaseSession();
    return session?.user?.id ?? null;
  },

  getProfile(userId: string) {
    return request<CivicProfile[]>(`profiles?id=eq.${userId}&select=*`);
  },

  upsertProfile(profile: CivicProfile) {
    return request<CivicProfile[]>("profiles", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(profile),
    });
  },

  getStats(userId: string) {
    return request<UserStats[]>(`user_stats?user_id=eq.${userId}&select=*`);
  },

  upsertStats(stats: UserStats) {
    return request<UserStats[]>("user_stats", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(stats),
    });
  },
};
