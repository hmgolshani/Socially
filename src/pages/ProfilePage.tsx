import { useState } from "react";
import UserProfileCard from "@/components/cards/UserProfileCard";
import UserProfileTabs from "@/components/cards/UserProfileTabs";
import EditProfileModal from "@/components/modals/EditProfileModal";
import PostCard from "@/components/cards/PostCard";
import type { Post, User } from "@/types/post";

//fake data for test - delete after api
const currentUser: User = {
  name: "Seyed Ali Mousavi",
  username: "samb.1376",
};

const ProfilePage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser.name,
    bio: "",
    location: "",
    website: "",
  });

  //fake data for test - delete after api
  const posts: Post[] = [
    {
      id: "1",
      author: currentUser,
      content: "image",
      createdAt: "2026-11-16T10:00:00Z",
      likes: 1,
      isLiked: false,
      comments: [],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <UserProfileCard
        displayName={profile.name}
        username={currentUser.username}
        followingCount={0}
        followersCount={0}
        postsCount={posts.length}
        joinedDate="November 2025"
        buttonText="Edit Profile"
        onAction={() => setIsEditOpen(true)}
      />

      <UserProfileTabs
        postsContent={posts.map((post) => (
          <PostCard key={post.id} post={post} currentUser={currentUser} />
        ))}
        likesContent={
          <p className="text-center text-sm text-content-secondary">
            No liked posts yet
          </p>
        }
      />

      <EditProfileModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        initialValues={profile}
        onSave={setProfile}
      />
    </div>
  );
};

export default ProfilePage;