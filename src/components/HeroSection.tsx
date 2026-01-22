import { Star, Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProducts = () => {
    toast.info("Products coming soon!", {
      description: "Stay tuned for our cosmic collection.",
    });
  };

  const handleJoinDiscussion = () => {
    scrollToSection("community");
    toast.success("Welcome to the community!", {
      description: "Start sharing your cosmic journey with others.",
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Star field background */}
      <div className="absolute inset-0 star-field opacity-40" />
      
      {/* Floating Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-display text-xl tracking-wider text-gradient-gold">
            COSMBREATH
          </span>
        </button>

        <div className="flex items-center gap-2 md:gap-6">
          <button 
            onClick={() => scrollToSection("zodiac")} 
            className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            Zodiac Energies
          </button>
          <button 
            onClick={() => scrollToSection("community")} 
            className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            Community
          </button>
          <button 
            onClick={handleProducts} 
            className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            Products
          </button>
          <Button 
            size="sm" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm"
            onClick={handleJoinDiscussion}
          >
            Join Discussion
          </Button>
        </div>
      </nav>

      {/* Floating celestial elements */}
      <div className="absolute top-32 left-10 animate-float opacity-30">
        <Moon className="w-12 h-12 text-primary" />
      </div>
      <div className="absolute top-48 right-20 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <Star className="w-8 h-8 text-cosmic-glow" />
      </div>
      <div className="absolute bottom-32 left-1/4 animate-float opacity-25" style={{ animationDelay: '2s' }}>
        <Sun className="w-10 h-10 text-primary" />
      </div>

      {/* Gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-cosmic-nebula/20 via-transparent to-transparent blur-3xl" />

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Cosmic Community</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight">
              <span className="text-gradient-gold">Breathe</span> the{" "}
              <span className="text-foreground">Cosmos</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our celestial community to share your journey with Cosmbreath products. 
              Discover the unique energy of each zodiac sign and connect with fellow cosmic souls.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
                onClick={() => scrollToSection("zodiac")}
              >
                Explore Zodiac Energies
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:bg-muted"
                onClick={() => scrollToSection("community")}
              >
                Join the Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
