"use client";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import {
  AppBar,
  alpha,
  Box,
  Collapse,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { type ElementType, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AppContainer, IconAction } from "@/components/ui/Primitives";
import { useIsMounted } from "@/hooks/useUtils";
import { Link, usePathname } from "@/i18n/navigation";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { brandColors, transitions } from "@/styles/theme";

const MAIN_NAVIGATION = [
  { href: "/shop", key: "shop" },
  { href: "/collections", key: "collections" },
  { href: "/about", key: "about" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

const COLLECTION_LINKS = [
  { slug: "signature", key: "signature" },
  { slug: "heritage", key: "heritage" },
  { slug: "essentials", key: "essentials" },
  { slug: "atelier", key: "atelier" },
] as const;

export function Header() {
  const pathname = usePathname();
  const theme = useTheme();
  const common = useTypedTranslations("common");
  const navbar = useTypedTranslations("navbar");
  const catalog = useTypedTranslations("catalog");
  const [open, setOpen] = useState(false);
  const mounted = useIsMounted();
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.getItemCount());
  const visibleCartCount = mounted ? cartCount : 0;
  const visibleWishlistCount = mounted ? wishlistCount : 0;

  const close = () => setOpen(false);

  return (
    <AppBar
      component="header"
      elevation={0}
      position="fixed"
      sx={{
        top: "var(--ticker-height)",
        height: "var(--nav-height)",
        borderBottom: `1px solid ${brandColors.border}`,
        background: "rgba(9, 9, 8, 0.78)",
        backdropFilter: "blur(18px)",
      }}
    >
      <AppContainer
        sx={{
          display: "grid",
          height: "100%",
          gridTemplateColumns: { xs: "auto 1fr auto", md: "1fr auto 1fr" },
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography
          aria-label={common("aria.home")}
          component={Link}
          href="/"
          sx={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: "1.4rem",
            fontWeight: 600,
            letterSpacing: 0,
          }}
        >
          {common("brand.name")}
        </Typography>

        <Stack
          aria-label={common("aria.primaryNavigation")}
          component="nav"
          direction="row"
          spacing={4.5}
          sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}
        >
          {MAIN_NAVIGATION.map((item) => (
            <Typography
              component={Link}
              href={item.href}
              key={item.href}
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                width: "fit-content",

                color:
                  pathname === item.href
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,

                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                textDecoration: "none",

                transition: `color 240ms ${transitions.ease}`,

                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: "-7px",
                  height: "0.5px",

                  width: "100%",

                  backgroundColor: alpha(brandColors.goldSoft, 0.78),

                  transform: pathname === item.href ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left center",

                  transition: `transform 320ms ${transitions.ease}`,
                },

                "&:hover": {
                  color: alpha(brandColors.goldSoft, 0.92),

                  "&::after": {
                    transform: "scaleX(1)",
                  },
                },

                "&:focus-visible": {
                  outline: `2px solid ${alpha(brandColors.goldSoft, 0.72)}`,
                  outlineOffset: "6px",
                },
              }}
            >
              {navbar(`items.${item.key}.title`)}
            </Typography>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1.25}
          sx={{
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" }, mr: 0.5 }}>
            <LanguageSwitcher />
          </Box>
          <IconAction
            component={Link as ElementType}
            href="/search"
            aria-label={common("aria.search")}
          >
            <SearchIcon fontSize="small" />
          </IconAction>
          <IconAction
            component={Link as ElementType}
            href="/account"
            aria-label={common("aria.account")}
          >
            <AccountCircleOutlinedIcon fontSize="small" />
          </IconAction>
          <IconAction
            badgeContent={visibleWishlistCount}
            component={Link as ElementType}
            href="/wishlist"
            aria-label={common("aria.wishlistWithCount", {
              count: visibleWishlistCount,
            })}
          >
            <FavoriteBorderIcon fontSize="small" />
          </IconAction>
          <IconAction
            badgeContent={visibleCartCount}
            component={Link as ElementType}
            href="/cart"
            aria-label={common("aria.cartWithCount", {
              count: visibleCartCount,
            })}
          >
            <ShoppingBagOutlinedIcon fontSize="small" />
          </IconAction>
          <IconAction
            aria-label={
              open ? common("aria.closeMenu") : common("aria.openMenu")
            }
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            {open ? (
              <CloseIcon fontSize="small" />
            ) : (
              <MenuIcon fontSize="small" />
            )}
          </IconAction>
        </Stack>
      </AppContainer>

      <Collapse in={open} timeout={220} unmountOnExit>
        <Box
          aria-label={common("aria.mobileNavigation")}
          component="nav"
          data-testid="mobile-menu"
          sx={{
            position: "fixed",
            inset: "var(--header-height) 0 auto",
            zIndex: 35,
            display: "grid",
            gap: 1,
            borderBottom: `1px solid ${brandColors.border}`,
            p: "20px 16px 28px",
            background: "rgba(9, 9, 8, 0.98)",
            "& a": {
              borderBottom: `1px solid ${brandColors.border}`,
              py: 2,
              color: theme.palette.text.primary,
              fontSize: "1.2rem",
            },
          }}
        >
          {MAIN_NAVIGATION.map((item) => (
            <Link href={item.href} key={item.href} onClick={close}>
              {navbar(`items.${item.key}.title`)}
            </Link>
          ))}
          {COLLECTION_LINKS.map((collection) => (
            <Link
              href={`/collections/${collection.slug}`}
              key={collection.slug}
              onClick={close}
            >
              {catalog(`collections.${collection.key}.shortTitle`)}
            </Link>
          ))}
          <LanguageSwitcher variant="mobile" onLocaleChange={close} />
        </Box>
      </Collapse>
    </AppBar>
  );
}
