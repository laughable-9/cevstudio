"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrorText(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setErrorText("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border border-border bg-surface p-6 pb-28 [mask-image:linear-gradient(to_bottom,black_calc(100%_-_7rem),transparent)] md:p-10 md:pb-32"
    >
      <h2
        id="contact-heading"
        className="text-2xl font-bold leading-[1.05] tracking-tight md:text-3xl"
      >
        Tell us what you&rsquo;re building.
      </h2>

      {status === "sent" ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-8 border-t border-border pt-8"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <p className="mt-4 text-lg leading-tight">
            Got it. We&rsquo;ll be in touch.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6" noValidate>
          <Field
            id="name"
            label="Name"
            value={name}
            onChange={setName}
            autoComplete="name"
            required
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
          />
          <Field
            id="message"
            label="Message"
            value={message}
            onChange={setMessage}
            placeholder="A sentence or two is enough."
            multiline
            required
          />

          <div className="mt-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="self-start rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "error" && (
              <p role="alert" className="text-sm text-accent-dark">
                {errorText}
              </p>
            )}
          </div>
        </form>
      )}
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
};

const inputClass =
  "border-b border-border bg-transparent pb-2 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none";

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
  required,
  multiline,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={inputClass}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          className={inputClass}
        />
      )}
    </div>
  );
}
