import Hero from "@/components/sections/hero/hero";
import Portfolio from "@/components/sections/portfolio/portfolio";
import Services from "@/components/sections/services/services";
import Contact from "@/components/sections/contact/contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </div>
  );
}
