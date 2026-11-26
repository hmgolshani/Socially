import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { cn } from "@/lib/utils.ts";
import ColorHash from "color-hash";

interface UserAvatarProps {
  name?: string;
  username?: string;
  src?: string  | null;
  size?: keyof typeof  sizes;
  className?: string;
}

const colorHash = new ColorHash({
  lightness: 0.5,
  saturation: 0.5,
});

const sizes ={
  xs:"size-6 text-xs",
  sm:"size-8 text-sm",
  md:"size-10 text-base",
  lg:"size-12 text-lg",
  xl:"size-20 text-3xl",
}
const UserAvatar = ({name , src,username,size="md",className}:UserAvatarProps) => {
  const displayName = name?.trim() || username?.trim() || "?" ;
  const initial = displayName.charAt(0).toUpperCase() ;
  const backgroundColor = colorHash.hex(username || displayName);
  return (
    <Avatar className={cn("shrink-0",sizes[size], className)}>
      <AvatarImage src={src || undefined} alt={displayName} className="object-cover "/>
      <AvatarFallback className="font-medium text-gray-800" style={{ backgroundColor }}>

        {initial}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;