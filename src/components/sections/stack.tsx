import { Label, Opener } from "@/components/ui/kit";
import { Marquee } from "@/components/ui/marquee";
import { techStack } from "@/content/site";

function Item({ label }: { label: string }) {
  return (
    <span className="border-r border-white/10 px-7 py-4 text-[16px] whitespace-nowrap text-venice-200/72">
      {label}
    </span>
  );
}

export function TechStack() {
  const flat = techStack.groups.flatMap((g) => g.items);
  const rowA = flat.filter((_, i) => i % 2 === 0);
  const rowB = flat.filter((_, i) => i % 2 === 1);

  return (
    <section id="stack" className="border-b border-white/10 bg-ink-1000">
      <div className="mx-auto max-w-[1400px] px-gutter pt-16 pb-10 sm:px-10 sm:pt-24 sm:pb-16 lg:px-14 lg:pt-32">
        <Opener
          label="Tooling"
          title={
            <>
              Built on tools that will{" "}
              <em className="text-aurora-400 not-italic">still be here in five years.</em>
            </>
          }
          intro={techStack.intro}
        />
      </div>

      <div className="border-t border-white/10">
        <Marquee speed={54}>
          {rowA.map((x, i) => (
            <Item key={`${x}-${i}`} label={x} />
          ))}
        </Marquee>
      </div>
      <div className="border-t border-white/10">
        <Marquee speed={48} reverse>
          {rowB.map((x, i) => (
            <Item key={`${x}-${i}`} label={x} />
          ))}
        </Marquee>
      </div>

      <div className="mx-auto grid max-w-[1400px] border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.groups.map((group, i) => (
          <div
            key={group.label}
            className={`px-gutter py-7 sm:px-8 sm:py-8 lg:px-10 ${i > 0 ? "border-t border-white/10 sm:border-t-0" : ""} ${
              i % 2 === 1 ? "sm:border-l sm:border-white/10" : ""
            } ${i >= 2 ? "sm:border-t" : ""} ${i % 3 !== 0 ? "lg:border-l lg:border-white/10" : "lg:border-l-0"} ${
              i >= 3 ? "lg:border-t" : "lg:border-t-0"
            }`}
          >
            <Label>{group.label}</Label>
            <p className="t-body mt-3 text-venice-200/70">{group.items.join(" · ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
