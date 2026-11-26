import { Skeleton } from "@/components/ui/skeleton.tsx";

const UserCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <Skeleton className="size-10 shrink-0 rounded-full" />

        <div className="flex min-w-0 flex-col gap-1">
          <Skeleton className="h-3 w-28"/>
          <Skeleton className="h-3 w-16"/>
        </div>
      </div>
      <Skeleton className="h-9 w-16 shrink-0 rounded-lg"/>
    </div>
  );
};

export default UserCardSkeleton;
