"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { sdkNav } from "@/lib/sdk-nav";

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r border-[#e5e5e5] min-h-screen bg-white sticky top-0 overflow-y-auto">
      <div className="px-5 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xs text-[#989898] hover:text-black transition-colors">
            ← Home
          </Link>
          {onClose && (
            <button onClick={onClose} aria-label="Close menu" className="md:hidden text-[#989898] hover:text-black">
              <X size={16} />
            </button>
          )}
        </div>
        <p className="text-xs font-semibold text-[#989898] uppercase tracking-widest mt-6 mb-3">
          Components
        </p>
        <nav className="flex flex-col gap-0.5">
          {sdkNav.map(({ slug, name }) => {
            const isActive = pathname === `/sdk/${slug}`;
            return (
              <Link
                key={slug}
                href={`/sdk/${slug}`}
                className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black text-white font-medium"
                    : "text-[#333] hover:bg-[#f3f3f3]"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
