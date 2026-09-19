import { faq, placeholders, site } from "@/content/site";
import { allServices } from "@/content/services";

/** Organization schema — only asserts values we actually have. */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    email: placeholders.email,
    ...(placeholders.phone && { telephone: placeholders.phone }),
    ...(placeholders.location && {
      address: { "@type": "PostalAddress", addressLocality: placeholders.location },
    }),
    makesOffer: allServices.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        url: `${site.url}/services/${s.slug}`,
        description: s.metaDescription,
      },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function FaqSchema({ items }: { items?: { q: string; a: string }[] }) {
  const source = items ?? faq.items;
  if (source.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: source.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BreadcrumbSchema({ trail }: { trail: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.url}`,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
