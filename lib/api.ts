import type { FreeFoodEvent } from "./types";

const DEFAULT_BASE = "http://127.0.0.1:8000";

export function getApiBase(): string {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  }
  return DEFAULT_BASE;
}

export async function fetchEvents(): Promise<FreeFoodEvent[]> {
  const res = await fetch(`${getApiBase()}/events`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Events request failed: ${res.status}`);
  }
  return res.json();
}
