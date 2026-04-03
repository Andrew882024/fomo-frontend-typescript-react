import { NextResponse } from "next/server";

/** Upstream FastAPI base URL (server-only; avoids browser CORS). */
function backendBase(): string {
  const raw =
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://127.0.0.1:8000";
  return raw.replace(/\/$/, "");
}

export async function GET() {
  const base = backendBase();
  const url = `${base}/events`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
    });
    const body = await res.text();
    return new NextResponse(body, {
      status: res.status,
      headers: {
        "Content-Type":
          res.headers.get("Content-Type") ?? "application/json; charset=utf-8",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Upstream API unreachable",
        detail: message,
        tried: url,
        hint:
          "Set BACKEND_URL in .env.local or rely on .env.development (see repo). For a local API use BACKEND_URL=http://127.0.0.1:8000 and start FastAPI.",
      },
      { status: 502 },
    );
  }
}
