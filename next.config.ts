import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the floating dev badge. Compile and runtime errors still surface.
  devIndicators: false,

  async redirects() {
    return [
      // `/about` and `/how-we-work` aren't built yet. Rather than leave the nav
      // pointing at 404s, send people to the closest real content on the
      // homepage. Delete these once the standalone pages exist.
      { source: "/about", destination: "/#why", permanent: false },
      { source: "/how-we-work", destination: "/#process", permanent: false },

      // Slug aliases — earlier drafts of the nav used these shorter forms, and
      // they may already exist in the wild.
      { source: "/services/nlp", destination: "/services/natural-language-processing", permanent: true },
      { source: "/services/ai-strategy", destination: "/services/ai-strategy-consulting", permanent: true },
      { source: "/services/saas-development", destination: "/services/saas-product-development", permanent: true },
      { source: "/services/api-development", destination: "/services/api-development-integration", permanent: true },
      { source: "/services/knowledge-search", destination: "/services/knowledge-search-rag", permanent: true },
      { source: "/services/mlops", destination: "/services/mlops-monitoring", permanent: true },
      { source: "/services/data-analytics", destination: "/services/data-science-analytics", permanent: true },
      { source: "/services/machine-learning-models", destination: "/services/machine-learning", permanent: true },
    ];
  },
};

export default nextConfig;
