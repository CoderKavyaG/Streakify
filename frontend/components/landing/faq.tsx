import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqConfig } from "@/constants/landing";

import Container from "../global/container";
import SectionHeading from "../global/section-heading";

export default function FAQ() {
  return (
    <Container>
      <section>
        <div className="border-border flex w-full flex-col items-center gap-4 border-b py-18 text-center">
          <SectionHeading heading="F&Q" />
          <h2 className="text-foreground mt-4 mb-2 text-center text-3xl md:text-4xl">
            {faqConfig.heading}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl px-4 text-xs leading-6 md:text-sm">
            {faqConfig.para}
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqConfig.items.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="border-border px-4 py-2"
            >
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Container>
  );
}
