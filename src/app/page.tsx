import Hero from "@/components/sections/hero/hero";
import Portfolio from "@/components/sections/portfolio/portfolio";
import Services from "@/components/sections/services/services";
import Contact from "@/components/sections/contact/contact";
import { getPremierPortfolios } from "@/lib/data/portfolio";

export default async function Home() {
  const premierPortfolios = await getPremierPortfolios();

  return (
    <div>
      <Hero />
      <Services />
      <Portfolio portfolios={premierPortfolios} />
      <Contact />
    </div>
  );
}
