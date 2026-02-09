"use client";
import { SunMoonIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

import { Button } from "../ui/button";

export default function ModeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const switch_theme = () => {
    switch (theme) {
      case "dark":
        setTheme("light");
        break;
      case "light":
        setTheme("dark");
        break;
      case "system":
        setTheme(systemTheme === "light" ? "dark" : "light");
        break;
      default:
        return;
    }
  };
  return (
    <Button
      onClick={switch_theme}
      className="border-none bg-transparent hover:bg-transparent"
    >
      <motion.span
        className="cursor-pointer"
        whileHover={{
          scale: 1.15,
          transition: { type: "spring", stiffness: 400, damping: 15 },
        }}
        whileTap={{
          scale: 0.92,
          transition: { type: "spring", stiffness: 200, damping: 10 },
        }}
      >
        <SunMoonIcon className="text-foreground" />
      </motion.span>
    </Button>
  );
}
