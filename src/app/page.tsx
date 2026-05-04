import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import Ambience from "@/components/Ambience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-secondary">
      <Navbar />
      <Hero />
      <Story />
      <Menu />
      <Ambience />
      <Footer />
    </main>
  );
}
