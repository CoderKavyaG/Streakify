import { Skeleton } from "@/components/ui/skeleton";

export default function ContributionSectionSkeleton() {
  return (
    <div className="border-border bg-background rounded border p-4">
      <Skeleton className="mx-auto mb-4 h-6 w-48" />
      <div className="w-full overflow-x-scroll">
        <div className="flex min-w-[340px] gap-1 md:min-w-0">
          {[...Array(30)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded" />
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 pl-5 text-xs font-semibold">
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
