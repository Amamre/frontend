"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/actions";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { brandColors, transitions } from "@/styles/theme";

type NewsletterFormProps = {
  source: string;
};

const initialState = {
  ok: false,
  message: "",
};

export function NewsletterForm({ source }: NewsletterFormProps) {
  const t = useTypedTranslations("newsletter");
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState,
  );

  return (
    <Box action={formAction} component="form" sx={{ width: "100%" }}>
      <input name="country" type="hidden" value="DE" />
      <input name="source" type="hidden" value={source} />
      <Stack spacing={1.4}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
          <TextField
            fullWidth
            id={`newsletter-${source}`}
            name="email"
            placeholder={t("emailPlaceholder")}
            required
            slotProps={{
              htmlInput: { "aria-label": t("emailAria") },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                minHeight: 58,
                borderRadius: "8px",
                color: brandColors.ivory,
                background: "rgba(9, 9, 8, 0.68)",
                transition: `border-color 220ms ${transitions.ease}, background 220ms ${transitions.ease}, box-shadow 220ms ${transitions.ease}`,
                "& fieldset": {
                  borderColor: "rgba(250, 248, 241, 0.16)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(216, 198, 165, 0.46)",
                },
                "&.Mui-focused": {
                  background: "rgba(9, 9, 8, 0.88)",
                  boxShadow: "0 0 0 3px rgba(216, 198, 165, 0.12)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(216, 198, 165, 0.82)",
                },
              },
              "& input": {
                px: 2,
                fontSize: "0.92rem",
                letterSpacing: "0.02em",
              },
              "& input::placeholder": {
                color: "rgba(250, 248, 241, 0.52)",
                opacity: 1,
              },
            }}
            type="email"
          />
          <Button
            disabled={pending}
            endIcon={<ArrowForwardIcon fontSize="small" />}
            sx={{
              minHeight: 58,
              minWidth: { xs: "100%", sm: 178 },
              border: "1px solid rgba(229, 210, 176, 0.84)",
              borderRadius: "8px",
              color: brandColors.obsidian,
              background: "#e5d2b0",
              fontSize: "0.76rem",
              fontWeight: 900,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              transition: `border-color 220ms ${transitions.ease}, background 220ms ${transitions.ease}, transform 220ms ${transitions.ease}`,
              "&:hover": {
                borderColor: "rgba(229, 210, 176, 1)",
                background: "#efdcbc",
                transform: "translateY(-1px)",
              },
              "&:focus-visible": {
                outline: "none",
                boxShadow: "0 0 0 3px rgba(216, 198, 165, 0.18)",
              },
            }}
            type="submit"
          >
            {pending ? t("actions.joining") : t("actions.join")}
          </Button>
        </Stack>

        <FormControlLabel
          control={
            <Checkbox
              name="consent"
              required
              sx={{
                color: "rgba(216, 198, 165, 0.46)",
                "&.Mui-checked": { color: "#e5d2b0" },
              }}
            />
          }
          label={t("consent")}
          sx={{
            alignItems: "flex-start",
            color: "rgba(250, 248, 241, 0.62)",
            m: 0,
            "& .MuiFormControlLabel-label": {
              fontSize: "0.78rem",
              lineHeight: 1.55,
            },
          }}
        />

        {state.message ? (
          <Typography
            aria-live="polite"
            component="output"
            sx={{
              color: state.ok ? "rgba(216, 198, 165, 0.86)" : brandColors.error,
              fontSize: "0.84rem",
              lineHeight: 1.5,
            }}
          >
            {state.message}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
}
