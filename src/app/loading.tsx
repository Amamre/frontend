import { Box } from "@mui/material";
import {
  AppContainer,
  Eyebrow,
  PageSection,
  Surface,
} from "@/components/ui/Primitives";

export default function Loading() {
  return (
    <PageSection>
      <AppContainer>
        <Surface sx={{ minHeight: 360 }}>
          <Eyebrow>Loading</Eyebrow>
          <Box sx={{ display: "grid", gap: 2, maxWidth: 720 }}>
            <Box
              sx={{
                display: "block",
                height: 48,
                borderRadius: 2,
                background: "rgba(250, 248, 241, 0.08)",
              }}
            />
            <Box
              sx={{
                display: "block",
                height: 18,
                borderRadius: 2,
                background: "rgba(250, 248, 241, 0.06)",
              }}
            />
            <Box
              sx={{
                display: "block",
                height: 18,
                width: "72%",
                borderRadius: 2,
                background: "rgba(250, 248, 241, 0.06)",
              }}
            />
          </Box>
        </Surface>
      </AppContainer>
    </PageSection>
  );
}
