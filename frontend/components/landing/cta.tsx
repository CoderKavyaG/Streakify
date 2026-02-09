import { ctaConfig } from "@/constants/landing";

import ModifiedBtn from "../global/btn";
import Container from "../global/container";

export default function CTA() {
  return (
    <Container>
      <section className="py-16">
        <h2 className="text-foreground mt-4 mb-2 text-center text-3xl md:text-4xl">
          {ctaConfig.heading}
        </h2>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <ModifiedBtn className="flex max-w-xs items-center gap-2 rounded-xs px-6 py-3 text-sm">
            <a href={ctaConfig.cta.href}>{ctaConfig.cta.label}</a>
          </ModifiedBtn>
        </div>
      </section>
    </Container>
  );
}
