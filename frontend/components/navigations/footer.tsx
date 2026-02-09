import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconCheck,
} from "@tabler/icons-react";

import { footerConfig } from "@/constants/footer";

import Container from "../global/container";
import { Badge } from "../ui/badge";

const iconMap = {
  github: <IconBrandGithub className="h-5 w-5" />,
  twitter: <IconBrandTwitter className="h-5 w-5" />,
  linkedin: <IconBrandLinkedin className="h-5 w-5" />,
  check: <IconCheck className="h-4 w-4" />,
};

export default function Footer() {
  return (
    <Container>
      <footer className="border-border bg-background w-full border-t py-8">
        <div className="grid grid-cols-1 items-center gap-6 px-4 md:grid-cols-3 md:px-12">
          <div className="flex items-center justify-center md:justify-start">
            <Badge className="border-border text-muted-foreground gap-2 border bg-transparent px-4 py-1 text-xs font-semibold">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              {footerConfig.status.text}
            </Badge>
          </div>
          <div className="text-center">
            <h1 className="font-display text-xl font-semibold">
              {footerConfig.name}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 md:justify-end">
            {footerConfig.social.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="bg-surface hover:bg-primary-soft rounded-full transition"
              >
                {iconMap[social.icon as keyof typeof iconMap]}
              </a>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground mt-6 text-center text-xs">
          {footerConfig.copyright}
        </div>
      </footer>
    </Container>
  );
}
