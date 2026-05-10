import {
  AppButton,
  BodyCopy,
  EmptyState,
  Eyebrow,
  Headline,
} from "@/components/ui/Primitives";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.ordersDescription",
    noIndex: true,
    path: "/account/orders",
    titleKey: "pages.ordersTitle",
  });
}

export default async function OrdersPage() {
  const account = await getTypedTranslations("account");
  const common = await getTypedTranslations("common");

  return (
    <EmptyState>
      <div>
        <Eyebrow>{account("orders.eyebrow")}</Eyebrow>
        <Headline>{account("orders.headline")}</Headline>
        <BodyCopy>{account("orders.body")}</BodyCopy>
        <AppButton href="/shop" variant="primary">
          {common("actions.shopAmambra")}
        </AppButton>
      </div>
    </EmptyState>
  );
}
