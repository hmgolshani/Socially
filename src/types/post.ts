export type User = {
  name: string;
  username: string;
  image?: string;
};

export type Comment = {
  id: string;
  author: User;
  content: string;
  createdAt: string;
};

export type Post = {
  id: string;
  author: User;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
};
