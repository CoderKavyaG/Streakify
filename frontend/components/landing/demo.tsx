import Image from "next/image";

import { demoConfig } from "@/constants/landing";

import Container from "../global/container";
import SectionHeading from "../global/section-heading";

export default function Demo() {
  return (
    <Container>
      <section className="flex flex-col items-center py-10 md:py-16">
        <SectionHeading heading="Integration" />
        {/* <div className="mb-4">
          <Image
            src={demoConfig.icon.src}
            height={demoConfig.icon.height}
            width={demoConfig.icon.width}
            alt={demoConfig.icon.alt}
          />
        </div> */}
        <h1 className="text-foreground mt-4 mb-2 text-center text-3xl md:text-4xl">
          {demoConfig.heading}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl px-4 text-center text-xs leading-6 md:text-sm">
          {demoConfig.para}
        </p>
        <div className="mt-6 mb-8 flex w-full justify-center px-4 md:px-0">
          <Image
            src={demoConfig.image.src}
            height={demoConfig.image.height}
            width={demoConfig.image.width}
            alt={demoConfig.image.alt}
            className="object-cover invert"
          />
        </div>
      </section>
    </Container>
  );
}
