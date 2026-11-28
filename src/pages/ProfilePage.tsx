import { useState } from "react";
import { FileText, Heart, House, Plus } from "lucide-react";
import { Link, useParams } from "react-router";

import PostCard from "@/components/cards/PostCard.tsx";
import UserProfileCard from "@/components/cards/UserProfileCard";
import UserProfileTabs from "@/components/cards/UserProfileTabs";
import EditProfileModal from "@/components/modals/EditProfileModal";
import UserProfileSkeleton from "@/components/skeletons/UserProfileSkeleton.tsx";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Post, User } from "@/types/post";

const currentUser: User = {
  name: "Seyed Ali Mousavi",
  username: "samb.1376",
};

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

const likedPosts: Post[] = [];

const emptyStateClassName =
  "min-h-56 rounded-xl border border-layout-border bg-layout-card p-8";

function PostsEmptyState({
  isOwnProfile,
  username,
}: {
  isOwnProfile: boolean;
  username: string;
}) {
  return (
    <Empty className={emptyStateClassName}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileText aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No posts yet</EmptyTitle>
        <EmptyDescription>
          {isOwnProfile
            ? "Share your first post with your community."
            : `@${username} hasn't shared any posts yet.`}
        </EmptyDescription>
      </EmptyHeader>
      {isOwnProfile && (
        <EmptyContent>
          <Button nativeButton={false} render={<Link to="/" />}>
            <Plus aria-hidden="true" />
            Create a post
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}

function LikesEmptyState() {
  return (
    <Empty className={emptyStateClassName}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Heart aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No liked posts yet</EmptyTitle>
        <EmptyDescription>
          Posts you like will show up here. Find something interesting on Home.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button nativeButton={false} render={<Link to="/" />}>
          <House aria-hidden="true" />
          Explore posts
        </Button>
      </EmptyContent>
    </Empty>
  );
}

const ProfilePage = () => {
  const { username: routeUsername } = useParams();
  const profileUsername = (routeUsername ?? currentUser.username).replace(
    /^@/,
    "",
  );
  const isOwnProfile =
    profileUsername.toLowerCase() === currentUser.username.toLowerCase();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser.name,
    bio: "",
    location: "",
    website: "",
  });

  // Connect this state to the profile query when API data replaces these mock values.
  const isLoading = false;
  const profilePosts = posts.filter(
    (post) =>
      post.author.username.toLowerCase() === profileUsername.toLowerCase(),
  );

  if (isLoading) return <UserProfileSkeleton />;

  const displayName = isOwnProfile ? profile.name : profileUsername;
  const profileUser: User = {
    name: displayName,
    username: profileUsername,
    ...(isOwnProfile && currentUser.image ? { image: currentUser.image } : {}),
  };

  return (
    <div className="flex flex-col gap-6">
      <UserProfileCard
        displayName={profileUser.name}
        username={profileUser.username}
        avatarUrl={profileUser.image}
        followingCount={0}
        followersCount={0}
        postsCount={profilePosts.length}
        joinedDate="November 2025"
        buttonText={isOwnProfile ? "Edit Profile" : "Follow"}
        onAction={isOwnProfile ? () => setIsEditOpen(true) : undefined}
      />

      <UserProfileTabs
        postsContent={
          profilePosts.length > 0 ? (
            profilePosts.map((post) => (
              <PostCard key={post.id} post={post} currentUser={currentUser} />
            ))
          ) : (
            <PostsEmptyState
              isOwnProfile={isOwnProfile}
              username={profileUsername}
            />
          )
        }
        likesContent={
          likedPosts.length > 0 ? (
            likedPosts.map((post) => (
              <PostCard key={post.id} post={post} currentUser={currentUser} />
            ))
          ) : (
            <LikesEmptyState />
          )
        }
      />

      {isOwnProfile && (
        <EditProfileModal
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          initialValues={profile}
          onSave={setProfile}
        />
      )}
    </div>
  );
};

export default ProfilePage;
