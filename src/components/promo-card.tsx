import Image from "next/image";
import Link from "next/link";

export interface PromoCardProps {
  image: string;
  alt: string;
  href: string;
}

export function PromoCard({ image, alt, href }: PromoCardProps) {
  return (
    <Link
      href={href}
      aria-label={alt}
      className="relative block w-full max-w-[365px] h-[180px] rounded-2xl overflow-hidden border border-card-border shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06)] hover:opacity-90 transition-opacity"
    >
      <Image src={image} alt={alt} fill className="object-cover" />
    </Link>
  );
}
