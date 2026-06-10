import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ClosingCta from "./components/ClosingCta";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <>
      <Nav />
      <SmoothScroll>
        <main>
          <Hero />
          <Services />
          <ClosingCta />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
