import { IconArrowRightDashed } from "@tabler/icons-react";
import Link from "next/link";

import { heroConfig } from "@/constants/landing";

import ModifiedBtn from "../global/btn";
import Container from "../global/container";
import SectionHeading from "../global/section-heading";

export default function Hero() {
  return (
    <Container>
      <section className="relative mt-20 py-10 text-center md:py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <SectionHeading heading={heroConfig.badge} />
            <IconArrowRightDashed size={20} />
          </div>
          <div className="space-y-2">
            <h1 className="text-primary text-4xl tracking-tight md:text-6xl">
              {heroConfig.hero}
            </h1>
            <h1 className="text-primary text-4xl tracking-tight md:text-6xl">
              {heroConfig.hero2}
            </h1>
          </div>
          <p className="text-muted-foreground mt-4 max-w-xl px-4 text-xs leading-6 md:text-sm">
            {heroConfig.para}
          </p>
        </div>
        <div className="mx-auto mt-8 flex max-w-xs flex-col gap-6 md:flex-row md:justify-center">
          <ModifiedBtn
            label={heroConfig.cta[0].label}
            className="mx-auto flex w-full items-center gap-2 rounded-xs px-4 py-3 text-sm sm:w-auto sm:max-w-none"
          >
            <a
              href={heroConfig.cta[0].href}
              target="_blank"
              className="flex items-center gap-4"
            >
              {heroConfig.cta[0].icon}
              {heroConfig.cta[0].label}
            </a>
          </ModifiedBtn>
          <ModifiedBtn
            label={heroConfig.cta[1].label}
            className="mx-auto flex w-full items-center gap-2 rounded-xs px-4 py-3 text-sm sm:w-auto sm:max-w-none"
          >
            <Link
              href={heroConfig.cta[1].href}
              className="flex items-center gap-4"
            >
              {heroConfig.cta[1].icon}
              {heroConfig.cta[1].label}
            </Link>
          </ModifiedBtn>
        </div>
      </section>
    </Container>
  );
}
