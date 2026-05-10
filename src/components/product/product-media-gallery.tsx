"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, Typography } from "@mui/material";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StickyThumbnailRail } from "@/components/product/sticky-thumbnail-rail";
import { IconAction } from "@/components/ui/Primitives";
import { IMAGE_CONFIG } from "@/constants/config";
import { brandColors, shadows, transitions } from "@/styles/theme";
import type { ProductColorOption, ProductImage } from "@/types";

type ProductMediaGalleryProps = {
  color: ProductColorOption;
  images: ProductImage[];
  productTitle: string;
};

const AUTOPLAY_INTERVAL_MS = 7200;
const AUTOPLAY_RESUME_MS = 12_000;

const imageTransition = {
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function ProductMediaGallery({
  color,
  images,
  productTitle,
}: ProductMediaGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const galleryImages = useMemo(() => images.slice(0, 12), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<ProductImage | null>(
    null,
  );
  const [hovered, setHovered] = useState(false);
  const [pageActive, setPageActive] = useState(true);
  const lastInteractionAt = useRef(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const activeImage = galleryImages[activeIndex] ?? galleryImages[0];

  const markInteraction = useCallback(() => {
    lastInteractionAt.current = Date.now();
  }, []);

  const goTo = useCallback(
    (index: number, interaction = true) => {
      if (!galleryImages.length) {
        return;
      }

      if (interaction) {
        markInteraction();
      }

      const nextIndex =
        ((index % galleryImages.length) + galleryImages.length) %
        galleryImages.length;
      setActiveIndex(nextIndex);
    },
    [galleryImages.length, markInteraction],
  );

  const moveBy = useCallback(
    (offset: number) => {
      goTo(activeIndex + offset);
    },
    [activeIndex, goTo],
  );

  useEffect(() => {
    setActiveIndex((index) =>
      Math.min(index, Math.max(galleryImages.length - 1, 0)),
    );
  }, [galleryImages.length]);

  useEffect(() => {
    const syncPageState = () => {
      setPageActive(document.visibilityState === "visible");
    };
    const pause = () => setPageActive(false);
    const resume = () => setPageActive(true);

    syncPageState();
    document.addEventListener("visibilitychange", syncPageState);
    window.addEventListener("blur", pause);
    window.addEventListener("focus", resume);

    return () => {
      document.removeEventListener("visibilitychange", syncPageState);
      window.removeEventListener("blur", pause);
      window.removeEventListener("focus", resume);
    };
  }, []);

  useEffect(() => {
    if (galleryImages.length <= 1 || prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      const recentlyTouched =
        Date.now() - lastInteractionAt.current < AUTOPLAY_RESUME_MS;

      if (hovered || !pageActive || recentlyTouched) {
        return;
      }

      setActiveIndex((index) => (index + 1) % galleryImages.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [galleryImages.length, hovered, pageActive, prefersReducedMotion]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") {
      return;
    }

    markInteraction();
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;

    if (!start) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
      return;
    }

    moveBy(deltaX < 0 ? 1 : -1);
  };

  if (!activeImage) {
    return null;
  }

  return (
    <Box
      onFocusCapture={markInteraction}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: { xs: "relative", md: "sticky" },
        top: { md: "calc(var(--header-height) + 20px)" },
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "76px minmax(0, 1fr)" },
        gap: { xs: 0, md: 1.5 },
        alignItems: "start",
      }}
    >
      <StickyThumbnailRail
        activeIndex={activeIndex}
        images={galleryImages}
        onSelect={goTo}
        productTitle={productTitle}
      />

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          border: `1px solid ${brandColors.border}`,
          borderRadius: "8px",
          aspectRatio: { xs: "4 / 5", md: "5 / 6" },
          background: "#090908",
          boxShadow: shadows.soft,
          isolation: "isolate",
          touchAction: "pan-y",
        }}
      >
        <Box
          aria-label={`Open ${activeImage.alt}`}
          component="button"
          onClick={() => {
            markInteraction();
            setFullscreenImage(activeImage);
          }}
          onPointerCancel={() => {
            pointerStart.current = null;
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            cursor: "zoom-in",
            p: 0,
            background: "transparent",
          }}
          type="button"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={activeImage.id}
              animate={{
                opacity: 1,
                scale: hovered && !prefersReducedMotion ? 1.018 : 1,
              }}
              exit={{ opacity: 0, scale: 1.006 }}
              initial={{ opacity: 0, scale: 1.012 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "block",
                zIndex: 1,
              }}
              transition={imageTransition}
            >
              <MediaAsset
                image={activeImage}
                priority={activeIndex === 0}
                sizes={IMAGE_CONFIG.sizes}
              />
            </motion.span>
          </AnimatePresence>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 5,
            px: 1.2,
            py: 0.65,
            border: `1px solid ${brandColors.border}`,
            borderRadius: "999px",
            color: "rgba(250, 248, 241, 0.74)",
            background: "rgba(9, 9, 8, 0.58)",
            fontSize: "0.64rem",
            fontWeight: 900,
            letterSpacing: "0.16em",
            lineHeight: 1,
          }}
        >
          {formatMediaCount(activeIndex, galleryImages.length)}
        </Box>

        <Typography
          component="p"
          sx={{
            position: "absolute",
            right: 14,
            bottom: { xs: 96, md: 14 },
            zIndex: 5,
            m: 0,
            px: 1.4,
            py: 0.75,
            border: `1px solid ${brandColors.border}`,
            borderRadius: "999px",
            color: "rgba(250, 248, 241, 0.78)",
            background: "rgba(9, 9, 8, 0.72)",
            fontSize: "0.68rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {color.name}
        </Typography>

        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            right: { xs: 20, md: 18 },
            bottom: { xs: 86, md: 18 },
            left: { xs: 20, md: 18 },
            zIndex: 5,
            height: "1px",
            overflow: "hidden",
            background: "rgba(250, 248, 241, 0.14)",
          }}
        >
          <Box
            sx={{
              width: `${((activeIndex + 1) / galleryImages.length) * 100}%`,
              height: "100%",
              background: "rgba(216, 198, 165, 0.84)",
              transition: `width 720ms ${transitions.ease}`,
            }}
          />
        </Box>

        <StickyThumbnailRail
          activeIndex={activeIndex}
          images={galleryImages}
          onSelect={goTo}
          orientation="horizontal"
          productTitle={productTitle}
        />
      </Box>

      <MediaLightbox
        image={fullscreenImage}
        onClose={() => setFullscreenImage(null)}
      />
    </Box>
  );
}

