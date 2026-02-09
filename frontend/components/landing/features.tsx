import { featuresConfig } from "@/constants/landing";

import Container from "../global/container";
import SectionHeading from "../global/section-heading";

export default function Features() {
  return (
    <Container>
      <section>
        <div className="border-border flex w-full flex-col items-center gap-4 border-b py-10 text-center md:py-18">
          <SectionHeading heading="Features" />
          <h2 className="text-foreground mt-4 mb-2 text-center text-3xl md:text-4xl">
            {featuresConfig.heading}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl px-4 text-xs leading-6 md:text-sm">
            {featuresConfig.para}
          </p>
        </div>
        <div className="divide-border grid w-full grid-cols-1 gap-8 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          {featuresConfig.features.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface flex h-full flex-col items-center p-12"
            >
              <span className="text-primary mb-4 text-3xl">{feature.icon}</span>
              <h3 className="text-foreground mb-2 text-center text-lg font-semibold md:text-xl">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-center text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
