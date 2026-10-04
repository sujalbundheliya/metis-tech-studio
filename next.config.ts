import type { NextConfig } from "next";

const GEN = "/services/generative-ai-rag";
const AGENT = "/services/agentic-ai-automation";
const SOFT = "/services/software-development";

/**
 * Retired service URLs → where that content lives now.
 *
 * The site used to have 22 service pages in four categories; services.md
 * reorganised them into three practice pages. Each old slug goes to the
 * section of the new page that covers the same ground, or to the services
 * index where the offering was dropped altogether (ML models, computer
 * vision, data engineering, MLOps…), so inbound links and search rankings
 * land somewhere sensible rather than on a 404.
 *
 * The short aliases at the end are older still — earlier drafts of the nav
 * used them — and point straight at the final destination rather than
 * chaining through a second redirect.
 */
const RETIRED_SERVICES: Record<string, string> = {
  "generative-ai": GEN,
  "ai-agents": `${AGENT}#ai-agent-development`,
  "machine-learning": "/services",
  "computer-vision": `${GEN}#multimodal-ai`,
  "natural-language-processing": `${GEN}#natural-language-processing`,
  "ai-strategy-consulting": "/services",
  "web-app-development": `${SOFT}#web-app-development`,
  "mobile-app-development": `${SOFT}#mobile-app-development`,
  "custom-software": `${SOFT}#custom-software-development`,
  "saas-product-development": `${SOFT}#saas-development`,
  "api-development-integration": `${SOFT}#api-development-integration`,
  "ui-ux-design": SOFT,
  "chatbots-assistants": `${GEN}#ai-chatbots-assistants`,
  "document-processing": `${GEN}#intelligent-document-processing`,
  "workflow-automation": `${AGENT}#workflow-automation`,
  "knowledge-search-rag": `${GEN}#rag-development`,
  "recommendation-systems": "/services",
  "data-engineering": "/services",
  "data-science-analytics": `${SOFT}#dashboards-business-intelligence`,
  "predictive-analytics": "/services",
  "mlops-monitoring": "/services",
  "cloud-devops": "/services",

  // older aliases
  nlp: `${GEN}#natural-language-processing`,
  "ai-strategy": "/services",
  "saas-development": `${SOFT}#saas-development`,
  "api-development": `${SOFT}#api-development-integration`,
  "knowledge-search": `${GEN}#enterprise-knowledge-search`,
  mlops: "/services",
  "data-analytics": `${SOFT}#dashboards-business-intelligence`,
  "machine-learning-models": "/services",
};

const nextConfig: NextConfig = {
  // Hides the floating dev badge. Compile and runtime errors still surface.
  devIndicators: false,

  async redirects() {
    return [
      // How we work — hidden for now. `/how-we-work` isn't built yet; this sent
      // people to the process section on the homepage. Restore it along with
      // the nav/footer links, or delete once the standalone page exists.
      // { source: "/how-we-work", destination: "/#process", permanent: false },

      ...Object.entries(RETIRED_SERVICES).map(([slug, destination]) => ({
        source: `/services/${slug}`,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
