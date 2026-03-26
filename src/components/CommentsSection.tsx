import { useState } from "react";
import { Heart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Comment } from "@/data/forumData";
import { useAuth } from "@/hooks/AuthContext";
import { toast } from "sonner";

interface CommentsSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, comment: Comment) => void;
}

const zodiacAvatars = ["🌙", "🔥", "🌿", "💨", "💧", "🪨", "⭐", "🌟", "💫", "🦂", "🦁", "♒"];

const CommentsSection = ({ postId, comments, onAddComment }: CommentsSectionProps) => {
  const { user, openLoginModal } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleAddComment = () => {
    if (!user) {
      toast.error("Please login to comment", {
        description: "Join the conversation by logging in!",
        action: {
          label: "Login",
          onClick: () => openLoginModal(),
        },
      });
      return;
    }

    if (!commentText.trim()) {
      toast.error("Comment cannot be empty", {
        description: "Share your cosmic thoughts!",
      });
      return;
    }

    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      author: user.name,
      avatar: user.avatar,
      zodiacSign: "Cosmic Traveler",
      content: commentText,
      timestamp: "just now",
      likes: 0,
    };

    onAddComment(postId, newComment);
    setCommentText("");
    toast.success("Comment posted!", {
      description: "Your cosmic insight has been shared with the community.",
    });
  };

  const toggleLike = (commentId: string) => {
    if (!user) {
      toast.error("Please login to like comments", {
        description: "Join the community to show your appreciation!",
        action: {
          label: "Login",
          onClick: () => openLoginModal(),
        },
      });
      return;
    }

    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  return (
    <div className="mt-6 pt-6 border-t border-border space-y-4">
      {/* Add Comment Section */}
      {user && (
        <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-medium">
              {user.avatar}
            </div>
            <span className="text-sm font-medium text-foreground">{user.name}</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Share your cosmic perspective..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  handleAddComment();
                }
              }}
              className="text-sm"
            />
            <Button
              size="sm"
              onClick={handleAddComment}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Post</span>
            </Button>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-3">
        {comments && comments.length > 0 ? (
          <>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </p>
            {comments.map((comment) => (
              <div key={comment.id} className="p-3 rounded-lg bg-muted/20 border border-border/30 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-foreground">{comment.author}</span>
                      <span className="px-1.5 py-0.5 text-xs rounded bg-secondary/50 text-secondary-foreground">
                        {comment.zodiacSign}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 break-words">
                      {comment.content}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-10">
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      likedComments.has(comment.id)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Heart
                      className={`w-3 h-3 ${
                        likedComments.has(comment.id) ? "fill-primary" : ""
                      }`}
                    />
                    <span>{comment.likes}</span>
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {comment.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-sm text-muted-foreground italic text-center py-4">
            No comments yet. Be the first to share your cosmic perspective!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
