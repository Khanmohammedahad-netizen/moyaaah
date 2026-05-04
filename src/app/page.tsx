import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AmbienceExperience from "@/components/AmbienceExperience";
import RevolvingGallery from "@/components/RevolvingGallery";
import Menu from "@/components/Menu";
import Ambience from "@/components/Ambience";
import CinematicEnd from "@/components/CinematicEnd";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-secondary bg-black">
      <Navbar />
      <Hero />
      
      {/* Cinematic Sequences */}
      <AmbienceExperience />
      <RevolvingGallery />
      
      {/* Site Content */}
      <Menu />
      <Ambience />
      <CinematicEnd />
      <Footer />
    </main>
  );
}
