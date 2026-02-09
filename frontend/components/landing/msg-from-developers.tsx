import Image from "next/image";

import { developersMsg } from "@/constants/landing";

import Container from "../global/container";
import SectionHeading from "../global/section-heading";

export default function MsgFromDevelopers() {
  return (
    <Container>
      <section>
        <div className="border-border flex w-full flex-col items-center gap-4 border-b py-10 text-center md:py-18">
          <SectionHeading heading="Features" />
          <h2 className="text-foreground mt-4 mb-2 text-center text-3xl md:text-4xl">
            {developersMsg.heading}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl px-4 text-xs leading-6 md:text-sm">
            {developersMsg.para}
          </p>
        </div>
        <div className="divide-border grid w-full grid-cols-1 gap-8 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
          {developersMsg.developers.map((developer, index) => (
            <div
              key={index}
              className="bg-background flex flex-col items-center gap-2 rounded-xl p-6 shadow-sm transition hover:shadow-lg"
            >
              <Image
                src={developer.avatar}
                alt={developer.name}
                width={40}
                height={40}
                className="border-border h-16 w-16 rounded-full border object-cover"
              />
              <div className="text-foreground mt-2 text-lg font-semibold">
                {developer.name}
              </div>
              <a
                href={`https://twitter.com/${developer.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accentprimary text-xs hover:underline"
              >
                {developer.twitter}
              </a>
              <p className="text-muted-foreground mt-2 text-center text-sm">
                {developer.msg}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
