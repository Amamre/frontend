"use client";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import {
  AppBar,
  Box,
  Collapse,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ElementType, useState } from "react";
import { AppContainer, IconAction } from "@/components/ui/Primitives";
import { BRAND, COLLECTIONS, MAIN_NAVIGATION } from "@/constants/config";
import { useIsMounted } from "@/hooks/useUtils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { brandColors } from "@/styles/theme";

export function Header() {
  const pathname = usePathname();
  const theme = useTheme();
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
          aria-label="AMAMRE home"
          component={Link}
          href="/"
          sx={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: "1.4rem",
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          {BRAND.name}
        </Typography>

        <Stack
          aria-label="Primary navigation"
          component="nav"
          direction="row"
          spacing={3.5}
          sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}
        >
          {MAIN_NAVIGATION.map((item) => (
            <Typography
              component={Link}
              href={item.href}
              key={item.href}
              sx={{
                color:
                  pathname === item.href
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                fontSize: "0.86rem",
                fontWeight: 700,
                transition: "color 180ms cubic-bezier(0.22, 1, 0.36, 1)",
                "&:hover": { color: theme.palette.text.primary },
              }}
            >
              {item.title}
            </Typography>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1.25}
          sx={{ justifyContent: "flex-end" }}
        >
          <IconAction
            component={Link as ElementType}
            href="/search"
            aria-label="Search"
          >
            <SearchIcon fontSize="small" />
          </IconAction>
          <IconAction
            component={Link as ElementType}
            href="/account"
            aria-label="Account"
          >
            <AccountCircleOutlinedIcon fontSize="small" />
          </IconAction>
          <IconAction
            badgeContent={visibleWishlistCount}
            component={Link as ElementType}
            href="/wishlist"
            aria-label={`Wishlist with ${visibleWishlistCount} items`}
          >
            <FavoriteBorderIcon fontSize="small" />
          </IconAction>
          <IconAction
            badgeContent={visibleCartCount}
            component={Link as ElementType}
            href="/cart"
            aria-label={`Cart with ${visibleCartCount} items`}
          >
            <ShoppingBagOutlinedIcon fontSize="small" />
          </IconAction>
          <IconAction
            aria-label={open ? "Close menu" : "Open menu"}
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
          aria-label="Mobile navigation"
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
              {item.title}
            </Link>
          ))}
          {COLLECTIONS.map((collection) => (
            <Link
              href={`/collections/${collection.slug}`}
              key={collection.slug}
              onClick={close}
            >
              {collection.name}
            </Link>
          ))}
        </Box>
      </Collapse>
    </AppBar>
  );
}
