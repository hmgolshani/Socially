import { useState } from "react";
import {
  HeartIcon,
  MessageCircleIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import DeletePostModal from "@/components/modals/DeletePostModal.tsx";
import { formatTimeAgo } from "@/lib/date.ts";
import { cn } from "@/lib/utils.ts";
import type { Comment, Post, User } from "@/types/post.ts";

type PostCardProps = {
  post: Post;
  currentUser?: User;
  onDelete?: (id: string) => void;
  onComment?: (id: string, content: string) => void;
};

const UserAvatar = ({ user }: { user: User }) => {
  return (
    <Avatar size="lg">
      <AvatarImage src={user.image} alt={user.name} />
      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

const AuthorInfo = ({ user, createdAt }: { user: User; createdAt: string }) => {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-2">
      <span className="truncate font-semibold text-content-primary">
        {user.name}
      </span>
      <span className="truncate text-xs text-content-secondary">
        @{user.username}
      </span>
      <span className="text-xs text-content-secondary">•</span>
      <span className="text-xs text-content-secondary">
        {formatTimeAgo(createdAt)}
      </span>
    </div>
  );
};

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex gap-4">
      <UserAvatar user={comment.author} />
      <div className="min-w-0 flex-1">
        <AuthorInfo user={comment.author} createdAt={comment.createdAt} />
        <p className="mt-1 text-sm break-words whitespace-pre-wrap text-content-primary">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

const actionClassName =
  "min-w-14 justify-start gap-2 px-2 tabular-nums transition-none active:not-aria-[haspopup]:translate-y-0";

const PostCard = ({
  post,
  currentUser,
  onDelete,
  onComment,
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const isOwner = currentUser?.username === post.author.username;

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
  };

  const handleComment = () => {
    onComment?.(post.id, comment.trim());
    setComment("");
  };

  const handleDelete = () => {
    onDelete?.(post.id);
    setIsDeleteOpen(false);
  };

  return (
    <div className="rounded-xl border border-layout-border bg-layout-card p-6">
      <div className="flex gap-4">
        <UserAvatar user={post.author} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <AuthorInfo user={post.author} createdAt={post.createdAt} />

            {isOwner && (
              <Button
                variant="destructive"
                size="icon-sm"
                aria-label="Delete post"
                onClick={() => setIsDeleteOpen(true)}
                className="transition-none active:not-aria-[haspopup]:translate-y-0"
              >
                <Trash2Icon />
              </Button>
            )}
          </div>

          <p className="mt-1 text-sm break-words whitespace-pre-wrap text-content-primary">
            {post.content}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <Button
          variant="ghost"
          aria-pressed={isLiked}
          onClick={handleLike}
          className={cn(
            actionClassName,
            isLiked && "bg-muted text-content-red hover:text-content-red",
          )}
        >
          <HeartIcon className={cn(isLiked && "fill-content-red")} />
          {likes}
        </Button>

        <Button
          variant="ghost"
          aria-expanded={showComments}
          onClick={() => setShowComments((prev) => !prev)}
          className={cn(actionClassName, "aria-expanded:text-brand-main")}
        >
          <MessageCircleIcon
            className={cn(showComments && "fill-brand-main")}
          />
          {post.comments.length}
        </Button>
      </div>

      {showComments && (
        <>
          <Separator className="my-4 bg-layout-border" />

          <div className="flex flex-col gap-4">
            {post.comments.map((item) => (
              <CommentItem key={item.id} comment={item} />
            ))}

            {currentUser && (
              <>
                <div className="flex gap-4">
                  <UserAvatar user={currentUser} />
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    aria-label="Write a comment"
                    className="min-h-25 resize-none rounded-sm border-layout-border bg-transparent text-content-primary placeholder:text-content-secondary dark:bg-transparent"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    size="lg"
                    disabled={comment.trim().length === 0}
                    onClick={handleComment}
                    className="px-3 transition-none hover:bg-button-primary-hover active:not-aria-[haspopup]:translate-y-0"
                  >
                    <SendIcon />
                    Comment
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {isOwner && (
        <DeletePostModal
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default PostCard;
