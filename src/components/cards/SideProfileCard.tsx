import type { User } from "@/types/post.ts";

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
    <div>
      <p>{user.name}</p>
      <p>{user.username}</p>
    </div>
  );
};

export default SideProfileCard;