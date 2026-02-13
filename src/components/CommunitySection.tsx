import { forumPosts, ForumPost as ForumPostType } from "@/data/forumData";
import ForumPost from "./ForumPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquarePlus, Search, TrendingUp, Clock, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const CommunitySection = () => {
  const [activeFilter, setActiveFilter] = useState<'trending' | 'recent'>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedPosts, setDisplayedPosts] = useState(4);
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null);

  const filteredPosts = forumPosts
    .filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesZodiac = selectedZodiac ? post.zodiacSign.toLowerCase() === selectedZodiac.toLowerCase() || post.tags.some(t => t.toLowerCase() === selectedZodiac.toLowerCase()) : true;

      return matchesSearch && matchesZodiac;
    })
    .sort((a, b) => {
      if (activeFilter === 'trending') {
        return b.likes - a.likes;
      }
      return 0; // Keep original order for recent
    });

  const handleNewPost = () => {
    toast.info("Create your post", {
      description: "Sign up to share your cosmic experience with the community!",
      action: {
        label: "Coming Soon",
        onClick: () => toast.success("Feature launching soon!"),
      },
    });
  };

  const handleLoadMore = () => {
    if (displayedPosts < filteredPosts.length) {
      setDisplayedPosts(prev => Math.min(prev + 4, filteredPosts.length));
      toast.success("More discussions loaded!");
    } else {
      toast.info("You've seen all discussions!", {
        description: "Check back later for new posts.",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"`, {
        description: `Found ${filteredPosts.length} results`,
      });
    }
  };

  // Listen for zodiac selection events from ZodiacCard
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.sign) {
        setSelectedZodiac(detail.sign);
        setDisplayedPosts(8);
        toast.info(`Showing ${detail.sign} community`);
      }
    };
    window.addEventListener('selectZodiac', handler as EventListener);
    return () => window.removeEventListener('selectZodiac', handler as EventListener);
  }, []);

  return (
    <section id="community" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Community Forum</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Share Your <span className="text-gradient-gold">Cosmic Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow cosmic souls. Share your experiences, ask questions, 
            and discover how others are using Cosmbreath products in their daily rituals.
          </p>
        </div>

        {/* Selected Zodiac Filter */}
        {selectedZodiac && (
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-3 bg-muted/60 border border-border px-4 py-2 rounded-full">
              <span className="text-sm text-muted-foreground">Showing posts for</span>
              <strong className="font-display text-foreground ml-1">{selectedZodiac}</strong>
              <Button
                variant="outline"
                size="sm"
                className="ml-4"
                onClick={() => { setSelectedZodiac(null); setDisplayedPosts(4); toast.success('Showing all discussions'); window.scrollTo({ top: document.getElementById('community')?.offsetTop || 0, behavior: 'smooth' }); }}
              >
                Show All
              </Button>
            </div>
          </div>
        )}

        {/* Forum Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={activeFilter === 'trending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setActiveFilter('trending');
                toast.success("Showing trending discussions");
              }}
              className={activeFilter === 'trending' ? 'bg-primary text-primary-foreground' : ''}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
            <Button
              variant={activeFilter === 'recent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setActiveFilter('recent');
                toast.success("Showing recent discussions");
              }}
              className={activeFilter === 'recent' ? 'bg-primary text-primary-foreground' : ''}
            >
              <Clock className="w-4 h-4 mr-2" />
              Recent
            </Button>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search discussions..." 
                className="pl-10 bg-muted border-border focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold whitespace-nowrap"
              onClick={handleNewPost}
            >
              <MessageSquarePlus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </form>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredPosts.slice(0, displayedPosts).map((post, index) => (
            <ForumPost key={post.id} post={post} index={index} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No discussions found matching "{searchQuery}"</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border hover:bg-muted"
              onClick={handleLoadMore}
            >
              {displayedPosts >= filteredPosts.length ? 'All Discussions Loaded' : 'Load More Discussions'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunitySection;
