const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

type SupabaseResponse<T> = {
  data: T | null;
  error: { message: string } | null;
};

function getAuthHeaders() {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<SupabaseResponse<T>> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return { data: null, error: { message: "Supabase is not configured." } };
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    return { data: null, error: { message: await res.text() } };
  }

  if (res.status === 204) {
    return { data: null, error: null };
  }

  return { data: await res.json(), error: null };
}

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

export const supabaseRest = {
  getProfile(userId: string) {
    return request<CivicProfile[]>(
      `profiles?id=eq.${userId}&select=*`
    );
  },

  upsertProfile(profile: CivicProfile) {
    return request<CivicProfile[]>("profiles", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(profile),
    });
  },

  getStats(userId: string) {
    return request<UserStats[]>(
      `user_stats?user_id=eq.${userId}&select=*`
    );
  },

  upsertStats(stats: UserStats) {
    return request<UserStats[]>("user_stats", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(stats),
    });
  },
};
