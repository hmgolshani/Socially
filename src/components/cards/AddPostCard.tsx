import { useState } from "react";
import { SendIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type AddPostCardProps = {
  name: string;
  image?: string;
};

const AddPostCard = ({ name, image }: AddPostCardProps) => {
  const [content, setContent] = useState("");

  const isEmpty = content.trim().length === 0;

  return (
    <div className="rounded-xl border border-layout-border bg-layout-card p-4">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="min-h-20 resize-none rounded-none border-0 bg-transparent p-0 pt-1 text-content-primary shadow-none placeholder:text-content-secondary focus-visible:ring-0 dark:bg-transparent"
        />
      </div>

      <Separator className="my-3 bg-layout-border" />

      <div className="flex justify-end">
        <Button
          size="lg"
          disabled={isEmpty}
          className="bg-button-primary-normal px-3 text-content-opposite transition-none hover:bg-button-primary-hover active:not-aria-[haspopup]:translate-y-0 disabled:bg-button-primary-disable disabled:opacity-100"
        >
          <SendIcon />
          Post
        </Button>
      </div>
    </div>
  );
};

export default AddPostCard;
