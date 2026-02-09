import LeftSidebar from "@/components/layout/left-sidebar";
import Topbar from "@/components/layout/topbar";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";

const TOPBAR_HEIGHT = 64;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div
        className="fixed top-0 left-0 z-50 w-full"
        style={{ height: TOPBAR_HEIGHT }}
      >
        <Topbar />
      </div>

      <div
        className="flex min-h-screen w-full pt-16"
        style={{ paddingTop: TOPBAR_HEIGHT }}
      >
        <Sidebar className="">
          <SidebarContent>
            <LeftSidebar />
          </SidebarContent>
        </Sidebar>
        <main className="bg-background flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
