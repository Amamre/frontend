"use client";

import { type TranslationValues, useTranslations } from "next-intl";
import type { Messages } from "./messages";
import type { NamespaceKeys } from "./typed";

export function useTypedTranslations<N extends keyof Messages>(namespace: N) {
  const t = useTranslations(namespace as string);

  return <K extends NamespaceKeys<N>>(key: K, values?: TranslationValues) =>
    t(key as string, values);
}
