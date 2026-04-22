import Header from "@/components/Header";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import BackgroundDriver from "@/components/ui/BackgroundDriver";
import VoidHero from "@/components/sections/VoidHero";
import ThePour from "@/components/sections/ThePour";
import TheWork from "@/components/sections/TheWork";
import TheProjects from "@/components/sections/TheProjects";
import TheBrothers from "@/components/sections/TheBrothers";
import TheAsk from "@/components/sections/TheAsk";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Loader />
      <Cursor />
      <ScrollVelocity />
      <BackgroundDriver />
      <Header />
      <main>
        <VoidHero />
        <ThePour />
        <TheWork />
        <TheProjects />
        <TheBrothers />
        <TheAsk />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
