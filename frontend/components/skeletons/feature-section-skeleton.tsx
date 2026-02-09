import { Skeleton } from "@/components/ui/skeleton";

export default function FeatureSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="border-border bg-background flex flex-col gap-4 rounded border p-4"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-4 w-48" />
        </div>
      ))}
    </div>
  );
}
