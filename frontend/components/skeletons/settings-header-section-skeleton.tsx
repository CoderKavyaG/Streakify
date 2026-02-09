import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsHeaderSectionSkeleton() {
  return (
    <div className="bg-background rounded-lg p-4 md:p-8">
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="mb-2 h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Skeleton className="h-10 w-24 rounded" />
      </div>
    </div>
  );
}
