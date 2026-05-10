export type Translator<K extends string = string> = (
  key: K,
  values?: Record<string, unknown>,
) => string;

export function formatEnum<K extends string>(
  t: Translator<K>,
  enumName: string,
  value: string | number | null | undefined,
): string {
  if (!value) return "-";

  const key = `${enumName}.${value}` as K;

  return t(key);
}
