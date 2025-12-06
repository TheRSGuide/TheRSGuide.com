import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { gettingStarted } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/getting-started">) {
  return (
    <DocsLayout tree={gettingStarted.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
