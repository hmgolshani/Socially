import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty.tsx";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";



const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Empty>
        <EmptyHeader className="max-w-lg">
          <EmptyMedia variant="icon" className="size-24">
            <FileQuestion className="size-12" />
          </EmptyMedia>
          <EmptyTitle className="text-3xl font-bold md:text-5xl">
            404 - Page Not Found
          </EmptyTitle>
          <EmptyDescription className="text-base">
            The page you're looking for doesn't exist.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <Button size="lg" nativeButton={false} render={<Link to="/"/>}>
            Back to Home
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default NotFoundPage;