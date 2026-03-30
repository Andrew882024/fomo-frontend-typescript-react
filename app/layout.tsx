import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FOMO — UCSD Free Food",
  description: "Upcoming free food events at UC San Diego",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white font-sans">{children}</body>
    </html>
  );
}
