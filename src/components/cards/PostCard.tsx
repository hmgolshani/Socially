import { useState } from "react";
import {
  HeartIcon,
  MessageCircleIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar.tsx";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import DeletePostModal from "@/components/modals/DeletePostModal.tsx";
import { MIN_CONTENT_LENGTH } from "@/lib/constants.ts";
import { formatTimeAgo } from "@/lib/date.ts";
import { cn } from "@/lib/utils.ts";
import type { Comment, Post, User } from "@/types/post.ts";

type PostCardProps = {
  post: Post;
  currentUser?: User;
  onDelete?: (id: string) => void;
  onComment?: (id: string, content: string) => void;
};

const AuthorAvatar = ({ user }: { user: User }) => {
  return (
    <UserAvatar name={user.name} username={user.username} src={user.image} />
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
      <AuthorAvatar user={comment.author} />
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
  const commentLength = comment.trim().length;
  const isCommentTooShort = commentLength < MIN_CONTENT_LENGTH;

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
  };

  const handleComment = () => {
    onComment?.(post.id, comment.trim());
    setComment("");
  };

  const handleCancelComment = () => {
    setComment("");
    setShowComments(false);
  };

  const handleDelete = () => {
    onDelete?.(post.id);
    setIsDeleteOpen(false);
  };

  return (
    <div className="rounded-xl border border-layout-border bg-layout-card p-6">
      <div className="flex gap-4">
        <AuthorAvatar user={post.author} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <AuthorInfo user={post.author} createdAt={post.createdAt} />

            {isOwner && (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Delete post"
                onClick={() => setIsDeleteOpen(true)}
                className="shrink-0 text-content-secondary transition-none hover:bg-destructive/10 hover:text-destructive active:not-aria-[haspopup]:translate-y-0 dark:hover:bg-destructive/20"
              >
                <Trash2Icon />
              </Button>
            )}
          </div>

          {post.content && (
            <p className="mt-1 text-sm break-words whitespace-pre-wrap text-content-primary">
              {post.content}
            </p>
          )}

          {post.image && (
            <img
              src={post.image}
              alt={`Image posted by ${post.author.name}`}
              loading="lazy"
              className="mt-3 size-80 rounded-xl border border-layout-border object-cover"
            />
          )}
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

      <div
        inert={!showComments}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          showComments
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <Separator className="my-4 bg-layout-border" />

          <div className="flex flex-col gap-4">
            {post.comments.map((item) => (
              <CommentItem key={item.id} comment={item} />
            ))}

            {currentUser && (
              <>
                <div className="flex gap-4">
                  <AuthorAvatar user={currentUser} />
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    aria-label="Write a comment"
                    className="min-h-25 resize-none rounded-sm border-layout-border bg-transparent text-content-primary placeholder:text-content-secondary dark:bg-transparent"
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <span
                    className={cn(
                      "mr-auto text-xs text-content-secondary tabular-nums",
                      commentLength > 0 &&
                        isCommentTooShort &&
                        "text-content-red",
                    )}
                  >
                    {commentLength > 0 && isCommentTooShort
                      ? `${commentLength} characters · min ${MIN_CONTENT_LENGTH}`
                      : `${commentLength} characters`}
                  </span>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleCancelComment}
                    className="px-3 transition-none active:not-aria-[haspopup]:translate-y-0"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="lg"
                    disabled={isCommentTooShort}
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
        </div>
      </div>

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
