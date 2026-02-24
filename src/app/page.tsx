"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const entries = [
  { label: "In App Experience", href: "/demo" },
  { label: "Whatsapp Experience", href: "/whatsapp" },
  { label: "SDK", href: "/sdk" },
];

// ─── Custom cursor ────────────────────────────────────────────────────────────

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className="fixed z-50 pointer-events-none w-5 h-5 bg-black rounded-full -translate-x-1/2 -translate-y-1/2"
      style={{ left: pos.x, top: pos.y, display: visible ? "block" : "none" }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-white flex flex-col cursor-none">
      <CustomCursor />

      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-5 pb-0">
        <Image
          src="/figma-assets/209bc63a5dd4f57a1735c3108bd4534c77d7e6eb.svg"
          alt="Logo"
          width={28}
          height={28}
        />
        <p className="text-base text-[#989898] tracking-tight absolute left-1/2 -translate-x-1/2 pt-5">
          Agent Experience Hub
        </p>
      </header>

      {/* Navigation entries */}
      <nav className="flex flex-col flex-1 mt-16">
        {entries.map(({ label, href }, i) => (
          <Link
            key={href}
            href={href}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="border-b border-[#e5e5e5] px-6 pt-14 pb-0 flex items-end overflow-visible"
          >
            <span
              className="font-display text-[clamp(48px,8vw,96px)] font-bold leading-none tracking-tight translate-y-[0.15em] transition-[color,transform] duration-300"
              style={{
                color: hoveredIndex === null || hoveredIndex === i ? "#000" : "#c8c8c8",
                "--tw-translate-x": hoveredIndex === i ? "2rem" : "0px",
              } as React.CSSProperties}
            >
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
