import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/AuthContext";

const avatarOptions = ["🌙", "🔥", "🌿", "💫", "🦂", "✨", "🌟", "☀️"];

const LoginDialog = () => {
  const { isLoginOpen, closeLoginModal, login } = useAuth();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(avatarOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name, avatar);
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={(open) => (open ? undefined : closeLoginModal())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login to the Community</DialogTitle>
          <DialogDescription>
            Choose a display name and avatar to join the conversation. Your session will be saved locally.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Display name</label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. MoonChild_92"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Choose an avatar</label>
            <div className="flex flex-wrap gap-2">
              {avatarOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAvatar(option)}
                  className={`h-10 w-10 rounded-full border text-lg transition-colors ${
                    avatar === option
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={closeLoginModal}>
              Cancel
            </Button>
            <Button type="submit">Join</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
