"use client";

import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/actions";
import {
  AppButton,
  AppContainer,
  BodyCopy,
  FieldError,
  Muted,
} from "@/components/ui/Primitives";
import { BRAND, FOOTER_NAVIGATION, SOCIAL_LINKS } from "@/constants/config";
import { brandColors } from "@/styles/theme";

const initialState = {
  ok: false,
  message: "",
};

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  const theme = useTheme();
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState,
  );

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
            {BRAND.name}
          </Typography>
          <BodyCopy sx={{ maxWidth: 420 }}>
            {BRAND.description} Designed in {BRAND.location} for modern daily
            movement.
          </BodyCopy>
          <Box
            action={formAction}
            component="form"
            sx={{ display: "grid", gap: 2, mt: 2.75 }}
          >
            <TextField
              name="email"
              placeholder="Email address"
              required
              type="email"
            />
            <FormControlLabel
              control={<Checkbox name="consent" required />}
              label="I agree to receive AMAMRE editorial emails and can unsubscribe at any time."
              sx={{
                alignItems: "flex-start",
                color: theme.palette.text.secondary,
                fontSize: "0.9rem",
                m: 0,
                "& .MuiFormControlLabel-label": { fontSize: "0.9rem" },
              }}
            />
            <AppButton disabled={pending} type="submit" variant="primary">
              {pending ? "Joining" : "Join the list"}
            </AppButton>
            {state.message ? (
              state.ok ? (
                <Muted>{state.message}</Muted>
              ) : (
                <FieldError>{state.message}</FieldError>
              )
            ) : null}
          </Box>
        </Box>

        <FooterColumn title="Shop" links={FOOTER_NAVIGATION.shop} />
        <FooterColumn title="Company" links={FOOTER_NAVIGATION.company} />
        <FooterColumn title="Support" links={FOOTER_NAVIGATION.support} />
        <FooterColumn title="Legal" links={FOOTER_NAVIGATION.legal} />
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
        <span>
          © {COPYRIGHT_YEAR} {BRAND.name}. All rights reserved.
        </span>
        <span>
          <a href={SOCIAL_LINKS.instagram}>Instagram</a> ·{" "}
          <a href={SOCIAL_LINKS.tiktok}>TikTok</a> ·{" "}
          <a href={SOCIAL_LINKS.youtube}>YouTube</a> ·{" "}
          <a href={SOCIAL_LINKS.linkedin}>LinkedIn</a>
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
  links: Array<{ title: string; href: string }>;
}) {
  const theme = useTheme();

  return (
    <Box>
      <Typography component="h4" sx={{ m: "0 0 14px", fontWeight: 700 }}>
        {title}
      </Typography>
      <Stack component="nav" spacing={1.25} aria-label={`${title} links`}>
        {links.map((link) => (
          <Typography
            component="a"
            href={link.href}
            key={link.href}
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "0.9rem",
              "&:hover": { color: theme.palette.text.primary },
            }}
          >
            {link.title}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
