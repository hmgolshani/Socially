import { BellOffIcon } from "lucide-react";
import NotificationCard from "@/components/cards/NotificationCard.tsx";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Notification } from "@/types/notification.ts";

// Delete later
const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60 * 1000).toISOString();

const notifications: Notification[] = [
  {
    id: "1",
    type: "comment",
    sender: {
      name: "Ali Mousavi",
      username: "ali.mousavi",
    },
    postContent: "test post",
    commentContent: "tests",
    isRead: false,
    createdAt: minutesAgo(3),
  },
  {
    id: "2",
    type: "like",
    sender: {
      name: "Ali Mousavi",
      username: "ali.mousavi",
    },
    postContent: "test post",
    isRead: false,
    createdAt: minutesAgo(3),
  },
  {
    id: "3",
    type: "comment",
    sender: {
      name: "Ali Mousavi",
      username: "ali.mousavi",
    },
    postContent: "test post",
    commentContent: "tests",
    isRead: true,
    createdAt: minutesAgo(3),
  },
  {
    id: "4",
    type: "like",
    sender: {
      name: "Ali Mousavi",
      username: "ali.mousavi",
    },
    postContent: "test post",
    isRead: true,
    createdAt: minutesAgo(3),
  },
];

const NotificationPage = () => {
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-xl border border-layout-border bg-layout-card shadow-sm">
      <div className="flex items-center justify-between border-b border-layout-border px-4 py-4 sm:px-6">
        <h1 className="text-base font-semibold text-content-primary">
          Notifications
        </h1>
        <span className="text-xs text-content-secondary">
          {unreadCount} unread
        </span>
      </div>

      {notifications.length === 0 ? (
        <Empty className="py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BellOffIcon />
            </EmptyMedia>
            <EmptyTitle>No notifications yet</EmptyTitle>
            <EmptyDescription>
              When someone likes or comments on your posts, you'll see them
              here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default NotificationPage;
