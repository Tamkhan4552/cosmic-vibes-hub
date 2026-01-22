import { zodiacSigns } from "@/data/zodiacData";
import ZodiacCard from "./ZodiacCard";
import { Sparkles } from "lucide-react";

const ZodiacSection = () => {
  return (
    <section id="zodiac" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">12 Zodiac Energies</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Discover Your <span className="text-gradient-gold">Cosmic Energy</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each zodiac sign carries unique energy that influences how you feel and experience our products. 
            Find your sign and unlock personalized guidance for your day.
          </p>
        </div>

        {/* Zodiac Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {zodiacSigns.map((sign, index) => (
            <ZodiacCard key={sign.name} sign={sign} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZodiacSection;
