import { notFound } from "next/navigation";
import { ogCard, ogSize } from "@/lib/og-card";
import { practiceBySlug, practiceHref, practices } from "@/content/services";
import { site } from "@/content/site";

/** A share card per practice, so a link to one doesn't preview as the homepage. */
export const alt = `${site.name} — services`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return practices.map((p) => ({ slug: p.slug }));
}

export default async function PracticeOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const practice = practiceBySlug(slug);
  if (!practice) notFound();
  return ogCard({
    eyebrow: `Services · ${practice.number}`,
    headline: practice.name,
    accent: practice.question,
    accentSize: 64,
    path: practiceHref(practice),
  });
}
