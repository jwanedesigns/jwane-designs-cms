import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GenreShowcase from "@/components/GenreShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SceneBackground from "@/components/SceneBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <SceneBackground />
      <div className="absolute inset-0 pointer-events-none vignette opacity-40 z-[-1]" />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GenreShowcase />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
