"use client";

import type { ButtonProps as MuiButtonProps } from "@mui/material";
import { AppButton } from "@/components/ui/Primitives";

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
  return (
    <AppButton
      disabled={disabled || loading}
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      {...props}
    >
      {loading ? "Loading" : children}
    </AppButton>
  );
}
