import {
  AppButton,
  BodyCopy,
  EmptyState,
  Eyebrow,
  Headline,
} from "@/components/ui/Primitives";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";

export default async function NotFound() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("errors");

  return (
    <EmptyState>
      <div>
        <Eyebrow>{t("notFound.eyebrow")}</Eyebrow>
        <Headline>{t("notFound.headline")}</Headline>
        <BodyCopy sx={{ py: 2 }}>{t("notFound.body")}</BodyCopy>
        <AppButton href="/shop" variant="primary">
          {common("actions.returnToShop")}
        </AppButton>
      </div>
    </EmptyState>
  );
}
