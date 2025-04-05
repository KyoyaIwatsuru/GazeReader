import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function TypographyH4({ children, className }: Props) {
  return (
    <h4 className={cn("scroll-m-20 text-lg font-medium tracking-tight", className)}>
      {children}
    </h4>
  )
}