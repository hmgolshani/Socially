import { useState } from "react";
import { SendIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type AddPostCardProps = {
  name: string;
  image?: string;
  onSubmit?: (content: string) => void;
};

const AddPostCard = ({ name, image, onSubmit }: AddPostCardProps) => {
  const [content, setContent] = useState("");

  const isEmpty = content.trim().length === 0;

  const handleSubmit = () => {
    onSubmit?.(content.trim());
    setContent("");
  };

  return (
    <div className="rounded-xl border border-layout-border bg-layout-card p-6">
      <div className="flex gap-4">
        <Avatar size="lg">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          aria-label="Write a post"
          className="min-h-25 resize-none rounded-none border-0 bg-transparent p-0 pt-1 text-content-primary shadow-none placeholder:text-content-secondary focus-visible:ring-0 dark:bg-transparent"
        />
      </div>

      <Separator className="my-4 bg-layout-border" />

      <div className="flex justify-end">
        <Button
          size="lg"
          disabled={isEmpty}
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
