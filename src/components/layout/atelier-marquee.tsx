const MARQUEE_ITEMS = [
  "ATELIER COLLECTION - LIMITED DROP",
  "MADE IN PORTUGAL & ITALY",
  "STUTTGART, DE",
  "SHIPPING ACROSS EUROPE",
  "SATIN-LINED ESSENTIALS",
  "CULTURE WITHOUT COSTUME",
  "ACCESSIBLE PREMIUM",
  "AMAMRE ATELIER",
] as const;

const marqueeRows = [
  { id: "primary", items: MARQUEE_ITEMS, hidden: false },
  { id: "duplicate", items: MARQUEE_ITEMS, hidden: true },
] as const;

export function AtelierMarquee() {
  return (
    <aside
      aria-label="AMAMRE atelier announcements"
      className="atelier-marquee"
    >
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
                {item}
              </span>
            ))}
          </span>
        ))}
      </div>
    </aside>
  );
}
