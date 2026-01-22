import { ForumPost as ForumPostType } from "@/data/forumData";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ForumPostProps {
  post: ForumPostType;
  index: number;
}

const ForumPost = ({ post, index }: ForumPostProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    toast.success(liked ? "Removed from likes" : "Added to likes", {
      description: liked ? "Post unliked" : `You liked ${post.author}'s post`,
    });
  };

  const handleReply = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info("Reply to this post", {
      description: "Sign up to join the conversation!",
      action: {
        label: "Coming Soon",
        onClick: () => toast.success("Feature launching soon!"),
      },
    });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(`Check out this cosmic discussion: "${post.title}"`);
      toast.success("Link copied!", {
        description: "Share this discussion with your cosmic friends.",
      });
    } catch {
      toast.success("Share this post!", {
        description: post.title,
      });
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    toast.success(saved ? "Removed from saved" : "Saved for later", {
      description: saved ? "Post removed from bookmarks" : "You can find this in your saved posts",
    });
  };

  const handlePostClick = () => {
    toast.info("View full discussion", {
      description: `"${post.title}" by ${post.author}`,
      action: {
        label: "Coming Soon",
        onClick: () => {},
      },
    });
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Browsing #${tag}`, {
      description: `Showing posts tagged with ${tag}`,
    });
  };

  return (
    <article 
      className="card-cosmic rounded-xl p-6 border border-border/50 hover:border-primary/20 transition-all duration-300 animate-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handlePostClick}
    >
      {/* Author Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl border border-border">
          {post.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-foreground">{post.author}</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground">
              {post.zodiacSign}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
        </div>
        <button 
          onClick={handleSave}
          className={`p-2 rounded-full transition-colors ${saved ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-primary' : ''}`} />
        </button>
      </div>

      {/* Post Content */}
      <h3 className="font-display text-lg text-foreground mb-2 hover:text-primary transition-colors">
        {post.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {post.content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <button 
            key={tag}
            onClick={(e) => handleTagClick(tag, e)}
            className="px-3 py-1 text-xs rounded-full bg-muted border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-border">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm transition-colors ${liked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-primary' : ''}`} />
          <span>{likeCount}</span>
        </button>
        <button 
          onClick={handleReply}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.replies} replies</span>
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </article>
  );
};

export default ForumPost;
