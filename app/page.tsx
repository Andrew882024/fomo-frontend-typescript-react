import { EventsClient } from "./components/EventsClient";
import { SiteHeader } from "./components/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Upcoming Free Food Events at UC San Diego™
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-600">
            Live listings from the same public source as{" "}
            <a
              href="https://sheeptester.github.io/ucsd-free-food/"
              className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              ucsd-free-food
            </a>
            . Your backend can scrape and store snapshots; this page loads events via
            this site&apos;s{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm text-zinc-800">
              /api/events
            </code>{" "}
            route, which forwards to FastAPI{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm text-zinc-800">
              GET /events
            </code>
            .
          </p>
          <p className="mt-3 text-sm text-zinc-500">
            Data: sheep.thingkingland.app · Not affiliated with UC San Diego.
          </p>
        </div>

        <div className="mx-auto mt-12">
          <EventsClient />
        </div>
      </main>
    </div>
  );
}
