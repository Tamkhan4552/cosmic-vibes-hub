import { forumPosts, ForumPost as ForumPostType } from "@/data/forumData";
import ForumPost from "./ForumPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquarePlus, Search, TrendingUp, Clock, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/AuthContext";

type NewPostFormProps = {
  onCreate: (data: { title: string; content: string; tags: string; zodiacSign: string }) => void;
  onCancel: () => void;
};

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const NewPostForm = ({ onCreate, onCancel }: NewPostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [zodiacSign, setZodiacSign] = useState(zodiacSigns[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    onCreate({ title: title.trim(), content: content.trim(), tags, zodiacSign });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A cosmic insight..." />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Content</label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share what happened, what you learned, or how you're feeling." rows={5} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Zodiac Sign</label>
          <select
            value={zodiacSign}
            onChange={(e) => setZodiacSign(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
          >
            {zodiacSigns.map((sign) => (
              <option key={sign} value={sign}>
                {sign}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Tags</label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. Meditation, Moon Ritual"
          />
          <p className="text-xs text-muted-foreground">Separate tags with commas.</p>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Post</Button>
      </DialogFooter>
    </form>
  );
};

const CommunitySection = () => {
  const { user, openLoginModal } = useAuth();
  const [activeFilter, setActiveFilter] = useState<'trending' | 'recent'>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedPosts, setDisplayedPosts] = useState(4);
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  const [posts, setPosts] = useState<ForumPostType[]>(() => {
    try {
      const stored = localStorage.getItem('forumPosts');
      if (stored) {
        return JSON.parse(stored) as ForumPostType[];
      }
    } catch {
      // ignore malformed storage
    }
    return forumPosts;
  });

  const filteredPosts = useMemo(() => {
    const base = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesZodiac = selectedZodiac
        ? post.zodiacSign.toLowerCase() === selectedZodiac.toLowerCase() ||
          post.tags.some((t) => t.toLowerCase() === selectedZodiac.toLowerCase())
        : true;

      return matchesSearch && matchesZodiac;
    });

    return base.sort((a, b) => {
      if (activeFilter === 'trending') {
        return b.likes - a.likes;
      }
      return 0; // Keep original order for recent
    });
  }, [posts, searchQuery, selectedZodiac, activeFilter]);

  useEffect(() => {
    try {
      localStorage.setItem('forumPosts', JSON.stringify(posts));
    } catch {
      // ignore
    }
  }, [posts]);

  const handleNewPost = () => {
    if (!user) {
      toast.error("Please login to post", {
        description: "Share your cosmic journey once you're logged in.",
        action: {
          label: "Login",
          onClick: openLoginModal,
        },
      });
      openLoginModal();
      return;
    }

    setIsNewPostOpen(true);
  };

  const handleCreatePost = (data: {
    title: string;
    content: string;
    tags: string;
    zodiacSign: string;
  }) => {
    const tags = data.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newPost: ForumPostType = {
      id: crypto.randomUUID?.() ?? `${Date.now()}`,
      author: user?.name ?? 'Unknown',
      avatar: user?.avatar ?? '✨',
      zodiacSign: data.zodiacSign || 'Unknown',
      title: data.title,
      content: data.content,
      likes: 0,
      replies: 0,
      timeAgo: 'Just now',
      tags,
    };

    setPosts((prev) => [newPost, ...prev]);
    setDisplayedPosts((prev) => Math.max(prev, 4));
    setIsNewPostOpen(false);
    toast.success("Post created!", {
      description: "Your post is now visible to the community.",
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

        <Dialog open={isNewPostOpen} onOpenChange={(open) => !open && setIsNewPostOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Community Post</DialogTitle>
              <DialogDescription>
                Share your cosmic experience with a short post. Your entry will appear at the top of the forum.
              </DialogDescription>
            </DialogHeader>

            <NewPostForm onCreate={handleCreatePost} onCancel={() => setIsNewPostOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default CommunitySection;
