import type { User } from "@/types/post.ts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ProfileUser = User & {
  followers: number;
  following: number;
  location?: string;
  website?: string;
};

type SideProfileCardProps = {
  user: ProfileUser;
};

const SideProfileCard = ({ user }: SideProfileCardProps) => {
  return (
    <div className="rounded-xl border border-layout-border bg-layout-card p-6">
      <Avatar className="mx-auto size-16">
        <AvatarImage src={user.image} alt={user.name} />

        <AvatarFallback className="bg-green-800 text-3xl text-white">
          {user.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <p>{user.name}</p>
      <p>{user.username}</p>
    </div>
  );    
};

export default SideProfileCard;
