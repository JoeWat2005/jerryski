import { cn } from "@/lib/utils";

type Props = React.SVGProps<SVGSVGElement> & { className?: string };

export function MountainBackdrop({ className, ...props }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMax slice"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[60%] w-full text-foreground/[0.06]",
        className
      )}
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 400 L0 240 L160 120 L260 200 L360 80 L520 260 L620 160 L720 240 L860 60 L1000 220 L1100 140 L1200 240 L1200 400 Z"
      />
      <path
        fill="currentColor"
        opacity="0.6"
        d="M0 400 L0 320 L120 240 L240 300 L360 220 L480 320 L600 260 L720 320 L840 240 L960 300 L1080 260 L1200 320 L1200 400 Z"
      />
    </svg>
  );
}
