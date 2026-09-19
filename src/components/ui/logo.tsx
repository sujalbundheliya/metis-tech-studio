import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The company mark, from LOGO.jpg.
 *
 * The source is bright-on-black artwork, so it was converted to alpha PNGs
 * (see /public/logo.png and /public/logo-mark.png) — a JPEG would paint a black
 * rectangle over any surface that isn't pure black.
 *
 * The full lockup is only legible above ~150px wide ("TECH STUDIO" is set very
 * small), so compact placements pair the mark with live type instead.
 */
/** Full lockup — use where there is real width (footer, mobile panel). */
export function LogoLockup({
  className,
  width = 200,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Metis Tech Studio"
      width={759}
      height={341}
      style={{ width, height: "auto" }}
      className={cn("object-contain", className)}
    />
  );
}

/**
 * Header lockup: the "METIS" artwork on its own — the gradient M *is* the M.
 * `alt` is empty because the wrapping link already carries an aria-label, and
 * two labels on one control get announced twice.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("group inline-flex items-center", className)}>
      <Image
        src="/logo-metis.png"
        alt=""
        width={758}
        height={298}
        priority
        className="h-[26px] w-auto shrink-0 object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      />
    </span>
  );
}
