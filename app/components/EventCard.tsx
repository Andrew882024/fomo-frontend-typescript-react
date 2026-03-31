import Image from "next/image";
import type { FreeFoodEvent } from "@/lib/types";

type Props = {
  event: FreeFoodEvent;
};

/** "Mar 30, 2026, 12:00 PM – 2:00 PM" → date vs time for green/black styling */
function splitDateTime(dateStr: string): { datePart: string; timePart: string } | null {
  const m = dateStr.match(/^([A-Za-z]+ \d+, \d{4}),\s*(.+)$/);
  if (!m) return null;
  return { datePart: m[1], timePart: m[2] };
}

/** Leading "Free " in gray, remainder bold (reference UI). */
function splitTitle(name: string): { showFree: boolean; rest: string } {
  const m = name.match(/^(free)\s+/i);
  if (m) return { showFree: true, rest: name.slice(m[0].length) };
  return { showFree: false, rest: name };
}

function sourceHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function EventCard({ event }: Props) {
  const href = event.url?.trim() || undefined;
  const title = splitTitle(event.event_name);
  const dt = splitDateTime(event.date);

  const inner = (
    <>
      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg bg-zinc-100 sm:h-[96px] sm:w-[96px]">
        {event.image ? (
          <Image
            src={event.image}
            alt=""
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl text-zinc-400">
            🍕
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h3 className="text-sm leading-snug text-black sm:text-[15px]">
          {title.showFree ? (
            <>
              <span className="font-normal text-[#6c757d]">Free </span>
              <span className="font-bold">{title.rest}</span>
            </>
          ) : (
            <span className="font-bold">{title.rest}</span>
          )}
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-1 text-sm leading-snug">
          <CalendarIcon className="mt-0.5 shrink-0 text-zinc-500" />
          {dt ? (
            <>
              <span className="font-bold text-[#28a745]">{dt.datePart}</span>
              <span className="font-normal text-black">, {dt.timePart}</span>
              <span
                className="ml-0.5 inline-block size-1.5 shrink-0 rounded-full bg-[#28a745]"
                aria-hidden
              />
            </>
          ) : (
            <span className="font-bold text-[#28a745]">{event.date}</span>
          )}
        </p>
        <p className="mt-0.5 flex items-start gap-1.5 text-sm leading-snug text-black">
          <PinIcon className="mt-0.5 shrink-0 text-red-500" />
          <span className="font-normal">{event.location}</span>
        </p>
        {href ? (
          <p className="mt-2 text-[12px] leading-snug text-[#6c757d]">
            Source:{" "}
            <span className="text-[#007bff]">{sourceHostname(href)}</span>
            <span className="text-[#6c757d]"> · open card to view</span>
          </p>
        ) : null}
      </div>
    </>
  );

  const shell =
    "flex gap-4 rounded-xl bg-white p-3 shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0_6px_14px_rgba(0,0,0,0.12)] sm:p-4";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${shell} block outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] focus-visible:ring-offset-2`}
      >
        {inner}
      </a>
    );
  }

  return <div className={shell}>{inner}</div>;
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
    </svg>
  );
}
