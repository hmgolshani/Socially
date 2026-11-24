import type { User } from "@/types/post.ts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPinIcon, LinkIcon } from "lucide-react";

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

      <div className="mt-3 flex flex-col items-center gap-1 text-center">
        <p className="text-sm font-semibold text-content-primary">
          {user.name}
        </p>

        <p className="text-xs text-content-secondary">{user.username}</p>
      </div>
      <Separator className="my-4 bg-layout-border" />

      <div className="grid grid-cols-2 text-center">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-content-primary">
            {user.following}
          </span>

          <span className="text-xs text-content-secondary">Following</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-content-primary">
            {user.followers}
          </span>

          <span className="text-xs text-content-secondary">Followers</span>
        </div>
      </div>

      <Separator className="my-4 bg-layout-border" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-content-secondary">
          <MapPinIcon className="size-4 shrink-0" />
          <span className="truncate">{user.location || "No location"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-content-secondary">
          <LinkIcon className="size-4 shrink-0" />
          <span className="truncate">{user.website || "No website"}</span>
        </div>
      </div>
    </div>
  );
};

export default SideProfileCard;
