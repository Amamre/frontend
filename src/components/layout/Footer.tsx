"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { AppContainer, BodyCopy } from "@/components/ui/Primitives";
import { SOCIAL_LINKS } from "@/constants/config";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { brandColors } from "@/styles/theme";
import Link from "next/link";

const COPYRIGHT_YEAR = 2026;

const FOOTER_NAVIGATION = {
  shop: [
    { key: "newArrivals", href: "/shop?sort=newest" },
    { key: "bestsellers", href: "/shop?tag=bestseller" },
    { key: "hoodies", href: "/shop?category=hoodies" },
    { key: "tops", href: "/shop?category=tops" },
    { key: "accessories", href: "/shop?category=accessories" },
  ],
  company: [
    { key: "about", href: "/about" },
    { key: "collections", href: "/collections" },
    { key: "account", href: "/account" },
    { key: "contact", href: "/contact" },
  ],
  support: [
    { key: "faq", href: "/faq" },
    { key: "sizeGuide", href: "/size-guide" },
    { key: "shippingReturns", href: "/shipping-returns" },
    { key: "search", href: "/search" },
  ],
  legal: [
    { key: "imprint", href: "/imprint" },
    { key: "privacyPolicy", href: "/privacy-policy" },
    { key: "terms", href: "/terms" },
    { key: "cookies", href: "/cookies" },
    { key: "refundPolicy", href: "/refund-policy" },
    { key: "accessibility", href: "/accessibility" },
  ],
} as const;

type FooterLinkKey =
  (typeof FOOTER_NAVIGATION)[keyof typeof FOOTER_NAVIGATION][number]["key"];

export function Footer() {
  const theme = useTheme();
  const common = useTypedTranslations("common");
  const footer = useTypedTranslations("footer");

  return (
    <Box
      component="footer"
      sx={{
        mt: 9,
        pt: 5,
        borderTop: `1px solid ${brandColors.border}`,
        background:
          "linear-gradient(135deg, rgba(79, 95, 63, 0.18), transparent 38%), rgba(9, 9, 8, 0.94)",
      }}
    >
      <AppContainer
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "minmax(0, 1.6fr) repeat(4, minmax(120px, 1fr))",
          },
          gap: 4.25,
          py: "56px 36px",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            component="h3"
            sx={{
              m: "0 0 14px",

              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: "1.4rem",
              fontWeight: 700,
            }}
          >
            {common("brand.name")}
          </Typography>
          <BodyCopy sx={{ maxWidth: 420 }}>
            {footer("description", {
              description: common("brand.description"),
              location: common("brand.location"),
            })}
          </BodyCopy>
        </Box>

        <FooterColumn
          title={footer("columns.shop")}
          links={FOOTER_NAVIGATION.shop}
        />
        <FooterColumn
          title={footer("columns.company")}
          links={FOOTER_NAVIGATION.company}
        />
        <FooterColumn
          title={footer("columns.support")}
          links={FOOTER_NAVIGATION.support}
        />
        <FooterColumn
          title={footer("columns.legal")}
          links={FOOTER_NAVIGATION.legal}
        />
      </AppContainer>

      <AppContainer
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
          borderTop: `1px solid ${brandColors.border}`,
          py: 2.5,
          color: theme.palette.text.secondary,
          fontSize: "0.82rem",
        }}
      >
        <span>{footer("copyright", { year: COPYRIGHT_YEAR })}</span>
        <span>
          <a
            href={SOCIAL_LINKS.instagram}
            rel="noreferrer noopener"
            target="_blank"
          >
            Instagram
          </a>{" "}
          ·{" "}
          <a
            href={SOCIAL_LINKS.tiktok}
            rel="noreferrer noopener"
            target="_blank"
          >
            TikTok
          </a>{" "}
          ·{" "}
          <a
            href={SOCIAL_LINKS.youtube}
            rel="noreferrer noopener"
            target="_blank"
          >
            YouTube
          </a>{" "}
          ·{" "}
          <a
            href={SOCIAL_LINKS.linkedin}
            rel="noreferrer noopener"
            target="_blank"
          >
            LinkedIn
          </a>
        </span>
      </AppContainer>
    </Box>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ key: FooterLinkKey; href: string }>;
}) {
  const theme = useTheme();
  const common = useTypedTranslations("common");
  const footer = useTypedTranslations("footer");

  return (
    <Box>
      <Typography component="h4" sx={{ m: "0 0 14px", fontWeight: 700 }}>
        {title}
      </Typography>
      <Stack
        component="nav"
        spacing={1.25}
        aria-label={common("aria.links", { title })}
      >
        {links.map((link) => (
          <Typography
            component={Link}
            href={link.href}
            key={link.href}
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "0.9rem",
              "&:hover": { color: theme.palette.text.primary },
            }}
          >
            {footer(`links.${link.key}`)}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
