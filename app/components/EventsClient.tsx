"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchEvents } from "@/lib/api";
import {
  dayKey,
  formatDayHeading,
  parseEventDateStart,
} from "@/lib/dates";
import type { FreeFoodEvent } from "@/lib/types";
import { EventCard } from "./EventCard";

type TimeFilter = "all" | "week" | "today";

function matchesSearch(e: FreeFoodEvent, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  return (
    e.event_name.toLowerCase().includes(s) ||
    e.location.toLowerCase().includes(s) ||
    e.date.toLowerCase().includes(s)
  );
}

function matchesTimeFilter(e: FreeFoodEvent, f: TimeFilter): boolean {
  const start = parseEventDateStart(e.date);
  if (start.getTime() === 0) return true;
  const now = new Date();
  if (f === "today") {
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);
    return start >= startOfToday && start <= endOfToday;
  }
  if (f === "week") {
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const weekEnd = new Date(startOfToday);
    weekEnd.setDate(weekEnd.getDate() + 7);
    return start >= startOfToday && start <= weekEnd;
  }
  return true;
}

export function EventsClient() {
  const [events, setEvents] = useState<FreeFoodEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
      setEvents(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!events) return [];
    return events.filter(
      (e) => matchesSearch(e, search) && matchesTimeFilter(e, timeFilter),
    );
  }, [events, search, timeFilter]);

  const byDay = useMemo(() => {
    const map = new Map<string, { date: Date; items: FreeFoodEvent[] }>();
    for (const e of filtered) {
      const d = parseEventDateStart(e.date);
      const key = dayKey(d);
      if (!map.has(key)) {
        map.set(key, { date: d, items: [] });
      }
      map.get(key)!.items.push(e);
    }
    const keys = [...map.keys()].sort();
    return keys.map((k) => map.get(k)!);
  }, [filtered]);

  return (
    <div className="w-full max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <label className="sr-only" htmlFor="search-events">
          Search events
        </label>
        <input
          id="search-events"
          type="search"
          placeholder="Search events"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          className="w-full rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none ring-zinc-300 placeholder:text-zinc-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
        />
        <div className="flex shrink-0 flex-wrap gap-2">
          <select
            value={timeFilter}
            onChange={(ev) => setTimeFilter(ev.target.value as TimeFilter)}
            className="rounded-full border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
            aria-label="Time range"
          >
            <option value="all">All time</option>
            <option value="week">Next 7 days</option>
            <option value="today">Today</option>
          </select>
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <p className="text-center text-zinc-500">Loading events…</p>
        ) : error ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
            <p>{error}</p>
            <p className="mt-1 text-xs text-amber-800/80">
              Start the API on port 8000, or set{" "}
              <code className="rounded bg-amber-100/80 px-1">NEXT_PUBLIC_API_URL</code>.
            </p>
            <button
              type="button"
              onClick={() => void load()}
              className="mt-3 rounded-full bg-amber-800 px-4 py-1.5 text-xs font-medium text-white hover:bg-amber-900"
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-zinc-500">
            No events match your filters.
          </p>
        ) : (
          <div className="flex flex-col gap-12">
            {byDay.map(({ date, items }) => (
              <section key={dayKey(date)}>
                <h2 className="mb-4 text-lg font-bold text-zinc-900">
                  {formatDayHeading(date)}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {items.map((ev) => (
                    <EventCard key={ev.id} event={ev} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
