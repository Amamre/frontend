import {
  AppContainer,
  BodyCopy,
  Eyebrow,
  Headline,
  PageSection,
  Surface,
} from "@/components/ui/Primitives";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Profile",
  description: "AMAMRE customer profile settings.",
  path: "/account/profile",
  noIndex: true,
});

export default function ProfilePage() {
  return (
    <PageSection>
      <AppContainer sx={{ maxWidth: 860 }}>
        <Eyebrow>Profile</Eyebrow>
        <Headline>Profile and consent preferences</Headline>
        <Surface sx={{ mt: 4 }}>
          <BodyCopy>
            This page is structured for account preferences, address management,
            marketing consent, GDPR data export, and deletion requests. Connect
            Shopify Customer Accounts or your chosen auth provider before
            launch.
          </BodyCopy>
        </Surface>
      </AppContainer>
    </PageSection>
  );
}
