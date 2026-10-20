import * as React from "react";
import { cn } from "../../lib/utils";
import {useScrollSpy} from "@/hooks/use-scroll-spy";

export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export function ToC({ items }: { items: TocItem[] }) {
  const activeId = useScrollSpy(items.map((i) => i.id));

  return (
    <nav className="mt-3 space-y-1 border-l pr-5">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block px-2 py-1 hover:text-gradient-to-br from-[#0073A5] via-[#13B089] to-[#39D37A]",
              item.level === 3 ? "ml-3" : "ml-0",
              active && "text-gradient-to-br from-[#0073A5] to-[#39D37A]",
            )}
          >
            {item.title}
          </a>
        );
      })}
    </nav>
  );
}


