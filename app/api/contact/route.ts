import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const MAX_LENGTHS = { name: 200, email: 320, message: 5000 } as const;

// Generous upper bound for a JSON body holding the three fields above.
const MAX_BODY_BYTES = 16_384;

// Soft per-IP rate limit. In-memory, so it resets per server instance — the
// database trigger in supabase/schema.sql is the hard site-wide backstop.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentByIp.get(ip) ?? []).filter(
    (t) => t > now - RATE_LIMIT.windowMs
  );
  if (hits.length >= RATE_LIMIT.max) {
    recentByIp.set(ip, hits);
    return true;
  }
  hits.push(now);
  if (recentByIp.size > 10_000) recentByIp.clear();
  recentByIp.set(ip, hits);
  return false;
}

// Control characters are rejected rather than stripped: no human typed them.
// Name and email must be single-line (blocks header-injection-style payloads
// if these values are ever forwarded into an email); message may contain
// tabs and newlines.
const CTRL_ANY = /[\u0000-\u001f\u007f]/;
const CTRL_EXCEPT_WHITESPACE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export async function POST(request: Request) {
  // x-forwarded-for is always set behind Vercel's proxy; it's absent on
  // direct localhost requests, so in dev everything shares one bucket.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages from this connection. Try again later." },
      { status: 429 }
    );
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Invalid request." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fields = {} as Record<keyof typeof MAX_LENGTHS, string>;
  for (const key of Object.keys(MAX_LENGTHS) as (keyof typeof MAX_LENGTHS)[]) {
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    const ctrl = key === "message" ? CTRL_EXCEPT_WHITESPACE : CTRL_ANY;
    if (!value || value.length > MAX_LENGTHS[key] || ctrl.test(value)) {
      return NextResponse.json(
        { error: `Please provide a valid ${key}.` },
        { status: 400 }
      );
    }
    fields[key] = value;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return NextResponse.json(
      { error: "Please provide a valid email." },
      { status: 400 }
    );
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "The form backend is not configured yet." },
      { status: 503 }
    );
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("contact_messages").insert(fields);
  if (error) {
    // P0001 is raised by the throttle trigger when the site-wide cap is hit.
    if (error.code === "P0001") {
      return NextResponse.json(
        {
          error:
            "We're getting a lot of messages right now. Try again in a minute.",
        },
        { status: 429 }
      );
    }
    console.error("contact form insert failed:", error.message);
    return NextResponse.json(
      { error: "Could not save your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
