import { forumPosts } from "@/data/forumData";
import ForumPost from "./ForumPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquarePlus, Search, TrendingUp, Clock, Sparkles } from "lucide-react";
import { useState } from "react";

const CommunitySection = () => {
  const [activeFilter, setActiveFilter] = useState<'trending' | 'recent'>('trending');

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

        {/* Forum Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={activeFilter === 'trending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('trending')}
              className={activeFilter === 'trending' ? 'bg-primary text-primary-foreground' : ''}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
            <Button
              variant={activeFilter === 'recent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('recent')}
              className={activeFilter === 'recent' ? 'bg-primary text-primary-foreground' : ''}
            >
              <Clock className="w-4 h-4 mr-2" />
              Recent
            </Button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search discussions..." 
                className="pl-10 bg-muted border-border focus:border-primary"
              />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold whitespace-nowrap">
              <MessageSquarePlus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {forumPosts.map((post, index) => (
            <ForumPost key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" className="border-border hover:bg-muted">
            Load More Discussions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
