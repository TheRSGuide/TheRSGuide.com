import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { guides } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/guides">) {
  return (
    <DocsLayout tree={guides.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
