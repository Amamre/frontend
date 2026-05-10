import {
  AppContainer,
  BodyCopy,
  Eyebrow,
  Headline,
  PageSection,
  Surface,
} from "@/components/ui/Primitives";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.profileDescription",
    noIndex: true,
    path: "/account/profile",
    titleKey: "pages.profileTitle",
  });
}

export default async function ProfilePage() {
  const account = await getTypedTranslations("account");

  return (
    <PageSection>
      <AppContainer sx={{ maxWidth: 860 }}>
        <Eyebrow>{account("profile.eyebrow")}</Eyebrow>
        <Headline>{account("profile.headline")}</Headline>
        <Surface sx={{ mt: 4 }}>
          <BodyCopy>{account("profile.body")}</BodyCopy>
        </Surface>
      </AppContainer>
    </PageSection>
  );
}
