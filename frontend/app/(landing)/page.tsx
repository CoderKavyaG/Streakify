import Container from "@/components/global/container";
import CTA from "@/components/landing/cta";
import Demo from "@/components/landing/demo";
import FAQ from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import MsgFromDevelopers from "@/components/landing/msg-from-developers";
import RedirectIfAuth from "@/components/global/redirect-if-auth";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <Container>
      <RedirectIfAuth />
      <Hero />
      <Separator className="bg-border dark:bg-border h-px" />
      <Demo />
      <Separator className="bg-border dark:bg-border h-px" />
      <Features />
      <Separator className="bg-border dark:bg-border h-px" />
      <FAQ />
      <Separator className="bg-border dark:bg-border h-px" />
      <MsgFromDevelopers />
      <Separator className="bg-border dark:bg-border h-px" />
      <CTA />
      <Separator className="bg-border dark:bg-border h-px" />
    </Container>
  );
}
