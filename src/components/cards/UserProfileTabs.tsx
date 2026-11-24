import type { ReactNode } from "react";
import { FileText, Heart } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type UserProfileTabsProps = {
  postsContent?: ReactNode;
  likesContent?: ReactNode;
};

export default function UserProfileTabs({
  postsContent,
  likesContent,
}: UserProfileTabsProps) {
  return (
    <Tabs defaultValue="posts" className="w-full gap-4">
      <TabsList
        variant="line"
        className="h-8 w-full justify-start gap-0 rounded-none border-b border-layout-border bg-transparent p-0"
      >
        <TabsTrigger
          value="posts"
          className="h-full min-w-28 flex-none gap-2 rounded-none px-6 py-1 text-content-secondary after:bottom-0 after:bg-content-primary data-active:text-content-primary"
        >
          <FileText aria-hidden="true" className="size-4" />
          Posts
        </TabsTrigger>
        <TabsTrigger
          value="likes"
          className="h-full min-w-28 flex-none gap-2 rounded-none px-6 py-1 text-content-secondary after:bottom-0 after:bg-content-primary data-active:text-content-primary"
        >
          <Heart aria-hidden="true" className="size-4" />
          Likes
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="flex flex-col gap-4">
        {postsContent}
      </TabsContent>
      <TabsContent value="likes" className="flex flex-col gap-4">
        {likesContent}
      </TabsContent>
    </Tabs>
  );
}
