import type { TranslationValues } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Messages } from "./messages";
import type { NamespaceKeys } from "./typed";

export async function getTypedTranslations<N extends keyof Messages>(
  namespace: N,
) {
  const t = await getTranslations(namespace as string);

  return <K extends NamespaceKeys<N>>(key: K, values?: TranslationValues) =>
    t(key as string, values);
}
