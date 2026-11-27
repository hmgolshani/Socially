import { Skeleton } from "@/components/ui/skeleton";

const NotificationSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex items-start gap-3 border-b border-layout-border px-4 py-4 sm:px-6"
        >
          <Skeleton className="size-10 shrink-0 rounded-full" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-44 max-w-[65vw] sm:w-52" />
              </div>
              <Skeleton className="mt-1.5 size-2 shrink-0 rounded-full" />
            </div>

            <div className="space-y-2 sm:pl-6">
              <Skeleton className="h-9 w-full rounded-md" />
              {index % 2 === 0 && (
                <Skeleton className="h-9 w-full rounded-md" />
              )}
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;