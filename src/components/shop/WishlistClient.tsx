"use client";

import { Box } from "@mui/material";
import ProductCard from "@/components/product/ProductCard";
import {
  AppButton,
  AppContainer,
  BodyCopy,
  EmptyState,
  Eyebrow,
  Headline,
  PageSection,
  ProductGrid,
  SectionHeading,
  Subhead,
} from "@/components/ui/Primitives";
import { useWishlistStore } from "@/store/wishlistStore";

export function WishlistClient() {
  const items = useWishlistStore((state) => state.items);

  if (items.length === 0) {
    return (
      <EmptyState>
        <div>
          <Eyebrow>Wishlist</Eyebrow>
          <Headline>No saved pieces yet.</Headline>
          <BodyCopy>
            Save products while you browse and return to them before checkout.
          </BodyCopy>
          <AppButton href="/shop" variant="primary">
            Explore collection
          </AppButton>
        </div>
      </EmptyState>
    );
  }

  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>Wishlist</Eyebrow>
            <Headline>Saved pieces</Headline>
          </Box>
          <Subhead>{items.length} AMAMRE pieces saved.</Subhead>
        </SectionHeading>
        <ProductGrid>
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </AppContainer>
    </PageSection>
  );
}