function MediaLightbox({
  image,
  onClose,
}: {
  image: ProductImage | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      fullScreen
      onClose={onClose}
      open={Boolean(image)}
      slotProps={{
        paper: {
          sx: {
            background: "rgba(5, 5, 5, 0.96)",
            backgroundImage: "none",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", minHeight: "100svh" }}>
        <IconAction
          aria-label="Close image"
          onClick={onClose}
          sx={{ position: "fixed", top: 20, right: 20, zIndex: 2 }}
        >
          <CloseIcon fontSize="small" />
        </IconAction>
        {image ? (
          <Box
            sx={{
              position: "absolute",
              inset: { xs: 16, md: 36 },
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <MediaAsset contain image={image} sizes="100vw" />
          </Box>
        ) : null}
      </Box>
    </Dialog>
  );
}

function MediaAsset({
  contain = false,
  image,
  priority = false,
  sizes,
}: {
  contain?: boolean;
  image: ProductImage;
  priority?: boolean;
  sizes: string;
}) {
  const video = isVideoUrl(image.url);

  return (
    <>
      {video ? (
        <Box
          autoPlay
          component="video"
          loop
          muted
          playsInline
          preload="metadata"
          src={image.url}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: contain ? "contain" : "cover",
            objectPosition: contain ? "50% 50%" : "64% 50%",
          }}
        />
      ) : (
        <Image
          alt={image.alt}
          fill
          priority={priority}
          quality={IMAGE_CONFIG.quality}
          sizes={sizes}
          src={image.mobileUrl ?? image.url}
          style={{
            objectFit: contain ? "contain" : "cover",
            objectPosition: contain ? "50% 50%" : "64% 50%",
          }}
        />
      )}
    </>
  );
}

function formatMediaCount(activeIndex: number, total: number) {
  return `${String(activeIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

function isVideoUrl(url: string) {
  return /\.(mp4|m4v|mov|webm)(\?.*)?$/i.test(url);
}
