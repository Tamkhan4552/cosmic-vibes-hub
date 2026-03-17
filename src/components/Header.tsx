import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, openLoginModal, logout } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleJoinDiscussion = () => {
    scrollToSection("community");
    toast.success("Welcome to the community!", {
      description: "Start sharing your cosmic journey with others.",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo123S */}
          <a 
            href="https://www.cosmbreath.com/"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display text-lg tracking-wider text-gradient-gold">
              COSMBREATH
            </span>
          </a>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("zodiac")} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Zodiac Energies
            </button>
            <button 
              onClick={() => scrollToSection("community")} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Community
            </button>
            <button 
              onClick={() => toast.info("Products coming soon!", { description: "Stay tuned for our cosmic collection." })} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Products
            </button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleJoinDiscussion}>
              Join Discussion
            </Button>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden md:inline">Hi, {user.name}</span>
                <Button size="sm" variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={openLoginModal}>
                Login
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection("zodiac")} 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Zodiac Energies
              </button>
              <button 
                onClick={() => scrollToSection("community")} 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Community
              </button>
              <button 
                onClick={() => {
                  toast.info("Products coming soon!", { description: "Stay tuned for our cosmic collection." });
                  setIsMenuOpen(false);
                }} 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Products
              </button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit" onClick={handleJoinDiscussion}>
                Join Discussion
              </Button>
              {user ? (
                <Button size="sm" variant="outline" onClick={logout} className="w-fit">
                  Logout
                </Button>
              ) : (
                <Button size="sm" variant="outline" onClick={openLoginModal} className="w-fit">
                  Login
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
