import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CivicLoop â€” Understand the world in 5 minutes a day" },
      {
        name: "description",
        content:
          "Daily quizzes on news, history, and politics. Join 10,000+ curious minds learning with CivicLoop.",
      },
    ],
  }),
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.4 12 2.4 6.8 2.4 2.6 6.6 2.6 12s4.2 9.6 9.4 9.6c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M16.36 12.6c-.02-2.27 1.85-3.36 1.94-3.42-1.06-1.55-2.71-1.76-3.3-1.79-1.4-.14-2.74.83-3.46.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.15.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.59-.74 2.98-.74 1.39 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.23.88-1.28 1.24-2.52 1.26-2.58-.03-.01-2.42-.93-2.46-3.72zM14.07 5.9c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.68 1.37-.59.68-1.11 1.78-.97 2.82 1.02.08 2.07-.52 2.71-1.29z" />
    </svg>
  );
}

function Index() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate({ to: "/home" });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-background px-6 pb-10 pt-20 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex w-full max-w-md flex-1 flex-col items-center justify-center text-center">
        <div className="mb-10 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[oklch(0.78_0.18_350)]" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            CivicLoop
          </span>
        </div>

        <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          Understand the world in 5 minutes a day.
        </h1>
        <p className="mt-5 text-base text-muted-foreground sm:text-lg">
          Daily quizzes on news, history, and politics.
        </p>
      </div>

      <div className="relative flex w-full max-w-sm flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-transparent px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={handleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-transparent px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
        >
          <AppleIcon />
          Continue with Apple
        </button>
        <button
          type="button"
          onClick={handleSignIn}
          className="mt-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Continue as Guest
        </button>

        <p className="mt-8 text-xs text-muted-foreground/60">
          Used by 10,000+ curious minds.
        </p>
      </div>
    </main>
  );
}


