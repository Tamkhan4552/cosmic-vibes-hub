import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ZodiacSection from "@/components/ZodiacSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ZodiacSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
