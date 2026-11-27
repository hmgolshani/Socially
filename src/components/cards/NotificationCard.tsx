import {
  HeartIcon,
  type LucideIcon,
  MessageCircleIcon,
  UserPlusIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTimeAgo } from "@/lib/date.ts";
import { cn } from "@/lib/utils.ts";
import type { Notification, NotificationType } from "@/types/notification.ts";

type NotificationCardProps = {
  notification: Notification;
};

const notificationConfig: Record<
  NotificationType,
  {
    icon: LucideIcon;
    iconClassName: string;
    actionText: string;
  }
> = {
  like: {
    icon: HeartIcon,
    iconClassName: "text-content-red",
    actionText: "liked your post",
  },
  comment: {
    icon: MessageCircleIcon,
    iconClassName: "text-brand-main",
    actionText: "commented on your post",
  },
  follow: {
    icon: UserPlusIcon,
    iconClassName: "text-emerald-500",
    actionText: "started following you",
  },
};

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const {
    icon: Icon,
    iconClassName,
    actionText,
  } = notificationConfig[notification.type];

  return (
    <div
      className={cn(
        "flex items-start gap-3 border-b border-layout-border px-4 py-4 transition-colors hover:bg-muted/50 sm:px-6",
        !notification.isRead && "bg-muted/40",
      )}
    >
      <Avatar size="lg">
        <AvatarImage
          src={notification.sender.image}
          alt={notification.sender.name}
        />
        <AvatarFallback>
          {notification.sender.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 text-sm">
            <Icon className={cn("mt-0.5 size-4 shrink-0", iconClassName)} />

            <p className="text-content-primary">
              <span className="font-semibold">{notification.sender.name}</span>{" "}
              {actionText}
            </p>
          </div>

          {!notification.isRead && (
            <span
              aria-label="Unread notification"
              className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-main"
            />
          )}
        </div>

        <div className="space-y-2 sm:pl-6">
          {notification.postContent && (
            <div className="rounded-md bg-muted/50 px-3 py-2 text-xs text-content-secondary sm:text-sm">
              <p className="line-clamp-2 break-words">
                {notification.postContent}
              </p>
            </div>
          )}

          {notification.type === "comment" && notification.commentContent && (
            <div className="rounded-md bg-button-tertiary-normal px-3 py-2 text-xs text-content-primary sm:text-sm">
              <p className="line-clamp-3 break-words">
                {notification.commentContent}
              </p>
            </div>
          )}

          <p className="text-xs text-content-secondary">
            {formatTimeAgo(notification.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
