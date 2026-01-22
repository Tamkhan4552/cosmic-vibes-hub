import HeroSection from "@/components/HeroSection";
import ZodiacSection from "@/components/ZodiacSection";
import CommunitySection from "@/components/CommunitySection";
import StarField from "@/components/StarField";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <StarField />
      <div className="relative z-10">
        <main>
          <HeroSection />
          <ZodiacSection />
          <CommunitySection />
        </main>
      </div>
    </div>
  );
};

export default Index;
