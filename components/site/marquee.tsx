const ITEMS = [
  "OWN THE MOUNTAIN",
  "FULL SEND",
  "BE A JERRY",
  "RIDE OR DIE",
] as const;

function Snowflake() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-6 shrink-0 text-primary sm:size-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07L19.07 4.93" />
      <path d="M9 5l3-3 3 3M9 19l3 3 3-3M5 9L2 12l3 3M19 9l3 3-3 3" />
    </svg>
  );
}

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      {ITEMS.map((item) => (
        <div key={item} className="flex shrink-0 items-center gap-8 sm:gap-12">
          <span className="font-heading text-3xl font-black tracking-tight whitespace-nowrap sm:text-5xl">
            {item}
          </span>
          <Snowflake />
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-border/60 bg-foreground py-5 text-background sm:py-7">
      <div
        className="flex w-max animate-marquee"
        style={{ ["--marquee-duration" as string]: "28s" }}
      >
        <Row />
        <Row aria-hidden />
      </div>
    </div>
  );
}
