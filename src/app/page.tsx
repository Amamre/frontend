import { EditorialNewsletterSection } from "@/components/sections/editorial-newsletter-section";
import {
  CollectionEditorialSection,
  FeaturedProductsSection,
  HeroSection,
  ValuePropositionSection,
} from "@/components/sections/HomeHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProductsSection />
      <CollectionEditorialSection />
      <ValuePropositionSection />
      <EditorialNewsletterSection />
    </>
  );
}
