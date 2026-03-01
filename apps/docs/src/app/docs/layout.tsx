import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span className="font-bold">
            Howl<span className="text-[#0FACED]">Flow</span>
          </span>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
