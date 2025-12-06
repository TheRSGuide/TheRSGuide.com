import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { setup } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/setup">) {
  return (
    <DocsLayout
      sidebar={{ prefetch: false }}
      tree={setup.pageTree}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
