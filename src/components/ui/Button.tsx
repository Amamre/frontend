"use client";

import type { ButtonProps as MuiButtonProps } from "@mui/material";
import { AppButton } from "@/components/ui/Primitives";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

export interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  disabled,
  fullWidth = false,
  loading = false,
  type = "button",
  variant = "secondary",
  ...props
}: ButtonProps) {
  const common = useTypedTranslations("common");

  return (
    <AppButton
      disabled={disabled || loading}
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      {...props}
    >
      {loading ? common("states.loading") : children}
    </AppButton>
  );
}
