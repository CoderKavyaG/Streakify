import { MouseEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface ModifiedBtnProps extends React.ComponentProps<"button"> {
  label?: string;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: string;
}

export default function ModifiedBtn({
  label,
  className,
  children,
  onClick,
  color = "bg-green-500",
  ...props
}: ModifiedBtnProps) {
  return (
    <div className="relative inline-block">
      <div className={cn("bg-accentprimary absolute top-0 left-0 h-1 w-1")} />
      <div className={cn("bg-accentprimary absolute top-0 right-0 h-1 w-1")} />
      <div
        className={cn("bg-accentprimary absolute bottom-0 left-0 h-1 w-1")}
      />
      <div
        className={cn("bg-accentprimary absolute right-0 bottom-0 h-1 w-1")}
      />
      <Button
        className={cn(
          "text-foreground border-border relative min-w-20 rounded-none border bg-transparent hover:bg-transparent",
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {children ?? label}
      </Button>
    </div>
  );
}
