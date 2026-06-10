import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Submissions — cev.studio",
  robots: { index: false, follow: false },
};

type Submission = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

async function getSubmissions(): Promise<{
  rows?: Submission[];
  notice?: string;
}> {
  await connection();

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    return {
      notice:
        "Supabase isn't connected yet. Set SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local (see .env.local.example), apply supabase/schema.sql, and reload this page.",
    };
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return { notice: `Could not load submissions: ${error.message}` };
  }
  return { rows: (data as Submission[]) ?? [] };
}

export default async function AdminPage() {
  const { rows, notice } = await getSubmissions();

  return (
    <>
      <header className="px-6 pt-8 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Link href="/" aria-label="cev.studio home" className="inline-flex">
            <Image
              src="/logo-nav.png"
              alt="cev.studio"
              width={2368}
              height={388}
              priority
              className="h-[18px] w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-baseline justify-between gap-4">
            <h1
              className="font-bold tracking-tight text-ink"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              Submissions.
            </h1>
            {rows && (
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {rows.length} total
              </p>
            )}
          </div>

          {notice ? (
            <div className="mt-12 border border-border bg-surface p-8">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
                {notice}
              </p>
            </div>
          ) : rows && rows.length === 0 ? (
            <p className="mt-12 text-lg text-muted">No submissions yet.</p>
          ) : (
            <ul className="mt-12 border-t border-border">
              {rows?.map((s) => (
                <li key={s.id} className="border-b border-border py-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="text-xl font-bold tracking-tight text-ink">
                      {s.name}
                    </p>
                    <time
                      dateTime={s.created_at}
                      className="font-mono text-xs text-muted"
                    >
                      {dateFormat.format(new Date(s.created_at))}
                    </time>
                  </div>
                  <a
                    href={`mailto:${s.email}`}
                    className="mt-1 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-dark"
                  >
                    {s.email}
                  </a>
                  <p className="mt-4 max-w-prose whitespace-pre-wrap text-base leading-relaxed text-muted">
                    {s.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
