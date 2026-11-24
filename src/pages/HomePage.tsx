import { useState } from "react";
import AddPostCard from "@/components/cards/AddPostCard.tsx";
import PostCard from "@/components/cards/PostCard.tsx";
import type { Post, User } from "@/types/post.ts";
import farshadImage from "@/assets/images/farshad.png";
import samRadioImage from "@/assets/images/sam-radio.png";
import defaultAvatar from "@/assets/images/default-avatar.png";
import userAvatar from "@/assets/images/user-avatar.png";

const currentUser: User = {
  name: "Ali Mousavi",
  username: "a.mousavi",
  image: userAvatar,
};

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

const fakePosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Farshad Hosseini",
      username: "f.e.h.farshad",
      image: farshadImage,
    },
    content: "image",
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
    content: "image",
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

  const handleAddPost = (content: string) => {
    const newPost: Post = {
      id: crypto.randomUUID(),
      author: currentUser,
      content,
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
        image={currentUser.image}
        onSubmit={handleAddPost}
      />

      {posts.map((post) => (
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
