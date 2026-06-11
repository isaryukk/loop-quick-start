import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }}
      />
      <div className="relative text-center">
        <p className="text-8xl font-black mb-4" style={{ color: "oklch(0.72 0.18 350)" }}>∞</p>
        <h1 className="text-2xl font-black text-white mb-2">Page not found</h1>
        <p className="text-white/70 font-bold text-sm mb-8">
          This page doesn't exist — but your daily quiz does.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-black text-white transition-opacity hover:opacity-90"
          style={{ background: "oklch(0.72 0.18 350)" }}
        >
          Back to CivicLoop
        </Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 350) 0%, transparent 70%)" }}
      />
      <div className="relative text-center">
        <p className="text-5xl mb-4">⚠️</p>
        <h1 className="text-2xl font-black text-white mb-2">Something went wrong</h1>
        <p className="text-white/70 font-bold text-sm mb-8">
          A page failed to load. Try again or head back home.
        </p>

        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="w-full py-4 rounded-full font-black text-white text-base"
            style={{ background: "oklch(0.72 0.18 350)" }}
          >
            Try again
          </button>

          <a
            href="/"
            className="w-full py-4 rounded-full font-black text-white/70 text-base border border-white/20 bg-white/8 text-center"
          >
            Back home
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "CivicLoop — Understand the world in 5 minutes a day" },
      { name: "description", content: "Daily quizzes on news, history, and politics. Build your political literacy one day at a time." },
      { name: "theme-color", content: "#c45c7c" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "CivicLoop" },
      { property: "og:title", content: "CivicLoop — Understand the world in 5 minutes a day" },
      { property: "og:description", content: "Daily quizzes on news, history, and politics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "CivicLoop" },
      { name: "twitter:description", content: "Build your political literacy in 5 minutes a day." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/icon.svg" },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
