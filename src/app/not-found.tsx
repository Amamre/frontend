import {
  AppButton,
  BodyCopy,
  EmptyState,
  Eyebrow,
  Headline,
} from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <EmptyState>
      <div>
        <Eyebrow>404</Eyebrow>
        <Headline>This page is not in the collection.</Headline>
        <BodyCopy sx={{ py: 2 }}>
          The route may have moved, or the product is no longer available.
        </BodyCopy>
        <AppButton href="/shop" variant="primary">
          Return to shop
        </AppButton>
      </div>
    </EmptyState>
  );
}
