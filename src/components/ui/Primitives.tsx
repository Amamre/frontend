"use client";

import type {
  BoxProps,
  ButtonProps as MuiButtonProps,
  CardProps as MuiCardProps,
  IconButtonProps as MuiIconButtonProps,
  StackProps,
  TypographyProps,
} from "@mui/material";
import {
  Badge,
  Box,
  Button as MuiButton,
  Card as MuiCard,
  IconButton as MuiIconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import NextLink from "next/link";
import type { ElementType, ReactNode } from "react";
import { brandColors, shadows, transitions } from "@/styles/theme";

const sxList = (sx?: SxProps<Theme>) =>
  Array.isArray(sx) ? sx : sx ? [sx] : [];

export function MainShell({ children }: { children: ReactNode }) {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", pt: "var(--header-height)" }}
    >
      {children}
    </Box>
  );
}

export function PageSection({
  children,
  sx,
  tight = false,
  ...props
}: BoxProps & { tight?: boolean }) {
  useTheme();

  return (
    <Box
      component="section"
      sx={[
        {
          py: { xs: tight ? 5 : 6.5, md: tight ? 5 : 9 },
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}

export function AppContainer({ children, sx, ...props }: BoxProps) {
  useTheme();

  return (
    <Box
      sx={[
        {
          width: {
            xs: "min(100% - 24px, var(--container))",
            sm: "min(100% - 32px, var(--container))",
          },
          mx: "auto",
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}

export function SectionHeading({ children, sx, ...props }: StackProps) {
  useTheme();

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={3}
      sx={[
        {
          alignItems: { xs: "flex-start", md: "flex-end" },
          justifyContent: "space-between",
          mb: 4.25,
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Stack>
  );
}

export function Eyebrow({ children, sx, ...props }: TypographyProps) {
  const muiTheme = useTheme();

  return (
    <Typography
      component="p"
      sx={[
        {
          m: "0 0 14px",
          color: muiTheme.palette.primary.light,
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: 0,
          textTransform: "uppercase",
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function DisplayHeading({ children, sx, ...props }: TypographyProps) {
  useTheme();

  return (
    <Typography
      component="h1"
      sx={[
        {
          m: 0,
          maxWidth: 980,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: { xs: "2.72rem", md: "3.55rem", lg: "4.85rem" },
          fontWeight: 500,
          letterSpacing: 0,
          lineHeight: { xs: 1, md: 0.96 },
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Headline({
  children,
  sx,
  component = "h1",
  ...props
}: TypographyProps) {
  useTheme();

  return (
    <Typography
      component={component}
      sx={[
        {
          m: 0,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: { xs: "2rem", md: "2.3rem", lg: "3rem" },
          fontWeight: 500,
          letterSpacing: 0,
          lineHeight: 1.04,
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Subhead({ children, sx, ...props }: TypographyProps) {
  const muiTheme = useTheme();

  return (
    <Typography
      component="p"
      sx={[
        {
          m: 0,
          maxWidth: 680,
          color: muiTheme.palette.text.secondary,
          fontSize: { xs: "0.98rem", md: "1.05rem" },
          lineHeight: 1.75,
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function BodyCopy({ children, sx, ...props }: TypographyProps) {
  const muiTheme = useTheme();

  return (
    <Typography
      component="p"
      sx={[
        { color: muiTheme.palette.text.secondary, lineHeight: 1.8 },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Muted({ children, sx, ...props }: TypographyProps) {
  const muiTheme = useTheme();

  return (
    <Typography
      component="span"
      sx={[{ color: muiTheme.palette.text.secondary }, ...sxList(sx)]}
      {...props}
    >
      {children}
    </Typography>
  );
}

type AppButtonProps = Omit<MuiButtonProps<ElementType>, "variant"> & {
  component?: ElementType;
  href?: string;
  variant?: "primary" | "secondary" | "text";
};

export function AppButton({
  component,
  href,
  variant = "secondary",
  sx,
  ...props
}: AppButtonProps) {
  const muiTheme = useTheme();
  const muiVariant =
    variant === "primary"
      ? "contained"
      : variant === "text"
        ? "text"
        : "outlined";
  const buttonSx = [
    {
      color:
        variant === "primary"
          ? brandColors.obsidian
          : muiTheme.palette.text.primary,
    },
    ...sxList(sx),
  ];

  if (href?.startsWith("/")) {
    return (
      <MuiButton
        component={NextLink}
        href={href}
        variant={muiVariant}
        sx={buttonSx}
        {...props}
      />
    );
  }

  if (component) {
    return (
      <MuiButton
        component={component}
        href={href}
        variant={muiVariant}
        sx={buttonSx}
        {...props}
      />
    );
  }

  if (href) {
    return (
      <MuiButton href={href} variant={muiVariant} sx={buttonSx} {...props} />
    );
  }

  return <MuiButton variant={muiVariant} sx={buttonSx} {...props} />;
}

type IconActionProps = MuiIconButtonProps & {
  badgeContent?: number;
  component?: ElementType;
  href?: string;
};

export function IconAction({
  badgeContent,
  children,
  sx,
  ...props
}: IconActionProps) {
  useTheme();
  const button = (
    <MuiIconButton sx={[{ position: "relative" }, ...sxList(sx)]} {...props}>
      {children}
    </MuiIconButton>
  );

  if (!badgeContent) {
    return button;
  }

  return (
    <Badge
      badgeContent={badgeContent}
      sx={{
        "& .MuiBadge-badge": {
          top: 2,
          right: 2,
          minWidth: 18,
          height: 18,
          borderRadius: "999px",
          color: brandColors.obsidian,
          background: brandColors.goldSoft,
          fontSize: "0.68rem",
          fontWeight: 800,
        },
      }}
    >
      {button}
    </Badge>
  );
}

type SurfaceProps = MuiCardProps & {
  component?: ElementType;
  href?: string;
  padded?: boolean;
};

export function Surface({
  children,
  padded = true,
  sx,
  ...props
}: SurfaceProps) {
  useTheme();

  return (
    <MuiCard
      sx={[
        {
          p: padded ? 3 : 0,
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </MuiCard>
  );
}

export function EditorialCard({ children, sx, ...props }: SurfaceProps) {
  useTheme();

  return (
    <Surface
      padded
      sx={[
        {
          minHeight: 280,
          background:
            "linear-gradient(145deg, rgba(184, 149, 106, 0.14), transparent 44%), rgba(17, 16, 14, 0.86)",
          boxShadow: "none",
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Surface>
  );
}

export function SplitLayout({ children, sx, ...props }: BoxProps) {
  useTheme();

  return (
    <Box
      sx={[
        {
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) minmax(320px, 0.82fr)",
          },
          gap: 4.25,
          alignItems: "start",
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}

export function ProductGrid({ children, sx, ...props }: BoxProps) {
  useTheme();

  return (
    <Box
      sx={[
        {
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2.25,
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}

export function ContentGrid({ children, sx, ...props }: BoxProps) {
  useTheme();

  return (
    <Box
      sx={[
        {
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: 2.25,
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}

export function FormStack({ children, sx, ...props }: StackProps) {
  useTheme();

  return (
    <Stack spacing={2} sx={sx} {...props}>
      {children}
    </Stack>
  );
}

export function FormGrid({ children, sx, ...props }: BoxProps) {
  useTheme();

  return (
    <Box
      sx={[
        {
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}

export function FieldTitle({ children, sx, ...props }: TypographyProps) {
  useTheme();

  return (
    <Typography
      component="span"
      sx={[
        {
          display: "block",
          mb: 0.8,
          fontSize: "0.8rem",
          fontWeight: 800,
          textTransform: "uppercase",
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function FieldError({ children, sx, ...props }: TypographyProps) {
  return (
    <Typography
      component="p"
      sx={[
        { mt: 0.75, color: brandColors.error, fontSize: "0.78rem" },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function DividerLine({ sx, ...props }: BoxProps) {
  useTheme();

  return (
    <Box
      sx={[
        { width: "100%", height: "1px", background: brandColors.border },
        ...sxList(sx),
      ]}
      {...props}
    />
  );
}

export function Swatch({ color, sx, ...props }: BoxProps & { color: string }) {
  useTheme();

  return (
    <Box
      component="span"
      sx={[
        {
          display: "block",
          width: 18,
          height: 18,
          border: "1px solid rgba(250, 248, 241, 0.34)",
          borderRadius: "999px",
          backgroundColor: color,
          flex: "0 0 auto",
        },
        ...sxList(sx),
      ]}
      {...props}
    />
  );
}

export function EmptyState({ children, sx, ...props }: SurfaceProps) {
  useTheme();

  return (
    <PageSection>
      <AppContainer>
        <Surface
          sx={[
            {
              display: "grid",
              minHeight: 420,
              placeItems: "center",
              textAlign: "center",
              "& > *": { maxWidth: 560 },
            },
            ...sxList(sx),
          ]}
          {...props}
        >
          {children}
        </Surface>
      </AppContainer>
    </PageSection>
  );
}

export function ImageFrame({ children, sx, ...props }: BoxProps) {
  useTheme();

  return (
    <Box
      sx={[
        {
          position: "relative",
          overflow: "hidden",
          border: `1px solid ${brandColors.border}`,
          borderRadius: 2,
          aspectRatio: "4 / 5",
          background: brandColors.charcoal,
          "& img": { objectFit: "cover" },
        },
        ...sxList(sx),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}

export function productCardSx() {
  return {
    position: "relative",
    display: "grid",
    minHeight: "100%",
    gridTemplateRows: "auto 1fr",
    overflow: "hidden",
    border: `1px solid ${brandColors.border}`,
    borderRadius: 2,
    background: "rgba(17, 16, 14, 0.72)",
    color: "inherit",
    textAlign: "left",
    transition: `transform 240ms ${transitions.ease}, border-color 240ms ${transitions.ease}, box-shadow 240ms ${transitions.ease}`,
    "&:hover": {
      borderColor: "rgba(216, 198, 165, 0.45)",
      boxShadow: shadows.soft,
      transform: "translateY(-4px)",
    },
    "&:hover img": {
      transform: "scale(1.04)",
    },
  };
}
