import {
  AppContainer,
  BodyCopy,
  ContentGrid,
  EditorialCard,
  Eyebrow,
  Headline,
  PageSection,
  SectionHeading,
  Subhead,
} from "@/components/ui/Primitives";
import { createMetadata } from "@/lib/seo";
import { Box } from "@mui/material";

export const metadata = createMetadata({
  title: "Account",
  description:
    "AMAMBRA account area for orders, profile, wishlist, and returns.",
  path: "/account",
  noIndex: true,
});

export default function AccountPage() {
  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>Account</Eyebrow>
            <Headline>Client account center</Headline>
          </Box>
          <Subhead>
            Ready for Shopify Customer Account API or a headless auth provider.
          </Subhead>
        </SectionHeading>
        <ContentGrid>
          {[
            {
              title: "Orders",
              body: "View order status, tracking, returns, and receipts.",
              href: "/account/orders",
            },
            {
              title: "Profile",
              body: "Manage email, address book, preferences, and GDPR export.",
              href: "/account/profile",
            },
            {
              title: "Wishlist",
              body: "Return to saved AMAMBRA pieces before checkout.",
              href: "/wishlist",
            },
          ].map((item) => (
            <EditorialCard href={item.href} key={item.title}>
              <Eyebrow>{item.title}</Eyebrow>
              <BodyCopy>{item.body}</BodyCopy>
            </EditorialCard>
          ))}
        </ContentGrid>
      </AppContainer>
    </PageSection>
  );
}
