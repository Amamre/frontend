"use client";

import { useEffect } from "react";
import {
  AppButton,
  BodyCopy,
  EmptyState,
  Eyebrow,
  Headline,
} from "@/components/ui/Primitives";

export default function ErrorBoundary({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState>
      <div>
        <Eyebrow>Error</Eyebrow>
        <Headline>Something interrupted the experience.</Headline>
        <BodyCopy>
          Retry the segment. If it persists, check the deployment logs with
          digest {error.digest ?? "unavailable"}.
        </BodyCopy>
        <AppButton onClick={unstable_retry} type="button" variant="primary">
          Try again
        </AppButton>
      </div>
    </EmptyState>
  );
}
