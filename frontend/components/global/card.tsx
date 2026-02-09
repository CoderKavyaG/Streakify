import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ModifiedCardProps {
  className?: string;
  children: ReactNode;
}

export default function ModifiedCard({
  className,
  children,
}: ModifiedCardProps) {
  return (
    <div
      className={cn(
        "border-border bg-background relative border shadow-sm",
        className,
      )}
      style={{ borderRadius: 0 }}
    >
      <div className="absolute top-0 left-0 h-2 w-2 bg-green-500" />
      <div className="absolute top-0 right-0 h-2 w-2 bg-green-500" />
      <div className="absolute bottom-0 left-0 h-2 w-2 bg-green-500" />
      <div className="absolute right-0 bottom-0 h-2 w-2 bg-green-500" />
      {children}
    </div>
  );
}
