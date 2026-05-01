import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { About } from "@/components/site/about";
import { Goal } from "@/components/site/goal";
import { Contact } from "@/components/site/contact";
import { Socials } from "@/components/site/socials";
import { Footer } from "@/components/site/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Marquee />
        <About />
        <Goal />
        <Contact />
        <Socials />
      </main>
      <Footer />
    </>
  );
}
