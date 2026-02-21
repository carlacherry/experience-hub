import Link from "next/link";

export default function WhatsappPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
      <p className="text-2xl font-semibold text-black">Whatsapp Experience</p>
      <p className="text-base text-[#989898]">Coming soon</p>
      <Link href="/" className="text-sm text-black underline underline-offset-2 hover:opacity-60">
        ← Back
      </Link>
    </div>
  );
}
