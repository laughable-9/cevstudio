import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy — cev.studio",
  description:
    "How cev.studio handles the information you share through our contact form.",
};

const sections = [
  {
    heading: "What we collect",
    body: "Only what you type into the contact form: your name, your email address, and your message. The site sets no tracking cookies and runs no third-party analytics.",
  },
  {
    heading: "How we use it",
    body: "We use your details for one thing — replying to you about your project. We don't add you to mailing lists, and we never sell or share your information with anyone.",
  },
  {
    heading: "Where it lives",
    body: "Submissions are transmitted over HTTPS and stored in our form backend, accessible only to the people who handle inquiries.",
  },
  {
    heading: "How long we keep it",
    body: "For the duration of our conversation. If a project doesn't go ahead, we delete the thread. You can also ask us to delete it at any time.",
  },
  {
    heading: "Your rights",
    body: "You can ask what we hold about you, ask us to correct it, or ask us to delete it. One email is enough, and we'll confirm when it's done.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="px-6 pt-8 md:px-10">
        <div className="mx-auto max-w-2xl">
          <Link href="/" aria-label="cev.studio home" className="inline-flex">
            <Image
              src="/final-logo.svg"
              alt="cev.studio"
              width={1400}
              height={359}
              priority
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h1
            className="font-bold tracking-tight text-ink"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            Privacy.
          </h1>
          <p className="mt-6 max-w-md text-base leading-snug text-muted md:text-lg">
            The form on our homepage is the only place this site collects
            anything. Here is exactly what happens to it.
          </p>

          <div className="mt-14 flex flex-col gap-10">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">
                  {s.heading}
                </h2>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-muted">
                  {s.body}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-border pt-8 text-base leading-relaxed text-muted">
            Questions, or a deletion request? Write to us through the{" "}
            <Link
              href="/#contact"
              className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              contact form
            </Link>{" "}
            and mention privacy — we&rsquo;ll handle it first.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
