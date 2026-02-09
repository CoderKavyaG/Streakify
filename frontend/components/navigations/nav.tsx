"use client";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { navbarConfig } from "@/constants/nav";

import { AuthButton } from "../auth/auth-button";
import Container from "../global/container";
import ModeToggleButton from "../theme/mode-toggle-btn";

export default function Navbar() {
  return (
    <nav className="border-border fixed top-0 left-0 z-50 w-full border-b bg-transparent backdrop-blur-2xl">
      <Container>
        <div className="flex h-20 w-full items-center justify-between px-6 md:px-12">
          <div className="font-display flex items-center gap-2 text-xl font-semibold">
            <h1>{navbarConfig.name}</h1>
          </div>

          <div className="hidden space-x-12 md:flex">
            {navbarConfig.navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-muted-foreground text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <ModeToggleButton />
            <AuthButton />
          </div>

          <div className="flex items-center md:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </nav>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="flex items-center justify-center rounded-lg bg-transparent transition hover:bg-transparent md:hidden"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <IconMenu2 className="text-foreground h-5 w-5" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-background fixed inset-0 z-50 flex h-screen flex-col"
          >
            <div className="flex justify-end p-6">
              <Button
                className="rounded-lg bg-transparent p-2 transition hover:bg-transparent"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <IconX className="text-foreground h-7 w-7" />
              </Button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {navbarConfig.navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-foreground hover:text-primary text-lg font-bold transition"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <AuthButton />
              <div className="mt-8">
                <ModeToggleButton />
              </div>
            </div>

            <div className="mb-8 flex justify-center">
              <span className="text-muted-foreground text-sm">
                &copy; {new Date().getFullYear()} {navbarConfig.name}
              </span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
