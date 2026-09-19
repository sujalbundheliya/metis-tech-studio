import { cn } from "@/lib/utils";

/* ============================================================================
   PRACTICE GLYPHS
   One bespoke diagram per practice. Each animates on hover of its parent
   `.group` card: edges draw in, nodes brighten, signal moves.
   ========================================================================== */

const base = "h-[68px] w-[86px] overflow-visible";
const edge =
  "transition-all duration-700 ease-[var(--ease-out-expo)] [stroke-dasharray:1] [stroke-dashoffset:0]";
const node = "transition-all duration-500 ease-[var(--ease-out-expo)]";

/** AI & ML — a three-layer network resolving to one output. */
function NeuralGlyph({ className }: { className?: string }) {
  const layers = [
    [14, [10, 26, 42, 58]],
    [43, [16, 34, 52]],
    [72, [34]],
  ] as const;

  return (
    <svg viewBox="0 0 86 68" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" opacity="0.3" className="group-hover:opacity-70 transition-opacity duration-700">
        {layers[0][1].map((y1) =>
          layers[1][1].map((y2) => (
            <line key={`a${y1}-${y2}`} x1={14} y1={y1 + 4} x2={43} y2={y2 + 4} className={edge} />
          )),
        )}
        {layers[1][1].map((y1) => (
          <line key={`b${y1}`} x1={43} y1={y1 + 4} x2={72} y2={38} className={edge} />
        ))}
      </g>

      {layers.map(([x, ys], li) =>
        ys.map((y, i) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y + 4}
            r={li === 2 ? 4.5 : 3}
            className={cn(
              node,
              li === 2
                ? "fill-[var(--color-aurora-500)] group-hover:r-[5.5]"
                : "fill-current opacity-60 group-hover:opacity-100",
            )}
            style={{ transitionDelay: `${(li * 3 + i) * 40}ms` }}
          />
        )),
      )}

      <circle cx={72} cy={38} r={4.5} className="fill-[var(--color-aurora-500)]" />
      <circle
        cx={72}
        cy={38}
        r={9}
        className="fill-none stroke-[var(--color-aurora-500)] opacity-0 transition-all duration-700 group-hover:opacity-50"
        strokeWidth="1"
      />
    </svg>
  );
}

/** Software Development — stacked, shipped surfaces. */
function StackGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 86 68" fill="none" className={cn(base, className)} aria-hidden="true">
      {/* back plate */}
      <rect
        x="10" y="8" width="52" height="38" rx="4"
        stroke="currentColor" strokeWidth="1.2" opacity="0.3"
        className="transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-[3px] group-hover:opacity-50"
      />
      {/* mid plate */}
      <rect
        x="16" y="14" width="52" height="38" rx="4"
        stroke="currentColor" strokeWidth="1.2" opacity="0.55"
        className="transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-[1px] group-hover:opacity-75"
      />
      {/* front plate */}
      <g className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-[2px]">
        <rect x="22" y="20" width="52" height="38" rx="4" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.4" />
        <line x1="22" y1="28.5" x2="74" y2="28.5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        <circle cx="27.5" cy="24.3" r="1.3" className="fill-[var(--color-ember-500)]" />
        <circle cx="32" cy="24.3" r="1.3" fill="currentColor" opacity="0.45" />
        <circle cx="36.5" cy="24.3" r="1.3" fill="currentColor" opacity="0.45" />
        {/* content lines that "build in" */}
        <rect x="28" y="35" width="22" height="2.4" rx="1.2" className="fill-[var(--color-aurora-500)] opacity-70 transition-all duration-500 group-hover:w-[30px]" />
        <rect x="28" y="41" width="34" height="2.4" rx="1.2" fill="currentColor" opacity="0.3" />
        <rect x="28" y="47" width="16" height="2.4" rx="1.2" fill="currentColor" opacity="0.3" className="transition-all duration-700 delay-100 group-hover:w-[26px]" />
      </g>
    </svg>
  );
}

/** Intelligent Systems — a branching flow with a human-in-the-loop gate. */
function FlowGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 86 68" fill="none" className={cn(base, className)} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" opacity="0.42" className="transition-opacity duration-700 group-hover:opacity-70">
        <path d="M17 34 H32" />
        <path d="M46 34 H54 a4 4 0 0 1 4 4 V46 a4 4 0 0 0 4 4 H71" />
        <path d="M46 34 H54 a4 4 0 0 0 4 -4 V22 a4 4 0 0 1 4 -4 H71" />
      </g>

      {/* input */}
      <rect x="4" y="27" width="13" height="14" rx="3" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.2" />

      {/* decision diamond */}
      <g className="transition-transform duration-700 ease-[var(--ease-out-expo)] origin-center group-hover:rotate-[45deg]" style={{ transformOrigin: "39px 34px" }}>
        <rect x="32" y="27" width="14" height="14" rx="2.5" className="fill-[var(--color-aurora-500)] fill-opacity-20 stroke-[var(--color-aurora-500)]" strokeWidth="1.4" />
      </g>

      {/* approved branch */}
      <rect x="71" y="11" width="12" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
      <path d="M74.4 18 l2.2 2.4 l3.6 -4.4" className="stroke-[var(--color-aurora-500)] opacity-0 transition-opacity duration-500 delay-200 group-hover:opacity-100" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* human-in-the-loop branch */}
      <rect x="71" y="43" width="12" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
      <circle cx="77" cy="48.2" r="2" className="fill-[var(--color-ember-500)]" />
      <path d="M73.6 54 a3.4 3.4 0 0 1 6.8 0" className="stroke-[var(--color-ember-500)]" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Data & Cloud — a pipeline feeding a monitored cloud. */
function PipelineGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 86 68" fill="none" className={cn(base, className)} aria-hidden="true">
      {/* stacked sources */}
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.75">
        <ellipse cx="14" cy="20" rx="9.5" ry="3.6" fill="currentColor" fillOpacity="0.1" />
        <path d="M4.5 20 V32 a9.5 3.6 0 0 0 19 0 V20" fill="currentColor" fillOpacity="0.05" />
        <ellipse cx="14" cy="32" rx="9.5" ry="3.6" fill="none" opacity="0.55" />
      </g>

      {/* pipe */}
      <path d="M24 26 H44" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
      <path
        d="M24 26 H44"
        className="stroke-[var(--color-aurora-500)] [stroke-dasharray:4_6] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.1s" repeatCount="indefinite" />
      </path>

      {/* transform block */}
      <rect x="44" y="19" width="14" height="14" rx="3" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.2" />
      <path d="M48 26 h6 M51 23 v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />

      {/* cloud */}
      <path
        d="M63 30 a7 7 0 0 1 1.4 -13.9 a9 9 0 0 1 16.6 2.6 a5.6 5.6 0 0 1 -1.4 11.3 Z"
        fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="1.25"
        className="transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-[2px]"
      />

      {/* monitoring trace — the part most projects skip */}
      <path
        d="M50 50 l6 0 l4 -8 l5 15 l4 -11 l4 4 h9"
        className="stroke-[var(--color-ember-500)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <path d="M28 50 H50" stroke="currentColor" strokeWidth="1.2" opacity="0.25" strokeDasharray="2 3" />
    </svg>
  );
}

const GLYPHS = {
  neural: NeuralGlyph,
  stack: StackGlyph,
  flow: FlowGlyph,
  pipeline: PipelineGlyph,
} as const;

export function PracticeGlyph({
  name,
  className,
}: {
  name: keyof typeof GLYPHS;
  className?: string;
}) {
  const Glyph = GLYPHS[name];
  return <Glyph className={className} />;
}
