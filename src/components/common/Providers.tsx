"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { theme } from "@/styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2600,
          style: {
            border: "1px solid rgba(250, 248, 241, 0.12)",
            borderRadius: "8px",
            color: "#faf8f1",
            background: "rgba(17, 16, 14, 0.96)",
          },
        }}
      />
    </ThemeProvider>
  );
}
