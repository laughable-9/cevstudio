import ContactForm from "./ContactForm";

export default function Hero() {
  return (
    <section id="top" className="px-6 pb-16 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <h1
          className="max-w-3xl font-bold tracking-tight text-ink"
          style={{
            fontSize: "clamp(2.75rem, 6.5vw, 4.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          We build the thing you{" "}
          <span className="lime-gradient">actually need</span>.
        </h1>
        <p className="mt-6 max-w-md text-base leading-snug text-muted md:text-lg">
          A studio for web, mobile, brand, and 3D.
        </p>

        <div className="mt-14 w-full max-w-xl text-left">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
