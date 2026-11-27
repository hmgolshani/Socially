import type { User } from "@/types/post.ts";

export type NotificationType = "like" | "comment" | "follow";

export type Notification = {
  id: string;
  type: NotificationType;
  sender: User;
  postContent?: string;
  commentContent?: string;
  isRead: boolean;
  createdAt: string;
};