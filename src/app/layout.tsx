import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import Navbar from "@/components/layout/header/navbar";
import Sidebar from "@/components/layout/sidebar/sidebar";

const faktum = localFont({
  src: [
    {
      path: "./font/Faktum-Reguler.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/Rene Bieder - Faktum Test Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-faktum",
});

export const metadata: Metadata = {
  title: "Kulipoly",
  description: "Kulipoly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${faktum.className}  antialiased`}>
        {children}
        <Navbar />
        <Sidebar />
      </body>
    </html>
  );
}
