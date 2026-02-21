import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const tomatoGrotesk = localFont({
  src: "../../public/fonts/TomatoGrotesk-Bold.woff",
  variable: "--font-display",
  weight: "700",
});

const suisseIntl = localFont({
  src: [
    { path: "../../public/fonts/SuisseIntl-Book-WebM.woff", weight: "400" },
    { path: "../../public/fonts/SuisseIntl-Medium-WebM.woff", weight: "500" },
    { path: "../../public/fonts/SuisseIntl-SemiBold-WebM.woff", weight: "600" },
  ],
  variable: "--font-sans",
});

const simplonMono = localFont({
  src: "../../public/fonts/SimplonMono-Regular-WebTrial.woff",
  variable: "--font-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Experience Hub",
  description: "Agent Experience Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${tomatoGrotesk.variable} ${suisseIntl.variable} ${simplonMono.variable}`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
