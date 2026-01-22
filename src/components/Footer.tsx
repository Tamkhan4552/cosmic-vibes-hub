import { Sparkles, Instagram, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (platform: string) => {
    toast.success(`Opening ${platform}`, {
      description: `Follow us on ${platform} for cosmic updates!`,
    });
  };

  const handleLinkClick = (link: string) => {
    if (link === 'community') {
      scrollToSection('community');
    } else {
      toast.info(`${link} page coming soon!`, {
        description: "Stay tuned for updates.",
      });
    }
  };

  return (
    <footer className="border-t border-border py-12 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display text-lg tracking-wider text-gradient-gold">
              COSMBREATH
            </span>
          </button>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <button onClick={() => handleLinkClick('About')} className="hover:text-foreground transition-colors">About</button>
            <button onClick={() => handleLinkClick('Products')} className="hover:text-foreground transition-colors">Products</button>
            <button onClick={() => handleLinkClick('community')} className="hover:text-foreground transition-colors">Community</button>
            <button onClick={() => handleLinkClick('Contact')} className="hover:text-foreground transition-colors">Contact</button>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <button onClick={() => handleSocialClick('Instagram')} className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </button>
            <button onClick={() => handleSocialClick('Twitter')} className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button onClick={() => handleSocialClick('YouTube')} className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2026 Cosmbreath. All rights reserved. Breathe the cosmos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
