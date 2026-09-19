import { cn } from "@/lib/utils";

export function Marquee({
  children,
  reverse = false,
  speed = 42,
  pauseOnHover = true,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("group/marquee mask-fade-x relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          reverse ? "animate-[marquee-reverse_var(--speed)_linear_infinite]" : "animate-[marquee_var(--speed)_linear_infinite]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        {/* duplicated once — the keyframe translates exactly -50% */}
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
