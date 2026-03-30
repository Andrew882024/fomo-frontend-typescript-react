import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      <div
        className="h-0.5 w-full bg-gradient-to-r from-amber-400 via-emerald-500 via-sky-500 via-violet-500 to-pink-400"
        aria-hidden
      />
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-zinc-900"
          >
            FOMO
          </Link>
          <nav className="hidden gap-6 text-sm font-medium text-zinc-600 sm:flex">
            <Link href="/" className="text-zinc-900">
              Events
            </Link>
            <span className="cursor-not-allowed text-zinc-400" title="Coming soon">
              Leaderboard
            </span>
            <span className="cursor-not-allowed text-zinc-400" title="Coming soon">
              Store
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
}
