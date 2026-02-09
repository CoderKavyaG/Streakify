import Footer from "@/components/navigations/footer";
import Navbar from "@/components/navigations/nav";
import { Separator } from "@/components/ui/separator";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Separator className="bg-border dark:bg-border h-px" />
      {children}
      <Footer />
    </>
  );
}
