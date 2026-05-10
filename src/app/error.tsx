"use client";

import { useEffect } from "react";
import {
  AppButton,
  BodyCopy,
  EmptyState,
  Eyebrow,
  Headline,
} from "@/components/ui/Primitives";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export default function ErrorBoundary({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const common = useTypedTranslations("common");
  const t = useTypedTranslations("errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState>
      <div>
        <Eyebrow>{t("boundary.eyebrow")}</Eyebrow>
        <Headline>{t("boundary.headline")}</Headline>
        <BodyCopy>
          {t("boundary.body", {
            digest: error.digest ?? common("states.unavailable"),
          })}
        </BodyCopy>
        <AppButton onClick={unstable_retry} type="button" variant="primary">
          {common("actions.tryAgain")}
        </AppButton>
      </div>
    </EmptyState>
  );
}
