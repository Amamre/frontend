import MuiContainer, {
  type ContainerProps as MuiContainerProps,
} from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type ContainerProps = Omit<MuiContainerProps, "maxWidth"> & {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const maxWidths: Record<
  NonNullable<ContainerProps["size"]>,
  MuiContainerProps["maxWidth"]
> = {
  sm: "md",
  md: "lg",
  lg: "lg",
  xl: "xl",
  full: false,
};

const sxList = (sx?: SxProps<Theme>) =>
  Array.isArray(sx) ? sx : sx ? [sx] : [];

export function Container({
  children,
  size = "xl",
  sx,
  ...props
}: ContainerProps) {
  return (
    <MuiContainer
      maxWidth={maxWidths[size]}
      sx={[{ width: "100%", px: { xs: 3, sm: 4, md: 5 } }, ...sxList(sx)]}
      {...props}
    >
      {children}
    </MuiContainer>
  );
}
