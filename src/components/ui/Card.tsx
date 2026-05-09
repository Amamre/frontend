import type { HTMLAttributes, ReactNode } from "react";
import { AppContainer, Surface } from "@/components/ui/Primitives";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, padded = true, ...props }: CardProps) {
  return (
    <Surface padded={padded} {...props}>
      {children}
    </Surface>
  );
}

export function Container({
  children,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <AppContainer>{children}</AppContainer>;
}
