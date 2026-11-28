import { useRef, useState } from "react";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar.tsx";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MIN_CONTENT_LENGTH } from "@/lib/constants.ts";
import { cn } from "@/lib/utils.ts";

type AddPostCardProps = {
  name: string;
  username?: string;
  image?: string;
  onSubmit?: (content: string, image?: string) => void;
};

const AddPostCard = ({ name, username, image, onSubmit }: AddPostCardProps) => {
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const length = content.trim().length;
  const isTooShort = length < MIN_CONTENT_LENGTH;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (postImage) URL.revokeObjectURL(postImage);
    setPostImage(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleRemoveImage = () => {
    if (postImage) URL.revokeObjectURL(postImage);
    setPostImage(undefined);
  };

  const handleSubmit = () => {
    onSubmit?.(content.trim(), postImage);
    setContent("");
    setPostImage(undefined);
  };

  return (
    <div className="rounded-xl border border-layout-border bg-layout-card p-6">
      <div className="flex gap-4">
        <UserAvatar name={name} username={username} src={image} />

        <div className="min-w-0 flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            aria-label="Write a post"
            className="min-h-25 resize-none rounded-none border-0 bg-transparent p-0 pt-1 text-content-primary shadow-none placeholder:text-content-secondary focus-visible:ring-0 dark:bg-transparent"
          />

          {postImage && (
            <div className="relative mt-3 w-fit">
              <img
                src={postImage}
                alt="Selected image"
                className="max-h-80 rounded-xl border border-layout-border object-cover"
              />
              <Button
                variant="secondary"
                size="icon-sm"
                aria-label="Remove image"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 rounded-full"
              >
                <XIcon />
              </Button>
            </div>
          )}
        </div>
      </div>

      <Separator className="my-4 bg-layout-border" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Add image"
            onClick={() => fileInputRef.current?.click()}
            className="text-content-secondary hover:text-content-primary"
          >
            <ImageIcon />
          </Button>

          <span
            className={cn(
              "text-xs text-content-secondary tabular-nums",
              length > 0 && isTooShort && "text-content-red",
            )}
          >
            {length > 0 && isTooShort
              ? `${length} characters · min ${MIN_CONTENT_LENGTH}`
              : `${length} characters`}
          </span>
        </div>

        <Button
          size="lg"
          disabled={isTooShort}
          onClick={handleSubmit}
          className="px-3 transition-none hover:bg-button-primary-hover active:not-aria-[haspopup]:translate-y-0"
        >
          <SendIcon />
          Post
        </Button>
      </div>
    </div>
  );
};

export default AddPostCard;
