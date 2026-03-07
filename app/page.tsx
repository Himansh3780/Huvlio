import { GetStarted } from "@/components/GetStarted";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <GetStarted />
      <Pricing />
    </main>
  );
}
