import type { FreeFoodEvent } from "./types";

/**
 * Loads events through the Next.js route `/api/events` (same origin in the browser).
 * The route handler calls the FastAPI backend on the server, avoiding CORS.
 */
export async function fetchEvents(): Promise<FreeFoodEvent[]> {
  const res = await fetch("/api/events", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Events request failed: ${res.status}`);
  }
  return res.json();
}
