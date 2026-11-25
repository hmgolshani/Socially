import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";

export type RecommendedUser = {
  username: string;
  name?: string;
  image?: string;
  followers: number;
};

type UserCardProps = {
  user: RecommendedUser;
};

const UserCard = ({ user }: UserCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <Avatar className="size-10">
          <AvatarImage src={user.image} alt={user.username} />
          <AvatarFallback className="bg-brand-main text-xl text-content-opposite">
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          {user.name && (
            <span className="text-xs text-content-primary">{user.name}</span>
          )}

          <span className="text-xs text-content-secondary">{`@${user.username}`}</span>
          <span className="text-xs text-content-secondary">
            {`${user.followers} followers`}
          </span>
        </div>
      </div>
      <Button
        variant="secondary"
        onClick={() => setIsFollowing((prev) => !prev)}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
};

export default UserCard;