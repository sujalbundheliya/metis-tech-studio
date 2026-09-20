import { cn } from "@/lib/utils";

/**
 * Hero atmosphere, borrowed from the reference sites:
 *  · a hard diagonal shaft of light raking across the frame (prepairo.ai)
 *  · faint vertical light curtains behind it (deccanexperts.ai)
 *  · a corner bloom where the shaft originates
 *
 * Purely decorative — no pointer events, and the beam's breathing animation
 * is suppressed under prefers-reduced-motion by the global rule.
 *
 * ---------------------------------------------------------------------------
 * PORTRAIT
 *
 * Every layer here was sized against a landscape canvas, and each one failed
 * differently once the frame turned:
 *
 *  · The beam is a twelve-stop ramp. At `w-[62%]` of a 1400px page those stops
 *    span ~870px and read as soft light; at 390px they span 240px and the same
 *    ramp resolves into a saturated blue-cyan-violet *rainbow stripe* cutting
 *    straight across the practice cards. The gradient was never the problem —
 *    the distance it had to spread over was. On a phone the beam is widened
 *    past the viewport and pulled back in opacity, so the stops spread out
 *    again and the shaft goes back to being light rather than a painted band.
 *
 *  · The bloom sits at `-left-[12%]` with a `70vw` diameter. In portrait that
 *    is a small disc pinned to a corner well above the headline, so the top of
 *    the hero — the first thing anyone sees — rendered flat black. In portrait
 *    it moves down and across to sit behind the type, which is where the light
 *    source belongs when the frame is taller than it is wide.
 *
 *  · The curtains repeat every 63px. At 390px that is six bands across the
 *    screen, which stops reading as depth and starts reading as stripes.
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
      {/* vertical curtains, furthest back — widened and dimmed in portrait */}
      {curtain && (
        <div
          className={cn(
            "light-curtain mask-fade-b absolute inset-0",
            soft ? "opacity-15 sm:opacity-25" : "opacity-25 sm:opacity-45",
          )}
        />
      )}

      {/* faint structural grid */}
      <div
        className={cn(
          "grid-lines mask-radial-fade absolute inset-0",
          soft ? "opacity-25 sm:opacity-40" : "opacity-45 sm:opacity-70",
        )}
      />

      {/* corner bloom — the light source.
          Portrait moves it down behind the headline; landscape keeps the
          original raking corner. */}
      {bloom === "top-left" && (
        <div
          className={cn(
            "absolute rounded-full",
            // No blur filter: a radial gradient already IS a soft falloff, and
            // blurring a 1100px element re-rasterises it on every scroll frame.
            "bg-[radial-gradient(circle,var(--color-beam-600)_0%,color-mix(in_oklab,var(--color-beam-600)_45%,transparent)_28%,transparent_68%)]",
            "-top-[10%] -left-[35%] h-[130vw] w-[130vw]",
            "sm:-top-[28%] sm:-left-[12%] sm:h-[70vw] sm:w-[70vw] sm:max-w-[1100px]",
            soft ? "opacity-20 sm:opacity-25" : "opacity-38 sm:opacity-45",
          )}
        />
      )}
      {bloom === "top-center" && (
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 rounded-full",
            "bg-[radial-gradient(ellipse,var(--color-beam-600)_0%,color-mix(in_oklab,var(--color-beam-600)_45%,transparent)_30%,transparent_70%)]",
            "-top-[22%] h-[110vw] w-[150vw]",
            "sm:-top-[40%] sm:h-[64vw] sm:w-[92vw] sm:max-w-[1300px]",
            soft ? "opacity-18 sm:opacity-22" : "opacity-32 sm:opacity-40",
          )}
        />
      )}

      {/* the shaft — spread wide enough in portrait that the ramp stays light */}
      {beam && (
        <div
          className={cn(
            "light-beam",
            "top-[-30%] h-[190%]",
            "left-[-55%] w-[150%]",
            "sm:left-[-18%] sm:w-[62%]",
          )}
          style={
            {
              "--beam-angle": "-34deg",
              // Utilities cannot dim this — see the `beam` keyframes. The
              // portrait reduction is a separate factor applied by a media
              // query, because this inline value would outrank it.
              "--beam-soft": soft ? 0.5 : 1,
            } as React.CSSProperties
          }
        />
      )}

      {/* a cooler secondary shaft for depth — landscape only. In portrait it
          lands on top of the primary shaft and doubles its saturation, which
          is the rainbow the widening above exists to avoid. */}
      {beam && (
        <div
          className="light-beam top-[-18%] left-[6%] hidden h-[150%] w-[26%] sm:block [animation-delay:-5s]"
          style={
            { "--beam-angle": "-30deg", "--beam-soft": soft ? 0.32 : 0.62 } as React.CSSProperties
          }
        />
      )}

      {/* settle everything back toward black at the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-1000 to-transparent" />
    </div>
  );
}
