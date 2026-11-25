import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
type UserCardProp = {
  fullName: string;
  username: string;
  followersCount:number;

};
const UserCard = ({ fullName, username, followersCount }: UserCardProp) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-color-layout-header flex items-center gap-2">
        <Avatar className="size-10">

          <AvatarFallback className="bg-brand-main text-xl text-content-opposite">
            {fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xs text-content-primary">{fullName}</span>
          <span className="text-xs text-content-secondary">{username}</span>
          <span className="text-xs text-content-secondary">
            {`${followersCount} followers`}
          </span>
        </div>
      </div>
      <Button variant="secondary">Follow</Button>
    </div>
  );
};

export default UserCard;