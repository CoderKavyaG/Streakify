"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/constants/layout";
import { user as DemoUser } from "@/constants/layout";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";

import { Spinner } from "../ui/spinner";

export default function LeftSidebar() {
  const { loading, logout } = useAuthStore();
  const { user } = useUserStore();
  const pathname = usePathname();

  return (
    <SidebarContent className="mt-8 flex h-full flex-col border-none md:mt-24">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    className={cn(
                      "flex items-center gap-3 rounded-none pl-5 transition-colors",
                      isActive
                        ? "bg-muted-foreground/10 text-green-500/60"
                        : "hover:bg-muted-foreground/20",
                    )}
                  >
                    <Link href={item.href} className="py-5">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div className="flex-1" />
      <SidebarFooter className="mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="rounded-none border">
            <Button
              variant="ghost"
              className="bg-secondary/40 flex h-auto w-full items-center justify-start gap-2 rounded-sm p-2"
            >
              <Image
                src={user?.avatar_url || DemoUser.profile}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full"
              />
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-medium">
                  {user?.github_username}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="top" align="start">
            <DropdownMenuItem onClick={logout} className="text-red-500">
              {loading ? (
                <Spinner className="h-5 w-5 animate-spin" />
              ) : (
                "Logout"
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </SidebarContent>
  );
}
