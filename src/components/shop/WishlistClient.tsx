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
import { useIsMounted } from "@/hooks/useUtils";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { useWishlistStore } from "@/store/wishlistStore";

export function WishlistClient() {
  const account = useTypedTranslations("account");
  const common = useTypedTranslations("common");
  const items = useWishlistStore((state) => state.items);
  const mounted = useIsMounted();
  const visibleItems = mounted ? items : [];

  if (visibleItems.length === 0) {
    return (
      <EmptyState>
        <div>
          <Eyebrow>{account("wishlist.emptyEyebrow")}</Eyebrow>
          <Headline>{account("wishlist.emptyHeadline")}</Headline>
          <BodyCopy sx={{ py: 2 }}>{account("wishlist.emptyBody")}</BodyCopy>
          <AppButton href="/shop" variant="primary">
            {common("actions.exploreCollection")}
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
            <Eyebrow>{account("wishlist.eyebrow")}</Eyebrow>
            <Headline>{account("wishlist.headline")}</Headline>
          </Box>
          <Subhead>
            {common("counts.savedPieces", { count: visibleItems.length })}
          </Subhead>
        </SectionHeading>
        <ProductGrid>
          {visibleItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </AppContainer>
    </PageSection>
  );
}
