import { Box } from "@mui/material";
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
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.accountDescription",
    noIndex: true,
    path: "/account",
    titleKey: "pages.accountTitle",
  });
}

export default async function AccountPage() {
  const account = await getTypedTranslations("account");

  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>{account("page.eyebrow")}</Eyebrow>
            <Headline>{account("page.headline")}</Headline>
          </Box>
          <Subhead>{account("page.body")}</Subhead>
        </SectionHeading>
        <ContentGrid>
          {[
            {
              title: account("cards.ordersTitle"),
              body: account("cards.ordersBody"),
              href: "/account/orders",
            },
            {
              title: account("cards.profileTitle"),
              body: account("cards.profileBody"),
              href: "/account/profile",
            },
            {
              title: account("cards.wishlistTitle"),
              body: account("cards.wishlistBody"),
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
