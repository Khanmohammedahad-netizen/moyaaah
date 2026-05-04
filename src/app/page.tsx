import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BurgerScrollSequence from "@/components/BurgerScrollSequence";
import RevolvingGallery from "@/components/RevolvingGallery";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import Ambience from "@/components/Ambience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-secondary bg-black">
      <Navbar />
      <Hero />
      
      {/* Cinematic Sequences */}
      <BurgerScrollSequence />
      <RevolvingGallery />
      
      {/* Site Content */}
      <Story />
      <Menu />
      <Ambience />
      <Footer />
    </main>
  );
}
