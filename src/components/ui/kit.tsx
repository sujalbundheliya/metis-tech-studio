import Link from "next/link";
import { cn } from "@/lib/utils";

/* ============================================================================
   V1 KIT — zero radius, hairline cells, mono micro-labels.
   ========================================================================== */

/** Small uppercase mono label — the technical-drawing annotation. */
export function Label({
  children,
  dark = false,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("t-label", dark ? "text-aurora-400" : "text-venice-300/65", className)}>
      {children}
    </span>
  );
}

/** Bordered mono chip, as used for tags. Sharp corners, no fill. */
export function Chip({
  children,
  dark = false,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "t-label inline-flex items-center px-2.5 py-1.5 transition-colors duration-200",
        // Chips sit inside a `group` card and light up with it on hover. On
        // touch that never fires, so they rest one step brighter instead of
        // sitting permanently in their dimmest state.
        dark
          ? "border border-aurora-500/30 text-aurora-300/90 can-hover:border-white/18 can-hover:text-venice-200/80 group-hover:border-aurora-500/45 group-hover:text-aurora-300"
          : "border border-white/22 text-venice-200/85 can-hover:border-white/16 can-hover:text-venice-200/75 group-hover:border-venice-700/40 group-hover:text-venice-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Crop marks at the four corners of a cell. */
export function Ticks({ dark = false }: { dark?: boolean }) {
  const c = dark ? "bg-aurora-500/70" : "bg-venice-700/70";
  return (
    <span aria-hidden="true">
      <span className={cn("absolute top-0 left-0 h-[5px] w-[5px]", c)} />
      <span className={cn("absolute top-0 right-0 h-[5px] w-[5px]", c)} />
      <span className={cn("absolute bottom-0 left-0 h-[5px] w-[5px]", c)} />
      <span className={cn("absolute right-0 bottom-0 h-[5px] w-[5px]", c)} />
    </span>
  );
}

const chevron = (
  <svg viewBox="0 0 16 16" fill="none" className="h-[13px] w-[13px] shrink-0" aria-hidden="true">
    <path d="M5.5 3.5 10 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
  </svg>
);

type BtnVariant = "solid" | "outline" | "ghost";

const btnStyles: Record<BtnVariant, string> = {
  /* Merino on near-black — the warm anchor is the only place the brand's
     cream survives, which makes the primary action impossible to miss.
     On hover the glow shifts from cream to the logo's blue→violet. */
  solid:
    "bg-sand-100 text-ink-1000 shadow-[0_0_0_1px_rgba(245,238,221,0.2),0_8px_40px_-10px_rgba(245,238,221,0.35)] " +
    "hover:bg-white hover:shadow-[0_0_0_1px_rgba(90,140,255,0.45),0_10px_46px_-10px_rgba(90,60,240,0.55)]",
  /* Border turns into the brand gradient on hover (see .btn-ring). */
  outline: "border border-white/20 text-venice-200 hover:border-transparent hover:text-white",
  ghost: "text-venice-200/80 hover:text-white hover:bg-white/[0.05]",
};

/** No pills — 0px radius, per the Mistral-derived geometry rule. */
export function Btn({
  href,
  children,
  variant = "solid",
  size = "md",
  shape = "square",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: BtnVariant;
  size?: "sm" | "md" | "lg";
  /** Square everywhere structural; pill reserved for the big closing action. */
  shape?: "square" | "pill";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/b relative isolate inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden font-medium transition-all duration-200",
        shape === "pill" && "rounded-full",
        size === "sm" && "px-4 py-2.5 text-[14px]",
        size === "md" && "px-5 py-3 text-[15px]",
        size === "lg" && (shape === "pill" ? "px-9 py-4 text-[16px]" : "px-7 py-4 text-[16px]"),
        btnStyles[variant],
        className,
      )}
    >
      {/* brand-gradient ring — outline buttons only */}
      {variant === "outline" && (
        <span aria-hidden="true" className="btn-ring group-hover/b:opacity-100" style={{ borderRadius: "inherit" }} />
      )}
      {/* diagonal highlight sweeping left→right on hover */}
      <span
        aria-hidden="true"
        className="btn-sheen group-hover/b:opacity-100 group-hover/b:bg-[position:-30%_0]"
        style={{ borderRadius: "inherit" }}
      />
      <span className="relative">{children}</span>
      <span className="relative transition-transform duration-200 group-hover/b:translate-x-1">{chevron}</span>
    </Link>
  );
}

export function TextLink({
  href,
  children,
  dark = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        // `min-h-11` rather than padding: the row grows to the 44px touch
        // floor while the text stays on its own baseline, so nothing shifts
        // above the breakpoint where a cursor makes the size moot.
        "group/l inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium transition-colors duration-200 can-hover:min-h-0",
        dark ? "text-aurora-400 hover:text-aurora-300" : "text-aurora-400 hover:text-white",
        className,
      )}
    >
      {/* The underline is drawn as a background gradient so it can grow from
          0 to full width; `currentColor` keeps it in step with the link's own
          colour in both the light and dark variants.

          It rests at full width and `can-hover:` collapses it back to zero,
          rather than the other way round. On a phone the grow-on-hover version
          simply never drew, leaving these links with no underline at all — the
          only thing separating them from body copy was their colour. */}
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 can-hover:bg-[length:0%_1px] group-hover/l:bg-[length:100%_1px]">
        {children}
      </span>
      <span className="transition-transform duration-200 group-hover/l:translate-x-1">{chevron}</span>
    </Link>
  );
}

/** Section opener: mono label on a rule, then an editorial headline. */
export function Opener({
  label,
  title,
  intro,
  dark = false,
  className,
}: {
  label: string;
  title: React.ReactNode;
  intro?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12", className)}>
      <div className="lg:col-span-3">
        <div className={cn("h-px w-full", dark ? "bg-white/22" : "bg-venice-950/20")} />
        <Label dark={dark} className="mt-4 block">
          {label}
        </Label>
      </div>
      <div className="lg:col-span-9">
        <h2 className={cn("t-h2 text-balance", dark ? "text-sand-50" : "text-white")}>{title}</h2>
        {intro && (
          <p
            className={cn(
              "t-lead mt-6 max-w-2xl",
              dark ? "text-venice-200/72" : "text-venice-200/68",
            )}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
