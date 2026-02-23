"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { sdkNav } from "@/lib/sdk-nav";

export function WidgetNav() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [pathname]);

  return (
    <div
      ref={scrollRef}
      className="md:hidden flex gap-2 overflow-x-auto px-4 py-3 border-b border-[#e5e5e5] bg-white sticky top-[49px] z-20 scrollbar-hide"
    >
      {sdkNav.map(({ slug, shortName }) => {
        const isActive = pathname === `/sdk/${slug}`;
        return (
          <Link
            key={slug}
            href={`/sdk/${slug}`}
            ref={isActive ? activeRef : null}
            className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-sm transition-colors ${
              isActive
                ? "bg-black text-white font-medium"
                : "bg-[#f3f3f3] text-[#333] hover:bg-[#e5e5e5]"
            }`}
          >
            {shortName}
          </Link>
        );
      })}
    </div>
  );
}
