import siteConfig from "@/config/site.config";
import { content } from "@/config/content";
import { PortfolioRenderer } from "@/folio/core/renderer";

export default function Home() {
  return <PortfolioRenderer config={siteConfig} content={content} />;
}
