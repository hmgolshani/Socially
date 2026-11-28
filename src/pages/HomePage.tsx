import { useState } from "react";
import AddPostCard from "@/components/cards/AddPostCard.tsx";
import PostCard from "@/components/cards/PostCard.tsx";
import PostSkeleton from "@/components/skeletons/PostSkeleton.tsx";
import type { Post, User } from "@/types/post.ts";
import { hoursAgo } from "@/lib/date.ts";
import farshadImage from "@/assets/images/farshad.png";
import samRadioImage from "@/assets/images/sam-radio.png";
import defaultAvatar from "@/assets/images/default-avatar.png";
import userAvatar from "@/assets/images/user-avatar.png";

const currentUser: User = {
  name: "Ali Mousavi",
  username: "a.mousavi",
  image: userAvatar,
};

const fakePosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Farshad Hosseini",
      username: "f.e.h.farshad",
      image: farshadImage,
    },
    content: "First day of autumn 🍂",
    image: "https://picsum.photos/id/1043/800/600",
    createdAt: hoursAgo(24 * 8),
    likes: 1,
    isLiked: false,
    comments: [
      {
        id: "1",
        author: {
          name: "mohammadfallah.w",
          username: "mohammadfallah.w",
          image: defaultAvatar,
        },
        content: "Thanks",
        createdAt: hoursAgo(6),
      },
    ],
  },
  {
    id: "2",
    author: currentUser,
    content: "",
    image: "https://picsum.photos/id/1018/800/600",
    createdAt: hoursAgo(24 * 8),
    likes: 2,
    isLiked: true,
    comments: [],
  },
  {
    id: "3",
    author: {
      name: "Ali Mouasvi",
      username: "A.mousavi",
      image: samRadioImage,
    },
    content: "This is also me with another account😂👋",
    createdAt: hoursAgo(24 * 60),
    likes: 1,
    isLiked: false,
    comments: [],
  },
];

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>(fakePosts);
  const isLoading: boolean = false;

  const handleAddPost = (content: string, image?: string) => {
    const newPost: Post = {
      id: crypto.randomUUID(),
      author: currentUser,
      content,
      image,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const handleAddComment = (postId: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: crypto.randomUUID(),
                  author: currentUser,
                  content,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post,
      ),
    );
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <div className="flex flex-col gap-6">
      <AddPostCard
        name={currentUser.name}
        username={currentUser.username}
        image={currentUser.image}
        onSubmit={handleAddPost}
      />

      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
        : posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onComment={handleAddComment}
              onDelete={handleDeletePost}
            />
          ))}
    </div>
  );
};

export default HomePage;
