import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-border mx-auto max-w-7xl border-x", className)}>
      {children}
    </div>
  );
}
