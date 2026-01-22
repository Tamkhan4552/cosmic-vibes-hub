import { ForumPost as ForumPostType } from "@/data/forumData";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

interface ForumPostProps {
  post: ForumPostType;
  index: number;
}

const ForumPost = ({ post, index }: ForumPostProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <article 
      className="card-cosmic rounded-xl p-6 border border-border/50 hover:border-primary/20 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
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
      </div>

      {/* Post Content */}
      <h3 className="font-display text-lg text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
        {post.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {post.content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span 
            key={tag}
            className="px-3 py-1 text-xs rounded-full bg-muted border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
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
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span>{post.replies} replies</span>
        </button>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto">
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </article>
  );
};

export default ForumPost;
