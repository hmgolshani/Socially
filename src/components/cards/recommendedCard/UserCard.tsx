import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
type UserCardProp = {
  fullName: string;
  username: string;
  followersCount:number;

};
const UserCard = ({ fullName, username, followersCount }: UserCardProp) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <Avatar className="size-10">
          <AvatarFallback className="bg-brand-main text-xl text-content-opposite">
            {fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <span className="text-xs text-content-primary">{fullName}</span>
          <span className="text-xs text-content-secondary">{`@${username}`}</span>
          <span className="text-xs text-content-secondary">
            {`${followersCount} followers`}
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