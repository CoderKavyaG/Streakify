import { Skeleton } from "@/components/ui/skeleton";

export default function HeaderSectionSkeleton() {
  return (
    <div className="border-border bg-background gap-0 rounded border px-0 py-0">
      <div className="flex flex-row flex-wrap items-center justify-between gap-4 px-4 py-6">
        <div className="flex min-w-0 items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full md:h-12 md:w-12" />
          <div>
            <Skeleton className="mb-2 h-5 w-24 md:h-6 md:w-32" />
            <Skeleton className="h-3 w-32 md:h-4 md:w-48" />
          </div>
        </div>
        <Skeleton className="h-8 w-24 md:h-10 md:w-28" />
      </div>
      <div className="border-border border-t" />
      <div className="grid grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-2 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-2 text-center">
            <Skeleton className="mx-auto h-3 w-16 md:h-4 md:w-24" />
            <Skeleton className="mx-auto h-5 w-12 md:h-6 md:w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
