import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const MAX_LENGTHS = { name: 200, email: 320, message: 5000 } as const;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fields = {} as Record<keyof typeof MAX_LENGTHS, string>;
  for (const key of Object.keys(MAX_LENGTHS) as (keyof typeof MAX_LENGTHS)[]) {
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    if (!value || value.length > MAX_LENGTHS[key]) {
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
    console.error("contact form insert failed:", error.message);
    return NextResponse.json(
      { error: "Could not save your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
