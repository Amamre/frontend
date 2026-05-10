"use client";

import { useTypedTranslations } from "@/i18n/useTypedTranslations";

const MARQUEE_ITEMS = [
  "atelierCollection",
  "madeIn",
  "origin",
  "shipping",
  "essentials",
  "culture",
  "premium",
  "atelier",
] as const;

const marqueeRows = [
  { id: "primary", items: MARQUEE_ITEMS, hidden: false },
  { id: "duplicate", items: MARQUEE_ITEMS, hidden: true },
] as const;

export function AtelierMarquee() {
  const t = useTypedTranslations("navbar");

  return (
    <aside aria-label={t("marquee.announcements")} className="atelier-marquee">
      <div className="atelier-marquee__fade" />
      <div className="atelier-marquee__track">
        {marqueeRows.map((row) => (
          <span
            aria-hidden={row.hidden}
            className="atelier-marquee__row"
            key={row.id}
          >
            {row.items.map((item) => (
              <span className="atelier-marquee__item" key={item}>
                {t(`marquee.${item}`)}
              </span>
            ))}
          </span>
        ))}
      </div>
    </aside>
  );
}
