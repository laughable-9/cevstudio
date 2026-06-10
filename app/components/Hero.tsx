import ContactForm from "./ContactForm";

export default function Hero() {
  return (
    <section id="top" className="border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h1
            className="font-bold tracking-tight text-ink"
            style={{
              fontSize: "clamp(3rem, 8.5vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            We build the thing you actually need.
          </h1>
          <p className="mt-8 max-w-md text-base leading-snug text-muted md:text-lg">
            A studio for web, mobile, brand, and 3D.
          </p>
        </div>

        <div className="lg:col-span-5">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
