import { useState } from "react";
import { ZodiacSign } from "@/data/zodiacData";
import { ChevronDown, Flame, Mountain, Wind, Droplets } from "lucide-react";

interface ZodiacCardProps {
  sign: ZodiacSign;
  index: number;
}

const elementIcons = {
  Fire: Flame,
  Earth: Mountain,
  Air: Wind,
  Water: Droplets,
};

const ZodiacCard = ({ sign, index }: ZodiacCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ElementIcon = elementIcons[sign.element];

  return (
    <div
      className="card-cosmic rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${sign.color} flex items-center justify-center text-2xl shadow-lg`}>
              {sign.symbol}
            </div>
            <div>
              <h3 className="font-display text-xl text-foreground">{sign.name}</h3>
              <p className="text-sm text-muted-foreground">{sign.dates}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
            <ElementIcon className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">{sign.element}</span>
          </div>
        </div>

        {/* Energy Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {sign.energy}
        </p>

        {/* Expand Button */}
        <button className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
          <span>Daily Guidance</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border animate-fade-in">
            <h4 className="font-display text-sm text-primary mb-2">How to spend your day</h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {sign.dailyGuidance}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZodiacCard;
