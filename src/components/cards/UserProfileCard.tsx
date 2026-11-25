import { CalendarDays, SquarePen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type ProfileActionLabel = "Edit Profile" | "Follow" | "Unfollow";

export type UserProfileCardProps = {
  displayName: string;
  username: string;
  avatarUrl?: string | null;
  followingCount: number;
  followersCount: number;
  postsCount: number;
  joinedDate: string;
  buttonText: ProfileActionLabel;
  onAction?: () => void;
};

export default function UserProfileCard({
  displayName,
  username,
  avatarUrl,
  followingCount,
  followersCount,
  postsCount,
  joinedDate,
  buttonText,
  onAction,
}: UserProfileCardProps) {
  const isEditAction = buttonText === "Edit Profile";
  const initial = displayName.trim().charAt(0).toUpperCase();

  return (
    <article className="w-full rounded-xl border border-layout-border bg-layout-card p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <Avatar className="size-32 border-2 border-layout-border">
          <AvatarImage src={avatarUrl ?? undefined} alt={displayName} />
          <AvatarFallback className="bg-brand-main text-6xl text-content-opposite">
            {initial || "?"}
          </AvatarFallback>
        </Avatar>

        <h1 className="mt-4 text-xl font-semibold text-content-primary">
          {displayName}
        </h1>
        <p className="mt-1 text-sm text-content-secondary">
          @{username.replace(/^@/, "")}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 text-center">
        <div>
          <p className="text-base font-semibold text-content-primary">
            {followingCount}
          </p>
          <p className="text-xs text-content-secondary">Following</p>
        </div>
        <div>
          <p className="text-base font-semibold text-content-primary">
            {followersCount}
          </p>
          <p className="text-xs text-content-secondary">Followers</p>
        </div>
        <div>
          <p className="text-base font-semibold text-content-primary">
            {postsCount}
          </p>
          <p className="text-xs text-content-secondary">Posts</p>
        </div>
      </div>

      <Button
        className="mt-6 h-9 w-full rounded-md"
        size="lg"
        type="button"
        onClick={onAction}
      >
        {isEditAction && <SquarePen aria-hidden="true" className="size-4" />}
        {buttonText}
      </Button>

      <p className="mt-5 flex items-center gap-2 text-xs text-content-secondary">
        <CalendarDays aria-hidden="true" className="size-4" />
        <span>Joined {joinedDate}</span>
      </p>
    </article>
  );
}
