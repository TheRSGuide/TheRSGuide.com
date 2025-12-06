import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BookMarkedIcon, LaptopMinimal, Settings } from "lucide-react";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <>The RS Guide</>,
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        icon: <Settings />,
        text: "Setup",
        url: "/setup",
        active: "none",
        secondary: false,
      },
      {
        icon: <LaptopMinimal />,
        text: "Getting Started",
        url: "/getting-started",
        active: "none",
        secondary: false,
      },
      {
        icon: <BookMarkedIcon />,
        text: "Guides",
        url: "/guides",
        active: "none",
        secondary: false,
      },
    ],
  };
}
