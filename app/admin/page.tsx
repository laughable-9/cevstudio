import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Submissions — cev.studio",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 10;

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

const pagerClass = "font-mono text-xs uppercase tracking-[0.18em]";

function PagerLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return (
      <span aria-hidden className={`${pagerClass} text-border`}>
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className={`${pagerClass} text-ink transition-colors hover:text-accent`}
    >
      {children}
    </Link>
  );
}

async function getSubmissions(page: number): Promise<{
  rows?: Submission[];
  total?: number;
  notice?: string;
}> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    return {
      notice:
        "Supabase isn't connected yet. Set SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local (see .env.local.example), apply supabase/schema.sql, and reload this page.",
    };
  }

  const supabase = createClient(url, key);
  const from = (page - 1) * PAGE_SIZE;
  const { data, error, count } = await supabase
    .from("contact_messages")
    .select("id, name, email, message, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (error) {
    // PGRST103: requested range past the last row (e.g. a stale ?page= link).
    if (error.code === "PGRST103") {
      return { rows: [], total: 0 };
    }
    return { notice: `Could not load submissions: ${error.message}` };
  }
  return { rows: (data as Submission[]) ?? [], total: count ?? 0 };
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const { rows, total, notice } = await getSubmissions(page);
  const totalPages = Math.max(1, Math.ceil((total ?? 0) / PAGE_SIZE));

  return (
    <>
      <header className="px-6 pt-8 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Link href="/" aria-label="cev.studio home" className="inline-flex">
            <Image
              src="/final-logo.svg"
              alt="cev.studio"
              width={1400}
              height={359}
              priority
              className="h-[18px] w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
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
              <p className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {total} total
              </p>
            )}
          </div>

          {notice ? (
            <div className="mt-12 border border-border bg-surface p-8">
              <p className="max-w-prose text-base leading-relaxed text-muted">
                {notice}
              </p>
            </div>
          ) : rows && rows.length === 0 ? (
            <p className="mt-12 text-lg text-muted">
              {page > 1 ? "Nothing on this page." : "No submissions yet."}
            </p>
          ) : (
            <ul className="mt-12 flex flex-col gap-4">
              {rows?.map((s) => (
                <li
                  key={s.id}
                  className="border border-border bg-surface p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="break-words text-xl font-bold tracking-tight text-ink">
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
                    className="mt-1 inline-block break-all text-sm font-medium text-accent transition-colors hover:text-accent-dark"
                  >
                    {s.email}
                  </a>
                  <p className="mt-4 max-w-prose whitespace-pre-wrap break-words text-base leading-relaxed text-muted">
                    {s.message}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {!notice && totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-10 flex items-center justify-between gap-6"
            >
              <PagerLink
                href={
                  page > 1
                    ? page === 2
                      ? "/admin"
                      : `/admin?page=${page - 1}`
                    : undefined
                }
              >
                ← Newer
              </PagerLink>
              <p className={`${pagerClass} text-muted`}>
                {page} / {totalPages}
              </p>
              <PagerLink
                href={page < totalPages ? `/admin?page=${page + 1}` : undefined}
              >
                Older →
              </PagerLink>
            </nav>
          )}
        </div>
      </main>
    </>
  );
}
