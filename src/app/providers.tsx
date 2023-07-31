"use client";

import { useServerInsertedHTML } from "next/navigation";
import { CssBaseline, NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>;
  });

  return <NextUIProvider>{children}</NextUIProvider>;
}
