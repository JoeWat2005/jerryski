import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id: string;
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  contentClassName?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  titleAccent,
  className,
  contentClassName,
  children,
  ...props
}: SectionProps) {
  const titleWords = title.split(" ");
  const accentWords = titleAccent?.split(" ") ?? [];

  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden border-t border-border/60 bg-background py-20 sm:py-28",
        className
      )}
      {...props}
    >
      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p
            data-anim="eyebrow"
            className="mb-5 text-xs font-semibold tracking-[0.25em] text-primary uppercase"
          >
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-heading max-w-4xl text-balance text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          {titleWords.map((w, i) => (
            <span key={`t-${i}`} className="mr-[0.25em] inline-block">
              <span data-anim="word" className="inline-block">
                {w}
              </span>
            </span>
          ))}
          {accentWords.map((w, i) => (
            <span
              key={`a-${i}`}
              className="mr-[0.25em] inline-block text-primary"
            >
              <span data-anim="word" className="inline-block">
                {w}
              </span>
            </span>
          ))}
        </h2>
        <div className={cn("mt-12", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
