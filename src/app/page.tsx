import Link from "next/link";
import Image from "next/image";

const entries = [
  { label: "In App Experience", href: "/in-app" },
  { label: "Whatsapp Experience", href: "/whatsapp" },
  { label: "SDK", href: "/sdk" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col">
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
        {entries.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="group border-b border-[#e5e5e5] px-6 py-8 flex items-end hover:bg-[#f9f9f9] transition-colors"
          >
            <span className="font-display text-[clamp(48px,8vw,96px)] font-bold text-black leading-none tracking-tight group-hover:translate-x-2 transition-transform duration-200">
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
