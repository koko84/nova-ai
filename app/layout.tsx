import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "NOVA AI — Your intelligent workspace",
  description: "One intelligent workspace for writing, ideas, translation and business.",
  applicationName: "NOVA AI",
  manifest: "/manifest.webmanifest"
};
export const viewport: Viewport = { themeColor: "#080b16", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
