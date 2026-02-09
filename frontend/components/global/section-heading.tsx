import { Badge } from "../ui/badge";

export default function SectionHeading({ heading }: { heading: string }) {
  return (
    <Badge className="bg-accentprimary/10 text-accentprimary relative rounded-full px-4 py-1 text-[10px] md:text-xs">
      {heading}
      <div className="via-accentprimary absolute inset-x-0 bottom-0 h-px w-full bg-linear-to-r from-transparent to-transparent" />
    </Badge>
  );
}
