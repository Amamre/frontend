import { EditorialNewsletterSection } from "@/components/sections/editorial-newsletter-section";
import {
  CollectionEditorialSection,
  FeaturedProductsSection,
  HeroSection,
  ValuePropositionSection,
} from "@/components/sections/HomeHero";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({ path: "/" });
}

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
