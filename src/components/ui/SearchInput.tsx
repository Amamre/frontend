"use client";

import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FieldTitle, IconAction } from "@/components/ui/Primitives";
import { useDebounce } from "@/hooks/useUtils";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  loading?: boolean;
  autoFocus?: boolean;
}

export default function SearchInput({
  autoFocus = false,
  loading = false,
  onSearch,
  placeholder,
}: SearchInputProps) {
  const common = useTypedTranslations("common");
  const search = useTypedTranslations("search");
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <Box component="label" sx={{ display: "block" }}>
      <FieldTitle>
        {loading ? search("loadingLabel") : search("eyebrow")}
      </FieldTitle>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 1.25 }}>
        <TextField
          inputRef={inputRef}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder ?? search("placeholder")}
          type="search"
          value={value}
        />
        <IconAction type="button" aria-label={common("aria.search")}>
          <SearchIcon fontSize="small" />
        </IconAction>
      </Box>
    </Box>
  );
}
