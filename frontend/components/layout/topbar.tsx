import { IconBrandTwitter } from "@tabler/icons-react";

import { topbarConfig } from "@/constants/layout";
import { navbarConfig } from "@/constants/nav";

import ModifiedBtn from "../global/btn";
import ModeToggleButton from "../theme/mode-toggle-btn";
import { SidebarTrigger } from "../ui/sidebar";

export default function Topbar() {
  return (
    <>
      {/* Desktop Topbar */}
      <div className="border-border bg-background hidden h-16 w-full items-center justify-between border-b px-6 md:flex">
        <div className="font-display flex items-center gap-2 px-7 py-6 text-xl font-semibold">
          {/* <Image src="/logo.svg" alt="Logo" width={32} height={32} /> */}
          <span>{navbarConfig.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6">
            {/* {topbarConfig.socialLinks.map((social) => (
              <a
                key={social.label}
                href={
                  social.label === "Github"
                    ? "https://github.com/harxhitbuilds"
                    : "https://x.com/harxhitbuilds"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted-foreground hover:text-primary transition"
              >
                {React.cloneElement(social.icon, { className: "h-4 w-4" })}
              </a>
            ))} */}
            <ModeToggleButton />
          </div>

          <ModifiedBtn label={topbarConfig.btn.label} className="px-4 py-2">
            <a
              href={topbarConfig.btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <IconBrandTwitter className="h-5 w-5" />
              {topbarConfig.btn.label}
            </a>
          </ModifiedBtn>
        </div>
      </div>

      <MobileNav />
    </>
  );
}

function MobileNav() {
  return (
    <div className="border-border bg-background flex h-16 w-full items-center justify-between border-b px-2 md:hidden">
      <SidebarTrigger />

      <div className="font-display flex items-center gap-2 px-7 py-6 text-xl font-semibold">
        {/* <Image src="/logo.svg" alt="Logo" width={32} height={32} /> */}
        <span>{navbarConfig.name}</span>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggleButton />
      </div>
    </div>
  );
}
