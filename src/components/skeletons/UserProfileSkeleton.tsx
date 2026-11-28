import PostSkeleton from "@/components/skeletons/PostSkeleton.tsx";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfileSkeleton = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading profile"
      className="flex flex-col gap-6"
      role="status"
    >
      <span className="sr-only">Loading profile...</span>

      <section className="w-full rounded-xl border border-layout-border bg-layout-card p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <Skeleton className="size-28 rounded-full" />
          <Skeleton className="mt-4 h-6 w-48 max-w-full" />
          <Skeleton className="mt-2 h-4 w-28" />
        </div>

        <div className="mt-6 grid grid-cols-3 justify-items-center">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Skeleton className="h-5 w-6" />
              <Skeleton className="h-3 w-16 max-w-full" />
            </div>
          ))}
        </div>

        <Skeleton className="mt-6 h-9 w-full rounded-md" />
        <Skeleton className="mt-5 h-4 w-36" />
      </section>

      <div className="flex gap-6 border-b border-layout-border px-6">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-28" />
      </div>

      <div className="flex flex-col gap-4">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
