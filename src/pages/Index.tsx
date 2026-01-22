import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ZodiacSection from "@/components/ZodiacSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <StarField />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <ZodiacSection />
          <CommunitySection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
