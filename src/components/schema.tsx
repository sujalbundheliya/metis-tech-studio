import { faq, placeholders, site } from "@/content/site";
import { practices, type Practice } from "@/content/services";

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
    makesOffer: practices.map((p) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: p.name,
        url: `${site.url}/services/${p.slug}`,
        description: p.metaDescription,
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

/** One practice page as a Service, with its eight offerings as a catalogue. */
export function ServiceSchema({ practice }: { practice: Practice }) {
  const url = `${site.url}/services/${practice.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: practice.name,
    serviceType: practice.name,
    description: practice.metaDescription,
    url,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: practice.name,
      itemListElement: practice.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.body, url: `${url}#${s.id}` },
      })),
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
