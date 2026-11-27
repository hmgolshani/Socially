import { useState } from "react";
import { BellOffIcon } from "lucide-react";
import NotificationCard from "@/components/cards/NotificationCard.tsx";
import NotificationSkeleton from "@/components/skeletons/NotificationSkeleton.tsx";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { hoursAgo } from "@/lib/date.ts";
import type { Notification } from "@/types/notification.ts";

// Delete later
const initialNotifications: Notification[] = [
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
    createdAt: hoursAgo(1),
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
    createdAt: hoursAgo(3),
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
    createdAt: hoursAgo(5),
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
    createdAt: hoursAgo(13),
  },
  {
    id: "5",
    type: "follow",
    sender: {
      name: "Ali Mousavi",
      username: "ali.mousavi",
    },
    isRead: false,
    createdAt: hoursAgo(2),
  },
];

const NotificationPage = () => {
  // Delete later
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const isLoading: boolean = false;
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-xl border border-layout-border bg-layout-card shadow-sm">
      <div className="flex items-center justify-between border-b border-layout-border px-4 py-4 sm:px-6">
        <h1 className="text-base font-semibold text-content-primary">
          Notifications
        </h1>
        {!isLoading && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-content-secondary">
              {unreadCount} unread
            </span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="cursor-pointer rounded-full border border-layout-border px-3 py-1 text-xs font-medium text-content-primary transition-colors hover:bg-muted/50"
              >
                Mark as read
              </button>
            )}
          </div>
        )}
      </div>

      {isLoading ? (
        <NotificationSkeleton />
      ) : notifications.length === 0 ? (
        <Empty className="py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BellOffIcon />
            </EmptyMedia>
            <EmptyTitle>No notifications yet</EmptyTitle>
            <EmptyDescription>
              When someone follows you, likes, or comments on your posts, you'll
              see them here.
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
