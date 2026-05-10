import type { CustomThemeTokens } from "./custom";

declare module "@mui/material/styles" {
  interface Theme {
    custom: CustomThemeTokens;
  }

  interface ThemeOptions {
    custom?: CustomThemeTokens;
  }
}
