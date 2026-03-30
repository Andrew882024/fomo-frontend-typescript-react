import Image from "next/image";
import type { FreeFoodEvent } from "@/lib/types";

type Props = {
  event: FreeFoodEvent;
};

export function EventCard({ event }: Props) {
  const href = event.url?.trim() || undefined;

  const inner = (
    <>
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-zinc-100 sm:h-32 sm:w-32">
        {event.image ? (
          <Image
            src={event.image}
            alt=""
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl text-zinc-400">
            🍕
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold leading-snug text-zinc-900">
          {event.event_name}
        </h3>
        <p className="mt-1.5 flex items-start gap-1.5 text-sm text-[#28a745]">
          <CalendarIcon className="mt-0.5 shrink-0" />
          <span>{event.date}</span>
        </p>
        <p className="mt-1 flex items-start gap-1.5 text-sm text-zinc-700">
          <PinIcon className="mt-0.5 shrink-0 text-red-500" />
          <span>{event.location}</span>
        </p>
        {event.url ? (
          <p className="mt-2 truncate text-xs text-zinc-400">
            Source:{" "}
            <span className="text-zinc-500">{event.url}</span>
          </p>
        ) : null}
      </div>
    </>
  );

  const className =
    "flex gap-4 rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm transition-shadow hover:shadow-md";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} block outline-none ring-blue-500/40 focus-visible:ring-2`}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
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
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
    </svg>
  );
}
