import { Sparkles, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-display text-xl tracking-wider text-gradient-gold">
              COSMBREATH
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#zodiac" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Zodiac Energies
            </a>
            <a href="#community" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Community
            </a>
            <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join Discussion
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#zodiac" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Zodiac Energies
              </a>
              <a href="#community" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Community
              </a>
              <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Products
              </a>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit">
                Join Discussion
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
