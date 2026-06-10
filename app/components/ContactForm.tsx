"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to Supabase
    setSent(true);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border border-border bg-surface p-6 md:p-10"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
        Contact
      </p>
      <h2
        id="contact-heading"
        className="mt-3 text-2xl font-bold leading-[1.05] tracking-tight md:text-3xl"
      >
        Tell us what you&rsquo;re building.
      </h2>

      {sent ? (
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

          <button
            type="submit"
            className="mt-2 self-start bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bg transition-colors hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Send it.
          </button>
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
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
      >
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
