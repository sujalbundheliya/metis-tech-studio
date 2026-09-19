import { cn } from "@/lib/utils";

/**
 * Hero atmosphere, borrowed from the reference sites:
 *  · a hard diagonal shaft of light raking across the frame (prepairo.ai)
 *  · faint vertical light curtains behind it (deccanexperts.ai)
 *  · a corner bloom where the shaft originates
 *
 * Purely decorative — no pointer events, and the beam's breathing animation
 * is suppressed under prefers-reduced-motion by the global rule.
 */
export function Atmosphere({
  className,
  beam = true,
  curtain = true,
  bloom = "top-left",
  intensity = "full",
}: {
  className?: string;
  beam?: boolean;
  curtain?: boolean;
  bloom?: "top-left" | "top-center" | "none";
  intensity?: "full" | "soft";
}) {
  const soft = intensity === "soft";

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* vertical curtains, furthest back */}
      {curtain && (
        <div className={cn("light-curtain mask-fade-b absolute inset-0", soft ? "opacity-25" : "opacity-45")} />
      )}

      {/* faint structural grid */}
      <div className={cn("grid-lines mask-radial-fade absolute inset-0", soft ? "opacity-40" : "opacity-70")} />

      {/* corner bloom — the light source */}
      {bloom === "top-left" && (
        <div
          className={cn(
            "absolute -top-[28%] -left-[12%] h-[70vw] w-[70vw] max-w-[1100px] rounded-full",
            // No blur filter: a radial gradient already IS a soft falloff, and
            // blurring a 1100px element re-rasterises it on every scroll frame.
            "bg-[radial-gradient(circle,var(--color-beam-600)_0%,color-mix(in_oklab,var(--color-beam-600)_45%,transparent)_28%,transparent_68%)]",
            soft ? "opacity-25" : "opacity-45",
          )}
        />
      )}
      {bloom === "top-center" && (
        <div
          className={cn(
            "absolute -top-[40%] left-1/2 h-[64vw] w-[92vw] max-w-[1300px] -translate-x-1/2 rounded-full",
            "bg-[radial-gradient(ellipse,var(--color-beam-600)_0%,color-mix(in_oklab,var(--color-beam-600)_45%,transparent)_30%,transparent_70%)]",
            soft ? "opacity-22" : "opacity-40",
          )}
        />
      )}

      {/* the shaft */}
      {beam && (
        <div
          className={cn("light-beam top-[-30%] left-[-18%] h-[190%] w-[62%]", soft && "opacity-50")}
          style={{ "--beam-angle": "-34deg" } as React.CSSProperties}
        />
      )}

      {/* a cooler secondary shaft for depth */}
      {beam && (
        <div
          className="light-beam top-[-18%] left-[6%] h-[150%] w-[26%] opacity-45 [animation-delay:-5s]"
          style={{ "--beam-angle": "-30deg" } as React.CSSProperties}
        />
      )}

      {/* settle everything back toward black at the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-1000 to-transparent" />
    </div>
  );
}
